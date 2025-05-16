const User = require('../models/user');

exports.createUser = async (req, res) => {
  const { name, email, phone, country } = req.body;
  if (!name || !email) return res.status(400).json({ error: 'Name and email required' });

  try {
    const user = await User.create({ name, email, phone, country });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create user' });
  }
};

exports.getUsers = async (req, res) => {
  const users = await User.findAll();
  res.json(users);
};

exports.updateUser = async (req, res) => {
  try {
    await User.update(req.body, { where: { id: req.params.user_id } });
    res.json({ message: 'User updated' });
  } catch {
    res.status(500).json({ error: 'Failed to update user' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.destroy({ where: { id: req.params.user_id } });
    res.json({ message: 'User deleted' });
  } catch {
    res.status(500).json({ error: 'Failed to delete user' });
  }
};
