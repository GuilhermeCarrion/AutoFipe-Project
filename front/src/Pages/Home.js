import "./styles/home.css";

function Home() {
  return (
    <div className="home-container">
      <div className="home-text">
        <h1>
          Bem-vindo à <span className="highlight">AutoFipe</span>,
        </h1>
        <p>
          a sua <span className="link">paltaforma confiável</span> para
          encontrar, consultar, comprar e anunciar veículos com total segurança
          e praticidade. Aqui você pode{" "}
          <span className="link">buscar informações de carros disponíveis</span>{" "}
          de veículos usando o código Fipe, explorar uma{" "}
          <span className="link">lista de carros disponíveis</span> para compra
          ou alguel e ainda <span className="link">a AutouFipe está aqui</span>{" "}
          para tornar sua experiencia mais simples, rápida e transparente.
        </p>
        <br/>
        <p>A AutoFipe <span className="link">é um protótipo</span> de uma loja de aluguéis e compra de veículos. Oferecemos cinco opções de funcionalidades, dentre elas:</p>
        <br/>
        <ul>
          <li><b>Home</b> - <span className="link">Você está aqui agora</span>, a home é nossa página inicial, te apresentamos um pouco a nossa proposta de projeto e ajudamos você a testa-la.</li>
          <li><b>Buscar Veículo</b> - Onde você ja pode buscar imadiatamente seu veículo que está procurando, caso encontre ele pode comprar ou ate alugar.</li>
          <li><b>Veículos Disponíveis</b> - Aqui você pode ver todos os carros que temos no nosso catálogo e sua disponibilidade.</li>
          <li><b>Adicionar Veículo</b> - Seria uma simulação de um funcionário ou até mesmo um cliente colocando um carro novo ao estoque, você pode alterar tudo sobre o veículo.</li>
          <li><b>Quem somos</b> - A parte onde o criador dessa ideia é apresentado e colocado suas informações para a avaliação do projeto.</li>
        </ul>
      </div>

      <div className="home-card">
        <h2 className="novidade-title">Novidade</h2>
        <div className="card">
          <div className="card-image">Img carro</div>
          <div className="card-info">
            <h3>Carro Modelo Potencia</h3>
            <p>Marca: BMW</p>
            <p>Fipe: 32144-3</p>
            <p>Valor: R$99.999</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
