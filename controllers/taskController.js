const { query } = require("../config/database");

// Get all tasks with joined data
const getAllTasks = async (req, res) => {
  try {
    const text = `
      SELECT t.*, p.name as project_name, st.name as status_name 
      FROM tasks t
      JOIN projects p ON t.project_id = p.id
      JOIN status_tasks st ON t.status_task_id = st.id
      ORDER BY t.id ASC
    `;
    const result = await query(text);
    res.render('tasks/index', { tasks: result.rows });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).render('error', { 
        message: "Error fetching tasks", 
        error: { status: 500 }
    });
  }
};

// Show create task form
const createTaskForm = async (req, res) => {
  try {
    const projects = await query("SELECT * FROM projects ORDER BY name ASC");
    const statusTasks = await query("SELECT * FROM status_tasks ORDER BY name ASC");
    res.render('tasks/create', { 
      projects: projects.rows,
      statusTasks: statusTasks.rows
    });
  } catch (error) {
    console.error("Error preparing task form:", error);
    res.status(500).render('error', {
      message: "Error loading form data",
      error: { status: 500 }
    });
  }
};

// Create new task
const createTask = async (req, res) => {
  const { name, start_date, end_date, project_id, status_task_id } = req.body;
  try {
    // Handle empty end_date for NULL
    const finalEndDate = end_date === '' ? null : end_date;
    
    await query(
      "INSERT INTO tasks (name, start_date, end_date, project_id, status_task_id) VALUES ($1, $2, $3, $4, $5)",
      [name, start_date, finalEndDate, project_id, status_task_id]
    );
    res.redirect('/tasks');
  } catch (error) {
    console.error("Error creating task:", error);
     res.status(500).render('error', {
      message: "Error creating task",
      error: { status: 500 }
    });
  }
};

module.exports = {
  getAllTasks,
  createTaskForm,
  createTask
};
