const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User'); // Assurez-vous que le chemin est correct
const connectDB = require('./config/db');

const initUsers = async () => {
  await connectDB();

  const users = [
    { username: 'admin', password: 'admin123', role: 'admin' },
    { username: 'teacher', password: 'teacher123', role: 'teacher' },
    { username: 'student', password: 'student123', role: 'student' },
  ];

  for (const user of users) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await User.create(user);
  }

  console.log('Initial users created');
  mongoose.connection.close();
};

initUsers();
