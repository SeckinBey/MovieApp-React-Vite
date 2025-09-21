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
import MovieDetails from "./components/MovieDetails";

// import { movie_list } from "./data";

const api_key = "4cd5b9057a539442ab11543bcaa3ded9";
const page = 1;
const query = "Avengers";
const language = "en-US";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watchListMovies, setWatchListMovies] = useState([]);
  const [isWatchListOpen, setIsWatchListOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState(query);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    async function getMovies() {
      setLoading(true);

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${searchQuery}&page=${page}&language=${language}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }

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
  }, [searchQuery]);

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

  function handleSelectMovie(movie) {
    setSelectedMovie(movie);
    window.scrollTo(0, 0);
  }

  return (
    <>
      <Header>
        <Logo />
        <SearchForm searchQuery={searchQuery} setsearchQuery={setSearchQuery} />
        <WatchListButton
          movies={watchListMovies}
          onSetIsWatchListOpen={setIsWatchListOpen}
        />
      </Header>

      <Main>
        {selectedMovie && (
          <MovieDetails
            movieObj={selectedMovie}
            onClose={() => setSelectedMovie(null)}
          />
        )}

        <WatchList
          movies={watchListMovies}
          isWatchListOpen={isWatchListOpen}
          onRemoveFromWatchList={handleRemoveFromWatchList}
        />

        {loading && <Loading />}
        {!loading && !error && (
          <MovieList
            movies={movies}
            onAddToList={handleAddToWatchList}
            onSelectMovie={handleSelectMovie}
          />
        )}
        {error && <ErrorMessage message={error} />}
      </Main>
      <Footer />
    </>
  );
}
