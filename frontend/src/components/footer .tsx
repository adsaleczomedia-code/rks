import { Facebook, Linkedin, Twitter, Youtube } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-gray-50 border-t border-gray-200 pt-10 pb-6">
            <div className="max-w-7xl mx-auto px-4">

                {/* Products Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {[
                        "Credit Card",
                        "Personal Loan",
                        "Home Loan",
                        "Business Loan",
                        "Credit Score",
                        "Gold Loan",
                        "Loan Against Property",
                    ].map((item) => (
                        <div
                            key={item}
                            className="flex justify-between items-center border border-gray-200 rounded-lg px-4 py-3 bg-white hover:border-blue-500 transition"
                        >
                            <span className="text-gray-700 font-medium">{item}</span>
                            <span className="text-gray-400 text-lg">+</span>
                        </div>
                    ))}
                </div>

                {/* Links */}
                <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 mb-8">
                    <a href="#" className="hover:text-blue-600">About us</a>
                    <a href="#" className="hover:text-blue-600">Meet the team</a>
                    <a href="#" className="hover:text-blue-600">Our Partners</a>
                    <a href="#" className="hover:text-blue-600">Press</a>
                    <a href="#" className="hover:text-blue-600">Privacy Policy</a>
                    <a href="#" className="hover:text-blue-600">Fraud Detection</a>
                    <a href="#" className="hover:text-blue-600">Sitemap</a>
                    <a href="#" className="hover:text-blue-600">Contact Us</a>
                    <a href="#" className="hover:text-blue-600">Important Links</a>
                    <a href="#" className="hover:text-blue-600">Experian T & C</a>
                </div>

                {/* Social Icons */}
                <div className="flex justify-center gap-6 mb-6">
                    <a href="#" className="p-3 rounded-lg bg-gray-100 hover:bg-blue-100 transition">
                        <Facebook size={20} className="text-gray-600" />
                    </a>

                    <a href="#" className="p-3 rounded-lg bg-gray-100 hover:bg-blue-100 transition">
                        <Linkedin size={20} className="text-gray-600" />
                    </a>

                    <a href="#" className="p-3 rounded-lg bg-gray-100 hover:bg-blue-100 transition">
                        <Twitter size={20} className="text-gray-600" />
                    </a>

                    <a href="#" className="p-3 rounded-lg bg-gray-100 hover:bg-blue-100 transition">
                        <Youtube size={20} className="text-gray-600" />
                    </a>
                </div>

                {/* Bottom */}
                <div className="text-center text-gray-500 text-sm mt-4">
                    © {new Date().getFullYear()} Rks Finnplanners. All rights reserved.
                </div>

            </div>
        </footer>
    );
}