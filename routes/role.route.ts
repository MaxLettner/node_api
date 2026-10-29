import express, { type Request, type Response } from 'express'
import type IRole from '../models/role.model.ts'
import * as rolePrismaService from '../services/role.prisma.service.ts'

const roleRouter = express.Router();

roleRouter.get('/', async(req: Request, res: Response) => {
    try{
        const roles: IRole[] = await rolePrismaService.getAll()
        return res.status(200).send(roles);
    }catch(err){
        console.error(err)
        return res.sendStatus(500)
    }
});

roleRouter.get('/:id', async(req: Request, res: Response) => {
    const id: number = req.params.id as unknown as number

    try{
        const role: IRole|null = await rolePrismaService.get(id)
        if(!role) {
            return res.status(404).send('User does not exist')
        }
        return res.status(200).send(role)
    }catch(err){
        console.error(err)
        return res.sendStatus(500)
    }
    
})

roleRouter.post('/', async(req: Request, res: Response) => {
    const body: Partial<IRole>|undefined = req.body as Partial<IRole>|undefined
    if(!body?.id || !body?.title) {
        return res.status(400).send('Bad Request')
    }
    
    try {
        const role: IRole = await rolePrismaService.create({
            id: body.id,
            title: body.title
        })
        return res.status(201).send(role)
    }catch(err) {
        console.error(err)
        return res.sendStatus(500)
    }
})

export default roleRouter;