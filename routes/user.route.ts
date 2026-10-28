import express, { type Request, type Response } from 'express';
import type IUser from '../models/user.model.ts';
import * as userDbService from '../services/user.db.service.ts';
import * as userPrismaService from '../services/user.prisma.service.ts'

const userRouter = express.Router();

// const timeLog = (req: Request, res: Response, next: NextFunction) => {
//     console.log('Time: ', Date.now());
//     next();
// };
// userRouter.use(timeLog);

userRouter.get('/', async (req: Request, res: Response) => {
    try {
        const users = await userPrismaService.getAll()
        return res.status(200).send(users)
    } catch (err) {
        console.error(err)
        return res.sendStatus(500)
    }
})


userRouter.get('/:id', async (req: Request, res: Response) => {
    const id = req.params.id as string
 
    try {
        const user = await userPrismaService.get(id)
        if (!user) {
            return res.status(404).send('User does not exist')
        }
        return res.status(200).send(user)
    } catch(err) {
        console.error(err)
        return res.sendStatus(500)
    }
})

userRouter.post('/', async(req: Request, res: Response) => {
    const body = req.body as Partial<IUser> | undefined
    if(!body?.name || !body?.roleId) {
        return res.status(400).send('Invalid User')
    }

    try {
        const created = await userPrismaService.createUser({
            name: body.name,
            roleId: body.roleId
        })
        if(created){
            return res.status(200).send(created)
        }
        return res.status(400).send('User could not be created!')
    } catch(err) {
        console.error(err)
        return res.sendStatus(500)
    }
})


userRouter.delete('/', async(req: Request, res: Response) => {
    const ret =  await userPrismaService.purge()
    res.status(200).send(ret)
})

/*
userRouter.post('/', async (req: Request, res: Response) => {
    const body = req.body as Partial<UserIF> | undefined;
 
    if (!body?.name || !body?.roleId) {
        return res.status(400).send('Invalid user');
    }
 
    try {
        const created = await userDbService.createUser({
            id: body.id, 
            name: body.name,
            roleId: body.roleId,
        })
        return res.status(201).send(created)
    } catch (err) {
        console.error(err)
        return res.sendStatus(500)
    }
})*/


userRouter.put('/', async (req: Request, res: Response) => {
    const user = req.body as IUser | undefined
 
    if (!user?.id) {
        return res.status(400).send('Missing id')
    }
    if (!user.name || !user.roleId) {
        return res.status(400).send('Invalid user')
    }
 
    try {
        const updated = await userDbService.updateUser(user)
        if (!updated) {
            return res.status(404).send('User does not exist')
        }
        return res.status(200).send(user)
    } catch (err) {
        console.error(err)
        return res.sendStatus(500)
    }
})


userRouter.delete('/:id', async (req: Request, res: Response) => {
    const id = req.params.id as string
 
    try {
        const deleted = await userDbService.deleteUser(id)
        return res.sendStatus(deleted ? 204 : 404)
    } catch (err) {
        console.error(err)
        return res.sendStatus(500)
    }
})


export default userRouter