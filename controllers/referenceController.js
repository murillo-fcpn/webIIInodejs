const { query } = require("../config/database");

// --- Project Types ---

// Get all project types
const getAllProjectTypes = async (req, res) => {
  try {
    const result = await query("SELECT * FROM project_type ORDER BY id ASC");
    res.render('references/project_types', { projectTypes: result.rows });
  } catch (error) {
    console.error("Error fetching project types:", error);
    res.status(500).render('error', { 
        message: "Error fetching project types", 
        error: { status: 500 }
    });
  }
};

// Create project type
const createProjectType = async (req, res) => {
  const { name } = req.body;
  try {
    const result = await query(
      "INSERT INTO project_type (name) VALUES ($1) RETURNING *",
      [name]
    );
    res.redirect('/references/project-types');
  } catch (error) {
    console.error("Error creating project type:", error);
    res.status(500).render('error', {
      message: "Error creating project type",
      error: { status: 500 }
    });
  }
};

// --- Status Tasks ---

// Get all status tasks
const getAllStatusTasks = async (req, res) => {
  try {
    const result = await query("SELECT * FROM status_tasks ORDER BY id ASC");
    res.render('references/status_tasks', { statusTasks: result.rows });
  } catch (error) {
    console.error("Error fetching status tasks:", error);
     res.status(500).render('error', {
      message: "Error fetching status tasks",
      error: { status: 500 }
    });
  }
};

// Create status task
const createStatusTask = async (req, res) => {
  const { name } = req.body;
  try {
    const result = await query(
      "INSERT INTO status_tasks (name) VALUES ($1) RETURNING *",
      [name]
    );
     res.redirect('/references/status-tasks');
  } catch (error) {
    console.error("Error creating status task:", error);
     res.status(500).render('error', {
      message: "Error creating status task",
      error: { status: 500 }
    });
  }
};

module.exports = {
  getAllProjectTypes,
  createProjectType,
  getAllStatusTasks,
  createStatusTask,
};
