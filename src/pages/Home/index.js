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
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    async function loadFilmes() {
      const response = await api.get("movie/now_playing", {
        params: {
          api_key: "d3737e313360a6c56d58916c0228c28a",
          language: "pt",
          page: 1,
        },
      });

      const filmesComVideos = await Promise.all(
        response.data.results.slice(0, 10).map(async (filme) => {
          const videoResponse = await api.get(`movie/${filme.id}/videos`, {
            params: {
              api_key: "d3737e313360a6c56d58916c0228c28a",
              language: "pt",
            },
          });

          return {
            ...filme,
            video: videoResponse.data.results[0]?.key,
          };
        })
      );

      setFilmes(filmesComVideos);
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

  const handleVideoClick = (filmeId) => {
    setActiveVideo(filmeId);
  };

  const closeModal = () => {
    setActiveVideo(null);
  };

  const videoSettings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
  };

  const movieSettings = {
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
      <div className="videos-section">
        <div className="carrosel-video">
          <Slider {...videoSettings}>
            {filmes
              .filter((filme) => filme.video)
              .map((filme) => (
                <div key={filme.id} className="video-slide">
                  <img
                    src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`}
                    alt={filme.title}
                    onClick={() => handleVideoClick(filme.id)}
                  />
                  <i class="fa-solid fa-circle-play"></i>
                  <div className="video-info">
                    <h3>{filme.title}</h3>
                    <div  className="container-bilhete">
                    <div className="bilhete">
                      <a
                        href={`https://www.cinemas.nos.pt/cinemas`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="buy-tickets"
                      >
                        Comprar bilhete
                      </a>
                    </div>
                    </div>
                  </div>
                </div>
              ))}
          </Slider>
        </div>
      </div>

      {/* Seção do Carrossel de Filmes */}
      <div className="filmes-title">
        <h2 className="title-cartaz">Filmes em cartaz</h2>
        <div className="filme-carroussel">
          <Slider {...movieSettings}>
            {filmes.map((filme, index) => (
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
            ))}
          </Slider>
        </div>
      </div>

      {/* Modal para o vídeo */}
      {activeVideo && (
        <div className="video-modal" onClick={closeModal}>
          <div className="video-content" onClick={(e) => e.stopPropagation()}>
            <iframe
              width="100%"
              height="600"
              src={`https://www.youtube.com/embed/${
                filmes.find((filme) => filme.id === activeVideo)?.video
              }?autoplay=1`}
              title="Video Player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <button className="close-button" onClick={closeModal}>
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
