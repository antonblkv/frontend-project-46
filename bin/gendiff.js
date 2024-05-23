#!/usr/bin/env node
import { Command } from 'commander';
import { parse } from '../src/parse.js';
import _ from 'lodash';

const program = new Command();


const genDiff = (filepath1, filepath2) => {
	const data1 = parse(filepath1);
	const data2 = parse(filepath2);
	const keys = [...(_.keys(data1)), ...(_.keys(data2))];
	const sortedKeys = _.sortedUniq(_.sortBy(keys));
	let result = '';
	
	for (const key of sortedKeys) {
		
		if (data1[key] === data2[key]) {
			result += `  ${key}: ${data1[key]}\n`;
		} else {
			result += data1.hasOwnProperty(key) ? `- ${key}: ${data1[key]}\n` : '';
			result += data2.hasOwnProperty(key) ? `+ ${key}: ${data2[key]}\n` : '';
		}

	}

	return result;
};


program
	.name('gendiff')
	.description('Compares two configuration files and shows a difference.')
	.version('0.0.1')
	.arguments('<filepath1> <filepath2>')
	.option('-f, --format [type]', 'output format')
	.action((filepath1, filepath2) => {
		console.log(genDiff(filepath1, filepath2));
	});

program.parse();
