import mongoose, { Schema } from "mongoose";

export interface IGameModel {
    _id:string,
    joueur1: { type: Schema.Types.ObjectId, ref: 'user' },
    joueur2:  { type: Schema.Types.ObjectId, ref: 'user' },
    winner:  { type: Schema.Types.ObjectId, ref: 'user' },
    bestTime : Number;
    objective : Number;
  }

const gameSchema = new mongoose.Schema({
    joueur1: {type:  { type: Schema.Types.ObjectId, ref: 'user' }},
    joueur2: {type:  { type: Schema.Types.ObjectId, ref: 'user' }},
    winner: {type:  { type: Schema.Types.ObjectId, ref: 'user' }},
    bestTime: Number,
    objective: Number,
 });
 
 const Game = mongoose.model<IGameModel>('game', gameSchema);

 export default Game