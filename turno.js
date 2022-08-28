/* ------------------ LIBRERÍA ------------------ */

import { ScheduleManager } from "./module/ScheduleManager.js";

export const listaTurnos = new ScheduleManager("lista1",new Date(),5,3, "14:00", "17:00")

/* ------------------ CONST ------------------ */

const turnosDias = document.getElementById("turnosDias")

const arrayTurnos = listaTurnos.getAllSchedules()
const arrayDias = arrayTurnos.map((schedule)=>schedule.day)
const reservas = JSON.parse(localStorage.getItem('reservas')) || []

const fragment = document.createDocumentFragment()

/* ------------------ SELECCIONAR DÍA DEL TURNO ------------------ */

for (const day of arrayDias){
    const selectItem = document.createElement('OPTION')
    selectItem.setAttribute('value', day)
    selectItem.textContent = day
    fragment.appendChild(selectItem)
}

turnosDias.appendChild(fragment)

reservas.push()
    localStorage.setItem('reservas', JSON.stringify(reservas));

/* ------------------ HORAS ------------------ 

const turnosHora = document.getElementById("turnosHora")

const arrayHoras = arrayTurnos.find((schedule)=>{ return schedule.day });
const arrayDisponibles = arrayHoras.filter((hour)=>{ return hour.available == true })

------------------ SELECCIONAR HORA DEL TURNO ------------------ 

for (const hour of arrayDisponibles){
    const selectItem = document.createElement('OPTION')
    selectItem.setAttribute('value', hour)
    fragment.appendChild(selectItem)
}

 ----------------------------------- */






