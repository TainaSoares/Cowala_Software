import { Request, Response } from "express"
import { connection } from "../data/connection"


export const buscarCotacaoID = async(req:Request, res:Response) => {
    try {

        const{id} = req.params

        const cotacoes = await connection("cowala_conversao_moeda")
            .select()
            .where({id})
        

        res.status(200).send(cotacoes)
    } catch (error:any) {
        res.status(400).send({message: error.sqlMessage|| error.message})
    }

}