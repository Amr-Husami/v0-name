import { createClient } from "@/lib/supabase/client"
import type { Product } from "@/lib/products"

export interface CreateProductData {
  name: string
  description?: string
  price: number
  original_price?: number
  image_url?: string
  category: string
  in_stock: boolean
}

export interface UpdateProductData extends Partial<CreateProductData> {
  id: string
}

export async function createProduct(productData: CreateProductData): Promise<Product | null> {
  const supabase = createClient()

  const { data, error } = await supabase.from("products").insert([productData]).select().single()

  if (error) {
    console.error("Error creating product:", error)
    throw new Error(error.message)
  }

  return data
}

export async function updateProduct(productData: UpdateProductData): Promise<Product | null> {
  const supabase = createClient()

  const { id, ...updateData } = productData
  const { data, error } = await supabase.from("products").update(updateData).eq("id", id).select().single()

  if (error) {
    console.error("Error updating product:", error)
    throw new Error(error.message)
  }

  return data
}

export async function deleteProduct(productId: string): Promise<boolean> {
  const supabase = createClient()

  const { error } = await supabase.from("products").delete().eq("id", productId)

  if (error) {
    console.error("Error deleting product:", error)
    throw new Error(error.message)
  }

  return true
}
