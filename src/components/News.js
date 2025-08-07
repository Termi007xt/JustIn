import React, { Component } from "react";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    category: "general",
    pageSize: 9,
  };

  static propTypes = {
    category: PropTypes.string,
    pageSize: PropTypes.number,
    setProgress: PropTypes.func,
    apiKey: PropTypes.string,
  };

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
      hasMore: true,
    };
  }

  async componentDidMount() {
    this.props.setProgress(10);
    let api = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(api);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      hasMore: parsedData.articles.length < parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }

  // handlePrev = async () => {
  //   this.props.setProgress(10);

  //   let api = `https://newsapi.org/v2/top-headlines?country=us&category=${
  //     this.props.category
  //   }&apiKey=${this.props.apiKey}&page=${
  //     this.state.page - 1
  //   }&pageSize=${this.props.pageSize}`;
  //   this.setState({ loading: true });
  //   let data = await fetch(api);
  //   let parsedData = await data.json();
  //   console.log(parsedData);
  //   this.setState({
  //     page: this.state.page - 1,
  //     articles: parsedData.articles,
  //     loading: false,
  //   });
  //   this.props.setProgress(100);
  // };

  // handleNext = async () => {
  //   this.props.setProgress(10);

  //   let api = `https://newsapi.org/v2/top-headlines?country=us&category=${
  //     this.props.category
  //   }&apiKey=${this.props.apiKey}&page=${
  //     this.state.page + 1
  //   }&pageSize=${this.props.pageSize}`;
  //   this.setState({ loading: true });
  //   let data = await fetch(api);
  //   let parsedData = await data.json();
  //   console.log(parsedData);

  //   this.setState({
  //     page: this.state.page + 1,
  //     articles: parsedData.articles,
  //     loading: false,
  //   });
  //   this.props.setProgress(100);
  // };

  fetchMoreData = async () => {
    let nextPage = this.state.page + 1;

    let api = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${nextPage}&pageSize=${this.props.pageSize}`;

    let data = await fetch(api);
    let parsedData = await data.json();

    const newArticles = parsedData.articles || [];
    const updatedArticles = this.state.articles.concat(newArticles);

    this.setState({
      articles: updatedArticles,
      page: nextPage,
      hasMore: newArticles.length > 0, // ✅ if API returns 0 articles, stop
    });
  };

  render() {
    return (
      <>
        <h1 className="text-center my-5">
          Top Headlines - {this.props.category}
        </h1>

        {/* {this.state.loading && (
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-primary" role="status"></div>
          </div>
        )} */}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.hasMore}
          loader={
            <div
              style={{ height: "80px" }}
              className="d-flex justify-content-center align-items-center"
            >
              <div className="spinner-border text-primary" role="status"></div>
            </div>
          }
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all 🎉</b>
            </p>
          }
        >
          <div className="container">
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
          </div>
        </InfiniteScroll>

        {/* {!this.state.loading && (
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
        )} */}
      </>
    );
  }
}

export default News;
