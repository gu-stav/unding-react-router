import { z } from "zod";

const schema = z.object({
    baseUrl: z.string(),
});

export function defineConfig(config) {
    const result = schema.safeParse(config);

    if (!result.success) {
        throw new Error(result.error.message);
    }

    return config;
}
