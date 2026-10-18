
import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getProductById } from '../api/products'
import Footer from "../components/layout/Footer";

export default function ProductDetailsPage() {
  const { id } = useParams()
  const productId = Number(id)

  const {
    data: product,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => getProductById(productId),
    enabled: Number.isInteger(productId) && productId > 0,
  })

  if (!Number.isInteger(productId) || productId <= 0) {
    return <p className="p-8">Invalid product ID.</p>
  }

  if (isPending) {
    return <p className="p-8">Loading product details...</p>
  }

  if (isError) {
    return <p className="p-8">Could not load product details.</p>
  }

  return (
    <main className="min-h-screen bg-[#faf9f7] p-6 sm:p-10">
      
      <div className="mx-auto max-w-5xl">
        <Link
          to="/products"
          className="text-sm text-primary hover:underline"
        >
          ← Back to products
        </Link>

        <div className="mt-6 grid gap-8 rounded-2xl bg-white p-6 shadow-sm md:grid-cols-2 md:p-10">
          <div className="flex min-h-72 items-center justify-center bg-gray-50 p-6">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="max-h-80 w-full object-contain"
            />
          </div>

          <div className="flex flex-col items-start gap-4">
            <p className="text-sm capitalize text-primary">
              {product.category}
            </p>

            <h1 className="text-3xl font-semibold text-gray-900">
              {product.title}
            </h1>

            <p className="leading-7 text-gray-600">
              {product.description}
            </p>

            <p className="text-2xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </p>

            <p className="text-sm text-amber-600">
              ★ {product.rating.toFixed(1)} / 5
            </p>

            <p className="text-sm text-gray-500">
              Stock: {product.stock}
            </p>
          </div>
        </div>
        <Footer />
      </div>
    </main>
  )
}


