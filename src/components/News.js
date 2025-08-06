import React, { Component } from "react";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";
// import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    category: "general",
    pageSize: 9,
  };

  static propTypes = {
    category: PropTypes.string,
    pageSize: PropTypes.number,
    setProgress: PropTypes.func,
  };

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      // totalResults: 0,
    };
  }

  // async update() {
  //   const api = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=19dae3fc43fc4050b3757b19ca3bb896&page=${this.state.page}&pageSize=${this.props.pageSize}`;
  //   this.setState({ loading: true });
  //   let data = await fetch(api);
  //   let parsedData = await data.json();
  //   console.log(parsedData);
  //   this.setState({
  //     articles: parsedData.articles,
  //     totalResults: parsedData.totalResults,
  //     loading: false,
  //   });
  // }

  async componentDidMount() {
    this.props.setProgress(10);
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
    this.props.setProgress(100);
  }

  // fetchMoreData = () => {
  //   this.setState({ page: this.state.page + 1 });
  //   this.componentDidMount();
  // };

  handlePrev = async () => {
    this.props.setProgress(10);

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
    this.props.setProgress(100);
    // this.setState({ page: this.state.page - 1 });
    // this.update();
  };

  handleNext = async () => {
    this.props.setProgress(10);

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
    this.props.setProgress(100);
    // this.setState({ page: this.state.page + 1 });
    // this.update();
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center my-5">
          Top Headlines - {this.props.category}
        </h1>

        {this.state.loading && (
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-primary" role="status"></div>
          </div>
        )}

        {/* <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={
            <h4>
              Loading...
              {
                <div className="d-flex justify-content-center">
                  <div
                    className="spinner-border text-primary"
                    role="status"
                  ></div>
                </div>
              }
            </h4>
          }
        >
          {this.state.items.map((i, index) => (
            <div key={index}>div - #{index}</div>
          ))}
        </InfiniteScroll> */}

        <div className="row my-3">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title}
                  description={element.description}
                  img={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
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
