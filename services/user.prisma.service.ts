import type IUser from '../models/user.model.ts'
import { db } from '../src/prisma/db.ts'
import { v4 as uid } from 'uuid'
import { get as getRole} from './role.prisma.service.ts'
import { InternalError } from '@prisma/orm-postgres/utils'
import type { IncomingHttpStatusHeader } from 'node:http2'

const populateRole = async(user: IUser): Promise<IUser> => {
    const role = await getRole(user.roleId)
    
    if(!role) {
        throw new InternalError(`${user.id}: role with id: ${user.roleId} does not exist`)
    }
    user.role = role

    return user
}

export const getAll = async(): Promise<IUser[]> => {
    const users = await db.orm.public.User.all()
    return Promise.all(users.map(populateRole))
}

export const get = async(id: string): Promise<IUser|null> => {
    const user = await db.orm.public.User.where({id: id}).first()
    if(user) return await populateRole(user)
    return user
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