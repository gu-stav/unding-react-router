import { definePlugin } from "@unding/studio";

export default definePlugin({
    name: '@unding/content',
    slug: 'content',

    routes: () => [
        {
            path: "",
            element: () => import('./routes/Index').then((module) => ({ default: module.Index })),
        }
    ]
})
