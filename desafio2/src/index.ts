
import app from "./app"
import { buscarCotacaoID } from "./endpoints/BuscarCotacaoId"

import { buscarTodasCotacoes } from "./endpoints/buscarTodasCotacoes"
import { criarRegistroDeConversao } from "./endpoints/criarRegistro"
import { deletarCotacaoId } from "./endpoints/deletarCotacaoId"




app.get("/cotacao", buscarTodasCotacoes )
app.post("/cotacao", criarRegistroDeConversao )
app.get("/cotacao/:id", buscarCotacaoID )
app.delete("/cotacao/:id", deletarCotacaoId )





