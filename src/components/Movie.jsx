export default function Movie({ movieObj }) {
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
