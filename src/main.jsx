import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

function App() {
  return (
    <>
      <Header />
      <MovieList />
    </>
  );
}

function Header() {
  return (
    <div id="header">
      <nav
        className="navbar navbar-expand-lg bg-dark border-bottom border-body"
        data-bs-theme="dark"
      >
        <div className="container">
          <a href="#" className="navbar-brand">
            Movie-App
          </a>
        </div>
      </nav>
    </div>
  );
}

function MovieList() {
  const movie_list = [
    {
      image: "1.jpg",
      title: "Captain America ",
      description: "movie description",
      isActive: true,
      isNew: true,
    },
    {
      image: "2.jpg",
      title: "Araba Hırsızları",
      description: "movie description",
      isActive: true,
      isNew: true,
    },
    {
      image: "3.jpg",
      title: "The Codes of War",
      description: "movie description",
      isActive: true,
      isNew: false,
    },
    {
      image: "4.jpg",
      title: "Moana 2",
      description: "movie description",
      isActive: true,
      isNew: true,
    },
  ];

  return (
    <div className="container">
      <h2>MovieList</h2>

      {movie_list.filter((m) => m.isActive).length == 0 ? (
        <div>Film not found</div>
      ) : (
        <div
          id="movie-list"
          className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4"
        >
          {movie_list.map((m, index) => (
            <Movie key={index} movieObj={m} />
          ))}
        </div>
      )}
    </div>
  );
}

function Movie({ movieObj }) {
  // const movieObj = {
  //   image: "1.jpg",
  //   title: "Captain America Brand New World",
  //   description: "movie description",
  // };

  return (
    <div className="col">
      {movieObj.isActive && (
        <div className="card movie position-relative">
          <img src={"/img/" + movieObj.image} className="card-img-top" />
          <div className="card-body">
            <h2 className="h4 card-title">{movieObj.title}</h2>
            <p className="card-text mb-0">{movieObj.description}</p>
            {movieObj.isNew && (
              <span className="position-absolute top-0 end-0 badge bg-danger m-1">
                New
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
