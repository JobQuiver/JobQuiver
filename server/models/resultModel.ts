import { Pool } from 'pg';
import { config } from 'dotenv';

config();

const pool = new Pool({
  connectionString: process.env.PG_URI,
});

const db = {
  query: (text: string, params?: any[], callback?: Function) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};

export default db;
