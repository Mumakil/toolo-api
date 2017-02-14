// @flow

/* eslint no-console: "off" */

const DATA_DIR = `${__dirname}/../data`;
const SOURCE = `${DATA_DIR}/hjk16-17.ics`;
const DESTINATION = `${DATA_DIR}/hjk16-17.json`;

import parseAndWrite from './parser';

parseAndWrite(SOURCE, DESTINATION, 'HJK');
