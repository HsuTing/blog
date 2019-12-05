// @flow

import fs from 'fs';
import path from 'path';

import chalk from 'chalk';
import wordCount from 'word-count';

import d3DirTree from '@mikojs/utils/lib/d3DirTree';

const MIN_WORDS = 50;

d3DirTree(process.cwd(), {
  extensions: /\.md$/,
  exclude: /node_modules/,
})
  .leaves()
  .forEach(({ data: { path: filePath, type } }) => {
    if (type !== 'file') return;

    const count = wordCount(fs.readFileSync(filePath, 'utf-8'));

    if (count < MIN_WORDS)
      throw new Error(chalk`Each article should be written over {red ${MIN_WORDS}} words.
       {green ./${path.relative(
         process.cwd(),
         filePath,
       )}} is only written in {cyan ${count}} word${count === 1 ? '' : 's'}.`);
  });
