/* eslint-disable */
const jsdom = require('mocha-jsdom');

const chai = require('chai');
const assert = require('assert');
const request = require('supertest');
const express = require('express');

const app = express();

const expect = chai.expect();
const should = chai.should();
const chaiHttp = require('chai-http');

chai.use(chaiHttp)

describe('GET /', function () {
  it('should return a 200 status message', function () {
    request(app)
      .get('/')
      .end(function(error, result) {
        result.should.have.status(200);
        done();
      });
  });

  it('should fail when given an invalid path', function () {
    request(app)
      .get('/foo')
      .end(function(error, result) {
        result.should.have.status(404);
        done();
      });
  });
});

describe('enemies route', function () {
  it('should be a valid path', function () {
    request(app)
      .get('/api/vi/enemies')
      .end(function(error, result){
        result.should.have.status(200);
        done();
      })
  });

  it('should return an array', function () {
    request(app)
      .get('/api/vi/enemies')
      .end(function(error, result) {
        result.should.be.a('array');
        done();
      });
  });

  it('should have an initial length of 1', function () {
    request(app)
      .get('/api/vi/enemies')
      .end(function(error, result) {
        assert.strictEqual(result.length, 1);
        done();
      });
  });

  it('allow user to post a new enemy', function () {
    request(app)
      .post('/api/vi/enemies')
      .send({
        id: Date.now(),
        name: 'Darth Vader',
        offense: 'Trying to turn his son to the Dark Side',
        date: '12/31/77',
        forgiven: false,
      })
      .end(function (error, result) {
        result.should.have.status(200);
        result.should.be.json;
        assert.strictEqual(result.length, 2);
        done();
      })
  });

});

describe('enemy id route', function () {
  it('should return an enemy by id', function () {
    request(app)
      .get('/api/vi/enemies/372921')
      .end(function(error, result) {
        result.should.have.status(200);
        result.should.be.a('array');
        done();
      });
  });
});
