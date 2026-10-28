import type IRole from "../models/role.model"
import { db } from '../src/prisma/db.ts'

export const getAll = async(): Promise<IRole[]> => {
    const roles = await db.orm.public.Role.all()
    return roles
}

export const get = async(id: number): Promise<IRole|null> => {
    const role = await db.orm.public.Role.where({id: id}).first()
    return role
}

export const create = async(role: IRole): Promise<IRole> => {
    const created = await db.orm.public.Role.create(role)
    return created
}
