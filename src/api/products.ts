
// import type { Product, ProductsResponse } from '../types/product'

// const BASE_URL = 'https://dummyjson.com/products'

// async function fetchJson<T>(url: string): Promise<T> {
//   const response = await fetch(url)

//   if (!response.ok) {
//     throw new Error('تعذر جلب البيانات. حاول مرة أخرى.')
//   }

//   return response.json() as Promise<T>
// }

// export function getProducts(
//   limit = 10,
//   skip = 0,
// ): Promise<ProductsResponse> {
//   return fetchJson<ProductsResponse>(
//     `${BASE_URL}?limit=${limit}&skip=${skip}`,
//   )
// }

// export function searchProducts(
//   query: string,
//   limit = 10,
//   skip = 0,
// ): Promise<ProductsResponse> {
//   const params = new URLSearchParams({
//     q: query,
//     limit: String(limit),
//     skip: String(skip),
//   })

//   return fetchJson<ProductsResponse>(
//     `${BASE_URL}/search?${params.toString()}`,
//   )
// }

// export function getProductById(id: number): Promise<Product> {
//   return fetchJson<Product>(`${BASE_URL}/${id}`)
// }


import type { Product, ProductsResponse } from '../types/product'

const BASE_URL = 'https://dummyjson.com/products'

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error('تعذر جلب البيانات. يرجى المحاولة مرة أخرى.')
  }

  return response.json() as Promise<T>
}

export function getProducts(
  limit = 10,
  skip = 0,
): Promise<ProductsResponse> {
  return fetchJson(`${BASE_URL}?limit=${limit}&skip=${skip}`)
}

export function searchProducts(
  query: string,
  limit = 10,
  skip = 0,
): Promise<ProductsResponse> {
  const params = new URLSearchParams({
    q: query,
    limit: String(limit),
    skip: String(skip),
  })

  return fetchJson(`${BASE_URL}/search?${params}`)
}

export function getProductsByCategory(
  category: string,
  limit = 10,
  skip = 0,
): Promise<ProductsResponse> {
  return fetchJson(
    `${BASE_URL}/category/${encodeURIComponent(category)}?limit=${limit}&skip=${skip}`,
  )
}

export function getCategories(): Promise<string[]> {
  return fetchJson(`${BASE_URL}/category-list`)
}

export function getProductById(id: number): Promise<Product> {
  return fetchJson(`${BASE_URL}/${id}`)
}
