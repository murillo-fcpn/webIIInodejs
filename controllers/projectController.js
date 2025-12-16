const { query } = require("../config/database");

// Get all projects with joined data
const getAllProjects = async (req, res) => {
  try {
    const text = `
      SELECT p.*, c.name as customer_name, pt.name as type_name 
      FROM projects p
      JOIN customers c ON p.customer_id = c.id
      JOIN project_type pt ON p.project_type_id = pt.id
      ORDER BY p.id ASC
    `;
    const result = await query(text);
    res.render('projects/index', { projects: result.rows });
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).render('error', { 
        message: "Error fetching projects", 
        error: { status: 500 }
    });
  }
};

// Show create project form
const createProjectForm = async (req, res) => {
  try {
    const customers = await query("SELECT * FROM customers ORDER BY name ASC");
    const projectTypes = await query("SELECT * FROM project_type ORDER BY name ASC");
    res.render('projects/create', { 
      customers: customers.rows,
      projectTypes: projectTypes.rows
    });
  } catch (error) {
    console.error("Error preparing project form:", error);
    res.status(500).render('error', {
      message: "Error loading form data",
      error: { status: 500 }
    });
  }
};

// Create new project
const createProject = async (req, res) => {
  const { name, location, customer_id, project_type_id } = req.body;
  try {
    await query(
      "INSERT INTO projects (name, location, customer_id, project_type_id) VALUES ($1, $2, $3, $4)",
      [name, location, customer_id, project_type_id]
    );
    res.redirect('/projects');
  } catch (error) {
    console.error("Error creating project:", error);
    // Re-render form with error message if needed, or show error page
    res.status(500).render('error', {
      message: "Error creating project",
      error: { status: 500 }
    });
  }
};

module.exports = {
  getAllProjects,
  createProjectForm,
  createProject
};
