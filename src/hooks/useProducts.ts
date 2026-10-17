import { useQuery } from '@tanstack/react-query'
import {
  getProductsByCategory,
  searchProducts,
} from '../api/products'
import type { Product } from '../types/product'

const FEATURED_CATEGORIES = [
  'beauty',
  'fragrances',
  'skin-care',
  'womens-bags',
]

interface UseProductsOptions {
  search: string
  page: number
  category?: string
  limit?: number
}

export function useProducts({
  search,
  page,
  category = '',
  limit = 10,
}: UseProductsOptions) {
  const normalizedSearch = search.trim()

  return useQuery({
    queryKey: [
      'products',
      {
        search: normalizedSearch,
        category,
        page,
        limit,
      },
    ],

    queryFn: async () => {
      let products: Product[]

      if (normalizedSearch) {
        // البحث عبر API، ثم حصر النتائج في الفئات المطلوبة
        const result = await searchProducts(normalizedSearch, 0, 0)

        products = result.products.filter((product) =>
          FEATURED_CATEGORIES.includes(product.category),
        )
      } else if (category) {
        // جلب جميع منتجات الفئة المختارة عبر API
        const result = await getProductsByCategory(category, 0, 0)
        products = result.products
      } else {
        // جلب الفئات الأربع فقط عبر API
        const results = await Promise.all(
          FEATURED_CATEGORIES.map((item) =>
            getProductsByCategory(item, 0, 0),
          ),
        )

        products = results.flatMap((result) => result.products)
      }

      // تطبيق الترقيم بعد حصر النتائج في الفئات المطلوبة
      const start = (page - 1) * limit

      return {
        products: products.slice(start, start + limit),
        total: products.length,
        skip: start,
        limit,
      }
    },
  })
}