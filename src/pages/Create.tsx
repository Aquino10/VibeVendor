import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Store, Plus, Trash2, Sparkles, ArrowLeft, ImagePlus } from "lucide-react";
import { Link } from "react-router-dom";
import { generateSlug, saveShop, generateAIContent, type Product } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";

const categories = [
  "Food & Drinks",
  "Groceries & Daily Items",
  "Fashion & Clothing",
  "Electronics",
  "Beauty & Wellness",
  "Home & Crafts",
  "Agriculture",
  "Other",
];

const Create = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [shopName, setShopName] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [shopNote, setShopNote] = useState("");
  const [shopLogo, setShopLogo] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([
    { id: "1", name: "", price: 0, note: "" },
  ]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const logoInputRef = useRef<HTMLInputElement>(null);

  const addProduct = () => {
    if (products.length >= 5) return;
    setProducts([...products, { id: Date.now().toString(), name: "", price: 0, note: "" }]);
  };

  const removeProduct = (id: string) => {
    if (products.length <= 1) return;
    setProducts(products.filter((p) => p.id !== id));
  };

  const updateProduct = (id: string, field: keyof Product, value: string | number) => {
    setProducts(products.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setShopLogo(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleProductImage = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => updateProduct(id, "image", reader.result as string);
    reader.readAsDataURL(file);
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!shopName.trim()) newErrors.shopName = "Shop name is required";
    if (!category) newErrors.category = "Please select a category";
    if (!location.trim()) newErrors.location = "Location is required";
    if (!whatsapp.trim()) newErrors.whatsapp = "WhatsApp number is required";
    const hasProduct = products.some((p) => p.name.trim());
    if (!hasProduct) newErrors.products = "Add at least one product with a name";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) {
      toast({ title: "Please fix the errors", description: "Some required fields are missing.", variant: "destructive" });
      return;
    }

    const slug = generateSlug(shopName);
    const validProducts = products.filter((p) => p.name.trim());
    const aiContent = generateAIContent({
      shopName, category, location, shopNote,
      products: validProducts.map((p) => ({ name: p.name, price: p.price, note: p.note })),
    });

    const shopData = {
      slug, shopName, category, location, whatsapp: "91" + whatsapp.replace(/\D/g, ""),
      shopNote, shopLogo,
      products: validProducts.map((p, i) => ({
        ...p,
        description: aiContent.products[i]?.description || "",
      })),
      tagline: aiContent.tagline,
      shopBio: aiContent.shopBio,
      createdAt: Date.now(),
    };

    saveShop(shopData);
    navigate(`/generating?slug=${slug}`);
  };

  const canSubmit = shopName.trim() && category && location.trim() && whatsapp.trim() && products.some((p) => p.name.trim());

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="container flex h-16 items-center gap-4">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">Back</span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Store className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-extrabold text-primary">VibeVendor</span>
          </div>
        </div>
      </div>

      <div className="container max-w-2xl py-10">
        <div className="mb-10 text-center animate-fade-up">
          <h1 className="mb-2 text-3xl font-extrabold text-foreground md:text-4xl">
            Let's Build Your Shop
          </h1>
          <p className="text-muted-foreground">
            Fill in your details below — takes less than 5 minutes
          </p>
        </div>

        {/* SECTION A */}
        <div className="mb-10 animate-fade-up-delay-1">
          <h2 className="mb-6 text-xl font-bold text-foreground">Shop Details</h2>
          <div className="space-y-5">
            <div>
              <Label htmlFor="shopName">Shop Name *</Label>
              <Input id="shopName" placeholder="e.g. Mama's Kitchen" value={shopName} onChange={(e) => setShopName(e.target.value)} className={errors.shopName ? "border-destructive" : ""} />
              {errors.shopName && <p className="mt-1 text-xs text-destructive">{errors.shopName}</p>}
            </div>

            <div>
              <Label>Business Category *</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className={errors.category ? "border-destructive" : ""}>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && <p className="mt-1 text-xs text-destructive">{errors.category}</p>}
            </div>

            <div>
              <Label htmlFor="location">Your Location / Area *</Label>
              <Input id="location" placeholder="e.g. Ojuelegba, Lagos" value={location} onChange={(e) => setLocation(e.target.value)} className={errors.location ? "border-destructive" : ""} />
              {errors.location && <p className="mt-1 text-xs text-destructive">{errors.location}</p>}
            </div>

            <div>
              <Label htmlFor="whatsapp">WhatsApp Number *</Label>
              <div className="flex gap-2">
                <div className="flex h-10 items-center rounded-md border border-input bg-muted px-3 text-sm text-muted-foreground">+91</div>
                <Input id="whatsapp" placeholder="9876543210" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} className={errors.whatsapp ? "border-destructive" : ""} />
              </div>
              {errors.whatsapp && <p className="mt-1 text-xs text-destructive">{errors.whatsapp}</p>}
            </div>

            <div>
              <Label htmlFor="shopNote">Short Note About Your Shop</Label>
              <Textarea id="shopNote" placeholder="Leave blank and AI will write this for you" value={shopNote} onChange={(e) => setShopNote(e.target.value)} rows={3} />
            </div>

            <div>
              <Label>Shop Logo or Photo (optional)</Label>
              <input ref={logoInputRef} type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
              <button
                type="button"
                onClick={() => logoInputRef.current?.click()}
                className="flex h-24 w-24 items-center justify-center rounded-2xl border-2 border-dashed border-border bg-muted/50 text-muted-foreground transition-colors hover:border-primary hover:text-primary overflow-hidden"
              >
                {shopLogo ? (
                  <img src={shopLogo} alt="Logo" className="h-full w-full object-cover" />
                ) : (
                  <ImagePlus className="h-8 w-8" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* SECTION B */}
        <div className="mb-10 animate-fade-up-delay-2">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-foreground">Your Products</h2>
            <span className="text-sm text-muted-foreground">{products.length}/5</span>
          </div>
          {errors.products && <p className="mb-4 text-sm text-destructive">{errors.products}</p>}

          <div className="space-y-4">
            {products.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                onUpdate={updateProduct}
                onRemove={removeProduct}
                onImageUpload={handleProductImage}
                canRemove={products.length > 1}
              />
            ))}
          </div>

          {products.length < 5 && (
            <Button variant="outline" className="mt-4 w-full gap-2" onClick={addProduct}>
              <Plus className="h-4 w-4" /> Add Product
            </Button>
          )}
        </div>

        {/* Submit */}
        <div className="animate-fade-up-delay-3">
          <Button
            size="lg"
            className="w-full gap-2 text-base"
            onClick={handleSubmit}
            disabled={!canSubmit}
          >
            <Sparkles className="h-4 w-4" /> Generate My Shop
          </Button>
          <p className="mt-3 text-center text-sm text-muted-foreground">
            Your storefront will be ready in seconds
          </p>
        </div>
      </div>
    </div>
  );
};

function ProductCard({
  product, index, onUpdate, onRemove, onImageUpload, canRemove,
}: {
  product: Product; index: number;
  onUpdate: (id: string, field: keyof Product, value: string | number) => void;
  onRemove: (id: string) => void;
  onImageUpload: (id: string, e: React.ChangeEvent<HTMLInputElement>) => void;
  canRemove: boolean;
}) {
  const fileRef = useRef<HTMLInputElement>(null);

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm font-semibold text-muted-foreground">Product {index + 1}</span>
        {canRemove && (
          <button onClick={() => onRemove(product.id)} className="text-muted-foreground transition-colors hover:text-destructive">
            <Trash2 className="h-4 w-4" />
          </button>
        )}
      </div>
      <div className="space-y-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <Label>Product Name *</Label>
            <Input placeholder="e.g. Jollof Rice" value={product.name} onChange={(e) => onUpdate(product.id, "name", e.target.value)} />
          </div>
          <div className="w-32">
            <Label>Price (₹)</Label>
            <Input type="number" placeholder="0" value={product.price || ""} onChange={(e) => onUpdate(product.id, "price", Number(e.target.value))} />
          </div>
        </div>
        <div>
          <Label>Short Note (optional)</Label>
          <Input placeholder="e.g. Comes in 3 colors" value={product.note || ""} onChange={(e) => onUpdate(product.id, "note", e.target.value)} />
        </div>
        <div>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => onImageUpload(product.id, e)} />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="flex h-16 w-16 items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/50 text-muted-foreground transition-colors hover:border-primary hover:text-primary overflow-hidden"
          >
            {product.image ? (
              <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
            ) : (
              <ImagePlus className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Create;
