import React from "react";

const NewsItem = (props) => {
  let { title, description, img, newsUrl, author, date } = props;
  return (
    <div>
      <div className="card text-center border-primary mb-3">
        <img
          src={
            !img
              ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxdAOY_-vITFVI-ej84s2U_ErxhOly-z3y_Q&s"
              : img
          }
          style={{ height: "180px", objectFit: "cover" }}
          className="card-img-top"
          alt="..."
        />
        <div className="card-body d-flex flex-column justify-content-between">
          <h5 className="card-title clamp-2">{title}</h5>
          <p className="card-text clamp-2">{description}</p>
          <p className="card-text">
            <small className="text-body-secondary">
              By {!author ? "unknown" : author} on{" "}
              {new Date(date).toGMTString()}
            </small>
          </p>
          <a
            rel="noreferrer"
            href={newsUrl}
            target="_blank"
            className="btn btn-sm btn-primary"
          >
            Read more
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
