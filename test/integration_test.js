'use strict';

import 'mocha';
import expect from 'expect.js';

import {
  setupFixture,
  clearFixtures,
  runServer,
  doRequest,
  toDateString
} from './test_helper';

describe('Server', () => {

  let server;

  beforeEach(() => {
    clearFixtures();
  });

  describe('with positive results', () => {
    let date = '2017-02-01';
    beforeEach(() => {
      const data = {};
      data[date] = 'foo bar';
      data[toDateString(new Date())] = 'bar foo';
      setupFixture('sample_data', data);
      server = runServer();
    });
    afterEach(() => {
      server.close();
    });

    it('finds a positive result for today', async () => {
      const result = await doRequest(server, '/');
      expect(result.can_have_beers).to.be(false);
      expect(result.date).to.equal(toDateString(new Date()));
    });
    it('finds a positive result by date', async () => {
      const result = await doRequest(server, `/${date}`);
      expect(result.can_have_beers).to.be(false);
      expect(result.date).to.equal(date);
    });
  });

  describe('without data results', () => {
    beforeEach(() => {
      server = runServer();
    });
    afterEach(() => {
      server.close();
    });

    it('finds a negative result for today', async () => {
      const result = await doRequest(server, '/');
      expect(result.can_have_beers).to.be(true);
      expect(result.date).to.equal(toDateString(new Date()));
    });
    it('finds a negative result by date', async () => {
      const date = '2017-02-01';
      const result = await doRequest(server, `/${date}`);
      expect(result.can_have_beers).to.be(true);
      expect(result.date).to.equal(date);
    });
    it('handles invalid dates', async () => {
      try {
        await doRequest(server, '/2017-02-12345');
        expect(false).to.be(true); // Should not reach here
      } catch (e) {
        expect(e.response.statusCode).to.eql(400);
        expect(e.response.body.error).to.eql('Invalid date');
      }
    });
  });
});
