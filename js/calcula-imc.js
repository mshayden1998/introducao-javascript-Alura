let pacientesList = document.querySelectorAll('.paciente');

for (let i = 0; i < pacientesList.length; i++) {
    let paciente = pacientesList[i];

    let tdPeso = paciente.querySelector('.info-peso');
    let tdAltura = paciente.querySelector('.info-altura');
    let tdImc = paciente.querySelector('.info-imc');
    
    let peso = tdPeso.textContent;
    let altura = tdAltura.textContent;
    
    let pesoEhValido = validarPeso(peso);
    let alturaEhValida = validarAltura(altura);
    
    if (!pesoEhValido) {
        console.log("Peso inválido!");
        tdImc.textContent = "Peso inválido!";
        paciente.classList.add('valor_invalido');
    }
    if (!alturaEhValida) {
        console.log("Altura inválida!");
        tdAltura.textContent = "Altura inválida!";
        paciente.classList.add('valor_invalido');
    }
    
    if (alturaEhValida && pesoEhValido) {
        let imc = calcularImc(peso, altura);
        tdImc.textContent = imc;
    }
}

function validarPeso(peso) {
    if (peso > 0 && peso < 350.0) {
        return true;
    } else {
        return false;
    }
}

function validarAltura(altura) {
    if (altura >= 0.3 && altura < 3.0) {
        return true;
    } else {
        return false;
    }
}

function calcularImc(peso, altura) {
    let imc = peso / (altura * altura);

    return imc.toFixed(2);
}