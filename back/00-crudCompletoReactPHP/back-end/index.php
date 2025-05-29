<?php
include("Usuarios/API_Usuarios.php");

// tratando o cors
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");  // , PATCH, OPTIONS, 
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: *");
header("Content-type: application/json");


// verifica se chamada foi de origem autorizada.

$data = json_decode(file_get_contents("php://input"), true);

/*
if (isset($data)){
  $str  = implode($data);
  file_put_contents("log.log", $str);
}
*/

/*
if ( !isset($data['token']) || $data['token'] != $token ){
	echo json_encode(array("message" => "Falha - Conexão não autorizada."));
	exit();
}
*/

// Instanciando a classe UsuariosAPI com a conexão PDO
$usuariosAPI = new UsuariosAPI($pdo);

// Verificando o método HTTP e executando a ação correspondente
if ( ($_SERVER['REQUEST_METHOD'] === 'GET') && (!isset($_GET['id']) )) {  // todos usuários
    // Obter todos os usuários no formato array
	$usuarios = $usuariosAPI->consultarUsuarios();
	// acrescenta msg sucesso
	// $usuarios['message'] = "Processo concluído com sucesso.";
    // retorna dados
	echo json_encode($usuarios);
}

if (($_SERVER['REQUEST_METHOD'] === 'GET') && (isset($_GET['id']) )) {  // apenas um usuário
    // Obter todos os usuários no formato array
	$usuarios = $usuariosAPI->consultarUsuario($_GET['id']);
	// acrescenta msg sucesso
	// $usuarios['message'] = "Processo concluído com sucesso.";
    // retorna dados
	echo json_encode($usuarios);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Criar um novo usuário
    $data = json_decode(file_get_contents("php://input"), true);
	$data['senha'] = md5($data['senha']);
    if ($usuariosAPI->criarUsuario($data['cpf'], $data['nome'], $data['email'], $data['login'], $data['senha'])) {
        echo json_encode(array("message" => "Usuário criado com sucesso."));
    } else {
        echo json_encode(array("message" => "Falha ao criar usuário."));
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    // Atualizar um usuário
    $data = json_decode(file_get_contents("php://input"), true);
	//file_put_contents("log.log", print_r($data));
    if ($usuariosAPI->atualizarUsuario($data['id'], $data['cpf'], $data['nome'], $data['email'], $data['login'], $data['senha'])) {
        echo json_encode(array("message" => "Usuário atualizado com sucesso."));
    } else {
        echo json_encode(array("message" => "Falha ao atualizar usuário."));
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'DELETE' && (isset($_GET['id']) )) {
    // Excluir um usuário
    if ($usuariosAPI->excluirUsuario($_GET['id'])) {   // pelo php://input  seria $data['id']
        echo json_encode(array("message" => "Usuário excluído com sucesso."));
    } else {
        echo json_encode(array("message" => "Falha ao excluir usuário."));
    }
}
?>