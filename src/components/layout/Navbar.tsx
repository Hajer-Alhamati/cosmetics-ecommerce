
import { useState } from "react";
import { ShoppingCart, Gem } from "lucide-react";

type HeaderProps = {
    search: string;
    onSearchChange: (value: string) => void;
};

const navigationLinks = [
    { label: "Shop", href: "/products" },
    { label: "Collections", href: "#collection" },
    { label: "Contact", href: "#about" },
    { label: "About", href: "#about" },
];

export default function Header({
    search,
    onSearchChange,
}: HeaderProps) {
    const [activeLink, setActiveLink] = useState("Shop");

    return (
        <header className="sticky top-0 z-20 border-b border-gray-100 bg-white/95 backdrop-blur">
            <div className="flex w-full items-center gap-2 px-3 py-3 sm:gap-4 sm:px-6">

                {/* Logo */}
                <a
                    href="/products"
                    onClick={() => setActiveLink("Shop")}
                    className="flex shrink-0 items-center gap-1.5 rounded-lg bg-[#f7f7f5] px-3 py-3 text-xs font-semibold tracking-tight sm:px-5"
                >
                    <Gem
                        size={20}
                        strokeWidth={1.5}
                        className="text-black"
                    />
                    <span>crystal.</span>
                </a>

                {/* Navigation */}
                <nav className="hidden flex-1 items-center justify-center gap-1 md:flex">
                    {navigationLinks.map((item) => (
                        <a
                            key={item.label}
                            href={item.href}
                            onClick={() => setActiveLink(item.label)}
                            aria-current={
                                activeLink === item.label
                                    ? "page"
                                    : undefined
                            }
                            className={`rounded-lg px-4 py-3 text-[10px] uppercase tracking-wide transition ${
                                activeLink === item.label
                                    ? "bg-[#f7f7f5] font-medium text-[#171717]"
                                    : "text-gray-500 hover:bg-gray-50 hover:text-[#171717]"
                            }`}
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>

                {/* Search */}
                <label className="flex min-w-0 flex-1 items-center rounded-lg border border-gray-100 bg-[#fafaf9] px-3 py-3 md:max-w-56">
                    <input
                        type="search"
                        value={search}
                        onChange={(event) =>
                            onSearchChange(event.target.value)
                        }
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

                {/* Cart */}
                <a
                    href="/cart"
                    className="shrink-0 rounded-lg bg-primary px-3 py-3 text-[10px] font-medium text-white transition hover:bg-primary sm:px-5"
                >
                    <span className="hidden items-center gap-2 sm:flex">
                        <ShoppingCart size={18} />
                        VIEW CART
                    </span>

                    <span className="sm:hidden">CART</span>
                </a>

            </div>
        </header>
    );
}
