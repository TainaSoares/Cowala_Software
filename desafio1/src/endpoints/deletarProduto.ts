import { Request, Response } from "express"
import { connection } from "../data/connection"



export const deletarProduto = async(req:Request, res:Response) => {
    try {

        const {id} = req.params

        const [verificandoExistencia] = await connection("cowala_mercado").where({id})

        if(!verificandoExistencia){
            throw new Error("Produto não cadastrado!")
        }

         await connection("cowala_mercado")
            .delete()
            .where({id})


        res.status(200).send({message: "Produto excluído!"})
        
    } catch (error:any) {

        res.status(400).send({message: error.sqlMessage|| error.message})
        
    }
}