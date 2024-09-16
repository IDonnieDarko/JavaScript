const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = express();

app.use(bodyParser.json());

// Armazenamento em memória
let users = [];
let transactions = [];

// Função de middleware para verificar o token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, 'SECRET_KEY', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Rota raiz para verificar se o servidor está funcionando
app.get('/', (req, res) => {
  res.send('Servidor está funcionando. Acesse as rotas específicas para teste.');
});

// Rota para cadastro de usuário
app.post('/api/register', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Username and password required' });

  const hashedPassword = bcrypt.hashSync(password, 10);
  users.push({ username, password: hashedPassword });

  res.status(201).json({ message: 'User registered' });
});

// Rota para autenticação de usuário
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(user => user.username === username);
  if (!user) return res.status(400).json({ error: 'Invalid username or password' });

  if (!bcrypt.compareSync(password, user.password)) return res.status(400).json({ error: 'Invalid username or password' });

  const accessToken = jwt.sign({ username: user.username }, 'SECRET_KEY', { expiresIn: '1h' });
  res.json({ accessToken });
});

// Rota para realizar transações
app.post('/api/transactions', authenticateToken, (req, res) => {
  const { amount, description } = req.body;
  if (!amount || !description) return res.status(400).json({ error: 'Amount and description required' });

  const transaction = { username: req.user.username, amount, description };
  transactions.push(transaction);

  res.status(201).json({ message: 'Transaction recorded', transaction });
});

// Iniciar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
