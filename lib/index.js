// @flow

/* eslint require-yield: 0 */

'use strict';

import koa from 'koa';
import cors from 'koa-cors';
import route from 'koa-route';
import loadData from './data';

export default function (): void {
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
  const app = koa();

  const data = loadData();

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

  app.listen(PORT);
}
