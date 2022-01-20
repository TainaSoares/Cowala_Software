const objeto = {"fizz": "buzz", "foo": null, "bar": 42}

const arrayObjeto = Object.entries(objeto)

const filtrando = arrayObjeto.filter(([chave, valor]) =>  valor !== null)

const notNull = Object.fromEntries(filtrando)
console.log(notNull)
