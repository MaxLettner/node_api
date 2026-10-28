import express, { type Express, type Request, type Response } from 'express';
import userRouter from './routes/user.route.ts';
import roleRouter from './routes/role.route.ts';

const app: Express = express();
app.use(express.json());

app.use('/user', userRouter);
app.use('/role', roleRouter);


app.get('/', (req: Request, res: Response) => {
    res.send('Default route');
});

app.listen(3000);