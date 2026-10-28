import dbConnection from '../db/db.ts';
import { v4 as uid } from 'uuid'

import { getRole } from './role.service.ts';
import type IRole from '../models/role.model.ts';
import type IUser from '../models/user.model.ts';

const populateRole = (user: IUser): IUser => {
    user.role = getRole(user.roleId)
    return user
};

const populateRoles = (users: IUser[]): IUser[] => {
    users.forEach(user => populateRole(user))
    return users
}

export const getUsers = (): Promise<IUser[]> => {
    return dbConnection()
    .then((conn) => 
        conn.query<IUser[]>('SELECT * FROM User')
        .then(([rows]) => rows)
        .finally(() => {conn.end()})
    )
    .catch((err) => {
        console.error(err)
        return []
    })
};

export const getUser = (id: string): Promise<IUser[]> => {
    return dbConnection()
    .then((conn) => 
        conn.query<IUser[]>('SELECT * FROM User WHERE id = ?', [id])
        .then(([rows]) => rows)
        .finally(() => {conn.end()})
    )
    .catch((err) => {
        console.error(err)
        return []
    })
};

export const createUser = (user: IUser): Promise<IUser[]> => {
    return dbConnection()
    .then(conn => 
        conn.query<IUser[]>('INSERT INTO User (id, name, roleId) VALUES (?, ?, ?)', [uid(), user.name, user.roleId])
        .then(([rows]) => rows)
        .finally(() => {conn.end()})
    )
    .catch(err => {
        console.error(err)
        return []
    })
};

export const updateUser = (user: IUser): Promise<IUser[]> => {
    return dbConnection()
    .then(conn => 
        conn.query<IUser[]>('UPDATE USER SET name = ?, roleId = ? WHERE id = ?', [user.name, user.roleId, user.id])
        .then(([rows]) => rows)
        .finally(() => {conn.end()})
    )
    .catch(err => {
        console.error(err)
        return []
    })
};

export const deleteUser = (id: string): Promise<IUser[]> => {
    return dbConnection()
    .then(conn => 
        conn.query<IUser[]>('DELETE FROM User WHERE id = ?', [id])
        .then(([rows]) => rows)
        .finally(() => {conn.end()})
    )
    .catch(err => {
        console.error(err)
        return []
    })
};