<?php
require('./Db/config.php');

class Carros{
  private $pdo;

  //Metodo de conexão
  public function __construct($pdo)
  {
    $this->pdo = $pdo;
  }

  function sanitizeCurrency($valor) {
    $valor = str_replace(['R$', '.', ','], ['', '', '.'], $valor);
    return floatval($valor);
  }

  //Create - Metodo de inserir um novo carro
  public function addNewCar($dados){
    $sql = "INSERT INTO catalogo_veiculos (marca, modelo, ano, valor, codigo, disponibilidade) VALUES (?, ?, ?, ?, ?, ?)";
    $stmt = $this->pdo->prepare($sql);

    return $stmt->execute([
      $dados['marca'],
      $dados['modelo'],
      $dados['ano'],
      $dados['valor'],
      $dados['codigo'],
      $dados['disponibilidade'],
    ]);
  }

  public function viewAllCars(){
    $stmt = $this->pdo->query("SELECT * FROM catalogo_veiculos");
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function queryCar($id){
    $sql = "SELECT * FROM catalogo_veiculos WHERE id=?";
    $stmt = $this->pdo->prepare($sql);
    $stmt->excute([$id]);
    return $stmt->fetch(PDO::FETCH_ASSOC);
  }

  public function editCar($id, $dados){
    $sql = "UPDATE catalogo_veiculos SET marca=?, modelo=?, ano=?, valor=?, codigo=?, disponibilidade=? WHERE id=?";
    $stmt = $this->pdo->prepare($sql);
    return $stmt->execute([
      $dados['modelo'],
      $dados['marca'],
      $dados['ano'],
      $dados['valor'],
      $dados['codigo'],
      $dados['disponibilidade'],
      $id
    ]);
  }

  public function deleteCar($id){
    $stmt = $this->pdo->prepare("DELETE FROM catalogo_veiculos WHERE id=?");
    return $stmt->execute([$id]);
  }

}

?>