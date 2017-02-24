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

})
