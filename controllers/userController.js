const { query } = require('../config/database');

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const result = await query('SELECT * FROM customers ORDER BY id ASC');
    res.render('users/index', {
      title: 'Lista de Clientes',
      users: result.rows
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).render('error', {
      title: 'Error',
      message: 'Error al obtener clientes',
      error: error
    });
  }
};

// Show create user form
const showCreateForm = (req, res) => {
  res.render('users/form', {
    title: 'Crear cliente',
    user: null,
    action: '/users'
  });
};

// Create new user
const createUser = async (req, res) => {
  const { name, email } = req.body;
  try {
    await query(
      'INSERT INTO customres (name, email) VALUES ($1, $2)',
      [name, email]
    );
    res.redirect('/users');
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).render('error', {
      title: 'Error',
      message: 'Error al crear cliente',
      error: error
    });
  }
};

// Show edit user form
const showEditForm = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await query('SELECT * FROM customres WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).render('error', {
        title: 'No encontrado',
        message: 'Cliente no encontrado',
        error: { status: 404 }
      });
    }
    res.render('users/form', {
      title: 'Editar Cliente',
      user: result.rows[0],
      action: `/users/${id}`
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).render('error', {
      title: 'Error',
      message: 'Error al obtener cliente',
      error: error
    });
  }
};

// Update user
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  try {
    await query(
      'UPDATE customres SET name = $1, email = $2 WHERE id = $3',
      [name, email, id]
    );
    res.redirect('/users');
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).render('error', {
      title: 'Error',
      message: 'Error al actualizar cliente',
      error: error
    });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await query('DELETE FROM customers WHERE id = $1', [id]);
    res.redirect('/users');
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).render('error', {
      title: 'Error',
      message: 'Error al eliminar cliente',
      error: error
    });
  }
};

module.exports = {
  getAllUsers,
  showCreateForm,
  createUser,
  showEditForm,
  updateUser,
  deleteUser
};
