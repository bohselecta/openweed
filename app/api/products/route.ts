import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const driverId = searchParams.get('driverId')
    const category = searchParams.get('category')
    const search = searchParams.get('search')

    let whereClause: any = {
      isActive: true,
    }

    if (driverId) {
      whereClause.driverId = driverId
    }

    if (category) {
      whereClause.category = category
    }

    if (search) {
      whereClause.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { strain: { contains: search, mode: 'insensitive' } },
      ]
    }

    const products = await prisma.product.findMany({
      where: whereClause,
      include: {
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
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(products)
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
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
    const { name, description, category, price, photo, stock, thc, cbd, strain, driverId } = body

    // Verify user owns the driver profile
    const driver = await prisma.driverProfile.findFirst({
      where: {
        id: driverId,
        userId: session.user.id,
      },
    })

    if (!driver) {
      return NextResponse.json({ error: 'Driver not found' }, { status: 404 })
    }

    const product = await prisma.product.create({
      data: {
        driverId,
        name,
        description,
        category,
        price: parseFloat(price),
        photo,
        stock: parseInt(stock),
        thc: thc ? parseFloat(thc) : null,
        cbd: cbd ? parseFloat(cbd) : null,
        strain,
      },
      include: {
        driver: {
          select: {
            handle: true,
            region: true,
          },
        },
      },
    })

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    )
  }
}
