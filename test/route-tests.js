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

describe('Sanity check', () => {
  it('testing should run', () => {

    assert.strictEqual('dogs', 'cats');
  });
});
