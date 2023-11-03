#!/usr/bin/env node

import { program } from "commander";
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build as viteBuild, createServer as viteCreateServer } from 'vite';
import react from "@vitejs/plugin-react-swc";

const __dirname = dirname(fileURLToPath(import.meta.url));

const commonConfig = {
    resolve: {
        alias: {
            '@': resolve(__dirname, '..', 'studio', 'src'),
        }
    },
    root: join(__dirname, '..', 'studio'),
    plugins: [react()],
};

async function dev() {
    const server = await viteCreateServer({
        ...commonConfig
    });

    await server.listen();
    server.printUrls();
}

async function build({ build: { outDir } }) {
    await viteBuild({
        ...commonConfig,
        build: {
            ...commonConfig.build,
            outDir: outDir,
        },
    });
}

const cwd = process.cwd();

program
  .command('dev')
  .action(async () => {
    await dev();
  });

program
  .command('build')
  .action(async () => {
    await build({
      build: {
        outDir: join(cwd, 'build', 'client'),
      }
    });
  });

program.parse();
