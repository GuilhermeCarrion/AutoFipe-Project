import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Buscar from "./Pages/BuscarVeiculo";
import VeiculosDisponiveis from "./Pages/VeiculosDisponiveis";
import Adicionar from "./Pages/AdicionarVeiculos";
import QuemSomos from "./Pages/QuemSomos";
import DetalhesVeiculo from "./Components/DetalhesVeiculo";

function App() {
  const [veiculos, setVeiculos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost/back/index.php")
      .then((res) => {
        setVeiculos(res.data);
      })
      .catch((err) => {
        console.error("Erro ao buscar veículos:", err);
      });
  }, []);

  const deletarVeiculo = (id) => {
    axios.delete(`http://localhost/back/index.php?id=${id}`)
      .then(() => {
        setVeiculos((prev) => prev.filter((v) => v.id !== id));
      })
      .catch((err) => {
        console.error("Erro ao deletar veículo: ", err);
      });
  };
  
  return (
    <Router>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/buscar" element={<Buscar veiculos={veiculos} />} />
          <Route
            path="/buscar/detalhes/:id"
            element={<DetalhesVeiculo veiculos={veiculos} />}
          />
          <Route
            path="/veiculos"
            element={
              <VeiculosDisponiveis
                veiculos={veiculos}
                onDelete={deletarVeiculo}
              />
            }
          />
          <Route path="/adicionar" element={<Adicionar />} />
          <Route path="/quem-somos" element={<QuemSomos />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
