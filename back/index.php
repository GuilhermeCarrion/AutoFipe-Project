<?php 

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if($_SERVER['REQUEST_METHOD'] === "OPTIONS"){
  http_response_code(204);
  exit();
}

require("./Classe/APICarros.php");

$carro = new Carros($pdo);

  $method = $_SERVER['REQUEST_METHOD'];

  switch($method){
    case 'GET':
      if(isset($_GET['id'])){
        echo json_encode($carro->queryCar($_GET['id']));
      }else{
        echo json_encode($carro->viewAllCars());
      }
      break;
    case 'POST':
      $data = json_decode(file_get_contents("php://input"), true);
      if($carro->addNewCar($data)){
        echo json_encode(['mensagem' => 'Carro inserido com sucesso!', 'veiculos' => $carro->viewAllCars()]);
      }else{
        http_response_code(500);
        echo json_encode(["erro" => "Erro ao inserir carro."]);
      }
      break;
    case 'PUT':
      parse_str($_SERVER['QUERY_STRING'], $query);
      $data = json_decode(file_get_contents("php://input"), true);
      if(isset($query['id']) && $carro->editCar($query['id'], $data)){
        echo json_encode(['mensagem' => 'Carro editado com sucesso!']);
      }else{
        http_response_code(400);
        echo json_encode(['erro' => 'Erro ao atualizar']);
      }
      break;
    case 'DELETE':
      parse_str($_SERVER['QUERY_STRING'], $query);
      if(isset($query['id']) && $carro->deleteCar($query['id'])){
        echo json_encode(['mensagem' => 'Carro deleteado com sucesso!']);
      }else{
        http_response_code(400);
        echo json_encode(['erro' => 'Erro ao deletar carro']);
      }
      break;
    default:
      http_response_code(405);
      echo json_encode(['erro' => 'Método não permitido']);
      break;
  };


?>