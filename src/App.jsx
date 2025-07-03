import './App.css'
import { Container } from "react-bootstrap";
import { useEffect, useState } from 'react'
import NavBar from "./components/NavBar";
import MoviesList from "./components/MoviesList";
import MovieDetails from './components/MovieDetails'
import axios from 'axios'
import { Routes, Route } from 'react-router-dom'

function App() {

  const [movies, setMovies] = useState([])
  const [pageCount, setpageCount] = useState(0)

  //get all movies by axios 
  const getAllMovies = async () => {
  try {
    const res = await axios.get("https://api.themoviedb.org/3/movie/popular?api_key=52ef927bbeb21980cd91386a29403c78&language=ar");
    setMovies(res.data.results);
    setpageCount(res.data.total_pages);
  } catch (error) {
    console.error("حدث خطأ أثناء تحميل الأفلام:", error);
  }
};



  //get current page
  const getPage = async (page) => {
  try {
    const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=52ef927bbeb21980cd91386a29403c78&language=ar&page=${page}`);
    setMovies(res.data.results);
    setpageCount(res.data.total_pages);
  } catch (error) {
    console.error("حدث خطأ أثناء تغيير الصفحة:", error);
  }
};


  useEffect(() => {
    getAllMovies();
  }, [])


  //to search in api
  const search = async (word) => {
  try {
    if (word === "") {
      getAllMovies();
    } else {
      const res = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=52ef927bbeb21980cd91386a29403c78&query=${encodeURIComponent(word)}&language=ar`
      );
      setMovies(res.data.results);
      setpageCount(res.data.total_pages);
    }
  } catch (error) {
    console.error("حدث خطأ أثناء البحث:", error);
  }
};


  return (
  <div className="font color-body ">
    <NavBar search={search} />
    <Container>
      <Routes>
        <Route path="/" element={<MoviesList movies={movies} getPage={getPage} pageCount={pageCount} />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </Container>
  </div>
);
}

export default App;
