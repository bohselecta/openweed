import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getZipCoordinates, findZoneForZip } from '@/lib/geo'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const zipCode = searchParams.get('zipCode')
    const lat = searchParams.get('lat')
    const lng = searchParams.get('lng')

    if (zipCode) {
      const coordinates = getZipCoordinates(zipCode)
      const zone = findZoneForZip(zipCode)

      if (!coordinates) {
        return NextResponse.json(
          { error: 'Invalid ZIP code' },
          { status: 400 }
        )
      }

      return NextResponse.json({
        zipCode,
        coordinates,
        zone,
        drivers: await getDriversInZone(zone),
      })
    }

    if (lat && lng) {
      const coordinates = {
        lat: parseFloat(lat),
        lng: parseFloat(lng),
      }

      // Find closest zone
      const zones = await prisma.zone.findMany({
        where: { isActive: true },
      })

      let closestZone = null
      let minDistance = Infinity

      for (const zone of zones) {
        const distance = Math.sqrt(
          Math.pow(coordinates.lat - zone.centerLat, 2) +
          Math.pow(coordinates.lng - zone.centerLng, 2)
        )

        if (distance < minDistance && distance <= zone.radius / 69) { // Convert miles to degrees
          minDistance = distance
          closestZone = zone
        }
      }

      return NextResponse.json({
        coordinates,
        zone: closestZone?.id || null,
        drivers: closestZone ? await getDriversInZone(closestZone.id) : [],
      })
    }

    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 })
  } catch (error) {
    console.error('Error in geo API:', error)
    return NextResponse.json(
      { error: 'Failed to process geo request' },
      { status: 500 }
    )
  }
}

async function getDriversInZone(zoneId: string | null) {
  if (!zoneId) return []

  const drivers = await prisma.driverProfile.findMany({
    where: {
      region: zoneId,
      isActive: true,
      isVerified: true,
    },
    include: {
      user: {
        select: {
          name: true,
        },
      },
      _count: {
        select: {
          products: {
            where: {
              isActive: true,
            },
          },
        },
      },
    },
  })

  return drivers
}
