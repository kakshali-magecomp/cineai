import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home() {

    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);//Stores filtered/search movies.
    const [searchQuery, setSearchQuery] = useState("");//Stores search input value.
    const [loading, setLoading] = useState(true);
    // PAGINATION
    const [currentPage, setCurrentPage] = useState(1);//Stores current pagination page.
    const moviesPerPage = 16;

    // FETCH API
    useEffect(() => {
        fetch("https://api.tvmaze.com/shows")
            .then((response) => response.json())//convert into JavaScript object
            .then((data) => {
                setMovies(data);//saves all movies
                setFilteredMovies(data);//initially show all movies
                setLoading(false);
            });
    }, []);

    // SEARCH FUNCTION
    const handleSearch = (e) => {
        e.preventDefault();

        setCurrentPage(1);//search happen goto the first page

        // IF SEARCH EMPTY
        if (searchQuery === "") {
            setFilteredMovies(movies);//show all movie
            return;
        }

        const results = movies.filter((movie) => {
            return (
                movie.name
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||

                movie.genres.some((genre) =>
                    genre
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
                )
            );
        });

        setFilteredMovies(results);
    };

    // CATEGORY FILTER
    const handleCategory = (genre) => {
        setCurrentPage(1);
        // SHOW ALL MOVIES
        if (genre === "All") {
            setFilteredMovies(movies);
            return;
        }
        // FILTER MOVIES
        const filtered = movies.filter((movie) =>
            movie.genres.includes(genre)
        );
        setFilteredMovies(filtered);
    };

    // PAGINATION
    const lastMovieIndex = currentPage * moviesPerPage;
    const firstMovieIndex = lastMovieIndex - moviesPerPage;
    const currentMovies = filteredMovies.slice(firstMovieIndex,lastMovieIndex);
    const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);

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

    return (
        <div className="min-h-screen bg-black text-white p-6 md:p-10">
            <h1 className="text-4xl md:text-5xl font-black mb-8 bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
                Moviq
            </h1>

            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 mb-8">
                <input type="text" placeholder="Search Here..." value={searchQuery}
                    onChange={(e) =>
                        setSearchQuery(e.target.value)
                    }
                    className="bg-gray-900 border border-gray-700 px-4 py-3 rounded-xl w-full focus:outline-none focus:border-cyan-400"
                />

                <button type="submit" className="bg-cyan-500 hover:bg-cyan-600 px-5 py-3 rounded-xl font-semibold transition">
                    Search
                </button>

                <button type="button"
                    onClick={() => {
                        setSearchQuery("");
                        setFilteredMovies(movies);
                        setCurrentPage(1);
                    }}
                    className="bg-red-500 hover:bg-red-600 px-5 py-3 rounded-xl font-semibold transition">
                    Reset
                </button>
            </form>

            <div className="flex flex-wrap gap-3 mb-10">

                {["All","Drama","Action","Comedy","Romance","Thriller","Crime","Adventure","Fantasy","Mystery"].map((genre) => (
                    <button key={genre} onClick={() => handleCategory(genre)}
                        className="px-5 py-2 rounded-xl bg-gray-900 border border-gray-700 hover:bg-cyan-500 hover:text-black transition duration-300 text-sm font-medium">
                        {genre}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {currentMovies.map((movie) => (
                    <Link to={`/movie/${movie.id}`} key={movie.id}
                        className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-cyan-400 hover:scale-105 transition duration-300 shadow-lg">

                        <img src={movie.image?.medium || "https://via.placeholder.com/300"}
                            alt={movie.name}
                            className="w-full h-72 object-cover"
                        />

                        <div className="p-4">
                            <h2 className="text-lg font-bold mb-2">
                                {movie.name}
                            </h2>

                            <p className="text-gray-400 text-sm mb-3">
                                ⭐ {movie.rating?.average || "N/A"}//Not Applicable
                            </p>

                            {/* GENRES */}
                            <div className="flex flex-wrap gap-2">
                                {movie.genres.map((genre, idx) => (
                                    <span key={idx} className="bg-cyan-500 text-black text-xs px-2 py-1 rounded-lg font-semibold">
                                        {genre}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* PAGINATION */}
            <div className="flex justify-center items-center gap-4 mt-12">

                <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}
                    className="bg-gray-800 hover:bg-cyan-500 hover:text-black px-5 py-2 rounded-xl disabled:opacity-30 transition">
                    Previous
                </button>

                <p className="text-lg font-semibold" className="bg-gray-900  px-5 py-2 rounded-xl transition">
                    {currentPage} / {totalPages}
                </p>

                <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}
                    className="bg-gray-800 hover:bg-cyan-500 hover:text-black px-5 py-2 rounded-xl disabled:opacity-30 transition">
                    Next
                </button>
            </div>
        </div>
    );
}