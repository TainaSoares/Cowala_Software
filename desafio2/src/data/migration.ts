import { connection } from "./connection"
import currencyConvertion from "./currencyConversion.json"


const printError = (error: any) => { console.log(error.sqlMessage || error.message) }

const createTables = () => connection
   .raw(`

        CREATE TABLE IF NOT EXISTS cowala_conversao_moeda (
            id VARCHAR(255) PRIMARY KEY NOT NULL,
            moedaOriginal VARCHAR(5) NOT NULL,
            moedaDaConversao VARCHAR(5) NOT NULL,
            valorEnviado FLOAT NOT NULL,
            valorConvertido FLOAT NOT NULL
            );

`)
   .then(() => { console.log("Tabela criada") })
   .catch(printError)

const insertConvertion = () => connection("cowala_conversao_moeda")
   .insert(currencyConvertion)
   .then(() => { console.log("Conversão realizada.") })
   .catch(printError)

const closeConnection = () => { connection.destroy() }

createTables()
   .then(insertConvertion)
   .finally(closeConnection)