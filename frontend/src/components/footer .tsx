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
                            className="flex justify-between items-center border border-gray-200 rounded-lg px-4 py-3 bg-white hover:border-[#5b52e3] transition-all cursor-pointer group"
                        >
                            <span className="text-gray-700 font-medium group-hover:text-[#5b52e3] transition-colors">{item}</span>
                            <span className="text-gray-400 text-lg group-hover:text-[#5b52e3] transition-colors">+</span>
                        </div>
                    ))}
                </div>

                {/* Links */}
                <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 mb-8">
                    <a href="#" className="hover:text-[#5b52e3] transition-colors">About us</a>
                    <a href="#" className="hover:text-[#5b52e3] transition-colors">Meet the team</a>
                    <a href="#" className="hover:text-[#5b52e3] transition-colors">Our Partners</a>
                    <a href="#" className="hover:text-[#5b52e3] transition-colors">Press</a>
                    <a href="#" className="hover:text-[#5b52e3] transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-[#5b52e3] transition-colors">Fraud Detection</a>
                    <a href="#" className="hover:text-[#5b52e3] transition-colors">Sitemap</a>
                    <a href="#" className="hover:text-[#5b52e3] transition-colors">Contact Us</a>
                    <a href="#" className="hover:text-[#5b52e3] transition-colors">Important Links</a>
                    <a href="#" className="hover:text-[#5b52e3] transition-colors">Experian T & C</a>
                </div>

                {/* Social Icons */}
                <div className="flex justify-center gap-6 mb-6">
                    <a href="#" className="p-3 rounded-lg bg-gray-100 hover:bg-[#5b52e3]/10 transition-colors group">
                        <Facebook size={20} className="text-gray-600 group-hover:text-[#5b52e3] transition-colors" />
                    </a>

                    <a href="#" className="p-3 rounded-lg bg-gray-100 hover:bg-[#5b52e3]/10 transition-colors group">
                        <Linkedin size={20} className="text-gray-600 group-hover:text-[#5b52e3] transition-colors" />
                    </a>

                    <a href="#" className="p-3 rounded-lg bg-gray-100 hover:bg-[#5b52e3]/10 transition-colors group">
                        <Twitter size={20} className="text-gray-600 group-hover:text-[#5b52e3] transition-colors" />
                    </a>

                    <a href="#" className="p-3 rounded-lg bg-gray-100 hover:bg-[#5b52e3]/10 transition-colors group">
                        <Youtube size={20} className="text-gray-600 group-hover:text-[#5b52e3] transition-colors" />
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