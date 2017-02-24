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
const sortEnemiesByNameButton = $('#enemy-sort-name-button')
const sortEnemiesByDateButton = $('#enemy-sort-date-button')
const enemyDetailSection = $('.enemy-detail-section')

let enemiesStore = []
let isTargetForgiven = false

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
        throw new Error('There was a problem with the API call.')
      }
    }
  }
}

const showOnlyOneEnemy = () => {
  enemyListDisplay.hide()
  enemyDetailSection.show()
}

const showEnemies = () => {
  enemyListDisplay.show()
  enemyDetailSection.hide()
  getEnemies()
}

const putEnemyOnPage = (data) => {
  const enemy = data[0]
  showOnlyOneEnemy()
  enemyDetailSection.html('')
  enemyDetailSection.append(`
    <div>
      <h2 class="enemy-headline">Enemy:</h2>
      <h3>Name: ${enemy.name}</h3>
      <p>Offense: ${enemy.offense}</p>
      <p>Is this enemy forgiven? Currently: ${enemy.forgiven}</p>
      <p>Desired forgiveness status:</p>
      <select id="enemy-forgiven-dropdown">
        <option selected>Choose One!</option>
        <option value="true">True</option>
        <option value="false">False</option>
      </select>
      <button onClick="saveEnemyData('${enemy.id}')">Save the Loser's Details</button>
      <button onClick="showEnemies()">Close</button>
    </div>
  `)
}

enemyDetailSection.on('change', '#enemy-forgiven-dropdown', (e) => {
  isTargetForgiven = e.target.value
});

const saveEnemyData = (id) => {
  axios.patch(`/api/vi/enemies/${id}`, {
    forgiven: isTargetForgiven,
  })
}

const goToEnemyDetail = (id) => {
  const hitAPI = new XMLHttpRequest();
  hitAPI.open('GET', `/api/vi/enemies/${id}`, true);
  hitAPI.send();
  hitAPI.onreadystatechange = function () {
    if (hitAPI.readyState === XMLHttpRequest.DONE) {
      if (hitAPI.status === 200) {
        putEnemyOnPage(JSON.parse(hitAPI.responseText))
      } else {
        throw new Error('There was a problem with the API call.');
      }
    }
  }
}

const sortEnemiesByName = () => {
  clearEnemyList()
  const sortedEnemies = enemiesStore.sort((a, b) => {
    const first = a.name.toLowerCase()
    const second = b.name.toLowerCase()
    if (first < second) {
      return -1
    }
    if (first > second) {
      return 1
    }
    return 0
  })
  appendEnemiesToDOM(sortedEnemies)
  addEnemiesToClientStore(sortedEnemies)
}

const sortEnemiesByDate = () => {
  clearEnemyList()
  const sortedEnemies = enemiesStore.sort((a, b) => {
    return b.rawDateOfOffense - a.rawDateOfOffense
  })
  appendEnemiesToDOM(sortedEnemies)
  addEnemiesToClientStore(sortedEnemies)
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

addEnemyButton.on('click', (e) => {
  e.preventDefault()
  const name = enemyNameInput.val()
  const offense = enemyOffenseInput.val()
  const date = enemyDateInput.val()
  if (!dataIsValid(name, offense, date)) {
    userErrorWarning.text('Error: you must enter in valid data in all fields.')
    return
  }
  postNewEnemyToServer(name, offense, date)
  clearInputFields()
  userErrorWarning.text('')
})

getEnemies()
showEnemies()

enemyListUpdateButton.on('click', (e) => {
  e.preventDefault()
  getEnemies()
});

sortEnemiesByNameButton.on('click', (e) => {
  e.preventDefault()
  sortEnemiesByName()
});

sortEnemiesByDateButton.on('click', (e) => {
  e.preventDefault()
  sortEnemiesByDate()
});

Object.assign(exports,
  {
    enemyListDisplay,
  })
