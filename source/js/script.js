"use strict";

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
  textInputs[i].addEventListener("blur", (event) => {
    let label = event.target.parentElement.querySelector(".form__label");

    if ( event.target.value ) {
      label.classList.add("form__label--small");
    }
  });
}
