// @flow

/* eslint no-console: "off" */

const DATA_DIR = `${__dirname}/../data`;
const SOURCE = `${DATA_DIR}/hifk16-17.ics`;
const DESTINATION = `${DATA_DIR}/hifk16-17.json`;

import parseAndWrite from './parser';

parseAndWrite(SOURCE, DESTINATION, 'HIFK');
