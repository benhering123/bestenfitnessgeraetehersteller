#!/usr/bin/env node
// Checks the maker fact files in data/manufacturers against schema.json.
// Every field needs value, source_url and checked (ISO date). The value
// "nicht angegeben" is the one value allowed without a source_url.
//
// Usage: node scripts/check-data.mjs [directory-or-file]
// Default target: data/manufacturers. Exits 1 on any problem.

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { basename, dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const NOT_PUBLISHED = 'nicht angegeben';
const repo = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const schema = JSON.parse(readFileSync(join(repo, 'data/manufacturers/schema.json'), 'utf8'));
const fieldsSchema = schema.properties.fields;
const required = fieldsSchema.required;
const known = new Set(Object.keys(fieldsSchema.properties));
const fieldKeys = new Set(Object.keys(schema.$defs.field.properties));

const target = resolve(process.argv[2] ?? join(repo, 'data/manufacturers'));
const files = statSync(target).isDirectory()
  ? readdirSync(target).filter((f) => f.endsWith('.json') && f !== 'schema.json').sort().map((f) => join(target, f))
  : [target];

const errors = [];
let withoutSource = 0;

const isUrl = (u) => typeof u === 'string' && u.startsWith('https://');
const isIsoDate = (d) =>
  typeof d === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(d) && new Date(d).toISOString().slice(0, 10) === d;
const hasValue = (v) =>
  (typeof v === 'string' && v.trim() !== '') ||
  typeof v === 'number' ||
  typeof v === 'boolean' ||
  (Array.isArray(v) && v.length > 0 && v.every((x) => typeof x === 'string' && x.trim() !== ''));

for (const file of files) {
  const name = basename(file);
  const fail = (msg) => errors.push(`${name}: ${msg}`);
  let data;
  try {
    data = JSON.parse(readFileSync(file, 'utf8'));
  } catch (e) {
    fail(`not valid JSON (${e.message})`);
    continue;
  }
  if (data.slug !== name.replace(/\.json$/, '')) fail(`slug "${data.slug}" does not match the file name`);
  const fields = data.fields ?? {};
  for (const key of required) if (!(key in fields)) fail(`missing field "${key}"`);
  for (const [key, f] of Object.entries(fields)) {
    if (!known.has(key)) fail(`unknown field "${key}"`);
    if (typeof f !== 'object' || f === null || Array.isArray(f)) {
      fail(`${key}: must be an object with value, source_url, checked`);
      continue;
    }
    for (const k of Object.keys(f)) if (!fieldKeys.has(k)) fail(`${key}: unknown key "${k}"`);
    if (!hasValue(f.value)) fail(`${key}: value is empty or missing`);
    if (!isIsoDate(f.checked)) fail(`${key}: checked must be an ISO date (YYYY-MM-DD)`);
    const urls = Array.isArray(f.source_url) ? f.source_url : [f.source_url];
    const sourced = f.source_url !== undefined && urls.length > 0 && urls.every(isUrl);
    if (!sourced && f.value !== NOT_PUBLISHED) {
      withoutSource++;
      fail(`${key}: value without a valid https source_url`);
    } else if (!sourced && f.source_url !== undefined) {
      fail(`${key}: source_url must be an https URL or a list of them`);
    }
  }
}

if (files.length === 0) errors.push('no maker files found');
for (const e of errors) console.error(`error: ${e}`);
console.log(`${files.length} maker file${files.length === 1 ? '' : 's'}, ${withoutSource} fields without source`);
process.exit(errors.length ? 1 : 0);
