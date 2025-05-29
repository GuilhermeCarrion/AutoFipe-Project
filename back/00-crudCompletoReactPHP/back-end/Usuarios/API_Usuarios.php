<?php
// Arquivo: api_usuarios.php

// Incluindo arquivo de configuração do banco de dados
require 'Db/config.php';

// Classe para manipulação dos usuários
class UsuariosAPI {
    private $pdo;

    // Construtor para inicializar a conexão PDO
    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    // Método para criar um novo usuário
    public function criarUsuario($cpf, $nome, $email, $login, $senha) {
        $sql = "INSERT INTO usuarios (cpf, nome, email, login, senha) VALUES (?, ?, ?, ?, ?)";
        $stmt = $this->pdo->prepare($sql);
        return $stmt->execute([$cpf, $nome, $email, $login, $senha]);
    }

    // Método para obter todos os usuários
    public function consultarUsuarios() {
        $stmt = $this->pdo->query("SELECT * FROM usuarios");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
	
    // Método para obter apenas um usuario
    public function consultarUsuario($id) {
		$sql = "SELECT * FROM usuarios WHERE id=?";
		$stmt = $this->pdo->prepare($sql);
		$stmt->execute([$id]);
		return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }	

    // Método para atualizar um usuário
    public function atualizarUsuario($id, $cpf, $nome, $email, $login, $senha) {
        $sql = "UPDATE usuarios SET cpf=?, nome=?, email=?, login=?, senha=? WHERE id=?";
        $stmt = $this->pdo->prepare($sql);
        return $stmt->execute([$cpf, $nome, $email, $login, $senha, $id]);
    }

    // Método para excluir um usuário
    public function excluirUsuario($id) {
        $stmt = $this->pdo->prepare("DELETE FROM usuarios WHERE id=?");
        return $stmt->execute([$id]);
    }
}

?>
