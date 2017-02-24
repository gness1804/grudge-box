const showOnlyOneEnemy = () => {
  enemyListDisplay.hide()
  enemyDetailSection.show()
}

const showEnemies = () => {
  enemyListDisplay.show()
  enemyDetailSection.hide()
  getEnemies()
}
