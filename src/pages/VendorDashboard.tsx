import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { 
  Store, 
  Search, 
  ShoppingCart, 
  Phone, 
  MapPin, 
  Star,
  LogOut,
  User,
  Package
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  hindiName: string;
  supplier: string;
  price: number;
  unit: string;
  rating: number;
  location: string;
  phone: string;
  inStock: boolean;
  bulkPrice?: number;
  minBulkQty?: number;
  isVerified: boolean;
  freshness: string;
  bestFor: string[];
}

const VendorDashboard = () => {
  const [businessType, setBusinessType] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [isProfileSet, setIsProfileSet] = useState(false);
  const [userPhone, setUserPhone] = useState("");
  const [showBulkDeals, setShowBulkDeals] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is logged in
    const loggedIn = localStorage.getItem('isLoggedIn');
    const userType = localStorage.getItem('userType');
    const phone = localStorage.getItem('userPhone');
    
    if (!loggedIn || userType !== 'vendor') {
      navigate('/');
      return;
    }
    
    setUserPhone(phone || "");
    
    // Street food specific products with real pain points addressed
    const streetFoodProducts: Product[] = [
      {
        id: "1",
        name: "Fresh Tomatoes",
        hindiName: "ताज़े टमाटर",
        supplier: "किसान डायरेक्ट फार्म",
        price: 18,
        unit: "per kg",
        rating: 4.8,
        location: "1.2 km - आपके पास",
        phone: "9876543210",
        inStock: true,
        bulkPrice: 15,
        minBulkQty: 10,
        isVerified: true,
        freshness: "आज सुबह की फसल",
        bestFor: ["chaat", "sandwich", "dosa"]
      },
      {
        id: "2", 
        name: "Onions (Medium)",
        hindiName: "प्याज (मध्यम)",
        supplier: "वेजिटेबल मंडी डायरेक्ट",
        price: 22,
        unit: "per kg",
        rating: 4.6,
        location: "2.1 km - थोक मार्केट",
        phone: "9876543211",
        inStock: true,
        bulkPrice: 18,
        minBulkQty: 5,
        isVerified: true,
        freshness: "कल की फसल",
        bestFor: ["chaat", "parathas", "tea"]
      },
      {
        id: "3",
        name: "Green Chillies",
        hindiName: "हरी मिर्च (तेज़)",
        supplier: "मसाला किंग",
        price: 60,
        unit: "per kg",
        rating: 4.9,
        location: "800m - स्पाइस मार्केट",
        phone: "9876543212",
        inStock: true,
        bulkPrice: 50,
        minBulkQty: 2,
        isVerified: true,
        freshness: "बिल्कुल ताज़ी",
        bestFor: ["chaat", "dosa", "parathas"]
      },
      {
        id: "4",
        name: "Pure Mustard Oil",
        hindiName: "शुद्ध सरसों का तेल",
        supplier: "तेल वाला भाई",
        price: 140,
        unit: "per liter",
        rating: 4.7,
        location: "1.5 km - ऑयल शॉप",
        phone: "9876543213", 
        inStock: true,
        bulkPrice: 130,
        minBulkQty: 5,
        isVerified: true,
        freshness: "ताज़ा निकाला गया",
        bestFor: ["parathas", "chaat", "frying"]
      },
      {
        id: "5",
        name: "Refined Flour (Maida)",
        hindiName: "मैदा (बारीक)",
        supplier: "आटा चक्की वाले",
        price: 35,
        unit: "per kg",
        rating: 4.4,
        location: "3.2 km - मिल एरिया",
        phone: "9876543214",
        inStock: true,
        bulkPrice: 28,
        minBulkQty: 10,
        isVerified: true,
        freshness: "आज पिसा गया",
        bestFor: ["dosa", "parathas", "batter"]
      },
      {
        id: "6",
        name: "Fresh Coriander",
        hindiName: "हरा धनिया",
        supplier: "हरी सब्जी वाला",
        price: 25,
        unit: "per bundle",
        rating: 4.5,
        location: "900m - सब्जी मंडी",
        phone: "9876543215",
        inStock: true,
        isVerified: true,
        freshness: "सुबह 6 बजे की कटी",
        bestFor: ["chaat", "garnishing"]
      }
    ];
    
    setProducts(streetFoodProducts);
  }, [navigate]);

  const handleSetupProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (businessType) {
      setIsProfileSet(true);
      toast({
        title: "प्रोफ़ाइल सेट अप / Profile Setup Complete",
        description: `${businessType} व्यवसाय के लिए उत्पाद सुझाव दिखाए जा रहे हैं / Showing product recommendations for ${businessType} business`
      });
    }
  };

  const handleContactSupplier = (product: Product) => {
    const message = `नमस्ते, मुझे ${product.hindiName} (${product.name}) चाहिए। कृपया मुझसे संपर्क करें। / Hello, I need ${product.name}. Please contact me.`;
    const whatsappUrl = `https://wa.me/91${product.phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: "संपर्क किया जा रहा है / Contacting Supplier",
      description: `${product.supplier} से WhatsApp पर बात करें / Chat with ${product.supplier} on WhatsApp`
    });
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
    toast({
      title: "लॉग आउट / Logged Out",
      description: "सफलतापूर्वक लॉग आउट हो गए / Successfully logged out"
    });
  };

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.hindiName.includes(searchQuery)
  );

  if (!isProfileSet) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
        <div className="max-w-md mx-auto pt-20">
          <Card className="shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-blue-600 flex items-center justify-center gap-2">
                <Store className="h-6 w-6" />
                व्यवसाय सेटअप / Business Setup
              </CardTitle>
              <CardDescription>
                अपना व्यवसाय प्रकार चुनें / Select your business type
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSetupProfile} className="space-y-6">
                <div className="space-y-3">
                  <Label className="text-base font-medium">
                    आप क्या बेचते हैं? / What do you sell?
                  </Label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: "chaat", label: "चाट / Chaat" },
                      { value: "dosa", label: "डोसा / Dosa" },
                      { value: "parathas", label: "पराठा / Parathas" },
                      { value: "tea", label: "चाय / Tea" },
                      { value: "juice", label: "जूस / Juice" },
                      { value: "other", label: "अन्य / Other" }
                    ].map((type) => (
                      <Button
                        key={type.value}
                        type="button"
                        variant={businessType === type.value ? "default" : "outline"}
                        className="h-auto p-3 text-sm"
                        onClick={() => setBusinessType(type.value)}
                      >
                        {type.label}
                      </Button>
                    ))}
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600"
                  disabled={!businessType}
                >
                  शुरू करें / Get Started
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Store className="h-8 w-8 text-green-600" />
            <div>
              <h1 className="text-xl font-bold text-gray-800">VendorConnect</h1>
              <p className="text-sm text-gray-600">विक्रेता डैशबोर्ड / Vendor Dashboard</p>
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
        {/* Street Food Problem Statement */}
        <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Package className="h-6 w-6" />
              <div>
                <h3 className="font-semibold">🎯 {businessType} के लिए विशेष / Special for {businessType}</h3>
                <p className="text-orange-100">ताज़ा, सस्ता, और भरोसेमंद - सिर्फ आपके व्यवसाय के लिए / Fresh, cheap & trusted - just for your business</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search & Filter */}
        <div className="flex gap-4">
          <Card className="flex-1">
            <CardContent className="pt-6">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="उत्पाद खोजें / Search products..."
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>
          <Button
            variant={showBulkDeals ? "default" : "outline"}
            onClick={() => setShowBulkDeals(!showBulkDeals)}
            className="px-6"
          >
            थोक डील / Bulk Deals
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow border-l-4 border-l-green-500">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg">{product.name}</CardTitle>
                      {product.isVerified && (
                        <Badge variant="default" className="bg-green-500 text-xs">
                          ✓ सत्यापित
                        </Badge>
                      )}
                    </div>
                    <CardDescription className="text-base text-gray-600">
                      {product.hindiName}
                    </CardDescription>
                    <p className="text-xs text-green-600 font-medium mt-1">
                      🌱 {product.freshness}
                    </p>
                  </div>
                  <Badge variant={product.inStock ? "default" : "secondary"}>
                    {product.inStock ? "मिल रहा है" : "स्टॉक खत्म"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Price Section */}
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-2xl font-bold text-green-600">
                      ₹{product.price}
                    </span>
                    <span className="text-gray-500">{product.unit}</span>
                  </div>
                  {product.bulkPrice && showBulkDeals && (
                    <div className="text-sm">
                      <span className="text-orange-600 font-semibold">
                        थोक: ₹{product.bulkPrice}/{product.unit}
                      </span>
                      <span className="text-gray-500 ml-2">
                        (न्यूनतम {product.minBulkQty} {product.unit})
                      </span>
                    </div>
                  )}
                </div>
                
                {/* Supplier Info */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Store className="h-4 w-4 text-blue-500" />
                    <span className="text-sm font-medium">{product.supplier}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-red-500" />
                    <span className="text-sm">{product.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm">{product.rating} ⭐ (उत्कृष्ट गुणवत्ता)</span>
                  </div>
                </div>

                {/* Best For */}
                <div className="flex flex-wrap gap-1">
                  <span className="text-xs text-gray-500">बेस्ट फॉर:</span>
                  {product.bestFor.map((use, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {use}
                    </Badge>
                  ))}
                </div>

                {/* Contact Button */}
                <Button
                  onClick={() => handleContactSupplier(product)}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                  disabled={!product.inStock}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  WhatsApp पर ऑर्डर करें
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-gray-500">
                कोई उत्पाद नहीं मिला / No products found
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default VendorDashboard;