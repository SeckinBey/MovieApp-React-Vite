export default function WatchListMovie({ movieObj, onRemoveFromWatchList }) {
  return (
    <div className="col">
      {movieObj.is_active && (
        <div className="card movie position-relative">
          <img src={"/img/" + movieObj.image} alt="" className="card-img-top" />
          <div className="card-body">
            <h2 className="h6 card-title">{movieObj.title}</h2>
            <p className="card-text mb-0">{movieObj.description}</p>
            {movieObj.is_new && (
              <span className="position-absolute top-0 end-0 badge bg-danger m-1">
                New
              </span>
            )}
            <button
              className="btn btn-link fs-5 text-danger position-absolute top-0 start-0"
              onClick={() => onRemoveFromWatchList(movieObj)}
            >
              <i className="bi bi-dash-circle"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
