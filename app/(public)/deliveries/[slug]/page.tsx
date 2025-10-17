'use client'

import { useState, useEffect } from 'react'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { 
  MapPin, 
  Clock, 
  Star, 
  MessageCircle, 
  ShoppingCart,
  Plus,
  Minus,
  Heart
} from 'lucide-react'
import { cn, formatCurrency, formatProductCategory } from '@/lib/utils'
import ProductCard from '@/components/ui/ProductCard'

interface DriverPageProps {
  params: Promise<{
    slug: string
  }>
}

interface Driver {
  id: string
  handle: string
  region: string
  bio?: string
  avatar?: string
  isActive: boolean
  isVerified: boolean
  user: {
    name: string
  }
  products: Array<{
    id: string
    name: string
    description?: string
    category: string
    price: number
    photo?: string
    stock: number
    thc?: number
    cbd?: number
    strain?: string
  }>
  _count: {
    orders: number
  }
}

export default function DriverPage({ params }: DriverPageProps) {
  const [driver, setDriver] = useState<Driver | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [cart, setCart] = useState<Record<string, number>>({})
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [slug, setSlug] = useState<string>('')

  useEffect(() => {
    params.then(({ slug: resolvedSlug }) => {
      setSlug(resolvedSlug)
      fetchDriver(resolvedSlug)
    })
  }, [params])

  const fetchDriver = async (handle: string) => {
    try {
      const response = await fetch(`/api/drivers?handle=${handle}`)
      if (!response.ok) {
        if (response.status === 404) {
          notFound()
        }
        throw new Error('Failed to fetch driver')
      }
      
      const data = await response.json()
      setDriver(data)
    } catch (err) {
      setError('Failed to load driver information')
      console.error('Driver fetch error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const addToCart = (productId: string) => {
    setCart(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }))
  }

  const removeFromCart = (productId: string) => {
    setCart(prev => {
      const newCart = { ...prev }
      if (newCart[productId] > 1) {
        newCart[productId] -= 1
      } else {
        delete newCart[productId]
      }
      return newCart
    })
  }

  const getCartTotal = () => {
    if (!driver) return 0
    
    return Object.entries(cart).reduce((total, [productId, quantity]) => {
      const product = driver.products.find(p => p.id === productId)
      return total + (product ? product.price * quantity : 0)
    }, 0)
  }

  const getCartItemCount = () => {
    return Object.values(cart).reduce((total, quantity) => total + quantity, 0)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-brand-paper">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-brand-ink/10 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-brand-ink/5 rounded w-1/2 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-64 bg-brand-ink/5 rounded-xl"></div>
                ))}
              </div>
              <div className="h-96 bg-brand-ink/5 rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !driver) {
    return (
      <div className="min-h-screen bg-brand-paper flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">❌</span>
          </div>
          <h1 className="text-2xl font-bold text-brand-ink mb-2">Driver Not Found</h1>
          <p className="text-brand-ink/70 mb-6">{error || 'This driver profile does not exist.'}</p>
          <Link
            href="/search"
            className="px-6 py-3 bg-brand-green text-white rounded-lg font-semibold hover:bg-brand-green/90 transition-colors"
          >
            Find Other Drivers
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-brand-paper">
      {/* Header */}
      <div className="bg-white border-b border-brand-ink/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 text-brand-ink hover:text-brand-green transition-colors">
              <span className="text-sm">← Back to OpenWeed</span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsChatOpen(!isChatOpen)}
                className="flex items-center space-x-2 px-4 py-2 border border-brand-green text-brand-green rounded-lg hover:bg-brand-green hover:text-white transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat</span>
              </button>
              
              <div className="relative">
                <button className="flex items-center space-x-2 px-4 py-2 bg-brand-green text-white rounded-lg hover:bg-brand-green/90 transition-colors">
                  <ShoppingCart className="w-4 h-4" />
                  <span>Cart ({getCartItemCount()})</span>
                </button>
                
                {getCartItemCount() > 0 && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-brand-violet text-white rounded-full flex items-center justify-center text-xs font-bold">
                    {getCartItemCount()}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Driver Info */}
            <div className="bg-white rounded-xl border border-brand-ink/10 p-6">
              <div className="flex items-start space-x-6">
                <div className="w-20 h-20 rounded-full bg-brand-green/10 flex items-center justify-center overflow-hidden">
                  {driver.avatar ? (
                    <Image
                      src={driver.avatar}
                      alt={driver.user.name}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-3xl font-bold text-brand-green">
                      {driver.user.name.charAt(0)}
                    </span>
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h1 className="text-2xl font-bold text-brand-ink">{driver.user.name}</h1>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-brand-amber fill-current" />
                      <span className="text-sm font-medium text-brand-ink">4.8</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-brand-ink/70 mb-3">
                    <span>@{driver.handle}</span>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{driver.region}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>~30 min delivery</span>
                    </div>
                  </div>
                  
                  {driver.bio && (
                    <p className="text-brand-ink/80">{driver.bio}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Products */}
            <div className="bg-white rounded-xl border border-brand-ink/10 p-6">
              <h2 className="text-xl font-semibold text-brand-ink mb-6">Menu</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {driver.products.map((product) => (
                  <div key={product.id} className="border border-brand-ink/10 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-brand-ink">{product.name}</h3>
                        {product.strain && (
                          <p className="text-sm text-brand-ink/70">{product.strain}</p>
                        )}
                      </div>
                      <span className="text-lg font-bold text-brand-green">
                        {formatCurrency(product.price)}
                      </span>
                    </div>
                    
                    {product.description && (
                      <p className="text-sm text-brand-ink/80 mb-3">{product.description}</p>
                    )}
                    
                    <div className="flex items-center justify-between text-sm text-brand-ink/70 mb-4">
                      <div className="flex items-center space-x-4">
                        {product.thc && (
                          <span>THC: {product.thc}%</span>
                        )}
                        {product.cbd && (
                          <span>CBD: {product.cbd}%</span>
                        )}
                      </div>
                      <span>{product.stock} left</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => removeFromCart(product.id)}
                          disabled={!cart[product.id]}
                          className="w-8 h-8 rounded-full border border-brand-ink/20 flex items-center justify-center hover:bg-brand-ink/5 transition-colors disabled:opacity-50"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-medium">
                          {cart[product.id] || 0}
                        </span>
                        <button
                          onClick={() => addToCart(product.id)}
                          disabled={product.stock === 0}
                          className="w-8 h-8 rounded-full border border-brand-green text-brand-green flex items-center justify-center hover:bg-brand-green hover:text-white transition-colors disabled:opacity-50"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <button className="text-brand-green hover:text-brand-green/80 transition-colors">
                        <Heart className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Cart Summary */}
            {getCartItemCount() > 0 && (
              <div className="bg-white rounded-xl border border-brand-ink/10 p-6">
                <h3 className="text-lg font-semibold text-brand-ink mb-4">Order Summary</h3>
                
                <div className="space-y-3 mb-4">
                  {Object.entries(cart).map(([productId, quantity]) => {
                    const product = driver.products.find(p => p.id === productId)
                    if (!product) return null
                    
                    return (
                      <div key={productId} className="flex items-center justify-between text-sm">
                        <span className="text-brand-ink/80">
                          {product.name} × {quantity}
                        </span>
                        <span className="font-medium text-brand-ink">
                          {formatCurrency(product.price * quantity)}
                        </span>
                      </div>
                    )
                  })}
                </div>
                
                <div className="border-t border-brand-ink/10 pt-4">
                  <div className="flex items-center justify-between font-semibold text-brand-ink">
                    <span>Total</span>
                    <span>{formatCurrency(getCartTotal())}</span>
                  </div>
                </div>
                
                <button className="w-full mt-4 bg-brand-green text-white py-3 px-4 rounded-lg font-semibold hover:bg-brand-green/90 transition-colors">
                  Place Order
                </button>
              </div>
            )}

            {/* Chat Widget */}
            {isChatOpen && (
              <div className="bg-white rounded-xl border border-brand-ink/10 p-6">
                <h3 className="text-lg font-semibold text-brand-ink mb-4">Live Chat</h3>
                <div className="space-y-4">
                  <div className="h-48 bg-brand-ink/5 rounded-lg p-4 overflow-y-auto">
                    <div className="space-y-3">
                      <div className="flex items-start space-x-2">
                        <div className="w-6 h-6 bg-brand-green rounded-full flex items-center justify-center">
                          <span className="text-xs text-white font-bold">A</span>
                        </div>
                        <div className="bg-white rounded-lg p-2 text-sm">
                          <p className="font-medium text-brand-ink">Austin Weed Dog</p>
                          <p className="text-brand-ink/80">Hey! Thanks for checking out my menu. Any questions about the products?</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      className="flex-1 px-3 py-2 border border-brand-ink/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent"
                    />
                    <button className="px-4 py-2 bg-brand-green text-white rounded-lg hover:bg-brand-green/90 transition-colors">
                      Send
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Driver Stats */}
            <div className="bg-white rounded-xl border border-brand-ink/10 p-6">
              <h3 className="text-lg font-semibold text-brand-ink mb-4">Driver Stats</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-brand-ink/70">Orders Completed</span>
                  <span className="font-medium text-brand-ink">{driver._count.orders}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-brand-ink/70">Products Available</span>
                  <span className="font-medium text-brand-ink">{driver.products.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-brand-ink/70">Average Rating</span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-brand-amber fill-current" />
                    <span className="font-medium text-brand-ink">4.8</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-brand-ink/70">Response Time</span>
                  <span className="font-medium text-brand-green">~5 min</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
