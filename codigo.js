//  ADIVINA EL NUMERO.

/*Quiero que crees un sencillo juego del tipo "adivina el número". Se debe elegir un número aleatorio entre 1 y 100,
 luego desafiar al jugador a adivinar el número en 10 intentos. Después de cada intento, debería decirle al jugador
  si ha acertado o no — y si está equivocado, debería decirle si se ha quedado corto o se ha pasado. 
  También debería decir los números que ya se probaron anteriormente. 
  El juego terminará una vez que el jugador acierte o cuando se acaben los intentos.
   Cuando el juego termina, se le debe dar al jugador la opción de volver a jugar.*/

/* Al observar este resumen, lo primero que podemos hacer es comenzar a desglosar el proyecto en tareas simples
 y realizables,con la mayor mentalidad de programador posible:

   1) Generar un número aleatorio entre 1 y 100.
   2) Registrar el número del intento en el que el jugador se encuentre. Empezando en 1.
    3)Darle al jugador una forma de adivinar cuál es el número.
    4)Una vez que se ha introducido en número, registrarlo en alguna parte para que el jugador pueda ver
     sus intentos previos.
   5) A continuación, comprobar si el número es correcto.
   6) Si es correcto:
        Mostrar un mensaje de felicitaciones.
        Hacer que el jugador no pueda introducir más intentos (esto arruinaría el juego).
        Mostrar un control que permita al jugador volver a empezar el juego.
   7) Si es incorrecto y al jugador todavía le quedan intentos:
        Decirle al jugador que ha fallado.
        Dejar que el jugador lo intente de nuevo.
        Incrementa el número de intentos en 1.
   8) Si el jugador falla y no le quedan turnos:
        Decirle al jugador que el juego se ha terminado.
        Hacer que el jugador no pueda introducir más intentos (esto arruinaría el juego).
        Mostrar un control que permita al jugador volver a empezar el juego.
   9) Una vez que el juego se reinicia, asegúrate de que la lógica del juego y la IU (interfaz de usuario)
     se restablezcan por completo, luego vuelve al paso 1.
 */

let randomNumber = Math.floor(Math.random() * 100) + 1;

const guesses = document.querySelector(".guesses");
const lastResult = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".lowOrHi");

const guessSubmit = document.querySelector(".guessSubmit");
const guessField = document.querySelector(".guessField");

let guessCount = 1;
let resetButton;

function checkGuess() {
  let userGuess = Number(guessField.value);
  if (guessCount === 1) {
    guesses.textContent = "Intentos anteriores: ";
  }
  guesses.textContent += userGuess + " ";

  if (userGuess === randomNumber) {
    lastResult.textContent = "¡Felicidades! ¡Lo adivinaste!";
    lastResult.style.backgroundColor = "green";
    lowOrHi.textContent = "";
    setGameOver();
  } else if (guessCount === 10) {
    lastResult.textContent = "!!!Fin del juego!!!";
    setGameOver();
  } else {
    lastResult.textContent = "¡Incorrecto!";
    lastResult.style.backgroundColor = "red";
    if (userGuess < randomNumber) {
      lowOrHi.textContent = "¡El número es muy bajo!";
    } else if (userGuess > randomNumber) {
      lowOrHi.textContent = "¡El número es muy grande!";
    }
  }

  guessCount++;
  guessField.value = "";
  guessField.focus();
}

guessSubmit.addEventListener("click", checkGuess);

function setGameOver() {
  guessField.disabled = true;
  guessSubmit.disabled = true;
  resetButton = document.createElement("button");
  resetButton.textContent = "Iniciar nuevo juego";
  document.body.append(resetButton);
  resetButton.addEventListener("click", resetGame);
}

function resetGame() {
  guessCount = 1;

  const resetParas = document.querySelectorAll(".resultParas p");
  for (let i = 0; i < resetParas.length; i++) {
    resetParas[i].textContent = "";
  }

  resetButton.parentNode.removeChild(resetButton);

  guessField.disabled = false;
  guessSubmit.disabled = false;
  guessField.value = "";
  guessField.focus();

  lastResult.style.backgroundColor = "white";

  randomNumber = Math.floor(Math.random() * 100) + 1;
}
