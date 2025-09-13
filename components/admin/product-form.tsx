"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Product } from "@/lib/products"
import type { CreateProductData } from "@/lib/admin-products"

interface ProductFormProps {
  product?: Product
  onSubmit: (data: CreateProductData) => Promise<void>
  onCancel: () => void
  isLoading?: boolean
}

const categories = [
  "مستلزمات الحمل",
  "مستلزمات الولادة",
  "ملابس المواليد",
  "عربات الأطفال",
  "العناية بالطفل",
  "أثاث الأطفال",
]

export function ProductForm({ product, onSubmit, onCancel, isLoading = false }: ProductFormProps) {
  const [formData, setFormData] = useState<CreateProductData>({
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price || 0,
    original_price: product?.original_price || undefined,
    image_url: product?.image_url || "",
    category: product?.category || "",
    in_stock: product?.in_stock ?? true,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmit(formData)
  }

  const handleInputChange = (field: keyof CreateProductData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="arabic-text">{product ? "تعديل المنتج" : "إضافة منتج جديد"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="arabic-text">
              اسم المنتج
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              required
              className="text-right"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="arabic-text">
              وصف المنتج
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              rows={3}
              className="text-right"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price" className="arabic-text">
                السعر (ر.س)
              </Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={(e) => handleInputChange("price", Number.parseFloat(e.target.value) || 0)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="original_price" className="arabic-text">
                السعر الأصلي (اختياري)
              </Label>
              <Input
                id="original_price"
                type="number"
                step="0.01"
                min="0"
                value={formData.original_price || ""}
                onChange={(e) => handleInputChange("original_price", Number.parseFloat(e.target.value) || undefined)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category" className="arabic-text">
              الفئة
            </Label>
            <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
              <SelectTrigger>
                <SelectValue placeholder="اختر الفئة" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category} className="arabic-text">
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image_url" className="arabic-text">
              رابط الصورة
            </Label>
            <Input
              id="image_url"
              type="url"
              value={formData.image_url}
              onChange={(e) => handleInputChange("image_url", e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="flex items-center space-x-reverse space-x-2">
            <Switch
              id="in_stock"
              checked={formData.in_stock}
              onCheckedChange={(checked) => handleInputChange("in_stock", checked)}
            />
            <Label htmlFor="in_stock" className="arabic-text">
              متوفر في المخزون
            </Label>
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="submit" disabled={isLoading} className="bg-rose-600 hover:bg-rose-700 flex-1">
              {isLoading ? "جاري الحفظ..." : product ? "تحديث المنتج" : "إضافة المنتج"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isLoading}
              className="flex-1 bg-transparent"
            >
              إلغاء
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
