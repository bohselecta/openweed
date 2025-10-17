import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create demo zones
  const austinZone = await prisma.zone.upsert({
    where: { id: 'austin-central' },
    update: {},
    create: {
      id: 'austin-central',
      name: 'Austin Central',
      zipCodes: ['78701', '78702', '78703', '78704', '78705', '78712', '78721', '78722'],
      centerLat: 30.2672,
      centerLng: -97.7431,
      radius: 10.0,
    },
  })

  // Create demo user (driver)
  const demoUser = await prisma.user.upsert({
    where: { email: 'atxweedog@example.com' },
    update: {},
    create: {
      name: 'Austin Weed Dog',
      email: 'atxweedog@example.com',
      role: 'DRIVER',
    },
  })

  // Create demo driver profile
  const demoDriver = await prisma.driverProfile.upsert({
    where: { handle: 'atxweedog' },
    update: {},
    create: {
      userId: demoUser.id,
      handle: 'atxweedog',
      region: 'Austin Central',
      bio: 'Your friendly neighborhood cannabis delivery specialist! Serving Austin with premium products and excellent service. 🐕🌿',
      license: 'TX-DRIVER-001',
      avatar: '/images/avatars/atxweedog.jpg',
      isActive: true,
      isVerified: true,
    },
  })

  // Create demo products
  const products = [
    {
      name: 'Blue Dream',
      description: 'Classic sativa-dominant hybrid with sweet berry aroma',
      category: 'FLOWER' as const,
      price: 45.00,
      stock: 10,
      thc: 18.5,
      cbd: 0.8,
      strain: 'Sativa-Dominant Hybrid',
    },
    {
      name: 'OG Kush',
      description: 'Indica-dominant classic with earthy pine flavor',
      category: 'FLOWER' as const,
      price: 50.00,
      stock: 8,
      thc: 22.0,
      cbd: 0.5,
      strain: 'Indica-Dominant Hybrid',
    },
    {
      name: 'Sour Diesel Shatter',
      description: 'High-potency concentrate with diesel terpene profile',
      category: 'CONCENTRATE' as const,
      price: 65.00,
      stock: 5,
      thc: 85.0,
      cbd: 1.2,
    },
    {
      name: 'Gummy Bears (Mixed Berry)',
      description: 'Delicious mixed berry gummies, 10mg THC each',
      category: 'EDIBLE' as const,
      price: 25.00,
      stock: 20,
      thc: 10.0,
      cbd: 0.0,
    },
    {
      name: 'CBD Relief Balm',
      description: 'Topical balm for muscle and joint relief',
      category: 'TOPICAL' as const,
      price: 35.00,
      stock: 15,
      thc: 0.0,
      cbd: 200.0,
    },
  ]

  for (const product of products) {
    await prisma.product.create({
      data: {
        ...product,
        driverId: demoDriver.id,
        photo: `/images/products/${product.name.toLowerCase().replace(/\s+/g, '-')}.jpg`,
      },
    })
  }

  // Create demo buyer
  const demoBuyer = await prisma.user.upsert({
    where: { email: 'buyer@example.com' },
    update: {},
    create: {
      name: 'Demo Buyer',
      email: 'buyer@example.com',
      role: 'BUYER',
    },
  })

  // Create demo order
  const demoOrder = await prisma.order.create({
    data: {
      buyerId: demoBuyer.id,
      driverId: demoDriver.id,
      total: 70.00,
      status: 'DELIVERED',
      notes: 'Please leave at front door',
      deliveryAddress: '1234 Demo St, Austin, TX 78704',
      deliveryTime: new Date(),
    },
  })

  // Create demo chat messages
  const chatMessages = [
    {
      userId: demoBuyer.id,
      room: 'austin-central',
      message: 'Hey everyone! Just got some amazing Blue Dream from atxweedog 🌿',
      type: 'TEXT' as const,
    },
    {
      userId: demoUser.id,
      room: 'austin-central',
      message: 'Thanks for the shoutout! Always happy to serve the community 🐕',
      type: 'TEXT' as const,
    },
    {
      userId: demoBuyer.id,
      room: 'austin-central',
      message: 'Anyone know if there are any new strains available this week?',
      type: 'TEXT' as const,
    },
  ]

  for (const message of chatMessages) {
    await prisma.chatMessage.create({
      data: message,
    })
  }

  // Create demo review
  await prisma.review.create({
    data: {
      buyerId: demoBuyer.id,
      driverId: demoDriver.id,
      orderId: demoOrder.id,
      rating: 5,
      comment: 'Excellent service! Fast delivery and great products. Highly recommend!',
    },
  })

  console.log('✅ Database seeded successfully!')
  console.log(`📍 Created zone: ${austinZone.name}`)
  console.log(`👤 Created driver: ${demoDriver.handle}`)
  console.log(`🛒 Created ${products.length} products`)
  console.log(`💬 Created ${chatMessages.length} chat messages`)
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
