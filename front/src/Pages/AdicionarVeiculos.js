import { useEffect, useState } from "react";
import axios from "axios";
import "./styles/adicionarVeiculos.css";

function AdicionarVeiculos() {
  const [marcas, setMarcas] = useState([]);
  const [modelos, setModelos] = useState([]);
  const [anos, setAnos] = useState([]);
  const [detalhes, setDetalhes] = useState(null);

  const [marcaSelecionada, setMarcaSelecionada] = useState("");
  const [modeloSelecionado, setModeloSelecionado] = useState("");
  const [anoSelecionado, setAnoSelecionado] = useState("");

  //Buscar marcas
  useEffect(() => {
    const fetchMarcas = async () => {
      try{
        const res = await axios.get("https://fipe.parallelum.com.br/api/v2/cars/brands");
        setMarcas(res.data);

      }catch (error){
        console.error("Erro ao buscar marcas", error);
      }
    };
    fetchMarcas();
  }, []);

  //Buscar modelos quando a marca mudar
  useEffect(() => {
    if (marcaSelecionada) {
      axios
        .get(
          `https://fipe.parallelum.com.br/api/v2/cars/brands/${marcaSelecionada}/models`
        )
        .then((res) => setModelos(res.data.models))
        .catch((err) => console.error("Erro ao buscar modelos", err));
    }
  }, [marcaSelecionada]);

  //Buscar ano quando modelo mudar
  useEffect(() => {
    if (marcaSelecionada && modeloSelecionado) {
      axios
        .get(
          `https://fipe.parallelum.com.br/api/v2/cars/brands/${marcaSelecionada}/models/${modeloSelecionado}/years`
        )
        .then((res) => setAnos(res.data))
        .catch((err) => console.error("Erro ao buscar anos", err));
    }
  }, [modeloSelecionado]);

  //Buscar detalhes quando ano mudar
  useEffect(() => {
    if (marcaSelecionada && modeloSelecionado && anoSelecionado) {
      axios
        .get(
          `https://fipe.parallelum.com.br/api/v2/cars/brands/${marcaSelecionada}/models/${modeloSelecionado}/years/${anoSelecionado}`
        )
        .then((res) => setDetalhes(res.data))
        .catch((err) => console.error("Erro ao buscar detaalhes", err));
    }
  }, [anoSelecionado]);

  const adicionarVeiculo = () => {
    const dados = {
      marca: detalhes.brand,
      modelo: detalhes.modelo,
      ano: detalhes.modelYear + " " + detalhes.fuel,
      preco: detalhes.price,
      codigo: detalhes.codeFipe,
      disponibilidade: "Disponivel",
    };

    axios
      .post("https://localhost/back/index.php", dados)
      .then(() => alert("Veículo adicionado com sucesso!"))
      .catch(() => alert("Erro ao adicionar veículo."));
  };

  return (
    <div className="adicionar-container">
      <h2>Adicionar Veículo</h2>

      <div className="form-linha">
        <label>Marca:</label>
        <select onChange={(e) => setMarcaSelecionada(e.target.value)} defaultValue=''>
          <option value="" disabled>
            Selecione a marca
          </option>
          {marcas.map(marca => (
            <option key={marca.codigo} value={marca.codigo}>{marca.nome}</option>
          ))}
        </select>
      </div>

        {modelos.length > 0 && (
          <div className="form-linha">
            <label>Modelo:</label>
            <select onChange={(e) => setModeloSelecionado(e.target.value)}defaultValue=''>
              <option value='' disabled>Selecione o modelo</option>
              {modelos.map(modelo => (
                <option key={modelo.code} value={modelo.code}>{modelo.name}</option>
              ))}
            </select>
          </div>
        )}
      
      {anos.length > 0 && (
        <div className="form-linha">
          <label>Ano:</label>
          <select onChange={e => setAnoSelecionado(e.target.value)} defaultValue=''>
            <option value="" disabled>Selecione o ano</option>
            {anos.map(ano => (
              <option key={ano.code} value={ano.code}>{ano.name}</option>
            ))}
          </select>
        </div>
      )}

      {detalhes && (
        <div className="detalhes-card">
          <h4>{detalhes.brand} {detalhes.model}</h4>
          <p>Ano: {detalhes.modelYear} ({detalhes.fuel})</p>
          <p>Preço: R${detalhes.price.toLocaleString('pt-BR')}</p>
          <button onClick={adicionarVeiculo}>Adicionar</button>
        </div>
      )}
    </div>
  );
}

export default AdicionarVeiculos;
