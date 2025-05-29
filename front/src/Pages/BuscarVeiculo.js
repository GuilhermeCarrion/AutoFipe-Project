import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/buscarVeiculo.css";

function BuscarVeiculo({ veiculos }) {
  const [busca, setBusca] = useState("");
  const [resultados, setResultados] = useState([]);
  const navigate = useNavigate();


  const buscar = () => {
    const buscaUsuario = busca.toLowerCase();
    const filtro = veiculos.filter((item) =>
      item.modelo.toLowerCase().includes(buscaUsuario) ||
      item.marca.toLowerCase().includes(buscaUsuario) ||
      item.ano.toLowerCase().includes(buscaUsuario) ||
      item.codigo.includes(buscaUsuario)
    );
    setResultados(filtro);
  };

  return (
    <div className="buscar-container">
      <h2>Busque seu veículo agora mesmo</h2>

      <div className="barra-pesquisa">
        <input
          type="text"
          placeholder="Digite o modelo, marca ou ano"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        <button onClick={buscar}>Buscar</button>
      </div>

      <h3>Resultados</h3>
      <div className="resultados">
        {resultados.map((item) => (
          <div
            onClick={() => navigate(`/buscar/detalhes/${item.id}`)}
            key={item.id}
            className={`resultado-card ${
              item.disponibilidade === "Disponivel"
                ? "card-disponivel"
                : "card-indisponivel"
            }`}
          >
            <div className="dados">
              <p>
                <strong>{item.modelo}</strong>
              </p>
              <p>{item.marca}</p>
              <p>{item.ano}</p>
              <p>{item.codigo}</p>
              <p
                className={`status ${
                  item.disponibilidade === "Disponivel"
                    ? "disponivel"
                    : "indisponivel"
                }`}
              >
                Disponibilidade: {item.disponibilidade}
              </p>
            </div>
            <div className="precoBusca">R${item.preco.toLocaleString('pt-BR')}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BuscarVeiculo;
