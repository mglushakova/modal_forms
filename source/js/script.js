"use strict";

//Form open
let popupButton = document.querySelector(".popup");
let registerBlock = document.querySelector(".register");
let firstItem = registerBlock.querySelector(".form__item")
let firstInput = firstItem.querySelector(".form__input") ? firstItem.querySelector(".form__input") : firstItem.querySelector(".form__select");

popupButton.addEventListener("click", (event) => {
  event.preventDefault();

  registerBlock.classList.add("register--active");
  firstInput.focus();
});

//Form close
let closeButton = document.querySelector(".register__close");

closeButton.addEventListener("click", (event) => {
  event.preventDefault();

  registerBlock.classList.remove("register--active");
});

window.addEventListener("keydown", (event) => {
  if (event.keyCode === 27) {
    if (registerBlock.classList.contains("register--active")) {
      registerBlock.classList.remove("register--active");
    }
  }
});

//Select focus on item click
let selectItems = document.querySelectorAll(".form__item--select");

for ( let i = 0; i < selectItems.length; i++ ) {
  selectItems[i].addEventListener("click", (event) => {
    event.target.closest(".form__item--select").querySelector(".form__select").focus();
  });
}

//Label position on unempty input
let textInputs = document.querySelectorAll(".form__input[type='text'], .form__input[type='email']");

for ( let i = 0; i < textInputs.length; i++ ) {
  if ( event.target.value ) {
    label.classList.add("form__label--small");
  }

  textInputs[i].addEventListener("blur", (event) => {
    let label = event.target.parentElement.querySelector(".form__label");

    if ( event.target.value ) {
      label.classList.add("form__label--small");
    }
  });
}

//Form validation
let form = registerBlock.querySelector(".form");
let formInputs = form.querySelectorAll(".form__input");
let formSelects = form.querySelectorAll(".form__select");

form.addEventListener("submit", (event) => {
  let inputValidationResult = validateInputs();
  let selectValidationResult = validateSelects();

  if ( !( inputValidationResult && selectValidationResult ) ) {
    event.preventDefault();

    for ( let i = 0; i < formInputs.length; i++ ) {
      formInputs[i].addEventListener("focusin", (event) => {
        validateInputs();
      });
    }

    for ( let i = 0; i < formSelects.length; i++ ) {
      formSelects[i].addEventListener("focusout", (event) => {
        validateSelects();
      });
    }
  }
});

function validateInputs() {
  let validationStatus = true;

  for ( let i = 0; i < formInputs.length; i++ ) {
    let inputType = formInputs[i].getAttribute("type");
    let formItem = formInputs[i].parentElement;
    deletePrompt(formInputs[i], formItem);

    if ( formInputs[i].hasAttribute("required") &&  !formInputs[i].value ) {
      formItem.classList.add("form__item--invalid");
      createPrompt(formItem, "This is required field");
      validationStatus = false;
    }

    if ( formInputs[i].value && inputType == "email" &&  !validateEmail(formInputs[i].value) ) {
      formItem.classList.add("form__item--invalid");
      createPrompt(formItem, "Invalid format");
      validationStatus = false;
    }

    formItem.classList.add("form__item--valid");
  }

  return validationStatus;
}

function validateSelects() {
  let validationStatus = true;

  for ( let i = 0; i < formSelects.length; i++ ) {
    let formItem = formSelects[i].parentElement;
    deletePrompt(formSelects[i], formItem);

    if ( formSelects[i].hasAttribute("required") && !formSelects[i].value ) {
      formItem.classList.add("form__item--invalid");
      createPrompt(formItem, "This is required field");

      validationStatus = false;
    }

    formItem.classList.add("form__item--valid");
  }

  return validationStatus;
}

function createPrompt(parentObject, message) {
  let prompt = document.createElement("div");
  prompt.classList.add("form__prompt");
  prompt.innerText = message;

  parentObject.appendChild(prompt);
}

function deletePrompt(input, item) {
  let prompt = item.querySelector(".form__prompt");
  if ( prompt ) {
    item.classList.remove("form__item--invalid");
    item.classList.remove("form__item--valid");
    item.removeChild(prompt);
  }
}

function validateEmail(email) {
  let reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(email);
}
