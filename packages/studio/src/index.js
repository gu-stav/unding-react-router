
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build as viteBuild, createServer as viteCreateServer } from 'vite';
import react from "@vitejs/plugin-react-swc";

const __dirname = dirname(fileURLToPath(import.meta.url));

const commonConfig = {
    resolve: {
        alias: {
            '@': resolve(__dirname, 'studio', 'src'),
        }
    },
    root: join(__dirname, 'studio'),
    plugins: [react()],
};

export async function dev() {
    const server = await viteCreateServer({
        ...commonConfig
    });

    await server.listen();
    server.printUrls();
}

export async function build({ build: { outDir } }) {
    await viteBuild({
        ...commonConfig,
        build: {
            ...commonConfig.build,
            outDir: outDir,
        },
    });
}
