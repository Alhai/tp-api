import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import userRouter from './router/user-router';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import authRouter from './router/auth-router';
import gameRouter from './router/game-router';

dotenv.config();

const mongoUrl = process.env.MONGO_URL;
if (!mongoUrl) {  
  throw new Error("MONGO_URL is not defined in your .env file");
}
mongoose.connect(mongoUrl)
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((error) => console.log("Connexion à MongoDB échouée !", error));

const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = process.env.PORT;

const httpServer = createServer(app);
const io = new SocketIOServer(httpServer, {
  cors: {
    origin: "http://localhost:5173", // Changez ceci pour correspondre à l'URL de votre client
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
    console.log('Un utilisateur est connecté');
    socket.on('disconnect', () => console.log('Un utilisateur s\'est déconnecté'));
});



const apiRouter = express.Router();
apiRouter.use('/auth', authRouter);
apiRouter.use('/games', gameRouter);
apiRouter.use('/users', userRouter);

app.use("", apiRouter);
httpServer.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
