import { Request, Response } from "express"
import { connection } from "../connection"
import { cotacaoInfo } from "../services/cotacaoInfo"
import { Conversao, MOEDA } from "../types/types"

export const criarRegistroDeConversao = async(req:Request, res:Response) => {
    try {
        const {moedaOriginal, moedaDaConversao,valorEnviado } = req.body

        if(!moedaOriginal || !moedaDaConversao || !valorEnviado){
            throw new Error("Verifique se os parâmetros 'moedaOriginal: USD ou BRL' , 'moedaDaConversao: USD ou BRL' e 'valorEnviado' estão sendo passados!")
        }


        const [verificando] = await connection("cowala_conversao_moeda")
            .where({moedaOriginal})
            .andWhere({valorEnviado})
        

        if(verificando){
            throw new Error("Conversão já registrada!")
        }


        //Conversão de USD-BRL
        //verificar se moedaOriginal é BRL ou USD = ENUM

        let valorConvertido 

            if(moedaOriginal === MOEDA.USD){
                
                const cotacaoDolar = await cotacaoInfo()
                console.log(typeof(cotacaoDolar))

                if(cotacaoDolar === null){
                    throw new Error("Erro de requisição da cotação dolar")
                }
                valorConvertido = Number(((valorEnviado * Number(cotacaoDolar))).toFixed(2))
                 
                
            }else{
                const cotacaoDolar = await cotacaoInfo()
                console.log(typeof(cotacaoDolar))

                if(cotacaoDolar === null){
                    throw new Error("Erro de requisição da cotação dolar")
                }
                 valorConvertido = Number(((valorEnviado / Number(cotacaoDolar))).toFixed(2))
                 
            }

        const novaConversao:Conversao = {
            id: Date.now().toString(),
            moedaOriginal,
            moedaDaConversao,
            valorEnviado,
            valorConvertido
        }

        await connection("cowala_conversao_moeda").insert(novaConversao)

        res.status(201).send({message: "Registro de convesão realizado com sucesso!"})
    } catch (error:any) {
        res.status(400).send({message: error.sqlMessage|| error.message})
    }

}