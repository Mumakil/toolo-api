// @flow
'use strict';

/* eslint no-console: 0 */

const DEBUG = !!process.env.DEBUG;

function ts(): string {
  return new Date().toISOString();
}

export function info(...what: any[]): void {
  if (!DEBUG) return;
  console.log(ts(), ...what);
}

export function error(...what: any[]): void {
  if (!DEBUG) return;
  console.error(ts(), ...what);
}
