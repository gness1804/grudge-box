const enemyNameInput = $('#enemy-name-input')
const enemyOffenseInput = $('#enemy-offense-input')
const enemyDateInput = $('#enemy-date-input')
const addEnemyButton = $('#add-enemy-button')
const enemyListDisplay = $('.enemy-list-display')

const putEnemiesOnPage = (enemies) => {
  enemyListDisplay.html('')
  enemies.forEach((enemy) => {
    enemyListDisplay.append(`
      <div>
        <h2>${enemy.name}</h2>
      </div>
      `)
  });
}

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
    throw new Error('You must enter in valid info for all entry fields.')
  }
  axios.post('/api/vi/enemies', {
    id: Date.now(),
    name,
    offense,
    date,
    forgiven: false,
  })
})

getEnemies()
