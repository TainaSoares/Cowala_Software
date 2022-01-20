import { Request, Response } from "express"
import { connection } from "../connection"


export const deletarCotacaoId = async(req:Request, res:Response) => {
    try {

        const{id} = req.params

        const cotacoes = await connection("cowala_conversao_moeda")
            .delete()
            .where({id})
        

        res.status(200).send({message: "Cotação excluída!"})
    } catch (error:any) {
        res.status(400).send({message: error.sqlMessage|| error.message})
    }

}