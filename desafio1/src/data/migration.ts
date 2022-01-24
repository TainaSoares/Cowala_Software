import { connection } from "./connection"
import products from "./products.json"



const printError = (error: any) => { console.log(error.sqlMessage || error.message) }

const createTables = () => connection
   .raw(`

        CREATE TABLE IF NOT EXISTS cowala_mercado (
            id VARCHAR(255) PRIMARY KEY NOT NULL,
            nome VARCHAR(255) NOT NULL,
            preco FLOAT NOT NULL
        );

`)
   .then(() => { console.log("Tabela criada") })
   .catch(printError)

const insertProducts = () => connection("cowala_mercado")
   .insert(products)
   .then(() => { console.log("Produtos criados") })
   .catch(printError)

const closeConnection = () => { connection.destroy() }

createTables()
   .then(insertProducts)
   .finally(closeConnection)