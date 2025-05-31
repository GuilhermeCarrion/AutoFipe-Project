import "./styles/QuemSomos.css";

function QuemSomos(){
  return (
    <div className="quem-somos-container">
      <h1>Quem Somos</h1>
      <h2>Guilherme Carrion Caldeira Ribeiro</h2>
      <h2>RA: 219693</h2>
      <p>
        Este projeto foi desenvolvido como uma aplicação completa de gerenciamento de veículos,
        utilizando as tecnologias <strong>React</strong> no frontend e <strong>PHP com PDO</strong> no backend.
        Os dados dos veículos são armazenados e manipulados em um banco de dados <strong>MySQL</strong>, 
        e as interações entre cliente e servidor são feitas via <strong>API REST</strong>.
        O sistema permite buscar, adicionar, editar, visualizar detalhes, comprar e alugar veículos de maneira eficiente.
      </p>
    </div>
  );
}

export default QuemSomos;