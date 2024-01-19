import express from 'express';
import {GameController} from '../controllers/game-controller';
// import { verifyToken } from '../middleware/auth';
const gameRouter = express.Router();

gameRouter.post('', GameController.createGame);
gameRouter.get('', GameController.getAllGames);
gameRouter.get('/:id', GameController.getGameById)
gameRouter.put('/:id', GameController.updateGame);
gameRouter.delete('/:id', GameController.deleteGame);

export default gameRouter