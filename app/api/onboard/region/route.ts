import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { region, serviceArea } = body

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

    // Update driver region
    const updatedDriver = await prisma.driverProfile.update({
      where: { id: driver.id },
      data: {
        region,
        // In a real app, you'd also store the serviceArea polygon coordinates
      },
    })

    return NextResponse.json(updatedDriver)
  } catch (error) {
    console.error('Error updating region:', error)
    return NextResponse.json(
      { error: 'Failed to update region' },
      { status: 500 }
    )
  }
}
