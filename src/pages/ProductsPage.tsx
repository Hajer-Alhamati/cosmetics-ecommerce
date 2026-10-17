
// import { useState } from 'react'
// import { useProducts } from '../hooks/useProducts'
// import ProductCard from '../components/common/ProductCard'

// export default function ProductsPage() {
//   const [search, setSearch] = useState('')
//   const [page, setPage] = useState(1)

//   const limit = 10

//   const {
//     data,
//     isPending,
//     isError,
//     error,
//     refetch,
//     isFetching,
//   } = useProducts({
//     search,
//     page,
//     limit,
//   })

//   const totalPages = Math.ceil((data?.total ?? 0) / limit)

//   function handleSearch(value: string) {
//     setSearch(value)
//     setPage(1)
//   }

//   return (
//     <main className="min-h-screen bg-[#faf9f7] px-4 py-8 sm:px-6 lg:px-10">
//       <div className="mx-auto max-w-7xl">
//         <header className="mb-8 rounded-2xl bg-white p-6 shadow-sm sm:p-10">
//           <p className="mb-2 text-xs uppercase tracking-[0.3em] text-green-800">
//             Beauty & Lifestyle
//           </p>

//           <h1 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
//             Explore Our Shop
//           </h1>

//           <p className="mt-4 max-w-2xl text-sm leading-6 text-gray-500">
//             Discover our collection of products and find your favorites.
//           </p>
//         </header>

//         <section>
//           <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//             <div>
//               <h2 className="text-xl font-semibold text-gray-900">
//                 Products
//               </h2>

//               <p className="mt-1 text-sm text-gray-500">
//                 {data ? `${data.total} products found` : 'Discover our collection'}
//               </p>
//             </div>

//             <input
//               type="search"
//               value={search}
//               onChange={(event) => handleSearch(event.target.value)}
//               placeholder="Search products..."
//               aria-label="Search products"
//               className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-green-800 focus:ring-2 focus:ring-green-800/10 sm:max-w-sm"
//             />
//           </div>

//           {isPending ? (
//             <div
//               role="status"
//               className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
//             >
//               {Array.from({ length: 10 }, (_, index) => (
//                 <div
//                   key={index}
//                   className="h-72 animate-pulse rounded-xl bg-gray-200"
//                 />
//               ))}
//               <span className="sr-only">Loading products...</span>
//             </div>
//           ) : isError ? (
//             <div className="rounded-xl border border-red-200 bg-white p-8 text-center">
//               <p className="font-medium text-red-700">
//                 Could not load products.
//               </p>

//               <p className="mt-2 text-sm text-gray-500">
//                 {error.message}
//               </p>

//               <button
//                 onClick={() => refetch()}
//                 className="mt-4 rounded-lg bg-green-800 px-5 py-2 text-white hover:bg-green-900"
//               >
//                 Try Again
//               </button>
//             </div>
//           ) : data.products.length === 0 ? (
//             <div className="rounded-xl bg-white p-12 text-center">
//               <h3 className="text-lg font-semibold text-gray-800">
//                 No products found
//               </h3>

//               <p className="mt-2 text-sm text-gray-500">
//                 Try another search keyword.
//               </p>
//             </div>
//           ) : (
//             <>
//               {isFetching && (
//                 <p className="mb-3 text-xs text-gray-500" role="status">
//                   Updating products...
//                 </p>
//               )}

//               <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
//                 {data.products.map((product) => (
//                   <ProductCard key={product.id} product={product} />
//                 ))}
//               </div>

//               <nav
//                 aria-label="Product pagination"
//                 className="mt-8 flex flex-wrap items-center justify-center gap-4"
//               >
//                 <button
//                   disabled={page === 1 || isFetching}
//                   onClick={() => setPage((current) => current - 1)}
//                   className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
//                 >
//                   Previous
//                 </button>

//                 <span className="text-sm text-gray-600">
//                   Page {page} of {totalPages}
//                 </span>

//                 <button
//                   disabled={
//                     page >= totalPages || isFetching
//                   }
//                   onClick={() => setPage((current) => current + 1)}
//                   className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
//                 >
//                   Next
//                 </button>
//               </nav>
//             </>
//           )}
//         </section>
//       </div>
//     </main>
//   )
// }


import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getCategories } from '../api/products'
import { useProducts } from '../hooks/useProducts'
import ProductCard from '../components/common/ProductCard'

const FEATURED_CATEGORIES = [
    'beauty',
    'fragrances',
    'skin-care',
    'womens-bags',
]

function formatCategory(category: string) {
    return category
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (letter) => letter.toUpperCase())
}

export default function ProductsPage() {
    const [search, setSearch] = useState('')
    const [category, setCategory] = useState('')
    const [page, setPage] = useState(1)

    const limit = 10

    const {
        data: categories = [],
        isError: categoriesError,
    } = useQuery({
        queryKey: ['product-categories'],
        queryFn: getCategories,
        staleTime: 1000 * 60 * 30,
    })

    const {
        data,
        isPending,
        isError,
        error,
        refetch,
        isFetching,
    } = useProducts({
        search,
        category,
        page,
        limit,
    })

    const totalPages = Math.ceil((data?.total ?? 0) / limit)

    const visibleCategories = FEATURED_CATEGORIES.filter((item) =>
        categories.includes(item),
    )

    function changeCategory(value: string) {
        setCategory(value)
        setSearch('')
        setPage(1)
    }

    function changeSearch(value: string) {
        setSearch(value)
        setCategory('')
        setPage(1)
    }

    return (
        <main className="min-h-screen bg-[#f8f8f6] text-[#171717]">
            {/* Navigation */}
            <header className="sticky top-0 z-20 border-b border-gray-100 bg-white/95 backdrop-blur">
                <div className="flex w-full items-center gap-2 px-3 py-3 sm:gap-4 sm:px-6">
                    <a
                        href="/products"
                        className="shrink-0 rounded-lg bg-[#f7f7f5] px-3 py-3 text-xs font-semibold tracking-tight sm:px-5"
                    >
                        <span className="text-[#32613d]">✧</span> crystal.
                    </a>

                    <nav className="hidden flex-1 items-center justify-center gap-1 md:flex">
                        <a
                            href="/products"
                            className="rounded-lg bg-[#f7f7f5] px-5 py-3 text-[10px] uppercase tracking-wide"
                        >
                            Shop
                        </a>

                        <a
                            href="#collection"
                            className="rounded-lg px-4 py-3 text-[10px] uppercase tracking-wide text-gray-500 transition hover:bg-gray-50"
                        >
                            Collections
                        </a>

                        <a
                            href="#about"
                            className="rounded-lg px-4 py-3 text-[10px] uppercase tracking-wide text-gray-500 transition hover:bg-gray-50"
                        >
                            Contact
                        </a>

                        <a
                            href="#about"
                            className="rounded-lg px-4 py-3 text-[10px] uppercase tracking-wide text-gray-500 transition hover:bg-gray-50"
                        >
                            About
                        </a>
                    </nav>

                    <label className="flex min-w-0 flex-1 items-center rounded-lg border border-gray-100 bg-[#fafaf9] px-3 py-3 md:max-w-56">
                        <input
                            type="search"
                            value={search}
                            onChange={(event) => changeSearch(event.target.value)}
                            placeholder="Search..."
                            aria-label="Search products"
                            className="w-full min-w-0 bg-transparent text-xs outline-none placeholder:text-gray-500"
                        />

                        <span
                            aria-hidden="true"
                            className="text-sm text-gray-400"
                        >
                            ⌕
                        </span>
                    </label>

                    <a
                        href=""
                        className="shrink-0 rounded-lg bg-[#2f633d] px-3 py-3 text-[10px] font-medium text-white transition hover:bg-[#234d30] sm:px-5"
                    >
                        <span className="hidden sm:inline">VIEW CART</span>
                        <span className="sm:hidden">SHOP</span>
                    </a>
                </div>
            </header>

            <div className="w-full px-3 pb-10 pt-2 sm:px-5">
                {/* Hero */}
                <section className="relative mb-3 min-h-40 overflow-hidden rounded-xl border border-[#eeeeea] bg-white px-5 py-6 sm:min-h-52 sm:px-8 sm:py-8">
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -right-5 top-0 text-8xl font-extralight text-[#efefeb] sm:right-10 sm:text-9xl"
                    >
                        ✧
                    </div>

                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute bottom-0 left-10 text-5xl text-[#f0f0ed]"
                    >

                    </div>


                    <h1 className="relative z-10 text-3xl font-semibold tracking-tight sm:text-5xl">
                        Explore Our Shop
                    </h1>

                    <div className="mt-5 flex justify-center text-start">
                        <p className="max-w-2xl text-xs leading-6 text-gray-500 sm:text-sm sm:leading-7">
                            Discover your next favorite. Explore our collection of everyday
                            essentials, curated to help you find products that suit your style.
                            Browse the collection, search by keyword, and select any
                            product to learn more about its details, price and rating.
                        </p>
                    </div>
                </section>

                {/* Collection */}
                <section id="collection" className=' bg-white p-3'>
                    {/* Categories */}
                    <div className="mb-3 flex flex-wrap items-center gap-1.5 rounded-lg p-2">
                        <button
                            onClick={() => changeCategory('')}
                            aria-pressed={!category}
                            className={`rounded-md px-3 py-2 text-[10px] transition ${!category
                                ? 'bg-[#f0f0ed] text-[#222]'
                                : 'text-gray-500 hover:bg-gray-50'
                                }`}
                        >
                            All Products
                        </button>

                        {visibleCategories.map((item) => (
                            <button
                                key={item}
                                onClick={() => changeCategory(item)}
                                aria-pressed={category === item}
                                className={`rounded-md px-3 py-2 text-[10px] transition ${category === item
                                    ? 'bg-[#e6eee5] font-medium text-[#2f633d]'
                                    : 'text-gray-500 hover:bg-gray-50'
                                    }`}
                            >
                                {formatCategory(item)}
                            </button>
                        ))}
                    </div>

                    {categoriesError && (
                        <p className="mb-3 text-xs text-amber-700">
                            Categories could not be loaded. You can still browse and
                            search all products.
                        </p>
                    )}


                    {/* Loading */}
                    {isPending ? (
                        <div
                            role="status"
                            className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4 xl:grid-cols-5"
                        >
                            {Array.from({ length: limit }, (_, index) => (
                                <div
                                    key={index}
                                    className="h-64 animate-pulse rounded-lg bg-white sm:h-80"
                                />
                            ))}

                            <span className="sr-only">Loading products...</span>
                        </div>
                    ) : isError ? (
                        /* Error */
                        <div className="rounded-xl border border-red-100 bg-white p-8 text-center">
                            <h2 className="font-medium text-red-700">
                                Unable to load products
                            </h2>

                            <p className="mt-2 text-sm text-gray-500">
                                {error.message}
                            </p>

                            <button
                                onClick={() => refetch()}
                                className="mt-4 rounded-md bg-[#2f633d] px-5 py-2.5 text-sm text-white hover:bg-[#234d30]"
                            >
                                Try Again
                            </button>
                        </div>
                    ) : data.products.length === 0 ? (
                        /* Empty results */
                        <div className="rounded-xl bg-white px-5 py-16 text-center">
                            <h2 className="font-medium">No products found</h2>

                            <p className="mt-2 text-sm text-gray-500">
                                Try another keyword or select a different category.
                            </p>

                            <button
                                onClick={() => {
                                    setSearch('')
                                    setCategory('')
                                    setPage(1)
                                }}
                                className="mt-4 text-sm text-[#2f633d] underline"
                            >
                                Clear filters
                            </button>
                        </div>
                    ) : (
                        <>
                            {/* Product grid */}
                            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4 xl:grid-cols-5">
                                {data.products.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                    />
                                ))}
                            </div>

                            {/* Pagination */}
                            <nav
                                aria-label="Product pagination"
                                className="mt-7 flex items-center justify-center gap-4"
                            >
                                <button
                                    disabled={page === 1 || isFetching}
                                    onClick={() => setPage((current) => current - 1)}
                                    className="rounded-md border border-gray-200 bg-white px-4 py-2 text-xs disabled:opacity-40"
                                >
                                    ← Previous
                                </button>

                                <span className="text-xs text-gray-600">
                                    Page {page} of {Math.max(totalPages, 1)}
                                </span>

                                <button
                                    disabled={
                                        page >= totalPages ||
                                        isFetching ||
                                        totalPages === 0
                                    }
                                    onClick={() => setPage((current) => current + 1)}
                                    className="rounded-md border border-gray-200 bg-white px-4 py-2 text-xs disabled:opacity-40"
                                >
                                    Next →
                                </button>
                            </nav>
                        </>
                    )}
                </section>

                {/* Footer */}
                <footer
                    id="about"
                    className="mt-10 border-t border-[#e9e7df] py-5 text-center text-[10px] text-gray-500"
                >
                    <p className="font-medium text-[#2f633d]">crystal.</p>

                    <p className="mt-1">
                        Your everyday essentials, all in one place.
                    </p>
                </footer>
            </div>
        </main>
    )
}
