"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit, Trash2, Plus } from "lucide-react"
import type { Product } from "@/lib/products"

interface ProductsTableProps {
  products: Product[]
  onEdit: (product: Product) => void
  onDelete: (productId: string) => void
  onAdd: () => void
  isLoading?: boolean
}

export function ProductsTable({ products, onEdit, onDelete, onAdd, isLoading = false }: ProductsTableProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleDelete = async (productId: string) => {
    if (window.confirm("هل أنت متأكد من حذف هذا المنتج؟")) {
      setDeletingId(productId)
      try {
        await onDelete(productId)
      } finally {
        setDeletingId(null)
      }
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="arabic-text">إدارة المنتجات</CardTitle>
        <Button onClick={onAdd} className="bg-rose-600 hover:bg-rose-700">
          <Plus className="h-4 w-4 ml-2" />
          <span className="arabic-text">إضافة منتج</span>
        </Button>
      </CardHeader>
      <CardContent>
        {products.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 arabic-text">لا توجد منتجات</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right arabic-text">اسم المنتج</TableHead>
                  <TableHead className="text-right arabic-text">الفئة</TableHead>
                  <TableHead className="text-right arabic-text">السعر</TableHead>
                  <TableHead className="text-right arabic-text">الحالة</TableHead>
                  <TableHead className="text-right arabic-text">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium arabic-text">{product.name}</TableCell>
                    <TableCell className="arabic-text">{product.category}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-reverse space-x-2">
                        <span className="font-semibold">{product.price.toFixed(2)} ر.س</span>
                        {product.original_price && (
                          <span className="text-sm text-gray-500 line-through">
                            {product.original_price.toFixed(2)} ر.س
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={product.in_stock ? "default" : "secondary"} className="arabic-text">
                        {product.in_stock ? "متوفر" : "نفد"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-reverse space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => onEdit(product)} disabled={isLoading}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(product.id)}
                          disabled={isLoading || deletingId === product.id}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
