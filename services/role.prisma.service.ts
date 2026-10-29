import type IRole from "../models/role.model"
import { db } from '../src/prisma/db.ts'

export const getAll = async(): Promise<IRole[]> => {
    return await db.orm.public.Role.all()
}

export const get = async(id: number): Promise<IRole|null> => {
    return await db.orm.public.Role.where({id: id}).first()
}

export const create = async(role: IRole): Promise<IRole> => {
    return await db.orm.public.Role.create(role)
}

export const purge = async(): Promise<IRole[]> => {
    return await db.orm.public.Role.where(u => u.id.isNotNull()).deleteAll()
}
