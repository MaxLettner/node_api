import express, { type Request, type Response } from 'express'
import type IRole from '../models/role.model.ts'
import * as rolePrismaService from '../services/role.prisma.service.ts'

const roleRouter = express.Router();

roleRouter.get('/', async(req: Request, res: Response) => {
    const roles = await rolePrismaService.getAll()

    return res.status(200).send(roles);
});

roleRouter.get('/:id', async(req: Request, res: Response) => {
    const id = req.params.id as unknown as number
    const role = await rolePrismaService.get(id)

    if(!role) {
        return res.status(404).send('User does not exist')
    }
    return res.status(200).send(role)
    
})

roleRouter.post('/', async(req: Request, res: Response) => {
    const body = req.body as Partial<IRole>
    if(!body?.id || !body?.title) {
        return res.status(400).send('Bad Request')
    }
    const role = await rolePrismaService.create({
        id: body.id,
        title: body.title
    })

    return res.status(200).send(role)
})

export default roleRouter;