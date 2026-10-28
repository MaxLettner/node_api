import { v4 as uid } from 'uuid';

import { getRole } from './role.service.ts';
import type IRole from '../models/role.model.ts';
import type IUser from '../models/user.model.ts';

/*

const users: User[] = [
    {
        id: uid(),
        name: "John",
        roleId: 0,
    },
    {
        id: uid(),
        name: "John2",
        roleId: 2,
    },
];

const populateRole = (user: User): User => {
    return {
        ...user,
        role: getRole(user.roleId),
    };
};

export const getUsers = (): User[] => {
    return users.map(populateRole);
};

export const getUser = (id: string): User | null => {
    const user = users.find(u => u.id === id);

    return user ? populateRole(user) : null;
};

export const createUser = (user: User): User | null => {
    if (Object.hasOwn(user, 'name') && Object.hasOwn(user, 'roleId')) {
        user.id = uid();
        users.push(user);
    
        if (users.length - 1 >= 0) {
            return users[users.length - 1];
        }
    }


    return null;

    // users.push({
    //     ...user,
    //     id: uid(),
    // });
};

export const updateUser = (user: User): User | null => {
    const i = users.findIndex(u => u.id === user.id);

    if (i != -1) {
        users[i] = user;

        return users[i];
    }
    
    return null;
};

export const deleteUser = (id: string): boolean => {
    const i = users.findIndex(u => u.id === id);

    if (i == -1) {
        return false;
    }

    users.splice(i, 1);
    return true;
};

*/