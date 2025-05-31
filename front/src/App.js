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
import EditarVeiculo from "./Components/EditarVeiculo";

function App() {
  const [veiculos, setVeiculos] = useState([]);

  const buscarVeiculos = async () => {
    try{
      const res = await axios
      .get("http://localhost/AutoFipe-Project/back/index.php");
      setVeiculos(res.data);
    }catch (error) {
      console.error("Erro ao buscar veículos:", error);
    }
  };

  useEffect(() => {
    buscarVeiculos();
  }, []);

  const deletarVeiculo = (id) => {
    axios.delete(`http://localhost/AutoFipe-Project/back/index.php?id=${id}`)
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
          <Route path="/buscar" element={<Buscar veiculos={veiculos} atualizarVeiculos={buscarVeiculos} />} />
          <Route
            path="/buscar/detalhes/:id"
            element={<DetalhesVeiculo veiculos={veiculos} atualizarVeiculos={buscarVeiculos} />}
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
          <Route path="/veiculos/editar/:id" element={<EditarVeiculo veiculos={veiculos} atualizarVeiculos={buscarVeiculos}/>}/>
          <Route path="/adicionar" element={<Adicionar />} />
          <Route path="/quem-somos" element={<QuemSomos />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
