import {
    ScheduleManager
} from './src/module/ScheduleManager.js'

export const listaTurnos = new ScheduleManager("lista1", new Date(), 5, 1, "14:00", "17:00")

/* ------------------ CONST ------------------ */

const form = document.getElementById('form')
const submit = document.getElementById('button')

const name = document.getElementById("name");
const email = document.getElementById("email");
const message = document.getElementById("message");

const turnoDia = document.getElementById("turnoDia")

//const arrayTurnos = listaTurnos.getAllSchedules()
//const arrayDias = arrayTurnos.map((schedule) => schedule.day)

//const fragment = document.createDocumentFragment()

const empty = document.getElementById ("emptyOption")


/* ------------------ ------------------ */

const chosen = {name: "", email: "", turnoDia: "", message: ""}

const myTurns = JSON.parse(localStorage.getItem('myTurns')) || []

name.addEventListener("input", handleInput)
email.addEventListener("input", handleInput)
message.addEventListener("input", handleInput)


turnoDia.addEventListener('change', handleSelect)
submit.addEventListener("click", handleClick)



function handleSelect(e) {
    const {
        id
    } = e.target
    switch (id) {
        case "turnoDia":
            chosen.turnoDia = verifyOption(e)
            break
    }
}

/*function handleClick(e){
    e.preventDefault()
}*/

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

function verifyOption(e) {

    let chosenOption = ""

    for (const option of e.target.childNodes) {
        if (option.tagName == "OPTION") {
            if (option.selected == true) {
                chosenOption = option.value
            }
        }
    }
    return chosenOption
}

/* ------------------ SELECCIONAR DÍA DEL TURNO ------------------ */

/*for (const day of arrayDias) {
    const selectDay = document.createElement('option')
    selectDay.setAttribute('value', day)
    selectDay.textContent = day
    fragment.appendChild(selectDay)
}

turnoDia.appendChild(fragment)*/


const takenTurn = (turnoDia, chosen) => {

    const takenTurn = turnoDia.some(elem => {
        return (
            elem.chosen == chosen.turnoDia
        )
    })
    return takenTurn
}

function handleClick(e) {
    e.preventDefault()
    if (!takenTurn(myTurns, chosen)) {

        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Turno Reservado',
            showConfirmButton: false,
            timer: 1500
        })

        p.innerHTML = `<p>¡Has reservado con éxito tu turno!</p>`
        name.value = ""
        email.value = ""
        turnoDia.value = ""
        message.value = ""


        const newTurn = {
            ...chosen
        }
        myTurns.push(newTurn)
        localStorage.setItem('myTurns', JSON.stringify(myTurns));



    } /*else {
        muestra.innerHTML = 'No es posible ese día.'
    }*/
}

console.log(chosen)