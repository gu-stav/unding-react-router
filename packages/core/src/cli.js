#!/usr/bin/env node

import { program } from "commander";
import { join } from 'node:path';
import { build as studioBuild, dev as studioDev } from '@unding/studio';

import { loadConfig } from './config.js';

const cwd = process.cwd();
const config = await loadConfig(cwd);

program
  .command('dev')
  .action(async () => {
    await studioDev({
      config
    });
  });

program
  .command('build')
  .action(async () => {
    await studioBuild({
      build: {
        outDir: join(cwd, 'build', 'client'),
      },
      config
    });
  });

program.parse();
