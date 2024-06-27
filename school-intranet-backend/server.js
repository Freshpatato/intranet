const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const { sequelize, User } = require('./models');
const ldapRoutes = require('./routes/ldapRoutes');
const scheduleRoutes = require('./routes/scheduleRoutes');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).send('User already exists');
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = await User.create({ username, password: hashedPassword });
    res.status(201).send('User created');
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send('Internal server error');
  }
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).send('Invalid credentials');
    }

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(401).send('Invalid credentials');
    }

    res.json({ username: user.username, roles: user.roles || [] }); // Assuming user.roles contains an array of roles
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).send('Internal server error');
  }
});

app.use('/api/ldap', ldapRoutes);
app.use('/api/schedules', scheduleRoutes);

sequelize.sync().then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(error => {
  console.error('Unable to sync the database:', error);
});
