// @flow

/* eslint no-console: "off" */

import _ from 'lodash';
import fs from 'fs';
import ICal from 'cozy-ical';

const {
  ICalParser
} = ICal;

export default function parseAndWrite(src: string, dest: string, homeTeam: string) {
  const parser = new ICalParser();
  const data = {};
  parser.parseFile(src, (err, cal) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Calendar has ${cal.subComponents.length} events`);
    _.each(cal.subComponents, (evt) => {
      if (evt.name != 'VEVENT') {
        return;
      }
      const summary = evt.model.summary;
      const date = evt.model.startDate.toISOString().split('T')[0];

      const opponents = summary.split('-');
      if (opponents[0].trim() != homeTeam) {
        console.log('Skipping non-home game', summary, 'on', date);
        return;
      }
      console.log('Adding home game', summary, 'on', date);
      data[date] = summary;
    });

    fs.writeFileSync(dest, JSON.stringify(data));
  });

}
