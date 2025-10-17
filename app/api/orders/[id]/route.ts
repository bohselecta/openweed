import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const order = await prisma.order.findUnique({
      where: { id: params.id },
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
                category: true,
              },
            },
          },
        },
      },
    })

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    // Check permissions
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true },
    })

    if (user?.role === 'BUYER' && order.buyerId !== session.user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    if (user?.role === 'DRIVER') {
      const driverProfile = await prisma.driverProfile.findFirst({
        where: {
          userId: session.user.id,
          id: order.driverId,
        },
      })

      if (!driverProfile) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
      }
    }

    return NextResponse.json(order)
  } catch (error) {
    console.error('Error fetching order:', error)
    return NextResponse.json(
      { error: 'Failed to fetch order' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { status, notes, deliveryTime } = body

    // Verify user can update this order
    const order = await prisma.order.findUnique({
      where: { id: params.id },
      include: {
        driver: {
          select: {
            userId: true,
          },
        },
      },
    })

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true },
    })

    // Only drivers, buyers (for cancellation), and admins can update orders
    const canUpdate = 
      user?.role === 'ADMIN' ||
      (user?.role === 'DRIVER' && order.driver.userId === session.user.id) ||
      (user?.role === 'BUYER' && order.buyerId === session.user.id && status === 'CANCELLED')

    if (!canUpdate) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const updatedOrder = await prisma.order.update({
      where: { id: params.id },
      data: {
        ...(status && { status }),
        ...(notes !== undefined && { notes }),
        ...(deliveryTime && { deliveryTime: new Date(deliveryTime) }),
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

    return NextResponse.json(updatedOrder)
  } catch (error) {
    console.error('Error updating order:', error)
    return NextResponse.json(
      { error: 'Failed to update order' },
      { status: 500 }
    )
  }
}
