"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { getProducts, type Product } from "@/lib/products"
import { createProduct, updateProduct, deleteProduct, type CreateProductData } from "@/lib/admin-products"
import { ProductsTable } from "@/components/admin/products-table"
import { ProductForm } from "@/components/admin/product-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function AdminPage() {
  const { user, loading: authLoading } = useAuth()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [formLoading, setFormLoading] = useState(false)

  useEffect(() => {
    if (!authLoading && user) {
      fetchProducts()
    }
  }, [user, authLoading])

  const fetchProducts = async () => {
    try {
      const data = await getProducts()
      setProducts(data)
    } catch (error) {
      console.error("Error fetching products:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddProduct = () => {
    setEditingProduct(null)
    setShowForm(true)
  }

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product)
    setShowForm(true)
  }

  const handleFormSubmit = async (data: CreateProductData) => {
    setFormLoading(true)
    try {
      if (editingProduct) {
        await updateProduct({ ...data, id: editingProduct.id })
      } else {
        await createProduct(data)
      }
      await fetchProducts()
      setShowForm(false)
      setEditingProduct(null)
    } catch (error) {
      console.error("Error saving product:", error)
      alert("حدث خطأ أثناء حفظ المنتج")
    } finally {
      setFormLoading(false)
    }
  }

  const handleDeleteProduct = async (productId: string) => {
    try {
      await deleteProduct(productId)
      await fetchProducts()
    } catch (error) {
      console.error("Error deleting product:", error)
      alert("حدث خطأ أثناء حذف المنتج")
    }
  }

  const handleFormCancel = () => {
    setShowForm(false)
    setEditingProduct(null)
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600 mx-auto mb-4"></div>
          <p className="text-gray-600 arabic-text">جاري التحميل...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center arabic-text">الوصول مقيد</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-600 arabic-text">يجب تسجيل الدخول للوصول إلى لوحة الإدارة</p>
            <Link href="/">
              <Button className="bg-rose-600 hover:bg-rose-700">
                <ArrowLeft className="h-4 w-4 ml-2" />
                <span className="arabic-text">العودة للرئيسية</span>
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 arabic-text">لوحة الإدارة</h1>
          <Link href="/">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 ml-2" />
              <span className="arabic-text">العودة للمتجر</span>
            </Button>
          </Link>
        </div>

        {showForm ? (
          <ProductForm
            product={editingProduct}
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
            isLoading={formLoading}
          />
        ) : (
          <ProductsTable
            products={products}
            onAdd={handleAddProduct}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
            isLoading={loading}
          />
        )}
      </div>
    </div>
  )
}
