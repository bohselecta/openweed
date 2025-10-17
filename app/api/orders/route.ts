import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const driverId = searchParams.get('driverId')

    let whereClause: any = {}

    // Filter by user role
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true },
    })

    if (user?.role === 'BUYER') {
      whereClause.buyerId = session.user.id
    } else if (user?.role === 'DRIVER') {
      whereClause.driverId = driverId || {
        in: await prisma.driverProfile
          .findMany({
            where: { userId: session.user.id },
            select: { id: true },
          })
          .then((drivers: { id: string }[]) => drivers.map(d => d.id))
      }
    }
    // Admins can see all orders

    if (status) {
      whereClause.status = status
    }

    const orders = await prisma.order.findMany({
      where: whereClause,
      include: {
        buyer: {
          select: {
            name: true,
            email: true,
          },
        },
        driver: {
          select: {
            handle: true,
            region: true,
            user: {
              select: {
                name: true,
              },
            },
          },
        },
        items: {
          include: {
            product: {
              select: {
                name: true,
                price: true,
                photo: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(orders)
  } catch (error) {
    console.error('Error fetching orders:', error)
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { driverId, items, notes, deliveryAddress } = body

    // Verify driver exists and is active
    const driver = await prisma.driverProfile.findFirst({
      where: {
        id: driverId,
        isActive: true,
        isVerified: true,
      },
    })

    if (!driver) {
      return NextResponse.json({ error: 'Driver not found' }, { status: 404 })
    }

    // Calculate total and verify products
    let total = 0
    const orderItems = []

    for (const item of items) {
      const product = await prisma.product.findFirst({
        where: {
          id: item.productId,
          driverId: driverId,
          isActive: true,
          stock: {
            gte: item.quantity,
          },
        },
      })

      if (!product) {
        return NextResponse.json(
          { error: `Product ${item.productId} not available` },
          { status: 400 }
        )
      }

      const itemTotal = product.price * item.quantity
      total += itemTotal

      orderItems.push({
        productId: item.productId,
        quantity: item.quantity,
        price: product.price,
      })
    }

    // Create order with items
    const order = await prisma.order.create({
      data: {
        buyerId: session.user.id,
        driverId: driverId,
        total,
        notes,
        deliveryAddress,
        items: {
          create: orderItems,
        },
      },
      include: {
        buyer: {
          select: {
            name: true,
            email: true,
          },
        },
        driver: {
          select: {
            handle: true,
            region: true,
          },
        },
        items: {
          include: {
            product: {
              select: {
                name: true,
                price: true,
                photo: true,
              },
            },
          },
        },
      },
    })

    // Update product stock
    for (const item of items) {
      await prisma.product.update({
        where: { id: item.productId },
        data: {
          stock: {
            decrement: item.quantity,
          },
        },
      })
    }

    return NextResponse.json(order, { status: 201 })
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}
