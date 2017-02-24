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

      // const enemy = driver.findElement({className: 'enemy-name'});

    driver.findElement({className: 'enemy-name'}).then(function (enemy) {
     return enemy.getText()
   }).then(function (text) {
     assert.strictEqual(text, 'The Grinch');
})

    })

})
