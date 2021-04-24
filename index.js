const mysql = require('mysql2/promise');
const express = require('express');
const app = express();

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

let retries = 0;
let connected = false;

const connectdb = async () => {
  try {
    const conn = await mysql.createConnection({
      host: 'pfadocker01mysql',
      user: 'root',
      password: 'my-secret-pw',
      database: 'pfa'
    });
    await conn.connect();
    console.log('Connected to mysqldb');
    connected = true;
    return conn;
  } catch (err) {
    console.error('Could not connect to mysql db');
    if (retries <= 60) {
      retries += 1;
      console.error(`retrying #${retries}...`);
      await wait(1000);
      return await connectdb();
    }
  }
}

const createTable = async (conn) => {
  await conn.execute('CREATE TABLE IF NOT EXISTS MODULES (NAME VARCHAR(255));');
  await conn.execute('DELETE FROM MODULES;');
  await conn.execute("INSERT INTO MODULES (NAME) VALUES ('Docker');");
  await conn.execute("INSERT INTO MODULES (NAME) VALUES ('Fundamentos da Arquitetura de Software');");
  await conn.execute("INSERT INTO MODULES (NAME) VALUES ('Comunicação');");
  await conn.execute("INSERT INTO MODULES (NAME) VALUES ('RabbitMQ');");
}

const getModules = async (conn) => {
  const [rows, fields] = await conn.execute('SELECT * FROM `MODULES`');
  console.log(rows);
  return rows.map(e => e.NAME);
}

const startServer = async () => {
  const conn = await connectdb();

  await createTable(conn);

  app.get('/', async (req, res) => {
    const modules = await getModules(conn);
    res.send(modules)
  });

  await app.listen(3000);
  console.log("Rodando na porta 3000");
}

startServer();