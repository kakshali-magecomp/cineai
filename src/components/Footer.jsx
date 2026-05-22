import { Link } from "react-router-dom";

export default function Footer() {

    return (

        <footer className="bg-black border-t border-gray-800 mt-20">
            <div className="max-w-7xl mx-auto px-6 py-10">

                {/* TOP SECTION */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    <div>
                        <h1 className="text-3xl font-bold text-cyan-400 mb-3">
                            MovieApp
                        </h1>

                        <p className="text-gray-400 text-sm leading-6">
                            Discover trending movies, search your
                            favorite shows, and enjoy a modern
                            movie browsing experience.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold text-white mb-4">
                            Quick Links
                        </h2>

                        <div className="flex flex-col gap-3 text-gray-400">

                            <Link to="/" className="hover:text-cyan-400 transition">
                                Home
                            </Link>

                            <Link to="/about" className="hover:text-cyan-400 transition">
                                About
                            </Link>

                            <Link to="/login" className="hover:text-cyan-400 transition">
                                Login
                            </Link>

                        </div>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold text-white mb-4">
                            Contact
                        </h2>

                        <p className="text-gray-400 text-sm mb-2">
                            📧 movieq@gmail.com
                        </p>

                        <p className="text-gray-400 text-sm mb-2">
                            📱 +91 9876543210
                        </p>

                        <p className="text-gray-400 text-sm">
                            🌍 India
                        </p>
                    </div>

                </div>

                <div className="border-t border-gray-800 mt-10 pt-6 text-center">
                    <p className="text-gray-500 text-sm">
                        © 2026 MovieApp. All Rights Reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}