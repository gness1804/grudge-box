const displayTotalEnemiesCount = (enemies) => {
  totalEnemiesCount.text(`You have ${enemies.length} foe(s). What jerks!` || 'You don\'t have any enemies! You should celebrate.')
}

const displayCountOfUnforgiven = (enemies) => {
  const count = enemies.filter((enemy) => {
    return enemy.forgiven === false
  })
  totalUnforgivenCount.text(`There are still ${count.length} enemies who need to beg for your forgiveness.` || 'Woohoo! No unforgiven enemies!')
}

const putEnemiesOnPage = (enemies) => {
  enemyListDisplay.html('')
  enemies.forEach((enemy) => {
    enemyListDisplay.append(`
      <div>
        <h2 onClick="goToEnemyDetail('${enemy.id}')">${enemy.name}</h2>
      </div>
      `)
  });
  displayTotalEnemiesCount(enemies)
  displayCountOfUnforgiven(enemies)
}
