import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, Users, Phone, Star } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            VendorConnect
          </h1>
          <h2 className="text-2xl text-orange-600 mb-6">
            विक्रेता कनेक्ट / Vendor Connect
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            स्ट्रीट फूड विक्रेताओं के लिए कच्चे माल की आपूर्ति का डिजिटल समाधान<br/>
            <span className="text-lg">Digital solution for raw material sourcing for street food vendors</span>
          </p>
          <Button 
            onClick={() => navigate('/login')}
            size="lg"
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg"
          >
            शुरू करें / Get Started
          </Button>
        </div>

        {/* Problem & Solution */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <Card className="border-2 border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="text-red-600 text-xl">
                समस्या / The Problem
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-700">
                <li>• विक्रेताओं को महंगे दामों पर कच्चा माल मिलता है</li>
                <li>• Vendors get raw materials at high prices</li>
                <li>• गुणवत्ता की कमी और भरोसेमंद आपूर्तिकर्ता नहीं मिलते</li>
                <li>• Lack of quality and trusted suppliers</li>
                <li>• समय की बर्बादी और दूर-दूर जाना पड़ता है</li>
                <li>• Time wastage and traveling long distances</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2 border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="text-green-600 text-xl">
                समाधान / Our Solution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-700">
                <li>• व्यवसाय के अनुसार उत्पाद सुझाव</li>
                <li>• Business-specific product recommendations</li>
                <li>• सत्यापित आपूर्तिकर्ता और बेहतर दाम</li>
                <li>• Verified suppliers with better prices</li>
                <li>• डायरेक्ट WhatsApp संपर्क</li>
                <li>• Direct WhatsApp contact</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Features */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
            मुख्य सुविधाएं / Key Features
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-8">
                <ShoppingCart className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <h4 className="text-xl font-semibold mb-2">स्मार्ट खोज</h4>
                <p className="text-gray-600">व्यवसाय के अनुसार उत्पाद सुझाव और फ़िल्टर</p>
                <p className="text-sm text-gray-500 mt-2">Smart search with business-specific recommendations</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-8">
                <Users className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h4 className="text-xl font-semibold mb-2">सत्यापित विक्रेता</h4>
                <p className="text-gray-600">केवल भरोसेमंद और गुणवत्ता वाले आपूर्तिकर्ता</p>
                <p className="text-sm text-gray-500 mt-2">Only trusted and quality suppliers</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-8">
                <Phone className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                <h4 className="text-xl font-semibold mb-2">आसान संपर्क</h4>
                <p className="text-gray-600">WhatsApp से तुरंत बात करें</p>
                <p className="text-sm text-gray-500 mt-2">Instant contact via WhatsApp</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* User Types */}
        <div className="text-center">
          <h3 className="text-3xl font-bold text-gray-800 mb-8">
            कौन उपयोग कर सकता है? / Who Can Use?
          </h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="bg-blue-50 border-blue-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-blue-600 text-xl">
                  विक्रेता / Vendors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-left space-y-2 text-gray-700">
                  <li>• चाट विक्रेता / Chaat vendors</li>
                  <li>• डोसा-इडली विक्रेता / Dosa-Idli vendors</li>
                  <li>• चाय-स्नैक्स विक्रेता / Tea-Snacks vendors</li>
                  <li>• सभी स्ट्रीट फूड विक्रेता / All street food vendors</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-purple-50 border-purple-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-purple-600 text-xl">
                  आपूर्तिकर्ता / Suppliers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-left space-y-2 text-gray-700">
                  <li>• सब्जी विक्रेता / Vegetable sellers</li>
                  <li>• मसाला विक्रेता / Spice sellers</li>
                  <li>• किराना विक्रेता / Grocery sellers</li>
                  <li>• थोक विक्रेता / Wholesale dealers</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-orange-500 to-red-500 text-white">
            <CardContent className="pt-8">
              <h3 className="text-2xl font-bold mb-4">
                आज ही शुरू करें / Start Today
              </h3>
              <p className="mb-6 text-orange-100">
                अपने व्यवसाय को बेहतर बनाने के लिए VendorConnect से जुड़ें
              </p>
              <Button 
                onClick={() => navigate('/login')}
                size="lg"
                className="bg-white text-orange-600 hover:bg-gray-100"
              >
                अभी रजिस्टर करें / Register Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
