// Initializing variables for inputs

const inputName = document.getElementById('name');
const inputEmail = document.getElementById('email');
const inputAbout = document.getElementById('about');
const inputMessage = document.getElementById('message');

// Variable for displaying counter on message textarea

const counter = document.querySelector('.contact__inputgroup__label__counter');

// Variable for submit button

const submitButton = document.querySelector('.contact__submit');

// Setting RegExp for validation on inputs

const nameRegExp = /^[a-zA-ZÁÉÍÓÚÜÑáéíóúñü][\sa-zA-ZÁÉÍÓÚÜÑáéíóúñü]{3,50}$/;
const emailRegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
const aboutRegExp = /^[a-zA-ZÁÉÍÓÚÜÑáéíóúñü][\sa-zA-ZÁÉÍÓÚÜÑáéíóúñü]{3,50}$/;
const messageRegExp = /^[a-zA-ZÁÉÍÓÚÜÑáéíóúñü][\sa-zA-ZÁÉÍÓÚÜÑáéíóúñü]{3,300}$/



///////////  Core functions for validating inputs  ///////////

//Function that validates the input from the user

function validation(value, regExp) {
  return regExp.test(value)
}

//Function that trims the value from the input 

function trimValue (input) {
  return input.value.trim();
}

//Function that creates an error for giving feedback to user

function createError (msg, input) {
  let error = new Error(msg);
  error.input = input
  return error
}

//Function that displays a warning error to show feedback to user

function displayWarningError (input, err) {
  let divError = document.createElement('div');
  divError.classList.add('error');
  divError.innerHTML = err.message;
  input.insertAdjacentElement('afterend', divError);
}

//Function that clear all warnings when all inputs are validated ok

function clearAllWarningErrors() {
  let allWarnings = document.querySelectorAll('.error');
  allWarnings.forEach(warning => {
    warning.remove();
  });
}

//Function that validates the input with all created functions

function validateInput (input, regExp, message) {
  let value = trimValue(input);
  let isValid = validation(value, regExp);
  if (!isValid) {
    let error = createError(message, input);
    displayWarningError(input, error);
    return false
  } else {
    if(document.querySelectorAll('.error')){
      clearAllWarningErrors();
    }
    return true
  }
}



///////////  Core functions for Frontend customization  ///////////

// Function for counting the characters in message textarea

function countCharacters(){
  counter.innerHTML = `${inputMessage.value.length}/300`;
  if(inputMessage.value.length > 300){
      counter.style.color = 'red';
  }else{
      counter.style.color = '#aaaaaa';
  }
}



///////////  Event listeners  ///////////

inputMessage.addEventListener('input', countCharacters);



submitButton.addEventListener('click', (e)=>{
  e.preventDefault();

  if(document.querySelectorAll('.error')){
    clearAllWarningErrors();
  }

  let nameIsValid = validateInput(inputName, nameRegExp, 'Ingresa solo letras y un mínimo de 3 caracteres');
  let emailIsValid = validateInput(inputEmail, emailRegExp, 'Ingresa un e-mail válido como en el ejemplo');
  let aboutIsValid = validateInput(inputAbout, aboutRegExp, 'Ingresa solo letras y un mínimo de 3 caracteres');
  let messageIsValid = validateInput(inputMessage, messageRegExp, 'Ingresa solo letras, tienes como máximo 300 caracteres');

  if(nameIsValid && emailIsValid && aboutIsValid && messageIsValid){
    alert('Message sent!');
  }
});























