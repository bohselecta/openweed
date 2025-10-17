import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const region = searchParams.get('region')
    const zipCode = searchParams.get('zipCode')
    const handle = searchParams.get('handle')

    // If handle is provided, fetch single driver by handle
    if (handle) {
      const driver = await prisma.driverProfile.findUnique({
        where: { handle },
        include: {
          user: {
            select: {
              name: true,
              email: true,
            },
          },
          products: {
            where: {
              isActive: true,
            },
            select: {
              id: true,
              name: true,
              description: true,
              category: true,
              price: true,
              photo: true,
              stock: true,
              thc: true,
              cbd: true,
              strain: true,
            },
          },
          _count: {
            select: {
              orders: true,
            },
          },
        },
      })

      if (!driver) {
        return NextResponse.json({ error: 'Driver not found' }, { status: 404 })
      }

      return NextResponse.json(driver)
    }

    // Otherwise, fetch multiple drivers
    let whereClause: any = {
      isActive: true,
      isVerified: true,
    }

    if (region) {
      whereClause.region = region
    }

    const drivers = await prisma.driverProfile.findMany({
      where: whereClause,
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
        products: {
          where: {
            isActive: true,
          },
          select: {
            id: true,
            name: true,
            category: true,
            price: true,
            photo: true,
          },
        },
        _count: {
          select: {
            orders: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(drivers)
  } catch (error) {
    console.error('Error fetching drivers:', error)
    return NextResponse.json(
      { error: 'Failed to fetch drivers' },
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
    const { handle, region, bio, license } = body

    // Check if handle is already taken
    const existingDriver = await prisma.driverProfile.findUnique({
      where: { handle },
    })

    if (existingDriver) {
      return NextResponse.json(
        { error: 'Handle already taken' },
        { status: 400 }
      )
    }

    const driver = await prisma.driverProfile.create({
      data: {
        userId: session.user.id,
        handle,
        region,
        bio,
        license,
        isActive: false, // Requires admin approval
        isVerified: false,
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    })

    return NextResponse.json(driver, { status: 201 })
  } catch (error) {
    console.error('Error creating driver:', error)
    return NextResponse.json(
      { error: 'Failed to create driver' },
      { status: 500 }
    )
  }
}
