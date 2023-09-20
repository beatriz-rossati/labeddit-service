import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import swaggerUi from "swagger-ui-express"
import swaggerDocs from "./swagger.json"
import { userRouter } from './router/userRouter';
import { postRouter } from './router/postRouter';
import { commentRouter } from './router/commentRouter';

dotenv.config()

const app = express();

app.use(cors());
app.use(express.json());
app.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.use("/posts", postRouter)
app.use("/users", userRouter)
app.use("/comments", commentRouter)


app.listen(Number(process.env.PORT || 3003), () => {
    console.log(`Servidor rodando na porta ${process.env.PORT}`)
});


app.get('/healthcheck', (req: Request, res: Response) => {
    res.status(200).send("It's alive!")
});