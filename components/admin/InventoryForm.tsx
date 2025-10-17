'use client'

import { useState } from 'react'
import { Plus, Edit, Trash2, Search, Filter } from 'lucide-react'
import { cn, formatCurrency, formatProductCategory } from '@/lib/utils'

interface InventoryFormProps {
  products: Array<{
    id: string
    name: string
    description?: string
    category: string
    price: number
    photo?: string | null
    stock: number
    thc?: number
    cbd?: number
    strain?: string | null
    isActive: boolean
    driver: {
      handle: string
      user: {
        name: string
      }
    }
  }>
  onAdd?: (product: any) => void
  onEdit?: (productId: string, updates: any) => void
  onDelete?: (productId: string) => void
  className?: string
}

export default function InventoryForm({ 
  products, 
  onAdd, 
  onEdit, 
  onDelete,
  className 
}: InventoryFormProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'FLOWER' | 'CONCENTRATE' | 'EDIBLE' | 'TOPICAL' | 'ACCESSORY'>('all')
  const [isAdding, setIsAdding] = useState(false)
  const [editingProduct, setEditingProduct] = useState<string | null>(null)

  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.driver.handle.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter

    return matchesSearch && matchesCategory
  })

  const handleAddProduct = () => {
    setIsAdding(true)
    // In a real app, this would open a modal or form
  }

  const handleEditProduct = (productId: string) => {
    setEditingProduct(productId)
    // In a real app, this would open an edit form
  }

  const handleDeleteProduct = (productId: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      onDelete?.(productId)
    }
  }

  return (
    <div className={cn('space-y-6', className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-brand-ink">Inventory Management</h2>
        <button
          onClick={handleAddProduct}
          className="flex items-center space-x-2 bg-brand-green text-white px-4 py-2 rounded-lg font-semibold hover:bg-brand-green/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Product</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-brand-ink/50" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-brand-ink/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent"
          />
        </div>
        
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value as any)}
          className="px-4 py-2 border border-brand-ink/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent"
        >
          <option value="all">All Categories</option>
          <option value="FLOWER">Flower</option>
          <option value="CONCENTRATE">Concentrate</option>
          <option value="EDIBLE">Edible</option>
          <option value="TOPICAL">Topical</option>
          <option value="ACCESSORY">Accessory</option>
        </select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-xl border border-brand-ink/10 overflow-hidden">
            <div className="aspect-square relative bg-brand-green/5">
              {product.photo ? (
                <img
                  src={product.photo}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-4xl">🌿</span>
                </div>
              )}
              
              <div className="absolute top-2 left-2">
                <span className="bg-brand-green text-white px-2 py-1 rounded-full text-xs font-semibold">
                  {formatProductCategory(product.category)}
                </span>
              </div>
              
              {!product.isActive && (
                <div className="absolute inset-0 bg-brand-ink/50 flex items-center justify-center">
                  <span className="bg-brand-ink text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Inactive
                  </span>
                </div>
              )}
            </div>
            
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-brand-ink line-clamp-1">
                  {product.name}
                </h3>
                <span className="text-lg font-bold text-brand-green">
                  {formatCurrency(product.price)}
                </span>
              </div>
              
              {product.strain && (
                <p className="text-sm text-brand-ink/70 mb-2">
                  {product.strain}
                </p>
              )}
              
              {product.description && (
                <p className="text-sm text-brand-ink/80 mb-3 line-clamp-2">
                  {product.description}
                </p>
              )}
              
              <div className="flex items-center justify-between text-sm mb-3">
                <div className="flex items-center space-x-4">
                  {product.thc && (
                    <div className="text-brand-ink/70">
                      <span className="font-medium">THC:</span> {product.thc}%
                    </div>
                  )}
                  {product.cbd && (
                    <div className="text-brand-ink/70">
                      <span className="font-medium">CBD:</span> {product.cbd}%
                    </div>
                  )}
                </div>
                
                <div className="text-brand-ink/70">
                  {product.stock} left
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm text-brand-ink/70 mb-4">
                <span>Driver: {product.driver.user.name}</span>
                <span>@{product.driver.handle}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleEditProduct(product.id)}
                  className="flex-1 flex items-center justify-center space-x-1 text-brand-green hover:text-brand-green/80 transition-colors text-sm font-medium"
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit</span>
                </button>
                
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="flex-1 flex items-center justify-center space-x-1 text-red-600 hover:text-red-700 transition-colors text-sm font-medium"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="p-12 text-center">
          <div className="w-12 h-12 bg-brand-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🌿</span>
          </div>
          <h3 className="text-lg font-medium text-brand-ink mb-2">No products found</h3>
          <p className="text-brand-ink/70">
            {searchTerm || categoryFilter !== 'all' 
              ? 'Try adjusting your search or filter criteria.'
              : 'No products have been added yet.'
            }
          </p>
        </div>
      )}
    </div>
  )
}
