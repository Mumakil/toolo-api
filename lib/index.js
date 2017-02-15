// @flow
'use strict';

/* eslint require-yield: 0 */

import koa from 'koa';
import cors from 'koa-cors';
import route from 'koa-route';
import loadData from './data';
import { info } from './log';

export default function (dataDir: string, port: Number): void {
  const app = koa();

  const data = loadData(dataDir);

  function renderError(error: string) {
    this.status = 400;
    this.set('Content-Type', 'application/json');
    this.body = JSON.stringify({error: error});
  }

  function endpoint(date: Date) {
    let formattedDate;
    try {
      formattedDate = date.toISOString().split('T')[0];
    } catch (e) {
      renderError.call(this, 'Invalid date');
      return;
    }
    this.status = 200;
    this.set('Content-Type', 'application/json');
    this.body = JSON.stringify({
      can_have_beers: !data.has(formattedDate),
      date: formattedDate
    });
  }

  app.use(cors({
    origin: true,
    methods: ['GET']
  }));
  app.use(route.get('/', function *() {
    endpoint.call(this, new Date());
  }));
  app.use(route.get('/:date', function *(date) {
    const parsedDate = new Date(date);
    endpoint.call(this, parsedDate);
  }));

  app.listen(port);
  info('Server listening in port', port);
}
