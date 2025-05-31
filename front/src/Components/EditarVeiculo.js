import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./styleComponents/EditarVeiculo.css";

function EditarVeiculo({ veiculos, atualizarVeiculos }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    modelo: "",
    marca: "",
    ano: "",
    valor: "",
    codigo: "",
    disponibilidade: "",
  });

  useEffect(() => {
    const veiculo = veiculos.find((v) => String(v.id) === id);
    if (veiculo) {
      setForm(veiculo);
    }else{
      alert("Veiculo não encontrado.");
      navigate("/veiculos");
    }
  }, [id, veiculos]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost/AutoFipe-Project/back/index.php?id=${id}`,
        form,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("Veiculo atualizado com sucesso!");
      atualizarVeiculos();
      navigate("/veiculos");
    } catch (error) {
      console.error("Erro ao atualizar veículo:", error);
      alert("Erro ao atualizar veículo.");
    }
  };

  return (
    <div className="form-container">
      <h2>Editar Veiculo</h2>
      <form onSubmit={handleSubmit}>
        <label>Modelo:</label>
        <input
          name="modelo"
          value={form.modelo}
          onChange={handleChange}
          placeholder="Modelo"
        />
        <label>Marca:</label>
        <input
          name="marca"
          value={form.marca}
          onChange={handleChange}
          placeholder="Marca"
        />
        <label>Ano:</label>
        <input
          name="ano"
          value={form.ano}
          onChange={handleChange}
          placeholder="Ano"
        />
        <label>Codigo Fipe:</label>
        <input
          name="codigo"
          value={form.codigo}
          onChange={handleChange}
          placeholder="Codigo Fipe"
        />
        <label>Valor:</label>
        <input
          name="valor"
          value={form.valor}
          onChange={handleChange}
          placeholder="Valor"
        />
        <label>Disponibilidade:</label>
        <select
          name="disponibilidade"
          value={form.disponibilidade}
          onChange={handleChange}
          placeholder="Disponibilidade"
        >
          <option value="Disponivel">Disponivel</option>
          <option value="Indisponivel">Indisponivel</option>
        </select>
        <button className="btn btn-salvar" type="submit">
          Salvar Alterações
        </button>
        <button className="btn btn-voltar" onClick={() => navigate(-1)}>
          Cancelar
        </button>
      </form>
    </div>
  );
}
export default EditarVeiculo;
