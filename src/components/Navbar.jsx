import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(null);

    // Helper function to sync user data from localStorage
    const syncUser = () => {
        const user = localStorage.getItem("cineai_current_user");
        if (user) {
            setCurrentUser(JSON.parse(user));
        } else {
            setCurrentUser(null);
        }
    };

    useEffect(() => {
        // Initial check on mount
        syncUser();

        // Listen for standard storage mutations or navigation activities
        window.addEventListener("storage", syncUser);
        
        return () => {
            window.removeEventListener("storage", syncUser);
        };
    }, []); 

    const handleLogout = () => {
        localStorage.removeItem("cineai_current_user");
        setCurrentUser(null);
        navigate("/login");
    };

    return (
        <nav className="bg-slate-950/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50 px-6 py-4 shadow-xl">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex gap-2 items-center justify-between">
                <img src="./public/logo.png" className="w-[40px]"></img>
                <Link to="/" className="text-xl font-black tracking-wider bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-600 bg-clip-text text-transparent hover:opacity-90 transition-opacity">
                    CINE<span className="text-cyan-400">AI</span>
                </Link>
                </div>
                
                <div className="flex items-center gap-8">
                    <ul className="flex items-center gap-6">
                        <li>
                            <Link to="/" className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors duration-200">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/about" className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors duration-200">
                                About
                            </Link>
                        </li>
                        
                    </ul>

                    {/* Dynamic Auth State Controls */}
                    {currentUser ? (
                        <div className="flex items-center gap-4">
                            <span className="text-xs font-semibold text-slate-400">
                                Hi, <span className="text-cyan-400">{currentUser.username}</span>
                            </span>
                            <button 
                                onClick={handleLogout}
                                className="text-xs font-bold text-white bg-slate-800 hover:bg-red-950 border border-slate-700 hover:border-red-500/30 px-4 py-2 rounded-xl transition-all duration-200 shadow-md"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link to="/login" className="text-xs font-medium text-slate-300 hover:text-cyan-400 transition-colors duration-200 px-2">
                                Login
                            </Link>
                            <Link to="/register" className="text-xs font-bold text-white bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-600 hover:to-indigo-600 px-4 py-2 rounded-xl shadow-lg shadow-cyan-500/10 transition-all duration-200">
                                Register
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
