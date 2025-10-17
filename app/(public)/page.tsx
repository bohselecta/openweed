import Layout from '@/components/layout/Layout'
import Hero from '@/components/ui/Hero'
import SearchBar from '@/components/ui/SearchBar'
import DriverCard from '@/components/ui/DriverCard'
import MapView from '@/components/ui/MapView'
import ChatPreview from '@/components/ui/ChatPreview'

// Mock data - in a real app this would come from API
const featuredDrivers = [
  {
    id: '1',
    handle: 'atxweedog',
    region: 'Austin Central',
    bio: 'Your friendly neighborhood cannabis delivery specialist! Serving Austin with premium products and excellent service. 🐕🌿',
    avatar: '/images/avatars/atxweedog.jpg',
    user: {
      name: 'Austin Weed Dog',
    },
    products: [
      { id: '1', name: 'Blue Dream', price: 45 },
      { id: '2', name: 'OG Kush', price: 50 },
      { id: '3', name: 'Sour Diesel Shatter', price: 65 },
    ],
    _count: {
      orders: 127,
    },
  },
  {
    id: '2',
    handle: 'austinbuds',
    region: 'Austin Central',
    bio: 'Premium cannabis delivery with a personal touch. Quality products, fast service, and always discreet.',
    avatar: null,
    user: {
      name: 'Austin Buds',
    },
    products: [
      { id: '4', name: 'Gummy Bears', price: 25 },
      { id: '5', name: 'CBD Balm', price: 35 },
    ],
    _count: {
      orders: 89,
    },
  },
]

export default function Home() {
  return (
    <Layout>
      <Hero />
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brand-ink mb-4">
              Find Delivery in Your Area
            </h2>
            <p className="text-lg text-brand-ink/70 mb-8">
              Enter your ZIP code to see available drivers near you
            </p>
            <SearchBar className="max-w-md" />
          </div>
        </div>
      </section>

      <section className="py-16 bg-brand-ink/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brand-ink mb-4">
              Featured Drivers
            </h2>
            <p className="text-lg text-brand-ink/70">
              Meet some of our top-rated delivery partners
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {featuredDrivers.map((driver) => (
              <DriverCard key={driver.id} driver={driver} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-brand-ink mb-6">
                Live Map View
              </h2>
              <p className="text-lg text-brand-ink/70 mb-8">
                See all active drivers in your area in real-time. 
                Click on any driver pin to view their menu and place an order.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-brand-green rounded-full"></div>
                  <span className="text-brand-ink">Active drivers</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-brand-violet rounded-full"></div>
                  <span className="text-brand-ink">Service areas</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-brand-amber rounded-full"></div>
                  <span className="text-brand-ink">High-demand zones</span>
                </div>
              </div>
            </div>
            
            <div>
              <MapView drivers={featuredDrivers} />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-brand-ink/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <ChatPreview room="austin-central" />
            </div>
            
            <div>
              <h2 className="text-3xl font-bold text-brand-ink mb-6">
                Join the Smokers Lounge
              </h2>
              <p className="text-lg text-brand-ink/70 mb-8">
                Connect with other cannabis enthusiasts in your area. 
                Share recommendations, ask questions, and build community.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-brand-green rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">💬</span>
                  </div>
                  <span className="text-brand-ink">Real-time chat</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-brand-violet rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">🌿</span>
                  </div>
                  <span className="text-brand-ink">Product reviews</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-brand-amber rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">📍</span>
                  </div>
                  <span className="text-brand-ink">Local meetups</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-brand-ink text-brand-paper">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Start Your Own Delivery Business?
          </h2>
          <p className="text-lg text-brand-paper/80 mb-8 max-w-2xl mx-auto">
            Join OpenWeed as a driver and build your own cannabis delivery brand. 
            Set your own hours, choose your products, and keep more of what you earn.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="/onboard/driver"
              className="px-8 py-4 bg-brand-green text-brand-ink rounded-xl font-semibold text-lg hover:bg-brand-green/90 transition-colors"
            >
              Start Driving Today
            </a>
            <a
              href="/driver-info"
              className="px-8 py-4 border-2 border-brand-paper text-brand-paper rounded-xl font-semibold text-lg hover:bg-brand-paper hover:text-brand-ink transition-colors"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>
    </Layout>
  )
}
