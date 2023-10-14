var saldoCarteira = 10;
var betAmount = 10;
var botaoSaldoAposta = document.getElementById("botaoSaldoAposta");
var saldoCarteiraElement = document.getElementById("saldoCarteira");

function updateBetAmount() {
    botaoSaldoAposta.textContent = "$" + betAmount.toFixed(2);
}

function updatesaldoCarteira() {
    saldoCarteiraElement.textContent = "$" + saldoCarteira.toFixed(2);
}

function depositarNaCarteira(amount) {
    saldoCarteira += amount;
    updatesaldoCarteira();
}

function getRandomValue() {
    var random = Math.random();

    if (random < 0.35) {
        return (Math.random() + 1).toFixed(4);
    } else if (random < 0.7) {
        return (Math.random() * 1.5 + 2).toFixed(4);
    } else if (random < 0.8) {
        return (Math.random() + 3.5).toFixed(4);
    } else if (random < 0.9) {
        return (Math.random() * 1.5 + 4.5).toFixed(4);
    } else if (random < 0.97) {
        return (Math.random() * 4 + 6).toFixed(4);
    } else {
        return (Math.random() * 790 + 10).toFixed(2);
    }
}

var valorAleatorio = getRandomValue();
var contador = 1;
var maxCount = valorAleatorio;
var increment = 0.01;
var intervalId;

function iniciarAposta() {
    document.getElementById("contador").style.color = "#0077cc";
    var valorApostaInput = document.getElementById("valorAposta");
    var valorAposta = parseFloat(valorApostaInput.value);
    if (isNaN(valorAposta) || valorAposta > saldoCarteira) {
        alert("Saldo insuficiente ou valor de aposta inválido.");
        return;
    }

    var valorAleatorio = getRandomValue();
    maxCount = valorAleatorio;
    
    document.getElementById("aviao").style.display = "block";
    saldoCarteira -= valorAposta;
    betAmount += valorAposta; 
    updatesaldoCarteira();
    updateBetAmount();

    document.getElementById("botaoApostar").disabled = true;
    document.getElementById("botaoCancelar").disabled = false;
    intervalId = setInterval(function () {
        updateCount(valorAposta, valorApostaInput);
    }, 20);
}

function cancelarAposta() {
    clearInterval(intervalId);
    document.getElementById("botaoApostar").disabled = false;
    document.getElementById("aviao").style.display = "none";
    document.getElementById("botaoCancelar").disabled = true;
    var valorApostaInput = document.getElementById("valorAposta");
    var valorAposta = parseFloat(valorApostaInput.value);
    var resultado = (valorAposta * contador).toFixed(2);
    document.getElementById("botaoCancelar").textContent = "Cancelar $" + resultado;

    var message = "Parabéns, valor total ganho = $" + resultado;
    var messageElement = document.createElement("p");
    messageElement.textContent = message;
    document.body.appendChild(messageElement);


    setTimeout(function () {
        document.body.removeChild(messageElement);
    }, 3000);

    var ganho = valorAposta * contador;
    saldoCarteira += ganho;
    updatesaldoCarteira();

    betAmount = 10;
    updateBetAmount();

    contador = 1;
    maxCount = 2;
    increment = 0.01;
    clearInterval(intervalId);
}

function updateCount(valorAposta, valorApostaInput) {
    if (contador < maxCount) {
        contador += increment;
        document.getElementById("contador").textContent = contador.toFixed(2);
        var resultado = (valorAposta * contador).toFixed(2);
        document.getElementById("botaoCancelar").textContent = "Cancelar $" + resultado;
    } else {
        document.getElementById("contador").style.color = "red";
        document.getElementById("aviao").style.display = "none";
        document.getElementById("botaoApostar").disabled = false;
        document.getElementById("botaoCancelar").disabled = true;
        var resultado = (valorAposta * contador).toFixed(2);
        document.getElementById("botaoCancelar").textContent = "Cancelar $" + resultado;
        clearInterval(intervalId);


        var message = "Você perdeu!";
        var messageElement = document.createElement("p");
        messageElement.textContent = message;
        document.body.appendChild(messageElement);


        setTimeout(function () {
            document.body.removeChild(messageElement);
        }, 3000);


        betAmount = 10;
        updateBetAmount();


        contador = 1;
        maxCount = 2;
        increment = 0.01;
        clearInterval(intervalId);
    }
}
