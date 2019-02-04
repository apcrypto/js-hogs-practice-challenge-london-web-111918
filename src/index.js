const baseURL = `http://localhost:3000/hogs/`
const formDiv = document.querySelector('#form')
const hogForm = document.querySelector('#hog-form')
const container = document.querySelector('#hog-container')
const nameInput = document.querySelector('#nameInput')
const specialityInput = document.querySelector('#specialityInput')
const medalInput = document.querySelector('#medalInput')
const weightInput = document.querySelector('#weightInput')
const greasedInput = document.querySelector('#greased')
const imageURL = document.querySelector('#imgURL')

const state = {
  hogs: []
}

const getHogs = () => {
  return fetch(baseURL)
    .then(res => res.json())
    .then(hogs => {
      state.hogs = hogs
      console.log('data in state!')
      renderHogs()
  })
}

const renderHogs = () => {
  container.innerHTML = ''
  state.hogs.forEach(hog => {
    return container.innerHTML += `
      <h2>${hog.name} </h2>
      <img src='${hog.image}' />
      <p>Specialty: ${hog.specialty}</p>
      <p>Highest medal achieved: ${hog.medal}</p>
      <p>Weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water: ${hog.weight}</p>
      <p>Greased: <input data-id="${hog.id}" class="toggle" id="greased" type="checkbox" ${hog.greased}><br></p>
      <button class="delete" data-id="${hog.id}">Delete</button>`
  })

  const deletBtns = document.querySelectorAll('.delete')
  deletBtns.forEach(deleteBtn => deleteBtn.addEventListener('click', deleteHogHandler))

  const greasedHogs = document.querySelectorAll('.toggle')
  greasedHogs.forEach(greasedHog => greasedHog.addEventListener('click', greasedHogHandler))
}

hogForm.addEventListener('submit', (event) => {
	event.preventDefault()
	const name = nameInput.value
  const specialty = specialityInput.value
  const greased = greasedInput.checked
  const weight = parseInt(weightInput.value)
  const medal = medalInput.value
  const image = imageURL.value
  const formData = { name, specialty, greased, weight, medal, image };
  createNewHog(formData)
	hogForm.reset()
})

const deleteHogHandler = (event) => {
  const id = event.target.dataset.id
  const hog = state.hogs.find(hog => hog.id = id)
  deleteHog(hog)
}

const greasedHogHandler = (event) => {
  const id = event.target.dataset.id
  const hog = state.hogs.find(hog => hog.id == id)

  if(hog.greased === false) {
     hog.greased = true;

   } else {

   if(hog.greased === true) {
       hog.greased = false;
  }
 }
  updateHog(hog)
}


//api stuff
const createNewHog = (formData) => {
  return fetch(`http://localhost:3000/hogs/`,{
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(formData)
  }).then(res => getHogs())
}

const deleteHog = (hog) => {
  return fetch(`http://localhost:3000/hogs/${hog.id}`,{
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(hog)
  }).then(res => getHogs())
}

const updateHog = (hog) => {
  return fetch(`http://localhost:3000/hogs/${hog.id}`,{
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(hog)
  }).then(res => getHogs())
}

getHogs()
