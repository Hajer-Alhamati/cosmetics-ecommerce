import { Link } from 'react-router-dom'
import {
  Card,
  CardContent,
  CardFooter,
} from '../ui/card'
import type { Product } from '../../types/product'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="group gap-0 overflow-hidden rounded-lg border-0 bg-secondary py-0 shadow-none transition duration-200 hover:-translate-y-0.5">
      
        <div className="flex h-36 items-center justify-center bg-[#f5f5f4] p-3 sm:h-44 sm:p-5">
          <img
            src={product.thumbnail}
            alt={product.title}
            loading="lazy"
            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <CardContent className="px-3 pb-2 pt-3 text-center sm:px-4">
          <h2 className="line-clamp-2 min-h-9 text-xs font-medium uppercase leading-5 text-black sm:text-sm">
            {product.title}
          </h2>

          <p className="mt-1 truncate text-[10px] uppercase tracking-wide text-gray-400">
            {product.brand || product.category}
          </p>

          <p className="mt-2 text-sm font-semibold text-[#292929]">
            ${product.price.toFixed(2)}
          </p>

          <p className="mt-1 text-xs text-amber-600">
            ★ {product.rating.toFixed(1)}
          </p>
        </CardContent>
      

      <CardFooter className="border-0 bg-secondary px-3 pb-3 pt-0">
        <Link
          to={`/products/${product.id}`}
          className="w-full rounded-md border border-primary px-2 py-2 text-center text-xs font-medium text-primary transition hover:bg-primary hover:text-white"
        >
          View details
        </Link>
      </CardFooter>
    </Card>
  )
}
