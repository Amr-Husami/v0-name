"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus } from "lucide-react"

export interface Product {
  id: string
  name: string
  description?: string
  price: number
  original_price?: number
  image_url?: string
  category: string
  in_stock: boolean
  created_at?: string
  updated_at?: string
}

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const discount = product.original_price
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : 0

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-200">
      <CardContent className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={product.image_url || "/placeholder.svg?height=300&width=300&query=baby products"}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
          />
          {discount > 0 && (
            <Badge className="absolute top-2 right-2 bg-red-500 hover:bg-red-600">{`-${discount}%`}</Badge>
          )}
          {!product.in_stock && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white font-semibold arabic-text">{"نفد من المخزون"}</span>
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 arabic-text">{product.name}</h3>
          <p className="text-sm text-muted-foreground mb-3 arabic-text">{product.category}</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-reverse space-x-2">
              <span className="text-lg font-bold text-rose-600">
                {product.price.toFixed(2)} {"ر.س"}
              </span>
              {product.original_price && (
                <span className="text-sm text-muted-foreground line-through">
                  {product.original_price.toFixed(2)} {"ر.س"}
                </span>
              )}
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          onClick={() => onAddToCart(product)}
          disabled={!product.in_stock}
          className="w-full bg-rose-600 hover:bg-rose-700 disabled:bg-gray-300"
        >
          <Plus className="h-4 w-4 ml-2" />
          <span className="arabic-text">{product.in_stock ? "أضف للسلة" : "نفد من المخزون"}</span>
        </Button>
      </CardFooter>
    </Card>
  )
}
