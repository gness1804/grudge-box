const enemyNameInput = $('#enemy-name-input')
const enemyOffenseInput = $('#enemy-offense-input')
const enemyDateInput = $('#enemy-date-input')
const addEnemyButton = $('#add-enemy-button')
const enemyListDisplay = $('.enemy-list-display')
const enemyListUpdateButton = $('#enemy-list-update-button')
const userErrorWarning = $('#user-error-warning')
const enemyCountsDisplay = $('.enemy-counts-display')
const totalEnemiesCount = $('#total-enemies-count')
const totalUnforgivenCount = $('#total-unforgiven-count')
const totalForgivenCount = $('#total-forgiven-count')

const getEnemies = () => {
  const hitAPI = new XMLHttpRequest();
  hitAPI.open('GET', '/api/vi/enemies', true);
  hitAPI.send();
  hitAPI.onreadystatechange = function () {
    if (hitAPI.readyState === XMLHttpRequest.DONE) {
      if (hitAPI.status === 200) {
        const result = JSON.parse(hitAPI.responseText)
        putEnemiesOnPage(result)
      } else {
        console.error('There was a problem with the API call.'); // eslint-disable-line
      }
    }
  }
}

const postNewEnemyToServer = (name, offense, date) => {
  axios.post('/api/vi/enemies', {
    id: Date.now(),
    name,
    offense,
    date,
    forgiven: false,
  })
}

const dataIsValid = (name, offense, date) => {
  if (typeof name === 'string' && typeof offense === 'string' && typeof date === 'string' && name && offense && date) {
    return true
  } else {
    return false
  }
}

addEnemyButton.on('click', () => {
  const name = enemyNameInput.val()
  const offense = enemyOffenseInput.val()
  const date = enemyDateInput.val()
  if (!dataIsValid(name, offense, date)) {
    userErrorWarning.text('Error: you must enter in valid data in all fields.')
    return
  }
  postNewEnemyToServer(name, offense, date)
  clearInputFields()
})

getEnemies()

enemyListUpdateButton.on('click', () => {
  getEnemies()
});
