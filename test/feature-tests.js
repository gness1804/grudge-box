/* eslint-disable */
const assert = require('assert');
const webdriver = require('selenium-webdriver');
const test = require('selenium-webdriver/testing');

const driver = new webdriver.Builder()
  .forBrowser('chrome')
  .build()

test.describe('App', function () {

  this.timeout(15000);

  test.beforeEach(function() {
      driver.get('http://localhost:3000');
    });

    test.it('application should serve up the index html when user visits it', function () {
      driver.findElement({tagName: 'h1'}).then(function (title) {
        return title.getText()
      }).then(function (text) {
        assert.strictEqual(text, 'Grudge Box');
      })
    })

    test.it('application should serve up three input fields on load', function () {
      const inputFields = driver.findElements({tagName: 'input'}).then(function(select) {
      assert.equal(select.length, 3)
      })
    })

    test.it('application should serve an error if user does not enter data into an input field', function () {
      const submitButton = driver.findElement({id: 'add-enemy-button'});
    submitButton.click();

    driver.findElement({id: 'user-error-warning'}).then(function (button) {
     return button.getText()
      }).then(function (text) {
     assert.strictEqual(text, 'Error: you must enter in valid data in all fields.');
      })
    })

    test.it('application should render one enemy by default', function () {
      const enemy = driver.findElements({className: 'enemy'}).then(function(enemy) {
      assert.equal(enemy.length, 1)
      })
    })

    test.it('application should render the right enemy by default', function () {

    driver.findElement({className: 'enemy-name'}).then(function (enemy) {
     return enemy.getText()
   }).then(function (text) {
     assert.strictEqual(text, 'The Grinch');
    })
  })

  test.it('User should be notified that the proper number of enemies are in the program', function () {

    const nameField = driver.findElement({id: 'enemy-name-input'});
    const offenseField = driver.findElement({id: 'enemy-offense-input'});
    const dateField = driver.findElement({id: 'enemy-date-input'});
    nameField.sendKeys('Big bad dude')
    offenseField.sendKeys('He made me sad')
    dateField.sendKeys('12/26/2016')

    const submitButton = driver.findElement({id: 'add-enemy-button'});
    submitButton.click();

    const updateButton = driver.findElement({id: 'enemy-list-update-button'});
    updateButton.click();

    driver.findElement({id: 'total-enemies-count'}).then(function (count) {
     return count.getText()
   }).then(function (text) {
     assert.strictEqual(text, 'You have 2 foes. What jerks!');
    })

  })

  test.it('application should render new enemies when user enters new enemies', function () {
    const nameField = driver.findElement({id: 'enemy-name-input'});
    const offenseField = driver.findElement({id: 'enemy-offense-input'});
    const dateField = driver.findElement({id: 'enemy-date-input'});
    nameField.sendKeys('Big bad dude')
    offenseField.sendKeys('He made me sad')
    dateField.sendKeys('12/25/2016')

    const submitButton = driver.findElement({id: 'add-enemy-button'});
    submitButton.click();

    const updateButton = driver.findElement({id: 'enemy-list-update-button'});
    updateButton.click();

    const enemy = driver.findElements({className: 'enemy'}).then(function(enemy) {
    assert.equal(enemy.length, 3)
    })

  })

  test.it('sort function should work', function () {
    const nameField = driver.findElement({id: 'enemy-name-input'});
    const offenseField = driver.findElement({id: 'enemy-offense-input'});
    const dateField = driver.findElement({id: 'enemy-date-input'});
    nameField.sendKeys('Big bad dude')
    offenseField.sendKeys('He made me sad')
    dateField.sendKeys('12/26/2016')

    const submitButton = driver.findElement({id: 'add-enemy-button'});
    submitButton.click();

    const updateButton = driver.findElement({id: 'enemy-list-update-button'});
    updateButton.click();

    const sortByNameButton = driver.findElement({id: 'enemy-sort-name-button'});
    sortByNameButton.click()

    driver.findElement({className: 'enemy-name'}).then(function (enemy) {
     return enemy.getText()
   }).then(function (text) {
     assert.strictEqual(text, 'Big bad dude');
    })

  })

})
