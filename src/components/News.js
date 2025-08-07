import React, { useState } from "react";
import { useEffect } from "react";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchInitialData = async () => {
      props.setProgress(10);
      let api = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=${props.apiKey}&page=1&pageSize=${props.pageSize}`;

      setLoading(true);

      let data = await fetch(api);
      let parsedData = await data.json();

      setArticles(parsedData.articles || []);
      setTotalResults(parsedData.totalResults || 0);
      setHasMore(
        (parsedData.articles || []).length < (parsedData.totalResults || 0)
      );
      setLoading(false);

      props.setProgress(100);
    };

    fetchInitialData();
  }, [props.category, props.apiKey, props.pageSize]);

  const fetchMoreData = async () => {
    let nextPage = page + 1;

    let api = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=${props.apiKey}&page=${nextPage}&pageSize=${props.pageSize}`;

    let data = await fetch(api);
    let parsedData = await data.json();

    const newArticles = parsedData.articles || [];
    const updatedArticles = articles.concat(newArticles);

    setArticles(updatedArticles);
    setPage(nextPage);
    setHasMore(newArticles.length > 0);
  };

  // handlePrev = async () => {
  //   props.setProgress(10);

  //   let api = `https://newsapi.org/v2/top-headlines?country=us&category=${
  //     props.category
  //   }&apiKey=${props.apiKey}&page=${
  //     page - 1
  //   }&pageSize=${props.pageSize}`;
  //   this.setState({ loading: true });
  //   let data = await fetch(api);
  //   let parsedData = await data.json();
  //   console.log(parsedData);
  //   this.setState({
  //     page: page - 1,
  //     articles: parsedData.articles,
  //     loading: false,
  //   });
  //   props.setProgress(100);
  // };

  // handleNext = async () => {
  //   props.setProgress(10);

  //   let api = `https://newsapi.org/v2/top-headlines?country=us&category=${
  //     props.category
  //   }&apiKey=${props.apiKey}&page=${
  //     page + 1
  //   }&pageSize=${props.pageSize}`;
  //   this.setState({ loading: true });
  //   let data = await fetch(api);
  //   let parsedData = await data.json();
  //   console.log(parsedData);

  //   this.setState({
  //     page: page + 1,
  //     articles: parsedData.articles,
  //     loading: false,
  //   });
  //   props.setProgress(100);
  // };

  return (
    <>
      <h1 className="text-center my-5">Top Headlines - {props.category}</h1>

      {/* {loading && (
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-primary" role="status"></div>
          </div>
        )} */}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={hasMore}
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
            {articles.map((element) => {
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

      {/* {!loading && (
          <div className="container">
            <div className="d-grid gap-2 d-md-flex justify-content-between">
              <button
                className="btn btn-primary me-md-2 "
                type="button"
                onClick={this.handlePrev}
                disabled={page <= 1}
              >
                &larr; Previous
              </button>
              <button
                className="btn btn-primary"
                type="button"
                onClick={this.handleNext}
                disabled={
                  page >=
                  Math.ceil(totalResults / props.pageSize)
                }
              >
                Next &rarr;
              </button>
            </div>
          </div>
        )} */}
    </>
  );
};

News.defaultProps = {
  category: "general",
  pageSize: 9,
};

News.propTypes = {
  category: PropTypes.string,
  pageSize: PropTypes.number,
  setProgress: PropTypes.func,
  apiKey: PropTypes.string,
};

export default News;
