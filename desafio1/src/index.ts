import { Request, Response } from "express";
import app from "./app";
import { atualizarPreco } from "./endpoints/atualizarPreco";
import { buscarProdutoID } from "./endpoints/buscarProdutoID";
import { buscarTodosProdutos } from "./endpoints/buscarTodosProdutos";
import { criarProduto } from "./endpoints/criarProduto";
import { deletarProduto } from "./endpoints/deletarProduto";

app.get("/", (req:Request, res:Response) => {
    res.send("Hello world")
})


app.post("/produtos", criarProduto)
app.get("/produtos", buscarTodosProdutos)
app.get("/produtos/:id", buscarProdutoID)
app.put("/produtos/preco/:id", atualizarPreco)
app.delete("/produtos/:id", deletarProduto)