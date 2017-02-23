const putEnemiesOnPage = (enemies) => {
  enemyListDisplay.html('')
  enemies.forEach((enemy) => {
    enemyListDisplay.append(`
      <div>
        <h2 onClick="goToEnemyDetail('${enemy.id}')">${enemy.name}</h2>
      </div>
      `)
  });
  totalEnemiesCount.text(`You have ${enemies.length} foe(s). What jerks!` || 'You don\'t have any enemies! You should celebrate.')
}
