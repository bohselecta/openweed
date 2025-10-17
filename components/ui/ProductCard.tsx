import Image from 'next/image'
import Link from 'next/link'
import { cn, formatCurrency, formatProductCategory } from '@/lib/utils'

interface ProductCardProps {
  product: {
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
    driver: {
      handle: string
      region: string
    }
  }
  showDriver?: boolean
  className?: string
}

export default function ProductCard({ 
  product, 
  showDriver = true, 
  className 
}: ProductCardProps) {
  const isInStock = product.stock > 0

  return (
    <div className={cn(
      'bg-white rounded-xl border border-brand-ink/10 overflow-hidden hover:shadow-md transition-all duration-200',
      !isInStock && 'opacity-60',
      className
    )}>
      <div className="aspect-square relative bg-brand-green/5">
        {product.photo ? (
          <Image
            src={product.photo}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-4xl">🌿</span>
          </div>
        )}
        
        {!isInStock && (
          <div className="absolute inset-0 bg-brand-ink/50 flex items-center justify-center">
            <span className="bg-brand-ink text-white px-3 py-1 rounded-full text-sm font-semibold">
              Out of Stock
            </span>
          </div>
        )}
        
        <div className="absolute top-2 left-2">
          <span className="bg-brand-green text-white px-2 py-1 rounded-full text-xs font-semibold">
            {formatProductCategory(product.category)}
          </span>
        </div>
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
        
        <div className="flex items-center justify-between text-sm">
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
        
        {showDriver && (
          <div className="mt-3 pt-3 border-t border-brand-ink/10">
            <Link 
              href={`/deliveries/${product.driver.handle}`}
              className="text-sm text-brand-green hover:text-brand-green/80 transition-colors"
            >
              View {product.driver.handle}'s menu →
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
