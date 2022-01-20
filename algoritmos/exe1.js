const sequenciaFibonacci = (numero) => {
    let fibonacci = [];
    fibonacci[0] = 0;
    fibonacci[1] = 1;
    for (let i = 2; i < numero; i++) {
      fibonacci[i] = fibonacci[i - 2] + fibonacci[i - 1];
    }
    return fibonacci;
    }
    const sequencia = sequenciaFibonacci(2);
    console.log(sequencia);