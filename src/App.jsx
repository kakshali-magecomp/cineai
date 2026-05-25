import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import MovieDetails from "./pages/MovieDetails"; 
import Register from "./pages/Register"; 
import Login from "./pages/Login"; 
import Footer from "./components/Footer";
import WatchList from "./pages/WatchList";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} /> 
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/watchlist" element={<WatchList />} />
      </Routes>
      
      <Footer />
    </>
  );
}
