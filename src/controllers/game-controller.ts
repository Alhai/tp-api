import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { IUserModel } from '../models/user.schema';
import Game from '../models/game.schema';

export class GameController {
    static async createGame(req: Request, res: Response) {
        const { joueur1, joueur2, winner, bestTime, objective } = req.body.data;
        if (!joueur1 || !joueur2 || !winner || !bestTime || !objective ) {
            res.status(400).send("Missing required information");
        } else {
            try {
                const newGame = new Game({ joueur1, joueur2, winner, bestTime, objective }); 
                await newGame.save();
                res.json(newGame);
            } catch (error) {
                console.error(error);
                res.status(500).send("Internal Server Error");
            }
        }
    }

    static async getGameById(req: Request, res: Response) {
        try {
            const currentGame = await Game.findById(req.params.id); 
            if (Game) {
                res.json(currentGame);
            } else {
                res.status(404).send("Game not found");
            }
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    }

    static async getAllGames(req: Request, res: Response) {
        try {
            const allGames = await Game.find(); 
            res.json(allGames);
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    }

    static async updateGame(req: Request, res: Response) {
        const { joueur1, joueur2, winner, bestTime, objective } = req.body.data;
        try {
            const updatedItems = await Game.findById(req.params.id); 
            if (updatedItems) {
                updatedItems.joueur1 = joueur1;
                updatedItems.joueur2 = joueur2;
                updatedItems.winner = winner;
                updatedItems.bestTime = bestTime;
                updatedItems.objective = objective;
                await updatedItems.save();
                res.json(updatedItems);
            } else {
                res.status(404).send("Game not found");
            }
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    }

    static async deleteGame(req: Request, res: Response) {
        try {
            const gameDeleted = await Game.findByIdAndDelete(req.params.id);
            if (gameDeleted) {
                res.send("Deleted");
            } else {
                res.status(404).send("Game not found");
            }
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    }

}