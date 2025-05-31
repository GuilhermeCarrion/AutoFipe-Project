import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/buscarVeiculo.css";

function BuscarVeiculo({ veiculos, atualizarVeiculos }) {
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

  useEffect(() => {
    atualizarVeiculos();
  }, [veiculos]);

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
        {resultados.map((veiculo) => (
          <div
            onClick={() => navigate(`/buscar/detalhes/${veiculo.id}`)}
            key={veiculo.id}
            className={`resultado-card ${
              veiculo.disponibilidade === "Disponivel"
                ? "card-disponivel"
                : "card-indisponivel"
            }`}
          >
            <div className="dados">
              <p>
                <strong>{veiculo.modelo}</strong>
              </p>
              <p>{veiculo.marca}</p>
              <p>{veiculo.ano}</p>
              <p>{veiculo.codigo}</p>
              <p
                className={`status ${
                  veiculo.disponibilidade === "Disponivel"
                    ? "disponivel"
                    : "indisponivel"
                }`}
              >
                Disponibilidade: {veiculo.disponibilidade}
              </p>
            </div>
            <div className="precoBusca">R${veiculo.valor.toLocaleString("pt-BR")}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BuscarVeiculo;
