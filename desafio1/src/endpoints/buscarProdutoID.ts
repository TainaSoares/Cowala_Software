import { Request, Response } from "express"
import { connection } from "../connection"
import { Produto } from "../types/types"


export const buscarProdutoID = async(req:Request, res:Response) => {
    try {

        const {id} = req.params

        const [verificandoExistencia] = await connection("cowala_mercado").where({id})

        if(!verificandoExistencia){
            throw new Error("Produto não cadastrado!")
        }

        const [produto]: Produto[] = await connection("cowala_mercado").where({id})


        res.status(200).send(produto)
        
    } catch (error:any) {

        res.status(400).send({message: error.sqlMessage|| error.message})
        
    }
}