#!/usr/bin/env node
import { Command } from 'commander';
import genDiff from '../src/genDiff.js';
import parse from '../src/parse.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => {
    console.log(genDiff(parse(filepath1), parse(filepath2)));
  });

program.parse();
