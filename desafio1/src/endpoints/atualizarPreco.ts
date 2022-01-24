import { Request, Response } from "express"
import { connection } from "../data/connection"



export const atualizarPreco = async(req:Request, res:Response) => {
    try {

        const {id} = req.params
        const{preco} = req.body

        const [verificandoExistencia] = await connection("cowala_mercado").where({id})

        if(!verificandoExistencia){
            throw new Error("Produto não cadastrado!")
        }

         await connection("cowala_mercado")
            .update({preco})
            .where({id})


        res.status(200).send({message: "Preço atualizado!"})
        
    } catch (error:any) {

        res.status(400).send({message: error.sqlMessage|| error.message})
        
    }
}