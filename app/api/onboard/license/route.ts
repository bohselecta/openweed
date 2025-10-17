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
    const { licenseUrl, licenseType } = body

    // Find user's driver profile
    const driver = await prisma.driverProfile.findFirst({
      where: { userId: session.user.id },
    })

    if (!driver) {
      return NextResponse.json(
        { error: 'Driver profile not found' },
        { status: 404 }
      )
    }

    // Update driver with license info
    const updatedDriver = await prisma.driverProfile.update({
      where: { id: driver.id },
      data: {
        license: licenseUrl,
        // In a real app, you'd also store licenseType, verification status, etc.
      },
    })

    return NextResponse.json(updatedDriver)
  } catch (error) {
    console.error('Error uploading license:', error)
    return NextResponse.json(
      { error: 'Failed to upload license' },
      { status: 500 }
    )
  }
}
