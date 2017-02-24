/* eslint-disable */
const assert = require('chai').assert
const fakeEnemies = require('./fake-enemies')
const { displayCountOfForgiven } = require('../public/helpers/put-enemies-on-page')

describe('displayCountOfForgiven', function () {
  it('should be a function', function () {
    assert.isFunction(displayCountOfForgiven);
  });

});
