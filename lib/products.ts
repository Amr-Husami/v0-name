import { createClient } from "@/lib/supabase/client"

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

export async function getProducts(): Promise<Product[]> {
  const supabase = createClient()

  const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching products:", error)
    return []
  }

  return data || []
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("category", category)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching products by category:", error)
    return []
  }

  return data || []
}

export async function getProductCategories(): Promise<string[]> {
  const supabase = createClient()

  const { data, error } = await supabase.from("products").select("category").order("category")

  if (error) {
    console.error("Error fetching categories:", error)
    return []
  }

  // Get unique categories
  const categories = [...new Set(data?.map((item) => item.category) || [])]
  return ["جميع المنتجات", ...categories]
}
