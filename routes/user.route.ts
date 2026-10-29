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
        if(users.length == 0) {
            return res.sendStatus(404)
        }
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
            return res.sendStatus(404)
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
            return res.status(201).send(created)
        }
        return res.status(400).send('User could not be created!')
    } catch(err) {
        console.error(err)
        return res.sendStatus(500)
    }
})


userRouter.delete('/purge', async(req: Request, res: Response) => {
    try{
        const ret = await userPrismaService.purge()
        return res.sendStatus(ret.length == 0 ? 404 : 204)
    }catch(err) {
        console.error(err)
        return res.sendStatus(500)
    }
})


userRouter.put('/:id', async(req: Request, res: Response) => {
    const id = req.params.id as string
    const body = req.body as Partial<IUser> | undefined
    if(!body?.name || !body?.roleId) {
        return res.status(400).send('Invalid User')
    }

    try{
        const updated = await userPrismaService.updateUser(id, {
            name: body.name,
            roleId: body.roleId
        })

        if(!updated) {
            return res.status(404).send('User does not exist')
        }
        return res.status(201).send(updated)
    }catch(err){
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