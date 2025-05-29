<?php 

  $host = 'localhost';
  $db = 'test';
  $user = 'root';
  // $password = 'guilhermecarrion69_';
  $password = '';

  try{
    $pdo = new PDO("mysql:host$host;dbname:$db", $user, $password);
    //echo "conexão bem sucedida";
  } catch(PDOException $e){
    die("Erro ao conectar ao banco de dados: " . $e->getMessage());
  }

?>