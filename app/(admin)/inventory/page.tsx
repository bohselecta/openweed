'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import InventoryForm from '@/components/admin/InventoryForm'
import { Package, Plus, TrendingUp } from 'lucide-react'

// Mock data - in a real app this would come from API
const mockProducts = [
  {
    id: '1',
    name: 'Blue Dream',
    description: 'Classic sativa-dominant hybrid with sweet berry aroma',
    category: 'FLOWER',
    price: 45.00,
    photo: null,
    stock: 10,
    thc: 18.5,
    cbd: 0.8,
    strain: 'Sativa-Dominant Hybrid',
    isActive: true,
    driver: {
      handle: 'atxweedog',
      user: {
        name: 'Austin Weed Dog',
      },
    },
  },
  {
    id: '2',
    name: 'OG Kush',
    description: 'Indica-dominant classic with earthy pine flavor',
    category: 'FLOWER',
    price: 50.00,
    photo: null,
    stock: 8,
    thc: 22.0,
    cbd: 0.5,
    strain: 'Indica-Dominant Hybrid',
    isActive: true,
    driver: {
      handle: 'atxweedog',
      user: {
        name: 'Austin Weed Dog',
      },
    },
  },
  {
    id: '3',
    name: 'Sour Diesel Shatter',
    description: 'High-potency concentrate with diesel terpene profile',
    category: 'CONCENTRATE',
    price: 65.00,
    photo: null,
    stock: 5,
    thc: 85.0,
    cbd: 1.2,
    strain: null,
    isActive: true,
    driver: {
      handle: 'atxweedog',
      user: {
        name: 'Austin Weed Dog',
      },
    },
  },
  {
    id: '4',
    name: 'Gummy Bears (Mixed Berry)',
    description: 'Delicious mixed berry gummies, 10mg THC each',
    category: 'EDIBLE',
    price: 25.00,
    photo: null,
    stock: 20,
    thc: 10.0,
    cbd: 0.0,
    strain: null,
    isActive: true,
    driver: {
      handle: 'austinbuds',
      user: {
        name: 'Austin Buds',
      },
    },
  },
]

export default function InventoryPage() {
  const [products, setProducts] = useState(mockProducts)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleAddProduct = async (productData: any) => {
    try {
      // In a real app, this would call the API
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const newProduct = {
        id: Date.now().toString(),
        ...productData,
        isActive: true,
        driver: {
          handle: 'admin',
          user: {
            name: 'Admin User',
          },
        },
      }
      
      setProducts(prev => [newProduct, ...prev])
      console.log('Product added:', newProduct)
    } catch (error) {
      console.error('Error adding product:', error)
    }
  }

  const handleEditProduct = async (productId: string, updates: any) => {
    try {
      // In a real app, this would call the API
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setProducts(prev => prev.map(product => 
        product.id === productId 
          ? { ...product, ...updates }
          : product
      ))
      
      console.log('Product updated:', productId, updates)
    } catch (error) {
      console.error('Error updating product:', error)
    }
  }

  const handleDeleteProduct = async (productId: string) => {
    try {
      // In a real app, this would call the API
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setProducts(prev => prev.filter(product => product.id !== productId))
      
      console.log('Product deleted:', productId)
    } catch (error) {
      console.error('Error deleting product:', error)
    }
  }

  const getInventoryStats = () => {
    const total = products.length
    const active = products.filter(p => p.isActive).length
    const lowStock = products.filter(p => p.stock < 5).length
    const totalValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0)

    return { total, active, lowStock, totalValue }
  }

  const stats = getInventoryStats()

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="animate-pulse">
          <div className="h-8 bg-brand-ink/10 rounded w-1/3 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-24 bg-brand-ink/5 rounded-xl"></div>
            ))}
          </div>
          <div className="h-96 bg-brand-ink/5 rounded-xl"></div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl border border-brand-ink/10 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-brand-ink/70">Total Products</p>
                <p className="text-2xl font-bold text-brand-ink">{stats.total}</p>
              </div>
              <Package className="w-8 h-8 text-brand-green" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl border border-brand-ink/10 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-brand-ink/70">Active Products</p>
                <p className="text-2xl font-bold text-brand-green">{stats.active}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-brand-green" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl border border-brand-ink/10 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-brand-ink/70">Low Stock</p>
                <p className="text-2xl font-bold text-brand-amber">{stats.lowStock}</p>
              </div>
              <Package className="w-8 h-8 text-brand-amber" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl border border-brand-ink/10 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-brand-ink/70">Total Value</p>
                <p className="text-2xl font-bold text-brand-violet">${stats.totalValue.toLocaleString()}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-brand-violet" />
            </div>
          </div>
        </div>

        {/* Inventory Management */}
        <InventoryForm 
          products={products}
          onAdd={handleAddProduct}
          onEdit={handleEditProduct}
          onDelete={handleDeleteProduct}
        />

        {/* Low Stock Alert */}
        {stats.lowStock > 0 && (
          <div className="bg-brand-amber/10 border border-brand-amber/20 rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Package className="w-6 h-6 text-brand-amber" />
              <h3 className="font-semibold text-brand-ink">Low Stock Alert</h3>
            </div>
            <p className="text-sm text-brand-ink/70 mb-4">
              {stats.lowStock} product{stats.lowStock !== 1 ? 's' : ''} have low stock levels and may need restocking.
            </p>
            <div className="space-y-2">
              {products.filter(p => p.stock < 5).map(product => (
                <div key={product.id} className="flex items-center justify-between text-sm">
                  <span className="text-brand-ink">{product.name}</span>
                  <span className="text-brand-amber font-medium">{product.stock} left</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
