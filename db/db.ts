import mysql from 'mysql2/promise';

const dbConnection = () => {
    return mysql.createConnection({
        host: 'db',
        port: 3306,
        user: 'root',
        password: 'mepasswrd',
        database: 'user-admin',
    });
};

export default dbConnection;