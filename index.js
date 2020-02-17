const express = require('express');

const server = express();

server.use(express.json());

const users = ['Diego', 'Carlos', 'Roberto'];

// Listagem de usuários
server.get('/users', (req, res) => {
  return res.json(users);
});

// Listar usuário
server.get('/users/:index', (req, res) => {
  const { index } =  req.params;

  return res.json(users[index]);
});

// Cadastrar usuário
server.post('/users', (req, res) => {
  const { name } = req.body;

  users.push(name);

  return res.json(users);

});

// Alterar usuários
server.put('/users/:index', (req, res) => {
  const { index } =  req.params;
  const { name } = req.body;

  users[index] = name;

  return res.json(users[index]);
});

// Deletar usuário
server.delete('/users/:index', (req, res) => {
  const { index } =  req.params;

  users.splice(index, 1);

  return res.send();

});

server.listen(3000);