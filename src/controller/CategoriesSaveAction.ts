import {Request, Response} from "express";
import {getManager} from "typeorm";
import { Category } from "../entity/Category";
import * as jwt from 'jsonwebtoken'

// import {Post} from "../entity/Post";
/**
 * Saves given post.
 */
export async function categoriesSaveAction(request: Request, res: Response) {

const checkToken = () =>{

const token = request.cookies.token
console.log(token)
    
    if (!token) {
        // res.status(401).send({ auth: false, message: 'Token não informado.' })
        return false
    }; 
    
    if(jwt.verify(token, process.env.SECRET)){
        // res.status(200).send({ auth: true })
        return true   
    }
    res.status(500).send({ auth: false, message: 'Token inválido.'});
    return false
}

if(checkToken()){  
    // get a post repository to perform operations with post
    
    const categoriesRepository = getManager().getRepository(Category);
    
    
    // create a real post object from post json object sent over http
    const newCategory = categoriesRepository.create(request.body);
    
    // save received post
    await categoriesRepository.save(newCategory);
    
    // return saved post back
    res.send(newCategory);
}
return 
}