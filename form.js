/* --------------- CONST ------------------ */

const form = document.getElementById('form')
const name = document.getElementById("name");
const email = document.getElementById("email");
const message = document.getElementById('message');
const day = document.getElementById('day');
const hour = document.getElementById('hour');
const submit = document.getElementById('button')

const chosen = {
    name: "",
    email: "",
    message: "",
    day: "",
    hour: "",
}

/*--------------- LOCALSTORAGE [] ----------------*/

const turns = JSON.parse(localStorage.getItem('turns')) || []

/* ------------- AGREGO OPTIONS CON FETCH ------------------ */

// OPTIONS DE DÍAS

const daysOptions = await fetch('./src/days.json')
    .then((response) => response.json())
    .then((data) => fillOptionsDays(data))


function fillOptionsDays(data) {
    let optionDays = "";
    data.days.forEach(element => optionDays += '<option value="' + element + '">' + element + "</option>");

    day.innerHTML = optionDays;
}

// OPTIONS DE HORAS

const hoursOptions = await fetch('./src/hours.json')
    .then((response) => response.json())
    .then((data) => fillOptionsHours(data))


function fillOptionsHours(data) {
    let optionHours = "";
    data.hours.forEach(element => optionHours += '<option value="' + element + '">' + element + "</option>");

    hour.innerHTML = optionHours;
}

/*------------------------------------------------*/

// VALIDACIÓN DEL FORMULARIO

const setErrors = (message, field, isError = true) => {
    if (isError) {
        field.classList.add("invalid");
        field.nextElementSibling.classList.add("error");
        field.nextElementSibling.innerText = message;
    } else {
        field.classList.remove("invalid");
        field.nextElementSibling.classList.remove("error");
        field.nextElementSibling.innerText = "";
    }
}

const validateEmptyField = (message, e) => {
    const field = e.target;
    const fieldValue = e.target.value;
    if (fieldValue.trim().length === 0) {
        setErrors(message, field);
    } else {
        setErrors("", field, false);
    }
}

const validateEmail = e => {
    const field = e.target;
    const fieldValue = e.target.value;
    const regex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);

    if (fieldValue.trim().length > 1 && !regex.test(fieldValue)) {
        setErrors("El correo no es válido.", field);
    } else {
        setErrors("", field, false);
    }
}

/*----------------------------------------------------------------------------------------------------------------------*/

name.addEventListener("blur", (e) => validateEmptyField("Escribí tu nombre completo.", e));
email.addEventListener("blur", (e) => validateEmptyField("Escribí tu email.", e));
message.addEventListener("blur", (e) => validateEmptyField("Escribí un mensaje.", e));

/*----------------------------------------------------------------------------------------------------------------------*/

name.addEventListener('input', (e) => {handleInput(e);validateForm();});
email.addEventListener("input", (e) => {handleInput(e);validateEmail(e);})
message.addEventListener("input", (e) => {handleInput(e);validateForm()})
day.addEventListener("change", (e) =>{handleSelect(e);validateForm()})
hour.addEventListener("change", (e) =>{handleSelect(e);validateForm()})


function validateForm() {
    let result = true;

    if (name.value.trim().length == 0) {
        result = false;
    }

    if (day.value == "") {
        result = false;
    }

    if (hour.value == "") {
        result = false;
    }

    return result;
}

function handleInput(e) {
    const {
        id,
        value
    } = e.target
    switch (id) {
        case "name":
            chosen.name = value
            break
        case "email":
            chosen.email = value
        case "message":
            chosen.message = value
            break
    }
}

// VALIDACIÓN DE LO SELECCIONADO EN DÍA Y HORA

function handleSelect(e) {
    const {
        id
    } = e.target
    switch (id) {
        case "day":
            chosen.day = selectOp(e)
            break
        case "hour":
            chosen.hour = selectOp(e)
        break
    }
}

function selectOp(e){
    let chosenOp = ""

    for(const op of e.target.childNodes){
        if (op.tagName == "OPTION"){
            if(op.selected == true){
                chosenOp = op.value
            }
        }
    } return chosenOp

}

/*----------------------------------------------------------------------------------------------------------------------*/

submit.addEventListener("click", handleClick)

function handleClick(e) {
    e.preventDefault()

    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Turno Reservado',
        text: 'Nos comunicaremos a la brevedad.',
        showConfirmButton: true
    })

    //SI EL FORM NO ESTÁ COMPLETO AL 100% SALTA ERROR CON SWAL.

    if (!validateForm()) {
        Swal.fire({
            icon: 'error',
            title: 'Completa el Formulario.',
            text: 'Tenés que escribir en todos los campos.',
        })
    }

    //LOCAL STORAGE QUE GUARDA LO INGRESADO EN EL FORM.

        console.log(chosen)
        const newTurn = {
            ...chosen
        }
        localStorage.setItem('turns', JSON.stringify([...turns, newTurn]))

    //LIMPIAR EL FORMULARIO UNA VEZ APRETADO EL "ENVIAR".

        name.value = ""
        email.value = ""
        message.value = ""
        day.value = ""
        hour.value = ""

}