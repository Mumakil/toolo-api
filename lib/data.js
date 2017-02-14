// @flow
'use strict';

import fs from 'fs';
import _ from 'lodash';

const DATA_DIR = `${__dirname}/../data`;

export type DateData = Set<string>

export default function loadData(): DateData {
  const files = fs.readdirSync(DATA_DIR);
  const data: DateData = new Set();
  _.each(files, (file) => {
    if (file.match(/\.json$/)) {
      const json = fs.readFileSync(`${DATA_DIR}/${file}`, 'utf8');
      const parsed = JSON.parse(json);
      _.each(Object.keys(parsed), (key: string) => data.add(key));
    }
  });
  return data;
}
