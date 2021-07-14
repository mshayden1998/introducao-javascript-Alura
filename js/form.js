let add_paciente_btn = document.querySelector('#adicionar-paciente');

add_paciente_btn.addEventListener('click', function(event) {

    event.preventDefault();

    let form = document.querySelector('#adicionar_paciente_form');
    //Extraindo informacoes do paciente do form
    let paciente = obtemPacienteDoFormulario(form);

    let pacienteTr = montarTr(paciente);

    var errosLista = validarPaciente(paciente);

    if (errosLista.length > 0) {
        exibirMensagensDeErro(errosLista);

        return;
    }
    
    //adicionando o paciente na tabela
    let tabela = document.querySelector('#tabela_pacientes');
    
    tabela.appendChild(pacienteTr);

    form.reset();

    let msn_erros = document.querySelector('#mensagens_erro');
    while (msn_erros.firstChild) {
        msn_erros.removeChild(msn_erros.lastChild);
    }
});

function exibirMensagensDeErro(errosLista) {
    let ul = document.querySelector('#mensagens_erro');

    errosLista.forEach(function(erro) {
        let li = document.createElement('li');
        li.textContent = erro;
        ul.appendChild(li);
    });
}

function obtemPacienteDoFormulario(form) {
    let paciente = {
        nome: form.nome.value,
        peso: form.peso.value,
        altura: form.altura.value,
        gordura: form.gordura.value,
        imc: calcularImc(form.peso.value, form.altura.value)
    }
    return paciente;
}

function montarTr(paciente) {
    // Cria TR
    let pacienteTr = document.createElement('tr');
    pacienteTr.classList.add('paciente');

    // Cria as TD's e a adiciona dentro da TR
    pacienteTr.appendChild(montarTd(paciente.nome, "info-nome"));
    pacienteTr.appendChild(montarTd(paciente.peso, "info-peso"));
    pacienteTr.appendChild(montarTd(paciente.altura, "info-altura"));
    pacienteTr.appendChild(montarTd(paciente.gordura, "info-gordura"));
    pacienteTr.appendChild(montarTd(paciente.imc, "info-imc"));
    
    return pacienteTr;
}

function montarTd(dado, classe) {
    var td = document.createElement("td");
    td.classList.add(classe);
    td.textContent = dado;

    return td;
}

function validarPaciente(paciente) {

    var errosLista = [];

    if (paciente.nome.length == 0) {
        errosLista.push('Paciente sem nome.')
    }

    if (!validarPeso(paciente.peso)) {
        errosLista.push('Peso inválido.');
    }

    if (!validarAltura(paciente.altura)) {
        errosLista.push('Altura inválida.');
    }

    if (paciente.gordura.length == 0) {
        errosLista.push('Paciente sem nível de gordura.');
    }

    return errosLista;
}