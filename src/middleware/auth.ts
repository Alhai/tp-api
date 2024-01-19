// import 'dotenv/config';
// import { Response, Request,NextFunction } from 'express';
// import jwt from 'jsonwebtoken';
// /// <reference path="./express.d.ts" />

// export async function verifyToken(req: Request, res: Response, next: NextFunction) {
//     const currentToken = req.headers.authorization;
//     if (!currentToken) {
//         res.status(401).send("No token provided");
//     } else {
//         const [typeToken, token] = currentToken.split(" ");
//         if (typeToken !== "Bearer") {
//             res.status(401).send("Invalid token type");
//         } else {
//             try {
//                 const decoded = jwt.verify(token, process.env.JWT_SECRET!);
//                 if (decoded ) {
//                     req.token = token ;
//                     next();
//                 } else {
//                     res.status(401).send("Invalid token");
//                 }
//             } catch (e) {
//                 console.log('invalid token on verify', e);
//                 res.status(401).send("Invalid token on verify");
//             }
//         }
//     }
// }
