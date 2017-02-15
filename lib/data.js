// @flow
'use strict';

import fs from 'fs';
import _ from 'lodash';
import { info } from './log';

export type DateData = Set<string>

export default function loadData(path: string): DateData {
  const files = fs.readdirSync(path);
  const data: DateData = new Set();
  _.each(files, (file) => {
    if (file.match(/\.json$/)) {
      info('Loading data file', file);
      const json = fs.readFileSync(`${path}/${file}`, 'utf8');
      const parsed = JSON.parse(json);
      _.each(Object.keys(parsed), (key: string) => data.add(key));
    }
  });
  return data;
}
