import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, img, newsUrl } = this.props;
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
  }
}

export default NewsItem;
