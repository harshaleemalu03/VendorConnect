import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { 
  Package, 
  Plus, 
  Edit, 
  Trash2, 
  Phone, 
  Store,
  LogOut,
  User,
  IndianRupee,
  Calendar
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  hindiName: string;
  price: number;
  unit: string;
  description: string;
  category: string;
  inStock: boolean;
  expiryDate?: string;
  manufacturingDate?: string;
}

const SupplierDashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [userPhone, setUserPhone] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const [newProduct, setNewProduct] = useState({
    name: "",
    hindiName: "",
    price: "",
    unit: "per kg",
    description: "",
    category: "vegetables",
    expiryDate: "",
    manufacturingDate: ""
  });

  useEffect(() => {
    // Check if user is logged in
    const loggedIn = localStorage.getItem('isLoggedIn');
    const userType = localStorage.getItem('userType');
    const phone = localStorage.getItem('userPhone');
    
    if (!loggedIn || userType !== 'supplier') {
      navigate('/');
      return;
    }
    
    setUserPhone(phone || "");
    
    // Load existing products from localStorage or set mock data
    const savedProducts = localStorage.getItem('supplierProducts');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      // Street food supplier mock data - showing understanding of the ecosystem
      const mockProducts: Product[] = [
        {
          id: "1",
          name: "Fresh Red Tomatoes",
          hindiName: "ताज़े लाल टमाटर",
          price: 18,
          unit: "per kg",
          description: "Direct from farm, perfect for chaat and cooking. Hand-picked this morning.",
          category: "vegetables",
          inStock: true,
          manufacturingDate: "2025-01-27",
          expiryDate: "2025-01-30"
        },
        {
          id: "2",
          name: "Premium Green Chillies",
          hindiName: "प्रीमियम हरी मिर्च",
          price: 60,
          unit: "per kg",
          description: "Fresh, hot green chillies perfect for street food vendors. Very spicy and fresh.",
          category: "spices",
          inStock: true,
          manufacturingDate: "2025-01-26",
          expiryDate: "2025-02-02"
        }
      ];
      setProducts(mockProducts);
      localStorage.setItem('supplierProducts', JSON.stringify(mockProducts));
    }
  }, [navigate]);

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newProduct.name || !newProduct.price) {
      toast({
        title: "त्रुटि / Error",
        description: "कृपया सभी आवश्यक फ़ील्ड भरें / Please fill all required fields",
        variant: "destructive"
      });
      return;
    }

    const product: Product = {
      id: Date.now().toString(),
      name: newProduct.name,
      hindiName: newProduct.hindiName,
      price: parseFloat(newProduct.price),
      unit: newProduct.unit,
      description: newProduct.description,
      category: newProduct.category,
      inStock: true,
      expiryDate: newProduct.expiryDate,
      manufacturingDate: newProduct.manufacturingDate
    };

    const updatedProducts = [...products, product];
    setProducts(updatedProducts);
    localStorage.setItem('supplierProducts', JSON.stringify(updatedProducts));
    
    setNewProduct({
      name: "",
      hindiName: "",
      price: "",
      unit: "per kg",
      description: "",
      category: "vegetables",
      expiryDate: "",
      manufacturingDate: ""
    });
    setIsAddingProduct(false);
    
    toast({
      title: "उत्पाद जोड़ा गया / Product Added",
      description: `${product.name} सफलतापूर्वक जोड़ा गया / ${product.name} added successfully`
    });
  };

  const handleDeleteProduct = (id: string) => {
    const updatedProducts = products.filter(p => p.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem('supplierProducts', JSON.stringify(updatedProducts));
    
    toast({
      title: "उत्पाद हटाया गया / Product Deleted",
      description: "उत्पाद सफलतापूर्वक हटाया गया / Product deleted successfully"
    });
  };

  const toggleStockStatus = (id: string) => {
    const updatedProducts = products.map(p => 
      p.id === id ? { ...p, inStock: !p.inStock } : p
    );
    setProducts(updatedProducts);
    localStorage.setItem('supplierProducts', JSON.stringify(updatedProducts));
    
    toast({
      title: "स्टॉक अपडेट / Stock Updated",
      description: "स्टॉक स्थिति अपडेट की गई / Stock status updated"
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userType');
    localStorage.removeItem('userPhone');
    navigate('/');
    toast({
      title: "लॉग आउट / Logged Out",
      description: "सफलतापूर्वक लॉग आउट हो गए / Successfully logged out"
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Package className="h-8 w-8 text-purple-600" />
            <div>
              <h1 className="text-xl font-bold text-gray-800">VendorConnect</h1>
              <p className="text-sm text-gray-600">आपूर्तिकर्ता डैशबोर्ड / Supplier Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <User className="h-4 w-4" />
              {userPhone}
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              लॉग आउट / Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">कुल उत्पाद / Total Products</p>
                  <p className="text-3xl font-bold">{products.length}</p>
                </div>
                <Package className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">उपलब्ध / In Stock</p>
                  <p className="text-3xl font-bold">{products.filter(p => p.inStock).length}</p>
                </div>
                <Store className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100">स्टॉक नहीं / Out of Stock</p>
                  <p className="text-3xl font-bold">{products.filter(p => !p.inStock).length}</p>
                </div>
                <Trash2 className="h-8 w-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Add Product Button */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">
            आपके उत्पाद / Your Products
          </h2>
          <Button
            onClick={() => setIsAddingProduct(true)}
            className="bg-purple-500 hover:bg-purple-600"
          >
            <Plus className="h-4 w-4 mr-2" />
            नया उत्पाद जोड़ें / Add New Product
          </Button>
        </div>

        {/* Add Product Form */}
        {isAddingProduct && (
          <Card>
            <CardHeader>
              <CardTitle>नया उत्पाद जोड़ें / Add New Product</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddProduct} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">उत्पाद नाम / Product Name *</Label>
                    <Input
                      id="name"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                      placeholder="e.g., Fresh Tomatoes"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="hindiName">हिंदी नाम / Hindi Name</Label>
                    <Input
                      id="hindiName"
                      value={newProduct.hindiName}
                      onChange={(e) => setNewProduct({...newProduct, hindiName: e.target.value})}
                      placeholder="e.g., ताज़े टमाटर"
                    />
                  </div>
                  <div>
                    <Label htmlFor="price">मूल्य / Price *</Label>
                    <Input
                      id="price"
                      type="number"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                      placeholder="25"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">श्रेणी / Category</Label>
                    <select
                      className="w-full p-2 border rounded-md"
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                    >
                      <option value="vegetables">सब्जियां / Vegetables</option>
                      <option value="spices">मसाले / Spices</option>
                      <option value="oil">तेल / Oil</option>
                      <option value="flour">आटा / Flour</option>
                      <option value="dairy">डेयरी / Dairy</option>
                      <option value="packaged">पैकेजिंग / Packaging</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="unit">इकाई / Unit</Label>
                    <select
                      className="w-full p-2 border rounded-md"
                      value={newProduct.unit}
                      onChange={(e) => setNewProduct({...newProduct, unit: e.target.value})}
                    >
                      <option value="per kg">प्रति किलो / per kg</option>
                      <option value="per piece">प्रति पीस / per piece</option>
                      <option value="per liter">प्रति लीटर / per liter</option>
                      <option value="per packet">प्रति पैकेट / per packet</option>
                      <option value="per bundle">प्रति बंडल / per bundle</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="manufacturing">निर्माण तिथि / Manufacturing Date</Label>
                    <Input
                      id="manufacturing"
                      type="date"
                      value={newProduct.manufacturingDate}
                      onChange={(e) => setNewProduct({...newProduct, manufacturingDate: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="expiry">समाप्ति तिथि / Expiry Date</Label>
                    <Input
                      id="expiry"
                      type="date"
                      value={newProduct.expiryDate}
                      onChange={(e) => setNewProduct({...newProduct, expiryDate: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">विवरण / Description</Label>
                  <Textarea
                    id="description"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                    placeholder="Product description..."
                  />
                </div>
                <div className="flex gap-4">
                  <Button type="submit" className="bg-green-500 hover:bg-green-600">
                    उत्पाद जोड़ें / Add Product
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsAddingProduct(false)}
                  >
                    रद्द करें / Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Products List */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    {product.hindiName && (
                      <CardDescription className="text-base text-gray-600">
                        {product.hindiName}
                      </CardDescription>
                    )}
                  </div>
                  <Badge variant={product.inStock ? "default" : "secondary"}>
                    {product.inStock ? "उपलब्ध / Available" : "स्टॉक नहीं / Out of Stock"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    <IndianRupee className="h-5 w-5 text-green-600" />
                    <span className="text-2xl font-bold text-green-600">
                      {product.price}
                    </span>
                  </div>
                  <span className="text-gray-500">{product.unit}</span>
                </div>
                
                {product.description && (
                  <p className="text-sm text-gray-600">{product.description}</p>
                )}
                
                {(product.manufacturingDate || product.expiryDate) && (
                  <div className="space-y-1 text-sm text-gray-500">
                    {product.manufacturingDate && (
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        निर्माण / Mfg: {product.manufacturingDate}
                      </div>
                    )}
                    {product.expiryDate && (
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        समाप्ति / Exp: {product.expiryDate}
                      </div>
                    )}
                  </div>
                )}

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toggleStockStatus(product.id)}
                    className="flex-1"
                  >
                    {product.inStock ? "स्टॉक आउट / Mark Out of Stock" : "स्टॉक इन / Mark In Stock"}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDeleteProduct(product.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {products.length === 0 && (
          <Card>
            <CardContent className="pt-6 text-center">
              <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">
                अभी तक कोई उत्पाद नहीं जोड़ा गया / No products added yet
              </p>
              <Button
                onClick={() => setIsAddingProduct(true)}
                className="bg-purple-500 hover:bg-purple-600"
              >
                <Plus className="h-4 w-4 mr-2" />
                पहला उत्पाद जोड़ें / Add First Product
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SupplierDashboard;