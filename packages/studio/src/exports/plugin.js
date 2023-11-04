import { z } from "zod";

const pluginSchema = z.object({
    name: z.string(),
});

const userSchema = z.object({
    something: z.boolean(),
});

export function definePlugin(config) {
    const result = pluginSchema.safeParse(config);

    if (!result.success) {
        throw new Error(result.error.message);
    }

    return (userConfig) => {
        const result = userSchema.safeParse(userConfig);

        if (!result.success) {
            throw new Error(result.error.message);
        }

        return {
            ...config,
            ...userConfig,
        };
    };
}
