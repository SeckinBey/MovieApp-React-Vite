import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Main from "./components/Main";
import Loading from "./components/Loading";
import Logo from "./components/Logo";
import SearchForm from "./components/SearchForm";
import WatchListButton from "./components/WatchListButton";
import ErrorMessage from "./components/ErrorMessage";
import MovieList from "./components/MovieList";
import WatchList from "./components/WatchList";

// import { movie_list } from "./data";

const api_key = "4cd5b9057a539442ab11543bcaa3ded9";
const page = 1;
const query = "avengers";
const language = "en-US";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watchListMovies, setWatchListMovies] = useState([]);
  const [isWatchListOpen, setIsWatchListOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getMovies() {
      setLoading(true);

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${query}&page=${page}&language=${language}`
        );

        if (response.status === 401) {
          throw new Error("Invalid API key");
        } else if (response.status === 404) {
          throw new Error("The resource you requested could not be found.");
        } else if (response.status === 500) {
          throw new Error("Internal server error. Please try again later.");
        } else if (response.status === 503) {
          throw new Error("Service Unavailable. Please try again later.");
        }

        // if (!response.ok) {
        //   throw new Error("Failed to fetch movies");
        // }

        const data = await response.json();
        console.log(data.results);

        if (data.results) {
          setMovies(data.results);
        }

        setError("");
      } catch (error) {
        setError(error.message);
      }

      setLoading(false);
    }
    getMovies();
  }, []);

  function handleAddToWatchList(movie) {
    const isAlreadyInWatchList = watchListMovies
      .map((m) => m.id)
      .includes(movie.id);
    if (!isAlreadyInWatchList) {
      setWatchListMovies([...watchListMovies, movie]);
    }
  }

  function handleRemoveFromWatchList(movie) {
    setWatchListMovies(watchListMovies.filter((m) => m.id !== movie.id));
  }

  return (
    <>
      <Header>
        <Logo />
        <SearchForm />
        <WatchListButton
          movies={watchListMovies}
          onSetIsWatchListOpen={setIsWatchListOpen}
        />
      </Header>

      <Main>
        <WatchList
          movies={watchListMovies}
          isWatchListOpen={isWatchListOpen}
          onRemoveFromWatchList={handleRemoveFromWatchList}
        />

        {loading && <Loading />}
        {!loading && !error && (
          <MovieList movies={movies} onAddToList={handleAddToWatchList} />
        )}
        {error && <ErrorMessage message={error} />}
      </Main>
      <Footer />
    </>
  );
}
