export async function loadConfig(path) {
    return (await import(`${path}/unding.config.js`)).default;
}
