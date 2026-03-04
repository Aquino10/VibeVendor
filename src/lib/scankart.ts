/**
 * ScanKart Business Logic
 * Separates data operations from UI components
 * Handles inventory CRUD, checkout flow, and dashboard analytics
 */

import { supabase } from "@/integrations/supabase/client";
import type { Tables, TablesInsert } from "@/integrations/supabase/types";

// ═══ Types ═══
export type ScankartProduct = Tables<"scankart_products">;
export type ScankartOrder = Tables<"scankart_orders">;

export interface CartItem {
  product: ScankartProduct;
  quantity: number;
}

export interface DashboardStats {
  todaySales: number;
  todayOrders: number;
  upiTotal: number;
  cashTotal: number;
  lowStockItems: ScankartProduct[];
}

// ═══ OpenFoodFacts API ═══
export async function lookupBarcode(barcode: string): Promise<{ name: string; image?: string } | null> {
  try {
    const res = await fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);
    const data = await res.json();
    if (data.status === 1 && data.product) {
      return {
        name: data.product.product_name || data.product.generic_name || "",
        image: data.product.image_front_small_url || undefined,
      };
    }
    return null;
  } catch {
    return null;
  }
}

// ═══ Inventory Operations ═══
export async function fetchProducts(shopSlug: string): Promise<ScankartProduct[]> {
  const { data, error } = await supabase
    .from("scankart_products")
    .select("*")
    .eq("shop_slug", shopSlug)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function addProduct(product: TablesInsert<"scankart_products">): Promise<ScankartProduct> {
  const { data, error } = await supabase
    .from("scankart_products")
    .insert(product)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateProductStock(id: string, newStock: number): Promise<void> {
  const { error } = await supabase
    .from("scankart_products")
    .update({ stock: newStock })
    .eq("id", id);
  if (error) throw error;
}

export async function deleteProduct(id: string): Promise<void> {
  const { error } = await supabase
    .from("scankart_products")
    .delete()
    .eq("id", id);
  if (error) throw error;
}

export async function findProductByBarcode(shopSlug: string, barcode: string): Promise<ScankartProduct | null> {
  const { data } = await supabase
    .from("scankart_products")
    .select("*")
    .eq("shop_slug", shopSlug)
    .eq("barcode", barcode)
    .maybeSingle();
  return data;
}

// ═══ Checkout / Orders ═══
export async function createOrder(
  shopSlug: string,
  items: CartItem[],
  paymentMethod: "upi" | "cash"
): Promise<void> {
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // Insert the order
  const { error: orderError } = await supabase
    .from("scankart_orders")
    .insert({
      shop_slug: shopSlug,
      items: items.map((i) => ({
        productId: i.product.id,
        name: i.product.name,
        price: i.product.price,
        quantity: i.quantity,
      })),
      total,
      payment_method: paymentMethod,
    });
  if (orderError) throw orderError;

  // Deduct stock for each item
  for (const item of items) {
    const newStock = Math.max(0, item.product.stock - item.quantity);
    await updateProductStock(item.product.id, newStock);
  }
}

// ═══ Dashboard Analytics ═══
export async function getDashboardStats(shopSlug: string): Promise<DashboardStats> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Fetch today's orders
  const { data: orders } = await supabase
    .from("scankart_orders")
    .select("*")
    .eq("shop_slug", shopSlug)
    .gte("created_at", today.toISOString());

  const todayOrders = orders || [];
  const todaySales = todayOrders.reduce((sum, o) => sum + Number(o.total), 0);
  const upiTotal = todayOrders.filter((o) => o.payment_method === "upi").reduce((s, o) => s + Number(o.total), 0);
  const cashTotal = todayOrders.filter((o) => o.payment_method === "cash").reduce((s, o) => s + Number(o.total), 0);

  // Fetch low stock items
  const { data: lowStock } = await supabase
    .from("scankart_products")
    .select("*")
    .eq("shop_slug", shopSlug)
    .lt("stock", 5)
    .order("stock", { ascending: true });

  return {
    todaySales,
    todayOrders: todayOrders.length,
    upiTotal,
    cashTotal,
    lowStockItems: lowStock || [],
  };
}

// ═══ UPI QR Helpers ═══
export function generateUPIString(upiId: string, name: string, amount: number): string {
  return `upi://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR`;
}
