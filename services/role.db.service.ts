import dbConnection from '../db/db.ts';
import type IRole from '../models/role.model.ts';

export const getUsers = (): Promise<IRole[]> => {
    return dbConnection()
    .then((conn) => 
        conn.query<IRole[]>('SELECT * FROM Role')
        .then(([rows]) => rows)
        .finally(() => {conn.end()})
    )
    .catch((err) => {
        console.error(err)
        return []
    })
};