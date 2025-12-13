

import {
  CreditCard,
  Wallet,
  Building2,
  Smartphone,
 
} from "lucide-react";

  export  const paymentMethods = [
    {
      id: "razorpay",
      name: "UPI / Cards / Wallets",
      icon: CreditCard,
      description: "Pay with UPI, Credit/Debit Cards, or Digital Wallets",
      details: "Instant payment with all major cards and UPI apps",
      recommended: true,
      color: "blue",
    },
    {
      id: "upi",
      name: "UPI Payment",
      icon: Smartphone,
      description: "Google Pay, PhonePe, Paytm & more",
      details: "Scan QR or enter UPI ID for instant payment",
      color: "purple",
    },
    {
      id: "cod",
      name: "Cash on Delivery",
      icon: Wallet,
      description: "Pay when you receive your order",
      details: "Additional ₹40 COD charges may apply",
      color: "green",
    },
    {
      id: "netbanking",
      name: "Net Banking",
      icon: Building2,
      description: "All major Indian banks",
      details: "Direct payment from your bank account",
      color: "indigo",
    },
    {
      id: "emi",
      name: "EMI Options",
      icon: CreditCard,
      description: "Easy monthly installments",
      details: "No cost EMI available on select cards",
      color: "orange",
    },
  ];
