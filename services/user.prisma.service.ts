import type IUser from '../models/user.model.ts'
import { db } from '../src/prisma/db.ts'
import { v4 as uid } from 'uuid'

export const getAll = async(): Promise<IUser[]> => {
    const users = await db.orm.public.User.all()
    return users
}

export const get = async(id: string): Promise<IUser|null> => {
    const user = await db.orm.public.User.where({id: id}).first()
    return user
}

export const createUser = async(user: IUser): Promise<IUser> => {
    const res = await db.orm.public.User.create({
        id: uid(),
        name: user.name,
        roleId: user.roleId
    })

    return res
}

export const updateUser = async(id: string, user: IUser): Promise<IUser|null> => {
    const updated = await db.orm.public.User.where({id: id}).update({
        name: user.name,
        roleId: user.roleId
    })

    return updated
}

export const purge = async(): Promise<IUser[]> => {
    const stat = await db.orm.public.User.where(u => u.id.isNotNull()).deleteAll()
    return stat
}