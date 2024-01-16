import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const middlewareVerificationToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization!.replace('Bearer ',''); 
  console.log("token :",token)
  if (!token) {
    return res.status(401).json({ erreur: 'Accès non autorisé avant verify' });
  }
  try {
    const decoded = jwt.verify(token, 'secret') as { data: string }
    console.log("decoded :", decoded)
    if (decoded) {
      next();
    }
  } catch (error) {
    res.status(401).json({ erreur: 'Accès non autorisé' });
  }
};

export default middlewareVerificationToken;
