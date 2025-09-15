import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
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
      <h1>Header</h1>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia modi
        tenetur porro odio sequi repellendus natus perferendis expedita
        quibusdam eligendi consequatur atque quo deleniti nobis sunt magni cum,
        adipisci eveniet.
      </p>
    </div>
  );
}

function MovieList() {
  return <h2>MovieList</h2>;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
