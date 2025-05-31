import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./styleComponents/DetalhesVeiculo.css";

function DetalhesVeiculo({ veiculos, atualizarVeiculos }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [veiculo, setVeiculo] = useState(() =>
    veiculos.find((v) => String(v.id) === id)
  );

  const handleAcao = async (tipo) => {
    try{
      await axios.put(`http://localhost/AutoFipe-Project/back/index.php?id=${veiculo.id}`, {
        ...veiculo, 
        disponibilidade: "Indisponivel",
      },{
        headers: {
          "Content-Type": "application/json",
        }
      });

      alert(`Veículo ${tipo} com sucesso!`);
      setVeiculo((prev) => ({
        ...prev,
        disponibilidade: "Indisponivel",
      }));
    }catch (error) {
      console.error("Erro ao atualizar veiculo:", error);
      alert("Erro ao atualizar status do veículo.");
    }
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
        <span className="preco" >R${Number(veiculo.valor).toLocaleString("pt-BR")}</span>
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
