import { Request, Response } from "express"
import { connection } from "../connection"


export const buscarTodasCotacoes = async(req:Request, res:Response) => {
    try {


        const cotacoes = await connection("cowala_conversao_moeda")
            .select()
        

        res.status(200).send(cotacoes)
    } catch (error:any) {
        res.status(400).send({message: error.sqlMessage|| error.message})
    }

}