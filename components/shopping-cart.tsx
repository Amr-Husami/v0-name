"use client"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Minus, Plus, Trash2 } from "lucide-react"
import type { Product } from "./product-card"

export interface CartItem extends Product {
  quantity: number
}

interface ShoppingCartProps {
  isOpen: boolean
  onClose: () => void
  items: CartItem[]
  onUpdateQuantity: (productId: string, quantity: number) => void
  onRemoveItem: (productId: string) => void
}

export function ShoppingCart({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem }: ShoppingCartProps) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const itemsCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            {"سلة التسوق"}
            {itemsCount > 0 && (
              <Badge variant="secondary">
                {itemsCount} {"منتج"}
              </Badge>
            )}
          </SheetTitle>
          <SheetDescription>{"راجع منتجاتك قبل إتمام الطلب"}</SheetDescription>
        </SheetHeader>

        <div className="mt-6 flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <div className="text-6xl mb-4">🛒</div>
              <h3 className="text-lg font-semibold mb-2">{"السلة فارغة"}</h3>
              <p className="text-muted-foreground">{"أضف بعض المنتجات لتبدأ التسوق"}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-reverse space-x-4 p-4 border rounded-lg">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium truncate">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">{item.category}</p>
                    <p className="text-sm font-semibold text-rose-600">
                      {item.price.toFixed(2)} {"ر.س"}
                    </p>
                  </div>

                  <div className="flex items-center space-x-reverse space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 bg-transparent"
                      onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>

                    <span className="w-8 text-center font-medium">{item.quantity}</span>

                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 bg-transparent"
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-500 hover:text-red-700"
                      onClick={() => onRemoveItem(item.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t pt-4 mt-6">
            <div className="flex items-center justify-between text-lg font-semibold mb-4">
              <span>{"المجموع:"}</span>
              <span className="text-rose-600">
                {total.toFixed(2)} {"ر.س"}
              </span>
            </div>

            <Button className="w-full bg-rose-600 hover:bg-rose-700" size="lg">
              {"إتمام الطلب"}
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
