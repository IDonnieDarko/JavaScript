function calcularIMC() {
    const pesoInput = document.getElementById('peso').value;
    const alturaInput = document.getElementById('altura').value;

    const peso = parseFloat(pesoInput);
    const altura = parseFloat(alturaInput);

    if (isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0) {
        document.getElementById('resultado-texto').textContent = 'Por favor, insira valores válidos para peso e altura.';
        return;
    }

    const imc = peso / (altura * altura);
    const classificacao = obterClassificacaoIMC(imc);

    document.getElementById('resultado-texto').textContent = `Seu IMC é ${imc.toFixed(2)} (${classificacao}).`;
}

function obterClassificacaoIMC(imc) {
    if (imc < 18.5) return 'Abaixo do peso';
    if (imc >= 18.5 && imc < 24.9) return 'Peso normal';
    if (imc >= 25 && imc < 29.9) return 'Sobrepeso';
    if (imc >= 30) return 'Obesidade';
    return 'Classificação desconhecida';
}
