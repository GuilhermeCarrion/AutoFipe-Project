import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles/veiculosDisponiveis.css";

function VeiculosDisponiveis({ veiculos, onDelete }) {
  const navigate = useNavigate();
  
  return (
    <div className="lista-container">
      <h2>Veículos Cadastrados</h2>
      <div className="lista-veiculos">
        {veiculos.length == 0 ? (
          <p>Nenhum veículo cadastrado</p>
        ) : (
          veiculos.map((veiculo) => (
            <div key={veiculo.id} className="veiculo-card">
              <p>
                <strong>{veiculo.modelo}</strong>
              </p>
              <p>{veiculo.marca}</p>
              <p>{veiculo.ano}</p>
              <p>R${veiculo.preco.toLocaleString("pt-BR")}</p>
              <p
                className={
                  veiculo.disponibilidade === "Disponivel"
                    ? "disponivel"
                    : "indisponivel"
                }
              >
                {veiculo.disponibilidade}
              </p>
              <div className="botoes">
                <button
                  className="btn-editar"
                  onClick={() => navigate(`/editar/${veiculo.id}`)}
                >
                  Editar
                </button>
                <button
                  className="btn-deletar"
                  onClick={() => onDelete(veiculo.id)}
                >
                  Excluir
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default VeiculosDisponiveis;
