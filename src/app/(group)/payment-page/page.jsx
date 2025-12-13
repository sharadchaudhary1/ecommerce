"use client";
import { useState, useContext, useEffect } from "react";
import { CartContext } from "@/app/(group)/context/CartContext";
import { useRouter } from "next/navigation";

import {
  CreditCard,
  Shield,
  Lock,
  CheckCircle,
  ArrowLeft,
  Tag,
  Percent,
  ChevronRight,
} from "lucide-react";
import dynamic from "next/dynamic";
import { paymentMethods } from "../../../constants/payment-methods";

// const PaymentButton = dynamic(() => import("@/components/PaymentButton"), {
//   ssr: false,
// });

export default function PaymentMethodsPage() {
  const { cart, totalItems } = useContext(CartContext);
  const router = useRouter();

  const [paymentMethod, setPaymentMethod] = useState("razorpay");
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [saveCard, setSaveCard] = useState(false);


  // Calculations
  const subtotal = Math.round(
    cart.reduce(
      (sum, item) =>
        sum + (item.price ?? item.product?.price ?? 0) * (item.quantity || 1),
      0
    )
  );
  const shipping = subtotal > 499 ? 0 : 40;
  const tax = Math.round(subtotal * 0.18); // 18% GST
  const total = subtotal + shipping + tax - discount;

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === "SAVE10") {
      setDiscount(Math.round(subtotal * 0.1));
      alert("Promo code applied! 10% discount");
    } else if (promoCode.toUpperCase() === "FIRST50") {
      setDiscount(50);
      alert("Promo code applied! ₹50 off");
    } else {
      alert("Invalid promo code");
      setDiscount(0);
    }
  };



  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-32 h-32 mx-auto mb-6 bg-gray-200 rounded-full flex items-center justify-center">
            <CreditCard className="w-16 h-16 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-8">Add items to proceed to payment</p>
          <button
            onClick={() => router.push("/")}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Address
          </button>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700">
                Address
              </span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">2</span>
              </div>
              <span className="text-sm font-medium text-gray-900">Payment</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900">
            Choose Payment Method
          </h1>
          <p className="text-gray-600 mt-2">Select your preferred payment option</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Payment Methods */}
          <div className="lg:col-span-2 space-y-6">
            {/* Payment Options */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <CreditCard className="w-6 h-6 text-blue-600" />
                Select Payment Method
              </h2>

              <div className="space-y-4">
                {paymentMethods.map((method) => {
                  const Icon = method.icon;
                  return (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`w-full p-5 rounded-xl border-2 transition-all duration-300 text-left relative overflow-hidden group ${
                        paymentMethod === method.id
                          ? "border-blue-600 bg-blue-50 shadow-md"
                          : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                      }`}
                    >
                      {method.recommended && (
                        <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs px-3 py-1 rounded-bl-lg font-semibold">
                          Recommended
                        </div>
                      )}

                      <div className="flex items-start gap-4">
                        {/* Radio Button */}
                        <div className="mt-1">
                          <div
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                              paymentMethod === method.id
                                ? "border-blue-600 bg-blue-600"
                                : "border-gray-300 group-hover:border-blue-400"
                            }`}
                          >
                            {paymentMethod === method.id && (
                              <div className="w-3 h-3 bg-white rounded-full"></div>
                            )}
                          </div>
                        </div>

                        {/* Icon */}
                        <div
                          className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all ${
                            paymentMethod === method.id
                              ? `bg-${method.color}-100`
                              : "bg-gray-100 group-hover:bg-gray-200"
                          }`}
                        >
                          <Icon
                            className={`w-6 h-6 ${
                              paymentMethod === method.id
                                ? `text-${method.color}-600`
                                : "text-gray-600"
                            }`}
                          />
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">
                            {method.name}
                          </h3>
                          <p className="text-sm text-gray-600 mb-1">
                            {method.description}
                          </p>
                          <p className="text-xs text-gray-500">{method.details}</p>
                        </div>

                        {/* Checkmark */}
                        {paymentMethod === method.id && (
                          <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Additional Options */}
            {paymentMethod === "razorpay" && (
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Additional Options
                </h3>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={saveCard}
                    onChange={(e) => setSaveCard(e.target.checked)}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <div>
                    <p className="font-medium text-gray-900">
                      Save card for future payments
                    </p>
                    <p className="text-sm text-gray-600">
                      Securely save for faster checkout next time
                    </p>
                  </div>
                </label>
              </div>
            )}

            {/* Security Section */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 border border-green-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    100% Secure Payments
                  </h3>
                  <p className="text-sm text-gray-700 mb-3">
                    All your transactions are protected with bank-grade security
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg">
                      <Lock className="w-4 h-4 text-gray-600" />
                      <span className="text-xs font-medium text-gray-700">
                        256-bit SSL
                      </span>
                    </div>
                    <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg">
                      <Shield className="w-4 h-4 text-gray-600" />
                      <span className="text-xs font-medium text-gray-700">
                        PCI DSS Compliant
                      </span>
                    </div>
                    <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg">
                      <CheckCircle className="w-4 h-4 text-gray-600" />
                      <span className="text-xs font-medium text-gray-700">
                        RBI Approved
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Order Summary
              </h2>

              {/* Cart Items Preview */}
              <div className="space-y-3 mb-6 max-h-48 overflow-y-auto">
                {cart.slice().map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <img
                      src={item.thumbnail ?? item.product?.thumbnail}
                      alt={item.title ?? item.product?.title}
                      className="w-14 h-14 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 text-sm line-clamp-1">
                        {item.title ?? item.product?.title}
                      </h4>
                      <p className="text-xs text-gray-500">
                        Qty: {item.quantity ?? item.product?.quantity}
                      </p>
                      <p className="text-sm font-semibold text-gray-900">
                        ₹
                        {(
                          (item.price ?? item.product?.price ?? 0) *
                          (item.quantity || 1)
                        ).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
                {cart.length > 3 && (
                  <p className="text-sm text-gray-500 text-center pt-2 border-t">
                    +{cart.length - 3} more items
                  </p>
                )}
              </div>

              {/* Promo Code */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Have a Promo Code?
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                      placeholder="Enter code"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button
                    onClick={handleApplyPromo}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium"
                  >
                    Apply
                  </button>
                </div>
                {discount > 0 && (
                  <div className="mt-2 p-2 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-sm text-green-700 flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      Promo code applied successfully!
                    </p>
                  </div>
                )}
                <div className="mt-2 flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      setPromoCode("SAVE10");
                      handleApplyPromo();
                    }}
                    className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Try: SAVE10
                  </button>
                  <span className="text-gray-300">•</span>
                  <button
                    onClick={() => {
                      setPromoCode("FIRST50");
                      handleApplyPromo();
                    }}
                    className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Try: FIRST50
                  </button>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="border-t border-b py-4 space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({totalItems} items)</span>
                  <span className="font-medium">₹{subtotal.toLocaleString()}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Delivery Charges</span>
                  <span
                    className={`font-medium ${
                      shipping === 0 ? "text-green-600" : ""
                    }`}
                  >
                    {shipping === 0 ? (
                      <span className="flex items-center gap-1">
                        FREE <CheckCircle className="w-4 h-4" />
                      </span>
                    ) : (
                      `₹${shipping}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Tax (GST 18%)</span>
                  <span className="font-medium">₹{tax.toLocaleString()}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span className="flex items-center gap-1">
                      <Percent className="w-4 h-4" />
                      Discount
                    </span>
                    <span className="font-medium">-₹{discount.toLocaleString()}</span>
                  </div>
                )}
              </div>

              {/* Total */}
              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-bold text-gray-900">
                  Total Amount
                </span>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">
                    ₹{total.toLocaleString()}
                  </div>
                  {discount > 0 && (
                    <div className="text-xs text-green-600">
                      You saved ₹{discount}!
                    </div>
                  )}
                </div>
              </div>

              {/* Payment Button */}
              <div className="space-y-3">
                {/* {paymentMethod === "razorpay" ? (
                  <PaymentButton amount={total} />
                ) : paymentMethod === "cod" ? (
                  <button className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                    <Wallet className="w-5 h-5" />
                    Place Order (COD)
                  </button>
                ) : (
                  <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                    <Lock className="w-5 h-5" />
                    Proceed to Pay
                  </button>
                )} */}

                <p className="text-xs text-gray-500 text-center">
                  By placing this order, you agree to our{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    Terms & Conditions
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Accepted Payment Methods */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-center text-sm font-semibold text-gray-700 mb-4">
            We Accept
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-6 opacity-70">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
              alt="Visa"
              className="h-8"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
              alt="Mastercard"
              className="h-8"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
              alt="Rupay"
              className="h-8"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg"
              alt="UPI"
              className="h-8"
            />
            <div className="text-gray-600 font-semibold text-sm">
              + 100 more options
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}