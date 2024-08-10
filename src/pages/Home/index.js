import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import api from "../../services/api";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./home.css";

function Home() {
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFilmes() {
      const response = await api.get("movie/now_playing", {
        params: {
          api_key: "d3737e313360a6c56d58916c0228c28a",
          language: "pt-BR",
          page: 1,
        },
      });

      setFilmes(response.data.results.slice(0, 10));
      setLoading(false);
    }

    loadFilmes();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <h3>Carregando filmes...</h3>
      </div>
    );
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <button></button>,
    prevArrow: <button></button>,
  };

  return (
    <div className="container">
      <div className="filmes-title">
        <h2 className="title-cartaz">Filmes em cartaz</h2>
      </div>
      <Slider {...settings}>
        {filmes.map((filme, index) => {
          return (
            <div key={filme.id}>
              <article className="carrossel-filme">
                <span className="filme-numero">{index + 1}</span>
                <img
                  src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`}
                  alt={filme.title}
                />
                <Link to={`/filme/${filme.id}`}>Acessar</Link>
              </article>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}

export default Home;
