import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
    const [formData, setFormData] = useState({//Stores all input values.
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [error, setError] = useState("");//store error msg
    const [success, setSuccess] = useState(false);//show succsess msg after registration
    
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = (e) => {
        e.preventDefault();
        setError("");

        if (!formData.username || !formData.email || !formData.password) {
            setError("Please fill out all registration fields.");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Your passwords do not match. Please re-type carefully.");
            return;
        }

        if (formData.password.length < 6) {
            setError("Security rule: Password must contain at least 6 characters.");
            return;
        }

        //Check if the user email key already exists inside localStorage
        const existingUsers = JSON.parse(localStorage.getItem("cineai_users") || "[]");
        const userExists = existingUsers.some((user) => user.email === formData.email);

        if (userExists) {
            setError("An account with this email address already exists.");
            return;
        }

        //Construct and append the new user profile asset payload
        const newUser = {
            id: Date.now(),
            username: formData.username,
            email: formData.email,
            password: formData.password 
        };

        existingUsers.push(newUser);
        localStorage.setItem("cineai_users", JSON.stringify(existingUsers));

        setSuccess(true);
        navigate("/login");
       
    };

    return (
        <div className="min-h-[85vh] bg-slate-950 text-slate-100 flex items-center justify-center p-6 font-sans">
            <div className="w-full max-w-md bg-slate-900/60 border border-slate-800 backdrop-blur-xl p-8 rounded-2xl shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl -z-10"></div>
                
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-black tracking-tight text-white mb-2">
                        Create Your Account
                    </h2>
                    <p className="text-xs text-slate-400">
                        Join CineAI to unlock customized recommendations.
                    </p>
                </div>

                {error && (
                    <div className="mb-5 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-xs font-medium text-red-400 text-center">
                        {error}
                    </div>
                )}
                {success && (
                    <div className="mb-5 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs font-medium text-emerald-400 text-center">
                        Success! Account created. Redirecting to Login...
                    </div>
                )}

                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Username</label>
                        <input type="text" name="username" value={formData.username} onChange={handleChange}
                            placeholder="cinema_fanatic"
                            className="w-full text-sm bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 transition-colors"
                        />
                    </div>

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

                    <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Confirm Password</label>
                        <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange}
                            placeholder="••••••••"
                            className="w-full text-sm bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 transition-colors"
                        />
                    </div>

                    <button type="submit" className="w-full mt-2 bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-600 hover:to-indigo-600 text-white font-bold text-sm py-3 rounded-xl transition duration-200 shadow-xl shadow-cyan-500/10">
                        Sign Up Now
                    </button>
                </form>

                <div className="mt-6 text-center text-xs text-slate-400">
                    Already have an account?{" "}
                    <Link to="/login" className="text-cyan-400 font-semibold hover:underline">
                        Log In
                    </Link>
                </div>
            </div>
        </div>
    );
}
