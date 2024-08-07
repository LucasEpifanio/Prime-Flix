import { Link } from "react-router-dom";
import "./erro.css";

function Erro() {
  return (
    <div className="not-found">
      <h1>404</h1>
      <h2>Página não encontrada!</h2>
      <Link to="/">
        <button class="btn" >Veja todos os filmes!</button>
      </Link>
    </div>
  );
}

export default Erro;
