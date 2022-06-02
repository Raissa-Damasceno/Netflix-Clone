import React, { useEffect, useState } from "react";
import { getHomeList, getMovieInfo } from "./api/tmdb-api";
import MovieRow from "./Components/MovieRow.js/MovieRow";
import FeaturedMovie from "./Components/FeaturedMovie.js/FeatureMovie";
import Header from "./Components/Header/Header";
import "./App.css";

const App = () => {
  const [movieList, setMovieList] = useState([]);
  const [featureData, setFeatureData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(() => {
    const loadAll = async () => {
      let list = await getHomeList();
      setMovieList(list);

      // pegar o filme em destaque
      let originalsList = list.filter((i) => i.slug === "originals");
      let randomOriginalMovie = Math.floor(
        Math.random() * (originalsList[0].items.results.length - 1)
      );
      let movie = originalsList[0].items.results[randomOriginalMovie];
      let moviesInfo = await getMovieInfo(movie.id, "tv");

      setFeatureData(moviesInfo);
    };
    loadAll();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    };

    window.addEventListener("scroll", scrollListener);
    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, []);
  return (
    <div className="page">
      <Header black={blackHeader} />
      {featureData && <FeaturedMovie item={featureData} />}
      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>

      <footer>
        <p>Direitos de imagem para Netflix</p>
        <p>Dados pegos do site Themoviedb.org</p>
      </footer>

      {/* {movieList.length <= 0 && (
        <div className="loading">
          <img
            src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif"
            width={400}
            alt="sem conecção"
          ></img>
        </div>
      )} */}
    </div>
  );
};

export default App;
