const listaDeTareas = document.querySelector("#listaTareas")
const tareaInput = document.querySelector("#nuevoTarea")
const btnSumar = document.querySelector("#agregarTarea")
const contarTareasTotal = document.querySelector("#totalTareas")
const contarTareasRealizadas = document.querySelector("#tareasRealizadas")

let tareas = [
  { id: 1, mision: "Llamar a mamá", realizada: false },
  { id: 2, mision: "Comprar comestibles", realizada: true },
  { id: 3, mision: "Preparar presentación", realizada: false }
];

function renderTareas(){
    let html = ""
    tareas.forEach((tarea, index) => {
      html += 
      `
      <tr>
          <td>${tarea.id}</td>
          <td>${tarea.mision}</td>
          <td>
              <input type="checkbox" ${tarea.realizada ? 'checked' : ''} data-id="${tarea.id}">
          </td>
          <td>
              <button onclick="borrar(${tarea.id})">X</button>
          </td>
      </tr>
  `;
    });
    listaDeTareas.innerHTML = html;
    actualizarConteo();
    }

    function actualizarConteo(){
      contarTareasTotal.textContent = tareas.length;
      const realizadas = tareas.filter(tarea => tarea.realizada).length;
      contarTareasRealizadas.textContent = realizadas;
      }


btnSumar.addEventListener("click", () => {
const nuevoTarea = tareaInput.value;
tareas.push({id: Date.now(), mision: nuevoTarea, realizada: false});
tareaInput.value = "";
renderTareas();
})


listaDeTareas.addEventListener("change", (event) => {
  if (event.target.type === 'checkbox') {
      const id = Number(event.target.getAttribute("data-id"))
      marcarRealizada(id, event.target.checked)
  }
})

function borrar(id){
    const index = tareas.findIndex((ele) => ele.id == id);
    tareas.splice(index, 1);
renderTareas();
}

function marcarRealizada(id, estado){
  const tarea = tareas.find((ele) => ele.id === id)
  if (tarea) {
      tarea.realizada = estado
      renderTareas()
  }
}

renderTareas();




