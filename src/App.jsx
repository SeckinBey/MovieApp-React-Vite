import { useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Main from "./components/Main";

import Logo from "./components/Logo";
import SearchForm from "./components/SearchForm";
import WatchListButton from "./components/WatchListButton";

import MovieList from "./components/MovieList";
import WatchList from "./components/WatchList";

import { movie_list } from "./data";

export default function App() {
  const [movies, setMovies] = useState(movie_list);
  const [watchListMovies, setWatchListMovies] = useState([]);
  const [isWatchListOpen, setIsWatchListOpen] = useState(false);

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
        <MovieList movies={movies} onAddToList={handleAddToWatchList} />
      </Main>
      <Footer />
    </>
  );
}
