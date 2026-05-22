import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {

    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);

    // PAGINATION
    const [currentPage, setCurrentPage] = useState(1);
    const moviesPerPage = 16;

    // FETCH API
    useEffect(() => {
        fetch("https://api.tvmaze.com/shows")
            .then((response) => response.json())
            .then((data) => {
                setMovies(data);
                setFilteredMovies(data);
                setLoading(false);
            });
    }, []);

    // SEARCH
    const handleSearch = (e) => {
        e.preventDefault();
            setCurrentPage(1);
            // EMPTY SEARCH
            if (searchQuery === "") {
                setFilteredMovies(movies);
                return;
            }
        const results = movies.filter((movie) => {
            return (
                movie.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                movie.genres.some((genre) =>
                    genre.toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
        });

        setFilteredMovies(results);
    };

    const lastMovieIndex = currentPage * moviesPerPage;
    const firstMovieIndex = lastMovieIndex - moviesPerPage;
    const currentMovies = filteredMovies.slice( firstMovieIndex, lastMovieIndex);
    const totalPages = Math.ceil( filteredMovies.length / moviesPerPage);

    // LOADING
    if (loading) {
        return (
            <h1 className="text-white text-3xl p-10">
                Loading...
            </h1>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white p-10">
            <h1 className="text-4xl font-bold mb-6 font-black tracking-wider bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
                Movie App
            </h1>

            <form onSubmit={handleSearch} className="flex gap-3 mb-10">
                <input type="text" placeholder="Search movie..." value={searchQuery}
                onChange={(e) =>
                        setSearchQuery(e.target.value)
                    }
                    className="bg-gray-800 px-4 py-2 rounded-lg w-full"/>

                <button type="submit" className="bg-cyan-500 px-5 py-2 rounded-lg">
                    Search
                </button>
                <button type="submit" onClick={()=>{
                    setSearchQuery("");
                    setFilteredMovies(movies);
                    setCurrentPage(1);
                }} className="bg-cyan-500 px-5 py-2 rounded-lg">
                    Reset
                </button>
            </form>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {currentMovies.map((movie) => (
                    <Link to={`/movie/${movie.id}`} key={movie.id}
                        className="bg-gray-900 rounded-xl overflow-hidden">

                        <img src={ movie.image?.medium || "https://via.placeholder.com/300"}
                            alt={movie.name}
                            className="w-full h-72 object-cover"
                        />

                        <div className="p-4">
                            <h2 className="text-lg font-bold mb-2">
                                {movie.name}
                            </h2>

                            <p className="text-sm text-gray-400 mb-3">
                                ⭐ {movie.rating?.average || "N/A"}
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {movie.genres.map((genre, idx) => (
                                    <span key={idx} className="bg-cyan-500 text-black text-xs px-2 py-1 rounded">
                                        {genre}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* PAGINATION */}
            <div className="flex justify-center gap-4 mt-10">
                <button disabled={currentPage === 1}
                onClick={() =>
                        setCurrentPage(currentPage - 1)
                    }
                    className="bg-gray-800 px-4 py-2 rounded disabled:opacity-30">
                    Previous
                </button>

                <p className="text-lg">
                    {currentPage} / {totalPages}
                </p>

                <button disabled={currentPage === totalPages}
                    onClick={() =>
                        setCurrentPage(currentPage + 1)
                    }
                    className="bg-gray-800 px-4 py-2 rounded disabled:opacity-30">
                    Next
                </button>
            </div>
           
        </div>
    );
}