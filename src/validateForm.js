


const form = document.querySelector("form[name='contact-form']");
const nameInput = document.querySelector("input[name='name']");
const emailInput = document.querySelector("input[name='email']");
const messageInput = document.querySelector("textarea[name='message']");
const turnoDia = document.getElementById("turnoDia")

nameInput.isValid = () => !!nameInput.value;
emailInput.isValid = () => isValidEmail(emailInput.value);
messageInput.isValid = () => !!messageInput.value;

const inputFields = [nameInput, emailInput, messageInput];

/*-----*/


/*-----*/

const isValidEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; //simbolos para validar el correo
    return re.test(String(email).toLowerCase());
};


let shouldValidate = false;
let isFormValid = false;

const validateInputs = () => {
    if (!shouldValidate) return;

    isFormValid = true;
    inputFields.forEach((input) => {
        input.classList.remove("invalid");
        input.nextElementSibling.classList.add("hide");

        if (!input.isValid()) {
            input.classList.add("invalid");
            isFormValid = false;
            input.nextElementSibling.classList.remove("hide");
        }
    });
};

form.addEventListener("submit", (e) => {
    e.preventDefault();
    shouldValidate = true;
    validateInputs();
    if (isFormValid) {        

/*        nameInput.value = ""
        emailInput.value = ""
        turnoDia.value = ""
        messageInput.value = ""*/

    }
});

inputFields.forEach((input) => input.addEventListener("input", validateInputs));