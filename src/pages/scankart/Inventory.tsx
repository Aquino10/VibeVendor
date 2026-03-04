/**
 * ScanKart Inventory Screen
 * Matching reference: clean list with bottom sheet add form, barcode scanning
 */

import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import {
  Plus,
  Package,
  Trash2,
  ScanBarcode,
  Loader2,
  ChevronRight,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BarcodeScanner } from "@/components/scankart/BarcodeScanner";
import { BottomNav } from "@/components/scankart/BottomNav";
import {
  fetchProducts,
  addProduct,
  deleteProduct,
  lookupBarcode,
  findProductByBarcode,
  type ScankartProduct,
} from "@/lib/scankart";
import { useToast } from "@/hooks/use-toast";

export default function ScanKartInventory() {
  const { slug } = useParams<{ slug: string }>();
  const { toast } = useToast();
  const [products, setProducts] = useState<ScankartProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [showScanner, setShowScanner] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [saving, setSaving] = useState(false);

  // Add form state
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newStock, setNewStock] = useState("0");
  const [newBarcode, setNewBarcode] = useState("");
  const [lookingUp, setLookingUp] = useState(false);

  const refresh = useCallback(async () => {
    if (!slug) return;
    try {
      const data = await fetchProducts(slug);
      setProducts(data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => { refresh(); }, [refresh]);

  const handleBarcodeScan = async (barcode: string) => {
    setNewBarcode(barcode);
    setShowScanner(false);
    setShowAddForm(true);
    setLookingUp(true);

    try {
      if (slug) {
        const existing = await findProductByBarcode(slug, barcode);
        if (existing) {
          toast({ title: "Product found in inventory!", description: `${existing.name} — Stock: ${existing.stock}` });
          setLookingUp(false);
          return;
        }
      }
      const result = await lookupBarcode(barcode);
      if (result?.name) {
        setNewName(result.name);
        toast({ title: "Product identified!", description: result.name });
      } else {
        toast({ title: "Product not found", description: "Enter details manually", variant: "destructive" });
      }
    } catch {
      toast({ title: "Lookup failed", description: "Enter details manually", variant: "destructive" });
    } finally {
      setLookingUp(false);
    }
  };

  const handleAdd = async () => {
    if (!slug || !newName.trim()) return;
    setSaving(true);
    try {
      await addProduct({
        shop_slug: slug,
        name: newName.trim(),
        price: parseFloat(newPrice) || 0,
        stock: parseInt(newStock) || 0,
        barcode: newBarcode || null,
      });
      toast({ title: "Product added!" });
      resetForm();
      refresh();
    } catch {
      toast({ title: "Error adding product", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const resetForm = () => {
    setNewName(""); setNewPrice(""); setNewStock("0"); setNewBarcode("");
    setShowAddForm(false);
    setShowScanner(false);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      toast({ title: "Product removed" });
    } catch {
      toast({ title: "Error removing product", variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-card px-6 pb-5 pt-10">
        <h1 className="font-heading text-3xl font-black text-foreground">Inventory</h1>
        <p className="text-sm text-muted-foreground">Product catalog</p>
      </div>

      <div className="border-b border-border/30" />

      <div className="px-4 py-4">
        {/* Product count pill */}
        <div className="mb-4 flex items-center gap-2">
          <div className="clay-pill flex items-center gap-2 bg-card px-4 py-1.5">
            <Package className="h-4 w-4 text-primary" />
            <span className="text-sm font-bold text-primary">{products.length} Products</span>
          </div>
        </div>

        {/* Table Header */}
        <div className="mb-2 flex items-center justify-between px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          <span>Product</span>
          <div className="flex gap-6">
            <span>Price</span>
            <span>Stock</span>
          </div>
        </div>

        {/* Product List */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted/30">
              <Package className="h-10 w-10 text-muted-foreground/50" />
            </div>
            <p className="text-lg font-bold text-foreground">No products yet</p>
            <p className="text-sm text-muted-foreground">Tap + to scan your first product</p>
          </div>
        ) : (
          <div className="space-y-2">
            {products.map((product) => (
              <div key={product.id} className="clay-sm flex items-center gap-3 p-4">
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-foreground truncate">{product.name}</p>
                  {product.barcode && (
                    <p className="text-xs text-muted-foreground font-mono">{product.barcode}</p>
                  )}
                </div>
                <span className="text-sm font-bold text-foreground">₹{Number(product.price).toLocaleString()}</span>
                <span className={`min-w-[3rem] text-center text-sm font-bold ${
                  product.stock === 0 ? "text-destructive" : product.stock < 5 ? "text-amber-600" : "text-foreground"
                }`}>
                  {product.stock}
                </span>
                <button onClick={() => handleDelete(product.id)} className="text-muted-foreground hover:text-destructive">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Sheet: Add Product */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/30 backdrop-blur-sm" onClick={() => resetForm()}>
          <div
            className="w-full max-w-lg rounded-t-3xl bg-card px-6 pb-8 pt-4 shadow-xl animate-fade-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drag handle */}
            <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-muted-foreground/30" />

            <div className="mb-5 flex items-center justify-between">
              <h3 className="font-heading text-xl font-black text-foreground">Add Product</h3>
              <button onClick={resetForm} className="text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Scan Barcode button */}
            {!showScanner ? (
              <button
                onClick={() => setShowScanner(true)}
                className="clay-sm mb-5 flex w-full items-center gap-4 p-4 text-left transition-all hover:-translate-y-0.5"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <ScanBarcode className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-primary">Scan Barcode</p>
                  <p className="text-xs text-muted-foreground">Use camera to scan</p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </button>
            ) : (
              <div className="mb-5">
                <BarcodeScanner onScan={handleBarcodeScan} onClose={() => setShowScanner(false)} />
              </div>
            )}

            {lookingUp && (
              <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" /> Looking up barcode...
              </div>
            )}

            {newBarcode && (
              <div className="clay-pill mb-4 inline-block bg-muted/50 px-3 py-1 text-xs font-mono text-muted-foreground">
                Barcode: {newBarcode}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <Label className="text-sm font-bold text-foreground">Product Name</Label>
                <Input
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Enter product name"
                  className="clay-input mt-1"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-sm font-bold text-foreground">Price</Label>
                  <div className="relative mt-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">₹</span>
                    <Input
                      type="number"
                      value={newPrice}
                      onChange={(e) => setNewPrice(e.target.value)}
                      placeholder="0.00"
                      className="clay-input pl-7"
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-bold text-foreground">Stock</Label>
                  <Input
                    type="number"
                    value={newStock}
                    onChange={(e) => setNewStock(e.target.value)}
                    placeholder="0"
                    className="clay-input mt-1"
                  />
                </div>
              </div>
              <Button
                onClick={handleAdd}
                disabled={!newName.trim() || saving}
                className="clay-button w-full bg-primary py-6 text-base font-bold text-primary-foreground"
              >
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save Product"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* FAB */}
      {!showAddForm && (
        <button
          onClick={() => setShowAddForm(true)}
          className="fixed bottom-24 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105 active:scale-95"
        >
          <Plus className="h-7 w-7" />
        </button>
      )}

      <BottomNav />
    </div>
  );
}
