const addEnemiesToClientStore = (enemies) => {
  enemiesStore = enemies
}

const clearEnemyList = () => {
  enemyListDisplay.html('')
}

const appendEnemiesToDOM = (enemies) => {
  enemyListDisplay.append('<h2 class="enemy-headline">Enemies:</h2>')
  enemies.forEach((enemy) => {
    enemyListDisplay.append(`
      <div class="enemy">
        <h3
        class="enemy-name"
        onClick="goToEnemyDetail('${enemy.id}')">${enemy.name}</h3>
      </div>
      `)
  });
}

const displayTotalEnemiesCount = (enemies) => {
  enemies.length ? totalEnemiesCount.text(`You have ${enemies.length} foes. What jerks!`) : totalEnemiesCount.text('You don\'t have any enemies! You should celebrate.')
}

const displayCountOfUnforgiven = (enemies) => {
  const count = enemies.filter((enemy) => {
    return enemy.forgiven === false
  })

  count.length ? totalUnforgivenCount.text(`There are still ${count.length} enemies who need to beg for your forgiveness.`) : totalUnforgivenCount.text('Woohoo! No unforgiven enemies!')
}

const displayCountOfForgiven = (enemies) => {
  const count = enemies.filter((enemy) => {
    return enemy.forgiven === true
  })

  count.length ? totalForgivenCount.text(`You have forgiven ${count.length} enemies. Good on you!`) : totalForgivenCount.text('All of your enemies remain unforgiven. What a crappy place to be!')
}

const putEnemiesOnPage = (enemies) => {
  clearEnemyList()
  appendEnemiesToDOM(enemies)
  displayTotalEnemiesCount(enemies)
  displayCountOfUnforgiven(enemies)
  displayCountOfForgiven(enemies)
  addEnemiesToClientStore(enemies)
}

Object.assign(exports, {
  displayCountOfForgiven,
  clearEnemyList,
})
