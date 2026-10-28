import type IRole from "../models/role.model.ts";

const roles: IRole[] = [
    {
        id: 0,
        title: "Admin",
    },
    {
        id: 1,
        title: "Moderator",
    },
    {
        id: 2,
        title: "User",
    },
    {
        id: 3,
        title: "Generic",
    },
];

export const getRoles = (): IRole[] => {
    return roles;
};


export const getRole = (id: number): IRole | undefined => {
    return roles.find(r => r.id == id);
};