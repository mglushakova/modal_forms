"use strict";

//Form open

var popupButton = document.querySelector(".popup");
var registerBlock = document.querySelector(".register");
var firstItem = registerBlock.querySelector(".form__item");
var firstInput = firstItem.querySelector(".form__input") ? firstItem.querySelector(".form__input") : firstItem.querySelector(".form__select");

popupButton.addEventListener("click", function (event) {
  event.preventDefault();

  registerBlock.classList.add("register--active");
  firstInput.focus();
});

//Form close
var closeButton = document.querySelector(".register__close");

closeButton.addEventListener("click", function (event) {
  event.preventDefault();

  registerBlock.classList.remove("register--active");
});

window.addEventListener("keydown", function (event) {
  if (event.keyCode === 27) {
    if (registerBlock.classList.contains("register--active")) {
      registerBlock.classList.remove("register--active");
    }
  }
});

//Select focus on item click
var selectItems = document.querySelectorAll(".form__item--select");

for (var i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function (event) {
    event.target.parentElement.querySelector(".form__select").focus();
  });
}

//Label position on unempty input
var textInputs = document.querySelectorAll(".form__input[type='text'], .form__input[type='email']");

for (var _i = 0; _i < textInputs.length; _i++) {
  if (event.target.value) {
    label.classList.add("form__label--small");
  }

  textInputs[_i].addEventListener("blur", function (event) {
    var label = event.target.parentElement.querySelector(".form__label");

    if (event.target.value) {
      label.classList.add("form__label--small");
    }
  });
}

//Form validation
var form = registerBlock.querySelector(".form");
var formInputs = form.querySelectorAll(".form__input");
var formSelects = form.querySelectorAll(".form__select");

form.addEventListener("submit", function (event) {
  var inputValidationResult = validateInputs();
  var selectValidationResult = validateSelects();

  if (!(inputValidationResult && selectValidationResult)) {
    event.preventDefault();

    for (var _i2 = 0; _i2 < formInputs.length; _i2++) {
      formInputs[_i2].addEventListener("focusin", function (event) {
        validateInputs();
      });
    }

    for (var _i3 = 0; _i3 < formSelects.length; _i3++) {
      formSelects[_i3].addEventListener("focusout", function (event) {
        validateSelects();
      });
    }
  }
});

function validateInputs() {
  var validationStatus = true;

  for (var _i4 = 0; _i4 < formInputs.length; _i4++) {
    var inputType = formInputs[_i4].getAttribute("type");
    var formItem = formInputs[_i4].parentElement;
    deletePrompt(formInputs[_i4], formItem);

    if (formInputs[_i4].hasAttribute("required") && !formInputs[_i4].value) {
      formItem.classList.add("form__item--invalid");
      createPrompt(formItem, "This is required field");
      validationStatus = false;
    }

    if (formInputs[_i4].value && inputType == "email" && !validateEmail(formInputs[_i4].value)) {
      formItem.classList.add("form__item--invalid");
      createPrompt(formItem, "Invalid format");
      validationStatus = false;
    }

    formItem.classList.add("form__item--valid");
  }

  return validationStatus;
}

function validateSelects() {
  var validationStatus = true;

  for (var _i5 = 0; _i5 < formSelects.length; _i5++) {
    var formItem = formSelects[_i5].parentElement;
    deletePrompt(formSelects[_i5], formItem);

    if (formSelects[_i5].hasAttribute("required") && !formSelects[_i5].value) {
      formItem.classList.add("form__item--invalid");
      createPrompt(formItem, "This is required field");

      validationStatus = false;
    }

    formItem.classList.add("form__item--valid");
  }

  return validationStatus;
}

function createPrompt(parentObject, message) {
  var prompt = document.createElement("div");
  prompt.classList.add("form__prompt");
  prompt.innerText = message;

  parentObject.appendChild(prompt);
}

function deletePrompt(input, item) {
  var prompt = item.querySelector(".form__prompt");
  if (prompt) {
    item.classList.remove("form__item--invalid");
    item.classList.remove("form__item--valid");
    item.removeChild(prompt);
  }
}

function validateEmail(email) {
  var reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(email);
}