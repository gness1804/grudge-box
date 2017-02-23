const putEnemiesOnPage = (enemies) => {
  enemyListDisplay.html('')
  enemies.forEach((enemy) => {
    enemyListDisplay.append(`
      <div>
        <h2 onClick="goToEnemyDetail('${enemy.id}')">${enemy.name}</h2>
      </div>
      `)
  });
}
