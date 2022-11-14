var numeroAleatorio= Math.floor(Math.random() * 100) + 1;

var campoPalpite = document.getElementById('campoPalpite');
var enviarPalpite = document.querySelector('.enviarPalpite');
var palpites = document.querySelector('.palpites');
var ultimoResultado = document.querySelector('.ultimoResult');
var baixoOuAlto = document.querySelector('.baixoOuAlto');

var contagemPalpites = 1;
var botaoReinicio;

let valores = [];

campoPalpite.focus();

function inList(num, lista){
    if(lista.indexOf(Number(num)) != -1){
        return true;
    } else {
        return false;
    }
}

function configFimDeJogo(){
    campoPalpite.disabled = true;
    enviarPalpite.disabled = true;
    botaoReinicio = document.createElement('button');
    botaoReinicio.textContent = 'iniciar novo jogo';
    document.body.appendChild(botaoReinicio);
    botaoReinicio.addEventListener('click', reiniciarJogo);
}

function reiniciarJogo(){
    contagemPalpites = 1;

    var reiniciarParas = document.querySelectorAll('.resultados p');
    for (var i = 0 ; i < reiniciarParas.length ; i++) {
        reiniciarParas[i].textContent = '';
    }

    botaoReinicio.parentNode.removeChild(botaoReinicio);

    campoPalpite.disabled = false;
    enviarPalpite.disabled = false;
    campoPalpite.value = '';
    campoPalpite.focus();

    ultimoResultado.style.backgroundColor = 'white';

    numeroAleatorio = Math.floor(Math.random() * 100) + 1;
}

function conferirPalpite(){
    var palpiteUsuario = Number(campoPalpite.value);
    if (contagemPalpites === 1){
        palpites.textContent = 'Palpites anteriores: ';
    }

    if(!inList(campoPalpite.value, valores)){
        valores.push(Number(campoPalpite.value));
        palpites.textContent += palpiteUsuario + ' ';
        if (palpiteUsuario === numeroAleatorio){
            ultimoResultado.textContent = 'Parabéns! Você acertou!';
            ultimoResultado.style.background = 'green';
            ultimoResultado.style.color = 'white';
            baixoOuAlto.textContent = '';
            configFimDeJogo();
        } else if (contagemPalpites === 10){
            ultimoResultado.textContent = '!!!FIM DE JOGO!!!';
            baixoOuAlto.textContent = '';
            configFimDeJogo();
        } else {
            ultimoResultado.textContent = 'Errado!';
            ultimoResultado.style.background = 'red';
            ultimoResultado.style.color = 'white';
            if (palpiteUsuario < numeroAleatorio){
                baixoOuAlto.textContent = 'Seu palpite está muito baixo!';
            } else if(palpiteUsuario > numeroAleatorio) {
                baixoOuAlto.textContent = 'Seu palpite está muito alto!';
            }
        }
    } else {
        alert('O valor já foi inserido.');
    }
    
    contagemPalpites++;
    campoPalpite.value = '';
    campoPalpite.focus();
}

enviarPalpite.addEventListener('click', conferirPalpite);