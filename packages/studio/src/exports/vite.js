import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import react from "@vitejs/plugin-react-swc";

const __dirname = dirname(fileURLToPath(import.meta.url));
const cwd = process.cwd();

export function studio() {
    return {
        name: 'studio',
        config: (config) => {
            config.resolve = {
                ...config?.resolve,
                alias: {
                    ...config.resolve?.alias,
                    '@': fileURLToPath(new URL('../studio/src', import.meta.url)),
                    '~unding.config.js': resolve(cwd, 'unding.config.js'),
                }
            },
            config.root = join(__dirname, '..', 'studio');
            config.plugins.push(react());
            config.build = {
                ...config.build,
                outDir: join(cwd, 'build'),
                emptyOutDir: true,
            };

            return config;
        },
    }
}
