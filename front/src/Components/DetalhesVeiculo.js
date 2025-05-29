import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./DetalhesVeiculo.css";

function DetalhesVeiculo({ veiculos }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [veiculo, setVeiculo] = useState(() =>
    veiculos.find((v) => String(v.id) === id)
  );

  const handleAcao = (tipo) => {
    alert(`Veículo ${tipo} com sucesso!`);
    setVeiculo((prev) => ({
      ...prev,
      disponibilidade: tipo === "comprado" ? "Vendido" : "Alugado",
    }));
  };

  if (!veiculo) {
    console.log(id);
    return <p>Veículo não encontrado</p>;
  }
  return (
    <div className="detalhes-container">
      <h2>Veículo Selecionado</h2>
      <div className="detalhes-card">
        <p>{veiculo.modelo}</p>
        <p>
          {veiculo.marca} - {veiculo.codigo}
        </p>
        <span className="preco" >R${veiculo.preco.toLocaleString("pt-BR")}</span>
        {veiculo.disponibilidade === "Disponivel" && (
          <>
            <button
              className="btn-compra"
              onClick={() => handleAcao("comprado")}
            >
              Comprar agora
            </button>
            <button
              className="btn-alugar"
              onClick={() => handleAcao("alugado")}
            >
              Alugue agora
            </button>
          </>
        )}
        <button className="btn-voltar" onClick={() => navigate(-1)}>
          Voltar
        </button>
      </div>
    </div>
  );
}

export default DetalhesVeiculo;
