const express = require('express');

const server = express();

server.use(express.json());

const users = ['Diego', 'Carlos', 'Roberto'];

// Middleware Global
server.use((req, res, next) => {
  console.time('Request');
  console.log(`Método: ${req.method}; URL: ${req.url}`);

  next();

  console.timeEnd('Request');
});

// Middleware Local
function checkUserExists(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: ' User name is required' });
  }

  return next();
}

function checkUserInArray(req, res, next) {
  const user = users[req.params.index];

  if (!user) {
    return res.status(400).json({ error: 'User does not exists'});
  }

  req.user = user;

  return next();
}

// Listagem de usuários
server.get('/users', (req, res) => {
  return res.json(req.user);
});

// Listar usuário
server.get('/users/:index', checkUserInArray, (req, res) => {
  const { index } =  req.params;

  return res.json(users[index]);
});

// Cadastrar usuário
server.post('/users', checkUserExists, (req, res) => {
  const { name } = req.body;

  users.push(name);

  return res.json(users);

});

// Alterar usuários
server.put('/users/:index', checkUserInArray, checkUserExists, (req, res) => {
  const { index } =  req.params;
  const { name } = req.body;

  users[index] = name;

  return res.json(users[index]);
});

// Deletar usuário
server.delete('/users/:index', checkUserInArray, (req, res) => {
  const { index } =  req.params;

  users.splice(index, 1);

  return res.send();

});

server.listen(3000);