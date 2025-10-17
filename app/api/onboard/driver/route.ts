import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

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

    // Create driver profile
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
    console.error('Error creating driver profile:', error)
    return NextResponse.json(
      { error: 'Failed to create driver profile' },
      { status: 500 }
    )
  }
}
