import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Smartphone, Send } from "lucide-react";

const Login = () => {
  const [userType, setUserType] = useState("vendor");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const sendOtp = async () => {
    if (!phone || phone.length !== 10) {
      toast({
        title: "त्रुटि / Error",
        description: "कृपया 10 अंकों का मोबाइल नंबर दर्ज करें / Please enter valid 10-digit mobile number",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(newOtp);
      setIsOtpSent(true);
      setIsLoading(false);
      
      toast({
        title: "OTP भेजा गया / OTP Sent",
        description: `आपका OTP: ${newOtp} (डेमो के लिए / For demo)`,
      });
    }, 1500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isOtpSent) {
      await sendOtp();
      return;
    }

    if (otp === generatedOtp) {
      setIsLoading(true);
      
      // Store user info for demo
      localStorage.setItem('userType', userType);
      localStorage.setItem('userPhone', phone);
      localStorage.setItem('isLoggedIn', 'true');
      
      setTimeout(() => {
        toast({
          title: "लॉगिन सफल / Login Successful",
          description: `${userType === "vendor" ? "विक्रेता" : "आपूर्तिकर्ता"} डैशबोर्ड पर जा रहे हैं / Redirecting to ${userType} dashboard`
        });
        
        if (userType === "vendor") {
          navigate("/vendor-dashboard");
        } else {
          navigate("/supplier-dashboard");
        }
        setIsLoading(false);
      }, 1000);
    } else {
      toast({
        title: "त्रुटि / Error",
        description: "गलत OTP / Incorrect OTP",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-orange-600">
            VendorConnect
          </CardTitle>
          <CardDescription className="text-gray-600">
            सत्यापन करें / Verify Your Identity
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <Label className="text-base font-medium">
                आप कौन हैं? / Who are you?
              </Label>
              <RadioGroup value={userType} onValueChange={setUserType} className="flex space-x-6">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="vendor" id="vendor" />
                  <Label htmlFor="vendor" className="cursor-pointer">
                    विक्रेता / Vendor
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="supplier" id="supplier" />
                  <Label htmlFor="supplier" className="cursor-pointer">
                    आपूर्तिकर्ता / Supplier
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-base font-medium">
                मोबाइल नंबर / Mobile Number
              </Label>
              <div className="relative">
                <Smartphone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  className="pl-10"
                  placeholder="9876543210"
                  disabled={isOtpSent}
                  required
                />
              </div>
              {phone && phone.length === 10 && (
                <p className="text-sm text-green-600">✓ Valid number</p>
              )}
            </div>

            {isOtpSent && (
              <div className="space-y-2">
                <Label htmlFor="otp" className="text-base font-medium">
                  OTP दर्ज करें / Enter OTP
                </Label>
                <Input
                  id="otp"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="123456"
                  maxLength={6}
                  required
                />
                <p className="text-sm text-gray-500">
                  {generatedOtp} पर भेजा गया / Sent to {phone}
                </p>
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                "कृपया प्रतीक्षा करें / Please wait..."
              ) : isOtpSent ? (
                "लॉगिन करें / Login"
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  OTP भेजें / Send OTP
                </>
              )}
            </Button>

            {isOtpSent && (
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => {
                  setIsOtpSent(false);
                  setOtp("");
                  setGeneratedOtp("");
                }}
              >
                नंबर बदलें / Change Number
              </Button>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;