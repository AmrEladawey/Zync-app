const mysql = require('mysql2/promise');

const host = process.env.DB_HOST || '127.0.0.1';
const port = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3307;
const user = process.env.DB_USER || 'root';
const password = process.env.DB_PASS || '';
const database = process.env.DB_NAME || 'Zync';

async function main() {
  try {
    const connection = await mysql.createConnection({ host, port, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
    console.log(`Database '${database}' created or already exists.`);
    await connection.end();
  } catch (err) {
    console.error('Failed to create database:', err.message);
    process.exit(1);
  }
}

main();
