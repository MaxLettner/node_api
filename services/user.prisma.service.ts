import type IUser from '../models/user.model.ts'
import { db } from '../src/prisma/db.ts'
import { v4 as uid } from 'uuid'

export const getAll = async(): Promise<IUser[]> => {
    return await db.orm.public.User.all()
}

export const get = async(id: string): Promise<IUser|null> => {
    return await db.orm.public.User.where({id: id}).first()
}

export const createUser = async(user: IUser): Promise<IUser> => {
    return await db.orm.public.User.create({
        id: uid(),
        name: user.name,
        roleId: user.roleId
    })
}

export const updateUser = async(id: string, user: IUser): Promise<IUser|null> => {
    return await db.orm.public.User.where({id: id}).update({
        name: user.name,
        roleId: user.roleId
    })
}

export const deleteUser = async(id: string): Promise<IUser|null> => {
    return await db.orm.public.User.where({id:id}).delete()
}

export const purge = async(): Promise<IUser[]> => {
    return await db.orm.public.User.where(u => u.id.isNotNull()).deleteAll()
}