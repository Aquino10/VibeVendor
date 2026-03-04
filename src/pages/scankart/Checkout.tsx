/**
 * ScanKart Checkout Screen
 * Scan to add products to cart, pay via UPI QR or cash
 */

import { useState, useCallback, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ShoppingCart,
  ScanBarcode,
  Minus,
  Plus,
  Smartphone,
  Banknote,
  CheckCircle,
  Loader2,
  X,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BarcodeScanner } from "@/components/scankart/BarcodeScanner";
import { AnimatedCounter } from "@/components/scankart/AnimatedCounter";
import { BottomNav } from "@/components/scankart/BottomNav";
import {
  findProductByBarcode,
  fetchProducts,
  createOrder,
  generateUPIString,
  type CartItem,
  type ScankartProduct,
} from "@/lib/scankart";
import { useToast } from "@/hooks/use-toast";

type CheckoutStep = "cart" | "upi-qr" | "success";

export default function ScanKartCheckout() {
  const { slug } = useParams<{ slug: string }>();
  const { toast } = useToast();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showScanner, setShowScanner] = useState(false);
  const [step, setStep] = useState<CheckoutStep>("cart");
  const [processing, setProcessing] = useState(false);
  const [manualSearch, setManualSearch] = useState("");
  const [searchResults, setSearchResults] = useState<ScankartProduct[]>([]);

  const total = useMemo(
    () => cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [cart]
  );

  const addToCart = useCallback((product: ScankartProduct) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id
            ? { ...i, quantity: Math.min(i.quantity + 1, i.product.stock) }
            : i
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  }, []);

  const handleScan = async (barcode: string) => {
    if (!slug) return;
    setShowScanner(false);
    const product = await findProductByBarcode(slug, barcode);
    if (product) {
      addToCart(product);
      toast({ title: `Added: ${product.name}` });
    } else {
      toast({ title: "Product not found", description: "This barcode isn't in your inventory", variant: "destructive" });
    }
  };

  const handleSearch = async (query: string) => {
    setManualSearch(query);
    if (!slug || query.length < 2) { setSearchResults([]); return; }
    try {
      const all = await fetchProducts(slug);
      const filtered = all.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()));
      setSearchResults(filtered.slice(0, 5));
    } catch {
      setSearchResults([]);
    }
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) =>
          i.product.id === productId
            ? { ...i, quantity: Math.max(0, Math.min(i.quantity + delta, i.product.stock)) }
            : i
        )
        .filter((i) => i.quantity > 0)
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((i) => i.product.id !== productId));
  };

  const handlePayment = async (method: "upi" | "cash") => {
    if (!slug || cart.length === 0) return;
    if (method === "upi") { setStep("upi-qr"); return; }
    setProcessing(true);
    try {
      await createOrder(slug, cart, "cash");
      setStep("success");
      setCart([]);
    } catch {
      toast({ title: "Payment failed", description: "Please try again", variant: "destructive" });
    } finally {
      setProcessing(false);
    }
  };

  const confirmUPI = async () => {
    if (!slug) return;
    setProcessing(true);
    try {
      await createOrder(slug, cart, "upi");
      setStep("success");
      setCart([]);
    } catch {
      toast({ title: "Order failed", variant: "destructive" });
    } finally {
      setProcessing(false);
    }
  };

  // ═══ UPI QR Screen ═══
  if (step === "upi-qr") {
    const upiString = generateUPIString("merchant@upi", "Store", total);
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background p-6">
        <div className="clay w-full max-w-sm p-8 text-center">
          <h2 className="mb-2 font-heading text-xl font-black text-foreground">Pay via UPI</h2>
          <p className="mb-6 text-sm text-muted-foreground">Scan QR code to pay</p>
          <div className="clay-sm mx-auto mb-6 inline-block p-4">
            <QRCodeSVG value={upiString} size={200} />
          </div>
          <div className="mb-6">
            <p className="text-xs text-muted-foreground">Total Amount</p>
            <p className="font-heading text-4xl font-black text-primary">₹{total.toLocaleString()}</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setStep("cart")} className="clay-button flex-1">Back</Button>
            <Button onClick={confirmUPI} disabled={processing} className="clay-button flex-1 bg-primary text-primary-foreground">
              {processing ? <Loader2 className="h-4 w-4 animate-spin" /> : "Confirm Payment"}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // ═══ Success Screen ═══
  if (step === "success") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background p-6">
        <div className="clay w-full max-w-sm p-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
            <CheckCircle className="h-8 w-8 text-emerald-600" />
          </div>
          <h2 className="mb-2 font-heading text-2xl font-black text-foreground">Payment Complete!</h2>
          <p className="mb-6 text-sm text-muted-foreground">Order saved & stock updated</p>
          <div className="flex gap-3">
            <Button onClick={() => setStep("cart")} className="clay-button flex-1 bg-primary text-primary-foreground">New Order</Button>
            <Link to={`/shop/${slug}/pos`} className="flex-1">
              <Button variant="outline" className="clay-button w-full">Dashboard</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ═══ Cart Screen ═══
  return (
    <div className="min-h-screen bg-background pb-48">
      {/* Header */}
      <div className="bg-card px-6 pb-5 pt-10">
        <h1 className="font-heading text-3xl font-black text-foreground">Checkout</h1>
        <p className="text-sm text-muted-foreground">Scan or search to add items</p>
      </div>

      <div className="border-b border-border/30" />

      <div className="px-4 py-4">
        {/* Scan / Search Area */}
        <div className="mb-4 space-y-3">
          <div className="flex gap-2">
            <Input
              placeholder="Search products by name..."
              value={manualSearch}
              onChange={(e) => handleSearch(e.target.value)}
              className="clay-input flex-1"
            />
            <Button
              onClick={() => setShowScanner(!showScanner)}
              className="clay-button gap-1.5 bg-secondary text-secondary-foreground"
            >
              <ScanBarcode className="h-4 w-4" />
            </Button>
          </div>

          {searchResults.length > 0 && (
            <div className="clay-sm p-2">
              {searchResults.map((p) => (
                <button
                  key={p.id}
                  onClick={() => { addToCart(p); setManualSearch(""); setSearchResults([]); toast({ title: `Added: ${p.name}` }); }}
                  className="flex w-full items-center justify-between rounded-lg p-3 text-left transition-colors hover:bg-muted/50"
                >
                  <span className="font-medium text-foreground">{p.name}</span>
                  <span className="text-sm text-muted-foreground">₹{Number(p.price).toLocaleString()} · {p.stock} in stock</span>
                </button>
              ))}
            </div>
          )}

          {showScanner && (
            <BarcodeScanner onScan={handleScan} onClose={() => setShowScanner(false)} />
          )}
        </div>

        {/* Cart Items */}
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted/30">
              <ShoppingCart className="h-10 w-10 text-muted-foreground/50" />
            </div>
            <p className="text-lg font-bold text-foreground">Cart is empty</p>
            <p className="text-sm text-muted-foreground">Scan or search to add products</p>
          </div>
        ) : (
          <div className="space-y-2">
            {cart.map((item) => (
              <div key={item.product.id} className="clay-sm flex items-center gap-3 p-4">
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-foreground truncate">{item.product.name}</p>
                  <p className="text-xs text-muted-foreground">₹{Number(item.product.price).toLocaleString()} each</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => updateQuantity(item.product.id, -1)} className="clay-button flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="w-6 text-center font-bold text-foreground">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.product.id, 1)} className="clay-button flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
                <span className="font-bold text-primary">₹{(item.product.price * item.quantity).toLocaleString()}</span>
                <button onClick={() => removeFromCart(item.product.id)} className="text-muted-foreground hover:text-destructive">
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Payment Bar */}
      {cart.length > 0 && (
        <div className="fixed bottom-16 left-0 right-0 z-40 border-t border-border/30 bg-card/95 p-4 backdrop-blur-md">
          <div className="mx-auto max-w-lg">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Total ({cart.reduce((s, i) => s + i.quantity, 0)} items)</span>
              <AnimatedCounter value={total} prefix="₹" className="font-heading text-2xl font-black text-foreground" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Button onClick={() => handlePayment("upi")} disabled={processing} className="clay-button gap-2 bg-primary text-primary-foreground">
                <Smartphone className="h-4 w-4" /> Pay with UPI
              </Button>
              <Button onClick={() => handlePayment("cash")} disabled={processing} className="clay-button gap-2 bg-emerald-600 text-white hover:bg-emerald-700">
                {processing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Banknote className="h-4 w-4" />}
                Cash Payment
              </Button>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
