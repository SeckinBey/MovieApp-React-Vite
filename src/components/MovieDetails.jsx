export default function MovieDetails({ movieObj, onClose }) {
  return (
    <div className="movie-details">
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h2 className="h5 mb-0">{movieObj.title}</h2>
          <button className="btn btn-sm btn-danger" onClick={() => onClose()}>
            Close
          </button>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-3">
              <img
                src={
                  "https://image.tmdb.org/t/p/original/" + movieObj.poster_path
                }
                alt=""
                className="img-fluid"
              />
            </div>
            <div className="col-md-9">
              <h3>{movieObj.title}</h3>
              <p>{movieObj.overview}</p>
              <p>
                <strong>Release Date:</strong> {movieObj.release_date}
              </p>
              <p>
                <strong>Rating:</strong> {movieObj.vote_average} / 10
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
