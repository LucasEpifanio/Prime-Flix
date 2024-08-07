import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./filmes-info.css";

import api from "../../services/api";

function Filme() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [filme, setFilme] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFilmes() {
      await api
        .get(`/movie/${id}`, {
          params: {
            api_key: "d3737e313360a6c56d58916c0228c28a",
            language: "pt-BR",
          },
        })
        .then((response) => {
          setFilme(response.data);
          setLoading(false);
        })
        .catch(() => {
          navigate("/", { replace: true });
          return;
        });
    }

    loadFilmes();
  }, [navigate, id]);

  function salvarFilme() {
    const minhaLista = localStorage.getItem("@primeflix");

    let filmesSalvos = JSON.parse(minhaLista) || [];

    const hasFilme = filmesSalvos.some( (filmesSalvo) => filmesSalvo.id === filme.id)

    if(hasFilme){
        alert("Esse filme já esta na lista");
        return;
    }

    filmesSalvos.push(filme);
    localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
    alert("Filme salvo com sucesso")

  }

  if (loading) {
    return (
      <div className="loading">
        <h3>Carregando detalhes...</h3>
      </div>
    );
  }

  return (
    <div className="filme-info">
      <div className="title-info">
        <h1>{filme.title}</h1>
        <p>
          Status: <p className="status">{filme.status}</p>
        </p>
      </div>
      <img
        src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`}
        alt={File.title}
      ></img>

      <h3>Sinopse</h3>
      <span>{filme.overview}</span>

      <strong>Avaliação: {filme.vote_average} / 10</strong>

      <div className="area-buttons">
        <button className="btn" onClick={salvarFilme}>Salvar</button>
        <a target="blank"
          href={`https://youtube.com/results?search_query=${filme.title} Trailer`}
        >
          <button className="btn">Trailer</button>
        </a>
      </div>
    </div>
  );
}

export default Filme;
