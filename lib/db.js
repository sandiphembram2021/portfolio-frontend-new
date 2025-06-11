import mysql from 'mysql2/promise';

// Database connection configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'portfolio_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  acquireTimeout: 60000,
  timeout: 60000,
};

// Create connection pool
let pool;

try {
  pool = mysql.createPool(dbConfig);
  console.log('Database pool created successfully');
} catch (error) {
  console.error('Error creating database pool:', error);
}

// Helper function to execute queries
export async function executeQuery(query, params = []) {
  try {
    if (!pool) {
      throw new Error('Database pool not initialized');
    }
    
    const [results] = await pool.execute(query, params);
    return results;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

// Helper function to get a single record
export async function getOne(query, params = []) {
  const results = await executeQuery(query, params);
  return results[0] || null;
}

// Helper function to get multiple records
export async function getMany(query, params = []) {
  return await executeQuery(query, params);
}

// Helper function to insert a record
export async function insertOne(table, data) {
  const keys = Object.keys(data);
  const values = Object.values(data);
  const placeholders = keys.map(() => '?').join(', ');
  
  const query = `INSERT INTO ${table} (${keys.join(', ')}) VALUES (${placeholders})`;
  const result = await executeQuery(query, values);
  
  return {
    insertId: result.insertId,
    affectedRows: result.affectedRows
  };
}

// Helper function to update a record
export async function updateOne(table, data, whereClause, whereParams = []) {
  const keys = Object.keys(data);
  const values = Object.values(data);
  const setClause = keys.map(key => `${key} = ?`).join(', ');
  
  const query = `UPDATE ${table} SET ${setClause} WHERE ${whereClause}`;
  const result = await executeQuery(query, [...values, ...whereParams]);
  
  return {
    affectedRows: result.affectedRows,
    changedRows: result.changedRows
  };
}

// Test database connection
export async function testConnection() {
  try {
    await executeQuery('SELECT 1');
    return { success: true, message: 'Database connection successful' };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

export default pool;
