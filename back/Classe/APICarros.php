<?php
require('./Db/config.php');

class Carros{
  private $pdo;

  //Metodo de conexão
  public function __construct($pdo)
  {
    $this->pdo = $pdo;
  }

  //Create - Metodo de inserir um novo carro
  public function addNewCar($dados){
    $sql = "INSERT INTO carros (modelo, marca, valor, ano) VALUES (?, ?, ?, ?)";
    $stmt = $this->pdo->prepare($sql);
    return $stmt->execute([
      $dados['modelo'],
      $dados['marca'],
      $dados['valor'],
      $dados['ano'],
    ]);
  }

  public function viewAllCars(){
    $stmt = $this->pdo->query("SELECT * FROM carros");
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function queryCar($id){
    $sql = "SELECT * FROM carros WHERE id=?";
    $stmt = $this->pdo->prepare($sql);
    $stmt->excute([$id]);
    return $stmt->fetch(PDO::FETCH_ASSOC);
  }

  public function editCar($id, $dados){
    $sql = "UPDATE carros SET modelo=?, marca=?, valor=?, ano=? WHERE id=?";
    $stmt = $this->pdo->prepare($sql);
    return $stmt->execute([
      $dados['modelo'],
      $dados['marca'],
      $dados['valor'],
      $dados['ano'],
      $id
    ]);
  }

  public function deleteCar($id){
    $stmt = $this->pdo->prepare("DELETE FROM carros WHERE id=?");
    return $stmt->execute([$id]);
  }

}

?>