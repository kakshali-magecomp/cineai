import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        setError("");

        //validation 
        if (!formData.email || !formData.password) {
            setError("Please fill out all mandatory fields.");
            return;
        }

        //Fetch local storage array 
        const existingUsers = JSON.parse(localStorage.getItem("cineai_users") || "[]");
        
        //Look up exact credential key combinations
        const validUser = existingUsers.find(
            (user) => user.email === formData.email && user.password === formData.password
        );

        if (!validUser) {
            setError("Invalid email or password combination.");
            return;
        }

        //Save currently authenticated user profile info into local storage state
        localStorage.setItem("cineai_current_user", JSON.stringify(validUser));

        // FIX: Force the browser window to dispatch a storage event.
        // This alerts the Navbar to update its state instantaneously on the same tab!
        window.dispatchEvent(new Event("storage"));

        setSuccess(true);
        navigate("/");
    };

    return (
        <div className="min-h-[85vh] bg-slate-950 text-slate-100 flex items-center justify-center p-6 font-sans">
            <div className="w-full max-w-md bg-slate-900/60 border border-slate-800 backdrop-blur-xl p-8 rounded-2xl shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl -z-10"></div>
                
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-black tracking-tight text-white mb-2">
                        Welcome Back
                    </h2>
                    <p className="text-xs text-slate-400">
                        Log in to resume your AI streaming curation.
                    </p>
                </div>

                {error && (
                    <div className="mb-5 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-xs font-medium text-red-400 text-center">
                        {error}
                    </div>
                )}
                {success && (
                    <div className="mb-5 p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-xs font-medium text-cyan-400 text-center">
                        Verification approved. Initializing stream engine...
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Email Address</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange}
                            placeholder="you@gmail.com"
                            className="w-full text-sm bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 transition-colors"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Password</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange}
                            placeholder="••••••••"
                            className="w-full text-sm bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 transition-colors"
                        />
                    </div>

                    <button type="submit" className="w-full mt-2 bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-600 hover:to-indigo-600 text-white font-bold text-sm py-3 rounded-xl transition duration-200 shadow-xl shadow-cyan-500/10">
                        Sign In
                    </button>
                </form>

                {/* Navigation Transfer Links */}
                <div className="mt-6 text-center text-xs text-slate-400">
                    New to the platform?{" "}
                    <Link to="/register" className="text-cyan-400 font-semibold hover:underline">
                        Register Free
                    </Link>
                </div>
            </div>
        </div>
    );
}
