-- -- Create customer table
-- CREATE TABLE IF NOT EXISTS customer (
--   id SERIAL PRIMARY KEY,
--   name VARCHAR(100) NOT NULL,
--   email VARCHAR(100) UNIQUE NOT NULL,
--   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- Insert sample data
INSERT INTO customers (name, email) VALUES
  ('Juan Pérez', 'juan@example.com'),
  ('María García', 'maria@example.com'),
  ('Carlos López', 'carlos@example.com')
ON CONFLICT (email) DO NOTHING;


-- CREATE TABLE IF NOT EXISTS projects (
--   id SERIAL PRIMARY KEY,
--   name VARCHAR(100) NOT NULL,
--   location VARCHAR(255) NOT NULL,

-- )

-- Tabla: customers
CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla: project_type
CREATE TABLE project_type (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

-- Tabla: status_tasks
CREATE TABLE status_tasks (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

-- Tabla: projects
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    location VARCHAR(200),
    customer_id INTEGER NOT NULL,
    project_type_id INTEGER NOT NULL,
    CONSTRAINT fk_projects_customers 
        FOREIGN KEY (customer_id) 
        REFERENCES customers(id) 
        ON DELETE RESTRICT,
    CONSTRAINT fk_projects_project_type 
        FOREIGN KEY (project_type_id) 
        REFERENCES project_type(id) 
        ON DELETE RESTRICT
);

-- Tabla: tasks
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    project_id INTEGER NOT NULL,
    name VARCHAR(100) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    status_task_id INTEGER NOT NULL,
    CONSTRAINT fk_tasks_projects 
        FOREIGN KEY (project_id) 
        REFERENCES projects(id) 
        ON DELETE CASCADE,
    CONSTRAINT fk_tasks_status_tasks 
        FOREIGN KEY (status_task_id) 
        REFERENCES status_tasks(id) 
        ON DELETE RESTRICT,
    CONSTRAINT chk_dates CHECK (end_date IS NULL OR end_date >= start_date)
);

-- Índices para mejorar el rendimiento en consultas frecuentes
CREATE INDEX idx_projects_customer_id ON projects(customer_id);
CREATE INDEX idx_projects_project_type_id ON projects(project_type_id);
CREATE INDEX idx_tasks_project_id ON tasks(project_id);
CREATE INDEX idx_tasks_status_id ON tasks(status_task_id);
CREATE INDEX idx_tasks_dates ON tasks(start_date, end_date);

-- Comentarios para documentación
COMMENT ON TABLE customers IS 'Tabla de clientes';
COMMENT ON COLUMN customers.email IS 'Email único del cliente';

COMMENT ON TABLE project_type IS 'Tipos de proyectos disponibles';
COMMENT ON COLUMN project_type.name IS 'Nombre del tipo de proyecto (único)';

COMMENT ON TABLE status_tasks IS 'Estados posibles de las tareas';
COMMENT ON COLUMN status_tasks.name IS 'Nombre del estado (único)';

COMMENT ON TABLE projects IS 'Proyectos asignados a clientes';
COMMENT ON COLUMN projects.customer_id IS 'Referencia al cliente dueño del proyecto';
COMMENT ON COLUMN projects.project_type_id IS 'Tipo de proyecto';

COMMENT ON TABLE tasks IS 'Tareas dentro de los proyectos';
COMMENT ON COLUMN tasks.project_id IS 'Proyecto al que pertenece la tarea';
COMMENT ON COLUMN tasks.status_task_id IS 'Estado actual de la tarea';
COMMENT ON COLUMN tasks.end_date IS 'Fecha de finalización (puede ser NULL si está en progreso)';