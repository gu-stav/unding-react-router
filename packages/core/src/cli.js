#!/usr/bin/env node

import { program } from "commander";
import { join } from 'node:path';
import { build as studioBuild, dev as studioDev } from '@unding/studio';

const cwd = process.cwd();

program
  .command('dev')
  .action(async () => {
    await studioDev();
  });

program
  .command('build')
  .action(async () => {
    await studioBuild({
      build: {
        outDir: join(cwd, 'build', 'client'),
      }
    });
  });

program.parse();
