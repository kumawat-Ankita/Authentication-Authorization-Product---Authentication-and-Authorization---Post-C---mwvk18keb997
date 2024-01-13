const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const secretKey = 'newtonSchool';

app.use(bodyParser.json());

// Mock user data (Replace with actual user authentication logic)
const users = [
 { id: 1, username: 'user1', password: 'password1' },
  { id: 2, username: 'user2', password: 'password2' },
];

// Mock product data (Replace with actual product retrieval logic)
const products = [
  { id: 1, name: 'Product A', price: 10 },
  { id: 2, name: 'Product B', price: 20 },
];

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Missing token' });

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.status(401).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};
// Authentication endpoint (Students should implement this)
app.post('/login', (req, res) => {
 const { username, password } = req.body;

  // Find the user in mock data (Replace with actual user authentication logic)
  const user = users.find((u) => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  // Generate JWT token
  const token = jwt.sign({ userId: user.id, username: user.username }, secretKey);
  res.status(201).json({ token });
});

// Product route (Students should implement this)
app.get('/product', (req, res) => {
  const user = req.user;

  // Implement actual product retrieval logic here
  // For now, sending mocked product data
  res.status(200).json({ message: 'Product data', products: products });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
