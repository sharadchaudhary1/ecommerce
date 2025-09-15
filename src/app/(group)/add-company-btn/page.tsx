"use client"
import { useRouter } from "next/navigation";
import { Building2, Plus, ArrowRight } from "lucide-react";

export default function RegisterCompanyBtn() {
    const router = useRouter();

    function registerCompany() {
        router.push('/addcompany');
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-8 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl border border-gray-200">
   
            <div className="mb-6 p-4 bg-white rounded-full shadow-lg">
                <Building2 className="w-12 h-12 text-indigo-600" />
            </div>

     
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-4">
                No Company Registered
            </h1>

           
            <p className="text-gray-600 text-center mb-8 max-w-md leading-relaxed">
                To get started, you'll need to register your company first. 
                This will enable you to access all business features and manage your account.
            </p>

         
            <button 
                onClick={registerCompany}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 ease-in-out"
            >
                <Plus className="w-5 h-5" />
                Register Your Company
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </button>

       
            <div className="mt-6 text-sm text-gray-500 text-center">
                <p>✓ Quick setup process</p>
                <p>✓ Secure and verified registration</p>
            </div>
        </div>
    );
}