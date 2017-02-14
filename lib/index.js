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

  app.use(cors({
    origin: true,
    methods: ['GET']
  }));
  app.use(route.get('/', function *() {
    const today = new Date().toISOString().split('T')[0];
    this.body = JSON.stringify({
      can_have_beers: !data.has(today),
      date: today
    });
  }));
  app.use(route.get('/:date', function *(date) {
    const parsedDate = new Date(date).toISOString().split('T')[0];
    this.body = JSON.stringify({
      can_have_beers: !data.has(parsedDate),
      date: parsedDate
    });
  }));

  app.listen(PORT);
}
