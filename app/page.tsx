"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { ProductCard, type Product } from "@/components/product-card"
import { ShoppingCart, type CartItem } from "@/components/shopping-cart"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getProducts, getProductCategories } from "@/lib/products"

export default function HomePage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("جميع المنتجات")
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<string[]>(["جميع المنتجات"])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([getProducts(), getProductCategories()])
        setProducts(productsData)
        setCategories(categoriesData)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const filteredProducts =
    selectedCategory === "جميع المنتجات"
      ? products
      : products.filter((product) => product.category === selectedCategory)

  const addToCart = (product: Product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id)
      if (existingItem) {
        return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(productId)
      return
    }
    setCartItems((prev) => prev.map((item) => (item.id === productId ? { ...item, quantity } : item)))
  }

  const removeFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId))
  }

  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600 mx-auto mb-4"></div>
          <p className="text-gray-600 arabic-text">جاري تحميل المنتجات...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar cartItemsCount={cartItemsCount} onCartClick={() => setIsCartOpen(true)} />

      {/* Hero Section */}
      <section className="bg-gradient-to-l from-rose-50 to-pink-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 arabic-text">
              {"مرحباً بك في متجر"}
              <span className="text-rose-600 block">{"أمي وطفلي"}</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto arabic-text leading-relaxed">
              {"كل ما تحتاجينه لرحلة الأمومة الجميلة - من مستلزمات الحمل إلى احتياجات طفلك الأولى"}
            </p>
            <Button size="lg" className="bg-rose-600 hover:bg-rose-700 text-lg px-8 py-3 font-medium">
              {"تسوقي الآن"}
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`font-medium arabic-text ${selectedCategory === category ? "bg-rose-600 hover:bg-rose-700" : ""}`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900 arabic-text">
              {selectedCategory === "جميع المنتجات" ? "منتجاتنا المميزة" : selectedCategory}
            </h2>
            <Badge variant="secondary" className="text-sm font-medium">
              {filteredProducts.length} {"منتج"}
            </Badge>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 arabic-text">لا توجد منتجات في هذه الفئة حالياً</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12 arabic-text">{"لماذا تختارين متجرنا؟"}</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🚚</div>
              <h3 className="text-xl font-semibold mb-2 arabic-text">{"توصيل سريع"}</h3>
              <p className="text-gray-600 arabic-text leading-relaxed">{"توصيل مجاني للطلبات أكثر من 200 ريال"}</p>
            </div>

            <div className="text-center">
              <div className="text-4xl mb-4">✨</div>
              <h3 className="text-xl font-semibold mb-2 arabic-text">{"جودة عالية"}</h3>
              <p className="text-gray-600 arabic-text leading-relaxed">{"منتجات مختارة بعناية من أفضل الماركات"}</p>
            </div>

            <div className="text-center">
              <div className="text-4xl mb-4">💝</div>
              <h3 className="text-xl font-semibold mb-2 arabic-text">{"خدمة مميزة"}</h3>
              <p className="text-gray-600 arabic-text leading-relaxed">{"فريق دعم متخصص لمساعدتك في كل خطوة"}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      <ShoppingCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
      />
    </div>
  )
}
