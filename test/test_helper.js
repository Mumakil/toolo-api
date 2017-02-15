'use strict';

import fs from 'fs';
import url from 'url'

import _ from 'lodash';
import rp from 'request-promise';

import app from '../lib/index';


const FIXTURES = `${__dirname}/fixtures`;

let writtenFixtures = [];

function randomPort() {
  return 50000 + Math.ceil(Math.random() * 10000);
}

export function setupFixture(file, data) {
  const filename = `${FIXTURES}/${file}.json`;
  fs.writeFileSync(filename, JSON.stringify(data), 'utf8');
  writtenFixtures.push(filename);
}

export function clearFixtures() {
  _.each(writtenFixtures, (filename) => {
    fs.unlinkSync(filename);
  });
  writtenFixtures = [];
}

export function runServer() {
  return app(FIXTURES, randomPort());
}

export function doRequest(server, path) {
  const port = server.address().port;
  return rp({
    uri: url.format({protocol: 'http:', hostname: 'localhost', pathname: path, port}),
    json: true
  });
}

export function toDateString(date) {
  return date.toISOString().split('T')[0];
}
