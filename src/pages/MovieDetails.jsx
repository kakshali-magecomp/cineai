import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function MovieDetails() {

    const { id } = useParams();

    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    // FETCH SINGLE MOVIE
    useEffect(() => {

        fetch(`https://api.tvmaze.com/shows/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setMovie(data);
                setLoading(false);
            });

    }, [id]);

    // LOADING
    if (loading) {
        return (
            <div className="min-h-screen bg-black flex justify-center items-center">
                <h1 className="text-white text-3xl font-bold">
                    Loading...
                </h1>
            </div>
        );
    }

    // MOVIE NOT FOUND
    if (!movie) {
        return (
            <div className="min-h-screen bg-black flex flex-col justify-center items-center text-white">
                <h1 className="text-3xl font-bold mb-4">
                    Movie Not Found
                </h1>

                <Link to="/" className="bg-cyan-500 px-5 py-2 rounded-lg">
                    Back To Home
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-black text-white pb-[20px]">

            {/* TOP BANNER */}
            {/* <div className="relative h-[300px] md:h-[450px]">
                <img src={movie.image?.original || movie.image?.medium} alt={movie.name}
                    className="w-full h-full object-cover opacity-40"/>
                <div className="absolute inset-0 bg-black/60"></div>

            </div> */}

            
            <div className="max-w-6xl mx-auto px-6 -mt-40 relative z-10 pt-[200px]">
                <div className="grid md:grid-cols-3 gap-8">

                    {/* MOVIE IMAGE */}
                    <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-800">
                        <img src={movie.image?.original || movie.image?.medium} alt={movie.name}
                            className="w-full h-full object-cover"
                        />

                    </div>

                    {/* MOVIE DETAILS */}
                    <div className="md:col-span-2">
                        {/* TITLE */}
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            {movie.name}
                        </h1>

                        {/* RATING */}
                        <div className="flex items-center gap-4 mb-5">
                            <div className="bg-yellow-500 text-black px-3 py-1 rounded-lg font-bold">
                                ⭐ {movie.rating?.average || "N/A"}
                            </div>

                            <p className="text-gray-300">
                                {movie.premiered}
                            </p>

                        </div>

                        {/* GENRES */}
                        <div className="flex flex-wrap gap-3 mb-6">
                            {movie.genres?.map((genre, idx) => (
                                <span key={idx} className="bg-cyan-500/20 border border-cyan-500 text-cyan-300 px-3 py-1 rounded-full text-sm">
                                    {genre}
                                </span>
                            ))}

                        </div>

                        {/* SUMMARY */}
                        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 mb-6">
                            <h2 className="text-2xl font-bold mb-4">
                                About Movie
                            </h2>

                            <p className="text-gray-300 leading-7"
                                dangerouslySetInnerHTML={{
                                    __html:
                                        movie.summary ||
                                        "No Summary Available",
                                }}
                            />

                        </div>

                        {/* EXTRA DETAILS */}
                        <div className="grid sm:grid-cols-2 gap-4 mb-8">

                            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                                <h3 className="text-gray-400 text-sm mb-1">
                                    Language
                                </h3>

                                <p className="text-lg font-semibold">
                                    {movie.language}
                                </p>
                            </div>

                            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                                <h3 className="text-gray-400 text-sm mb-1">
                                    Status
                                </h3>

                                <p className="text-lg font-semibold">
                                    {movie.status}
                                </p>
                            </div>

                            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                                <h3 className="text-gray-400 text-sm mb-1">
                                    Runtime
                                </h3>

                                <p className="text-lg font-semibold">
                                    {movie.runtime} min
                                </p>
                            </div>

                            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                                <h3 className="text-gray-400 text-sm mb-1">
                                    Type
                                </h3>

                                <p className="text-lg font-semibold">
                                    {movie.type}
                                </p>
                            </div>

                        </div>

                        {/* BUTTONS */}
                        <div className="flex gap-4">

                            <a href="#" rel="noreferrer" className="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-xl font-bold transition">
                                Watch Now
                            </a>

                            <Link to="/" className="bg-slate-800 hover:bg-slate-700 px-6 py-3 rounded-xl font-bold transition">
                                Back
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}