const { query } = require('../config/database');

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const result = await query('SELECT * FROM users ORDER BY id ASC');
    res.render('users/index', {
      title: 'Lista de Usuarios',
      users: result.rows
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).render('error', {
      title: 'Error',
      message: 'Error al obtener usuarios',
      error: error
    });
  }
};

// Show create user form
const showCreateForm = (req, res) => {
  res.render('users/form', {
    title: 'Crear Usuario',
    user: null,
    action: '/users'
  });
};

// Create new user
const createUser = async (req, res) => {
  const { name, email } = req.body;
  try {
    await query(
      'INSERT INTO users (name, email) VALUES ($1, $2)',
      [name, email]
    );
    res.redirect('/users');
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).render('error', {
      title: 'Error',
      message: 'Error al crear usuario',
      error: error
    });
  }
};

// Show edit user form
const showEditForm = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await query('SELECT * FROM users WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).render('error', {
        title: 'No encontrado',
        message: 'Usuario no encontrado',
        error: { status: 404 }
      });
    }
    res.render('users/form', {
      title: 'Editar Usuario',
      user: result.rows[0],
      action: `/users/${id}`
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).render('error', {
      title: 'Error',
      message: 'Error al obtener usuario',
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
      'UPDATE users SET name = $1, email = $2 WHERE id = $3',
      [name, email, id]
    );
    res.redirect('/users');
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).render('error', {
      title: 'Error',
      message: 'Error al actualizar usuario',
      error: error
    });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await query('DELETE FROM users WHERE id = $1', [id]);
    res.redirect('/users');
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).render('error', {
      title: 'Error',
      message: 'Error al eliminar usuario',
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
