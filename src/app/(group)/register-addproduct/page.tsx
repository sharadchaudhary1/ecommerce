"use client"
import { useRouter } from "next/navigation";
import { Building2, ShoppingBag, Plus, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function RegisterNewCompanyAndAddProduct() {
    const router = useRouter();

    function RegisterCompany() {
        router.push('/addcompany');
    }

    function SaleProduct() {
        router.push('/addproduct');
    }
    
    function AllSalesProducts(){
    router.push('/all-sales-product')
    }
    return (
        <div className="max-w-4xl mx-auto p-6">
          
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-3">
                    Get Started with Your Business
                </h2>
                <p className="text-gray-600 text-lg">
                    Choose an action to begin managing your business operations
                </p>

                  <span 
                            onClick={AllSalesProducts}
                            className="group/btn mt-2 inline-flex cursor-pointer items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                        >
                            <Plus className="w-4 h-4" />
                            All Products on sale
                            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                        </span>
            </div>

            
            <div className="grid md:grid-cols-2 gap-6">
           
                <div className="group bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-2xl border border-blue-200 hover:border-blue-300 transition-all duration-300 hover:shadow-xl">
                    <div className="flex flex-col items-center text-center">
                  
                        <div className="mb-6 p-4 bg-white rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <Building2 className="w-10 h-10 text-blue-600" />
                        </div>

                    
                        <h3 className="text-xl font-bold text-gray-800 mb-3">
                            Register New Company
                        </h3>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            Set up your business profile and get verified to access all platform features
                        </p>

                 
                        <ul className="text-sm text-gray-500 mb-6 space-y-1">
                            <li>✓ Business verification</li>
                            <li>✓ Company profile setup</li>
                            <li>✓ Access to all features</li>
                        </ul>

                    
                        <button 
                            onClick={RegisterCompany}
                            className="group/btn inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                        >
                            <Plus className="w-4 h-4" />
                            Register Company
                            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                        </button>
                    </div>
                </div>

             
                <div className="group bg-gradient-to-br from-green-50 to-emerald-100 p-8 rounded-2xl border border-green-200 hover:border-green-300 transition-all duration-300 hover:shadow-xl">
                    <div className="flex flex-col items-center text-center">
                   
                        <div className="mb-6 p-4 bg-white rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <ShoppingBag className="w-10 h-10 text-green-600" />
                        </div>

                      
                        <h3 className="text-xl font-bold text-gray-800 mb-3">
                            Add Product on Sale
                        </h3>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            List your products and start selling to customers on our platform
                        </p>

                    
                        <ul className="text-sm text-gray-500 mb-6 space-y-1">
                            <li>✓ Product listing</li>
                            <li>✓ Inventory management</li>
                            <li>✓ Sales analytics</li>
                        </ul>

                     
                        <button 
                            onClick={SaleProduct}
                            className="group/btn inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                        >
                            <Plus className="w-4 h-4" />
                            Add Product
                            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                        </button>
                    </div>
                </div>
            </div>

         
            <div className="mt-8 p-4 flex flex-col bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-center text-sm text-gray-600">
                    <span className="font-medium">Need help?</span> Our support team is available 24/7 to assist you with setup and onboarding.
                </p>
                <Link className="text-center text-red-400 " href="mailto:shopzone@gmail.com" >Gmail:Shopzone@gmail.com</Link>
            </div>
        </div>
    );
}