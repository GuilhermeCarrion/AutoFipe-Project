import estilo from './UserCrud.css'
import cartao from './Card.css'

import React, { useState, useEffect } from 'react';

function UserCrud({ userData }) {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    cpf: '',
    nome: '',
    email: '',
    login: '',
    senha: ''
  });

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchUsers();
    if (userData) {
      setFormData(userData);
    }
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost/cursoReact/01-Cad/cadusuarioBackEnd/');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let response;
      if (formData.id) {
        response = await fetch(`http://localhost/cursoReact/01-Cad/cadusuarioBackEnd/?id=${formData.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
      } else {
        response = await fetch('http://localhost/cursoReact/01-Cad/cadusuarioBackEnd/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
      }
      if (response.ok) {
        setFormData({
          id: '',
          cpf: '',
          nome: '',
          email: '',
          login: '',
          senha: ''
        });
        fetchUsers();
        setShowForm(false); // Esconder o formulário após a submissão bem-sucedida
      }
    } catch (error) {
      console.error('Erro ao salvar usuário:', error);
    }
  };

  const handleEditUser = (user) => {
    setFormData(user);
    setShowForm(true); // Mostrar o formulário ao editar um usuário
  };

  const handleDeleteUser = async (id) => {
    try {
      const response = await fetch(`http://localhost/cursoReact/01-Cad/cadusuarioBackEnd/?id=${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchUsers();
      }
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
    }
  };

  return (
    <div className={estilo}>
      <h1>CRUD de Usuário</h1>
      <button onClick={() => setShowForm(true)}>Novo</button>
      {showForm && (
       <form onSubmit={handleSubmit}>
        <input type="hidden" name="id" value={formData.id} onChange={handleInputChange} />
        <div>
          <label>Cpf:</label>
          <input type="text" name="cpf" value={formData.cpf} onChange={handleInputChange} />
        </div>
        <div>
          <label>Nome:</label>
          <input type="text" name="nome" value={formData.nome} onChange={handleInputChange} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
        </div>
        <div>
          <label>Login:</label>
          <input type="text" name="login" value={formData.login} onChange={handleInputChange} />
        </div>   
        <div>
          <label>Senha:</label>
          <input type="password" name="senha" value={formData.senha} onChange={handleInputChange} />
        </div>             
        <button type="submit">{formData.id ? 'Atualizar' : 'Adicionar'}</button>
      </form>
      )}
      <h2>Usuários</h2>
      <div>
      <ul class="card">
        {users.map(user => (
          <li key={user.id}>
            {user.nome} - {user.email}
            <button onClick={() => handleEditUser(user)}>Editar</button>
            <button onClick={() => handleDeleteUser(user.id)}>Excluir</button>
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
}

export default UserCrud;
