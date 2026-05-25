export default function About() {

    const features = [
        {
            icon: "🎬",
            title: "Movie Search",
            desc: "Search movies easily by name or genre."
        },
        {
            icon: "⭐",
            title: "Top Ratings",
            desc: "See movie ratings and discover popular shows."
        },
        {
            icon: "❤️",
            title: "Favorites",
            desc: "Save your favorite movies to watch later."
        }
    ];

    return (
        <div className="min-h-screen bg-black text-white pb-[20px]">

            <div className="text-center py-20 px-6">

                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                    About Movie App
                </h1>

                <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                    This movie app helps you discover movies,
                    check ratings, and save your favorites.
                    
                </p>

            </div>

            <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">

                {features.map((feature, idx) => (
                    <div key={idx} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-cyan-500 transition">

                        <div className="text-5xl mb-4">
                            {feature.icon}
                        </div>

                        <h2 className="text-2xl font-bold mb-3">
                            {feature.title}
                        </h2>

                        <p className="text-gray-400">
                            {feature.desc}
                        </p>

                    </div>
                ))}

            </div>

            <div className="max-w-4xl mx-auto mt-20 px-6">

                <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl p-10 text-center">

                    <h2 className="text-3xl font-bold mb-4">
                        Enjoy Unlimited Movies
                    </h2>

                    <p className="text-white/80 text-lg">
                        Explore trending movies and enjoy a clean
                        and modern movie browsing experience.
                    </p>

                </div>

            </div>

        </div>
    );
}