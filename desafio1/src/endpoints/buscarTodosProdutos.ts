import { Request, Response } from "express"
import { connection } from "../data/connection"
import { Produto } from "../types/types"


export const buscarTodosProdutos = async(req:Request, res:Response) => {
    try {

        const produtos: Produto[] = await connection("cowala_mercado").select()


        res.status(200).send(produtos)
        
    } catch (error:any) {

        res.status(400).send({message: error.sqlMessage|| error.message})
        
    }
}