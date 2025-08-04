import React, { Component } from "react";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";

export class News extends Component {
  static defaultProps = {
    category: "sports",
    pageSize: 9,
  };

  static propTypes = {
    category: PropTypes.string,
    pageSize: PropTypes.number,
  };

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }

  async componentDidMount() {
    let api = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=19dae3fc43fc4050b3757b19ca3bb896&page=1&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(api);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }

  handlePrev = async () => {
    let api = `https://newsapi.org/v2/top-headlines?country=us&category=${
      this.props.category
    }&apiKey=19dae3fc43fc4050b3757b19ca3bb896&page=${
      this.state.page - 1
    }&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(api);
    let parsedData = await data.json();
    console.log(parsedData);

    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false,
    });
  };

  handleNext = async () => {
    let api = `https://newsapi.org/v2/top-headlines?country=us&category=${
      this.props.category
    }&apiKey=19dae3fc43fc4050b3757b19ca3bb896&page=${
      this.state.page + 1
    }&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(api);
    let parsedData = await data.json();
    console.log(parsedData);

    this.setState({
      page: this.state.page + 1,
      articles: parsedData.articles,
      loading: false,
    });
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center my-5">
          Top Headlines - {this.props.category}
        </h1>

        {this.state.loading && (
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        <div className="row my-3">
          {!this.state.loading &&
            this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title}
                    description={element.description}
                    img={element.urlToImage}
                    newsUrl={element.url}
                  />
                </div>
              );
            })}
        </div>
        {!this.state.loading && (
          <div className="container">
            <div className="d-grid gap-2 d-md-flex justify-content-between">
              <button
                className="btn btn-primary me-md-2 "
                type="button"
                onClick={this.handlePrev}
                disabled={this.state.page <= 1}
              >
                &larr; Previous
              </button>
              <button
                className="btn btn-primary"
                type="button"
                onClick={this.handleNext}
                disabled={
                  this.state.page >=
                  Math.ceil(this.state.totalResults / this.props.pageSize)
                }
              >
                Next &rarr;
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default News;
