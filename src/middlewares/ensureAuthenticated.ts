import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayLoad {
    sub: string;
}

export async function ensuereAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authHedaer = request.headers.authorization;

    if(!authHedaer) {
        throw new AppError("Token not found", 401);
    }

    const [, token] = authHedaer.split(" ");

    try {
        const { sub: user_id } = verify(token, "6c224e12f25f0ad981232a4503a49d0b") as IPayLoad;
        const usersRepository = new UsersRepository();
        
        const user = await usersRepository.findById(user_id);

        if(!user) {
            throw new AppError("User does not exists!");
        }

        request.user = {
            id: user_id
        }
    
    } catch {
        throw new AppError("Invalid token!")
    }

    return next();
}