#!/usr/bin/env node

import { program } from "commander";
import { dirname, join, relative } from 'path';
import { fileURLToPath } from 'url';
import { build, createServer } from 'vite';
import react from "@vitejs/plugin-react-swc";

const __dirname = dirname(fileURLToPath(import.meta.url));
const cwd = process.cwd();

program
  .command('dev')
  .action(async () => {
    const server = await createServer({
      root: join(__dirname, 'studio'),
      plugins: [react()],
    });

    await server.listen();
    server.printUrls();
  });

program
  .command('build')
  .action(async () => {
    await build({
      build: {
        outDir: join(cwd, 'build'),
      },
      root: join(__dirname, 'studio'),
      plugins: [react()],
    });
  });

program.parse();
