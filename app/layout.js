import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Secure Marketplace",
  description: "A secure marketplace for buying and selling items",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Navigation Bar */}
        <nav className="bg-white shadow-md fixed w-full top-0 z-50">
          <div className="container mx-auto flex justify-between items-center p-4">
            {/* Logo or Brand Name */}
            <Link href="/" className="text-2xl font-bold text-indigo-600 hover:text-indigo-500 transition duration-300">
              Marketplace
            </Link>

            {/* Navigation Links */}
            <div className="flex gap-6">
              <Link
                href="/marketplace"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300"
              >
                Browse Items
              </Link>
              <Link
                href="/login"
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-300"
              >
                Login
              </Link>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="pt-20"> {/* Add padding-top to account for the fixed navbar */}
          {children}
        </div>
      </body>
    </html>
  );
}