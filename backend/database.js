import mysql from 'mysql2'

const connectionString = "Server=tcp:mysqlservermc.database.windows.net,1433;Initial Catalog=ClassMateDB;Persist Security Info=False;User ID=adminMC;Password=MyCLassAdmin340;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;"

const pool = mysql.createPool({
    user: 'adminMC', // better stored in an app setting such as process.env.DB_USER
    password: 'MyCLassAdmin340', // better stored in an app setting such as process.env.DB_PASSWORD
    host: 'mysqlservermc.database.windows.net', // better stored in an app setting such as process.env.DB_SERVER
    port: 10000, // optional, defaults to 1433, better stored in an app setting such as process.env.DB_PORT
    database: 'ClassMateDB', // better stored in an app setting such as process.env.DB_NAME
    // connectionString: connectionString,

}).promise();

pool.getConnection((err, connection) => {
    if (err == NULL) console.log('Connected to database');
});