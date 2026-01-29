import express, { Request, Response, Router } from "express"
import { AuthenticateController } from "../controllers/AuthenticateController";

class AuthenticateRouter{
    public router : Router
    constructor(authenticateController : AuthenticateController){
        this.router = express.Router();

        this.router.route('/register')
            .get(async (req:Request, res:Response) => {
                res.sendStatus(200)
            });

        this.router.route('/login')
            .get(async (req:Request, res:Response) => {
                res.sendStatus(200)
            });
    }
}

export { AuthenticateRouter }