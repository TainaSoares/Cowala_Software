
const validacao = (data, validade) => {
    if('1d'>=validade<='10d'){
        return false
    }else{
        return true
    }
}

const validando = validacao(new Date(), '5d')

const frase = "Esta data está expirada?"

console.log(frase,validando)


