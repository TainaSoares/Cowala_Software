import { Request, Response } from "express";
import { connection } from "../data/connection";
import { Produto } from "../types/types";

export const criarProduto = async(req:Request, res:Response) => {
    try {

        const {nome, preco} = req.body

        if(!nome || !preco){
            throw new Error("Verifique se os parâmetros 'nome' e 'preco' estão sendo passados!")
        }

        const [verificandoExistencia] = await connection("cowala_mercado").where({nome})

        if(verificandoExistencia){
            throw new Error("Produto já cadastrado!")
        }

        const novoProduto:Produto = {
            id: Date.now().toString(),
            nome,
            preco
        }

        await connection("cowala_mercado").insert(novoProduto)

        res.status(201).send({message: "Produto criado com sucesso!"})
        
    } catch (error:any) {

        res.status(400).send({message: error.sqlMessage|| error.message})
        
    }
}