
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build as viteBuild, createServer as viteCreateServer } from 'vite';
import react from "@vitejs/plugin-react-swc";

const __dirname = dirname(fileURLToPath(import.meta.url));

export async function dev() {
    const server = await viteCreateServer({
        root: join(__dirname, 'studio'),
        plugins: [react()],
    });

    await server.listen();
    server.printUrls();
}

export async function build({ build: { outDir } }) {
    await viteBuild({
        build: {
            outDir: outDir,
        },
        root: join(__dirname, 'studio'),
        plugins: [react()],
    });
}
