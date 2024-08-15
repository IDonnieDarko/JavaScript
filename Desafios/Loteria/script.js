// Função para sortear números únicos para um dado intervalo
function sortearNumerosUnicos(total, max) {
    const numeros = new Set();
    while (numeros.size < total) {
        const numero = Math.floor(Math.random() * max) + 1;
        numeros.add(numero);
    }
    return Array.from(numeros).sort((a, b) => a - b);
}

// Função principal para sortear números de acordo com o tipo de jogo
function sortearNumeros(tipo) {
    let totalNumeros;
    let maxNumero;
    let resultado;

    switch (tipo) {
        case 'quina':
            totalNumeros = 5;
            maxNumero = 80;
            break;
        case 'sena':
            totalNumeros = 6;
            maxNumero = 60;
            break;
        case 'lotofacil':
            totalNumeros = 15;
            maxNumero = 25;
            break;
        default:
            resultado = 'Tipo de jogo inválido.';
            document.getElementById('resultado-texto').textContent = resultado;
            return;
    }

    resultado = sortearNumerosUnicos(totalNumeros, maxNumero).join(', ');
    document.getElementById('resultado-texto').textContent = `Números sorteados (${tipo}): ${resultado}`;
}
