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
      try {
        const res = await axios.get(
          "https://fipe.parallelum.com.br/api/v2/cars/brands"
        );
        setMarcas(res.data);
      } catch (error) {
        console.error("Erro ao buscar marcas", error);
      }
    };
    fetchMarcas();
  }, []);

  //Buscar modelos quando a marca mudar
  useEffect(() => {
    const fetchModelos = async () => {
      if (!marcaSelecionada) return;
      try {
        const res = await axios.get(
          `https://fipe.parallelum.com.br/api/v2/cars/brands/${marcaSelecionada}/models`
        );
        setModelos(res.data);
      } catch (error) {
        console.error("Erro ao buscar modelos", error);
      }
    };
    fetchModelos();
  }, [marcaSelecionada]);

  //Buscar ano quando modelo mudar
  useEffect(() => {
    const fecthAno = async () => {
      if (!marcaSelecionada || !modeloSelecionado) return;
      try {
        const res = await axios.get(
          `https://fipe.parallelum.com.br/api/v2/cars/brands/${marcaSelecionada}/models/${modeloSelecionado}/years`
        );
        setAnos(res.data);
      } catch (error) {
        console.error("Erro ao buscar anos", error);
      }
    };
    fecthAno();
  }, [modeloSelecionado]);

  //Buscar detalhes quando ano mudar
  useEffect(() => {
    const fecthDetalhes = async () => {
      if (!marcaSelecionada || !modeloSelecionado || !anoSelecionado) return;
      try {
        const res = await axios.get(
          `https://fipe.parallelum.com.br/api/v2/cars/brands/${marcaSelecionada}/models/${modeloSelecionado}/years/${anoSelecionado}`
        );
        setDetalhes(res.data);
      } catch (error) {
        console.error("Erro ao buscar detalhes", error);
      }
    };
    fecthDetalhes();
  }, [anoSelecionado]);


  const adicionarVeiculo = async () => {
    if(!detalhes) return;

    const precoNumerico = Number(
      detalhes.price.replace("R$", "").replace(/\./g, "").replace(",", ".").trim()
    );

    const dados = {
      marca: detalhes.brand,
      modelo: detalhes.model,
      ano: detalhes.modelYear + " " + detalhes.fuel,
      valor: precoNumerico,
      codigo: detalhes.codeFipe,
      disponibilidade: "Disponivel",
    };

    console.log(dados);

    try{
      await axios
      .post("http://localhost/AutoFipe-Project/back/index.php", dados);
      alert("Veículo adicionado com sucesso!");
    }catch(error){
      console.error("Erro ao adicionar veículo", error);
      alert("Erro ao adicionar veículo.");
    }
  };

  return (
    <div className="adicionar-container">
      <h2>Adicionar Veículo</h2>

      <div className="form-linha">
        <label>Marca:</label>
        <select
          onChange={(e) => setMarcaSelecionada(e.target.value)}
          defaultValue=""
        >
          <option value="" disabled>
            Selecione a marca
          </option>
          {marcas.map((marca) => (
            <option key={marca.code} value={marca.code}>
              {marca.name}
            </option>
          ))}
        </select>
      </div>

      {modelos.length > 0 && (
        <div className="form-linha">
          <label>Modelo:</label>
          <select
            onChange={(e) => setModeloSelecionado(e.target.value)}
            defaultValue=""
          >
            <option value="" disabled>
              Selecione o modelo
            </option>
            {modelos.map((modelo) => (
              <option key={modelo.code} value={modelo.code}>
                {modelo.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {anos.length > 0 && (
        <div className="form-linha">
          <label>Ano:</label>
          <select
            onChange={(e) => setAnoSelecionado(e.target.value)}
            defaultValue=""
          >
            <option value="" disabled>
              Selecione o ano
            </option>
            {anos.map((ano) => (
              <option key={ano.code} value={ano.code}>
                {ano.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {detalhes && (
        <div className="detalhes-card">
          <h4>
            {detalhes.brand} {detalhes.model}
          </h4>
          <p>
            Ano: {detalhes.modelYear} ({detalhes.fuel})
          </p>
          <p>Valor: {detalhes.price.toLocaleString("pt-BR")}</p>
          <button onClick={adicionarVeiculo}>Adicionar</button>
        </div>
      )}
    </div>
  );
}

export default AdicionarVeiculos;
