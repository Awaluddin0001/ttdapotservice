// config/mysqlDb.ts
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

const connectMySQL = async () => {
  try {
    const pool = mysql.createPool({
      host: process.env.MYSQL_HOST || 'localhost',
      user: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASSWORD || '',
      database: process.env.MYSQL_DATABASE || 'monitorttcpengayoman',
      port: Number(process.env.MYSQL_PORT) || 3306,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    console.log('Connected to MySQL');
    return pool;
  } catch (err) {
    console.error('Failed to connect to MySQL:', err);
    throw err;
  }
};

export default connectMySQL;
