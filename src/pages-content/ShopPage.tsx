"use client";

import { motion } from "motion/react";
import { useMemo, useState } from "react";
import Link from "next/link";
import { ShoppingCart, Star, Search, Plus, Minus, ChevronDown, ChevronUp } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { brands, categories, products } from "@/lib/products";

export function ShopPage() {
  const [cart, setCart] = useState<{ [key: number]: number }>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [showAllBrands, setShowAllBrands] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([2, 2299]);
  const [pendingPriceRange, setPendingPriceRange] = useState<[number, number]>([2, 2299]);

  const visibleCategories = showAllCategories ? categories : categories.slice(0, 5);
  const visibleBrands = showAllBrands ? brands : brands.slice(0, 5);

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    );
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand],
    );
  };

  const applyFilters = () => {
    setPriceRange(pendingPriceRange);
  };

  const filteredProducts = useMemo(
    () =>
      products.filter((product) => {
        const matchesCategory =
          selectedCategories.length === 0 || selectedCategories.includes(product.category);
        const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
        return matchesCategory && matchesBrand && matchesSearch && matchesPrice;
      }),
    [selectedCategories, selectedBrands, searchQuery, priceRange],
  );

  const addToCart = (productId: number) => {
    setCart({ ...cart, [productId]: (cart[productId] || 0) + 1 });
  };

  const removeFromCart = (productId: number) => {
    if (cart[productId] > 1) {
      setCart({ ...cart, [productId]: cart[productId] - 1 });
    } else {
      const newCart = { ...cart };
      delete newCart[productId];
      setCart(newCart);
    }
  };

  const getTotalItems = () => Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  const formatPrice = (value: number) =>
    `${value.toLocaleString("fr-FR", { minimumFractionDigits: 3 })} DT`;

  return (
    <div className="min-h-screen pt-20">
      <section className="relative bg-gradient-to-br from-secondary via-[#1a1a1a] to-secondary text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl mb-6">Metal Supply Shop</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Premium quality steel, tools, and construction materials
            </p>
          </motion.div>
        </div>
      </section>

      <div className="sticky top-20 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="relative flex-1 w-full">
              <Search
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Rechercher un produit..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <button className="relative bg-primary text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-all flex items-center gap-2">
              <ShoppingCart size={20} />
              <span>Panier</span>
              {getTotalItems() > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs"
                >
                  {getTotalItems()}
                </motion.span>
              )}
            </button>
          </div>
        </div>
      </div>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="w-full lg:w-72 lg:flex-shrink-0">
              <div className="bg-white rounded-lg p-6 shadow-sm sticky top-44">
                <button
                  onClick={applyFilters}
                  className="w-full bg-primary text-white py-3 rounded-md font-semibold hover:bg-opacity-90 transition-all mb-6"
                >
                  Filtrer
                </button>

                <div className="mb-6">
                  <h3 className="text-gray-700 font-semibold mb-4">Prix</h3>
                  <div className="flex items-center justify-between mb-4 text-sm">
                    <span className="font-semibold text-secondary">
                      {formatPrice(pendingPriceRange[0])}
                    </span>
                    <span className="text-gray-400">—</span>
                    <span className="font-semibold text-secondary">
                      {formatPrice(pendingPriceRange[1])}
                    </span>
                  </div>
                  <Slider
                    min={2}
                    max={2299}
                    step={1}
                    value={pendingPriceRange}
                    onValueChange={(value) => setPendingPriceRange(value as [number, number])}
                    className="my-4"
                  />
                </div>

                <div className="border-t border-gray-200 pt-6 mb-6">
                  <h3 className="text-gray-700 font-semibold mb-4">Catégorie</h3>
                  <div className="space-y-3">
                    {visibleCategories.map((cat) => (
                      <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                        <Checkbox
                          checked={selectedCategories.includes(cat)}
                          onCheckedChange={() => toggleCategory(cat)}
                        />
                        <span className="text-sm text-gray-700 group-hover:text-primary transition-colors">
                          {cat}
                        </span>
                      </label>
                    ))}
                  </div>
                  {categories.length > 5 && (
                    <button
                      onClick={() => setShowAllCategories(!showAllCategories)}
                      className="flex items-center gap-1 text-blue-500 text-sm mt-3 hover:underline"
                    >
                      {showAllCategories ? (
                        <>
                          <ChevronUp size={14} /> Voir Moins
                        </>
                      ) : (
                        <>
                          <ChevronDown size={14} /> Voir Plus
                        </>
                      )}
                    </button>
                  )}
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-gray-700 font-semibold mb-4">Marque</h3>
                  <div className="space-y-3">
                    {visibleBrands.map((brand) => (
                      <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                        <Checkbox
                          checked={selectedBrands.includes(brand)}
                          onCheckedChange={() => toggleBrand(brand)}
                        />
                        <span className="text-sm text-gray-700 group-hover:text-primary transition-colors">
                          {brand}
                        </span>
                      </label>
                    ))}
                  </div>
                  {brands.length > 5 && (
                    <button
                      onClick={() => setShowAllBrands(!showAllBrands)}
                      className="flex items-center gap-1 text-blue-500 text-sm mt-3 hover:underline"
                    >
                      {showAllBrands ? (
                        <>
                          <ChevronUp size={14} /> Voir Moins
                        </>
                      ) : (
                        <>
                          <ChevronDown size={14} /> Voir Plus
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </aside>

            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -10, transition: { duration: 0.3 } }}
                    className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group"
                  >
                    <Link href={`/shop/${product.id}`} className="block">
                      <div className="relative overflow-hidden h-64">
                        <motion.img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.5 }}
                        />
                        {!product.inStock && (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <span className="bg-red-500 text-white px-4 py-2 rounded-lg">
                              Rupture de stock
                            </span>
                          </div>
                        )}
                        <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
                          <Star className="text-yellow-500 fill-yellow-500" size={14} />
                          <span className="text-secondary">{product.rating}</span>
                        </div>
                      </div>

                      <div className="px-6 pt-6">
                        <div className="text-xs text-gray-500 mb-1">{product.brand}</div>
                        <div className="text-sm text-primary mb-2">{product.category}</div>
                        <h3 className="text-xl text-secondary mb-2 hover:text-primary transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                      </div>
                    </Link>

                    <div className="px-6 pb-6">
                      <div className="flex items-center justify-between">
                        <div className="text-2xl text-primary">{formatPrice(product.price)}</div>
                        {product.inStock && (
                          <div className="flex items-center gap-2">
                            {cart[product.id] ? (
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => removeFromCart(product.id)}
                                  className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-all"
                                >
                                  <Minus size={16} />
                                </button>
                                <motion.span
                                  key={cart[product.id]}
                                  initial={{ scale: 1.5 }}
                                  animate={{ scale: 1 }}
                                  className="w-8 text-center text-secondary"
                                >
                                  {cart[product.id]}
                                </motion.span>
                                <button
                                  onClick={() => addToCart(product.id)}
                                  className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center hover:bg-opacity-90 transition-all"
                                >
                                  <Plus size={16} />
                                </button>
                              </div>
                            ) : (
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => addToCart(product.id)}
                                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-all flex items-center gap-2"
                              >
                                <ShoppingCart size={18} />
                                Ajouter
                              </motion.button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20"
                >
                  <p className="text-gray-600 text-xl">
                    Aucun produit ne correspond à vos critères.
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl mb-6">Need Bulk Orders?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Contact our sales team for special pricing on large quantity orders
            </p>
            <a
              href="/contact"
              className="inline-block bg-white text-primary px-8 py-4 rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105"
            >
              Contact Sales
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
