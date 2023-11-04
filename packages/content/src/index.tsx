import React from 'react';
import { definePlugin } from "@unding/studio";

const Index = React.lazy(() => import('./routes/Index').then((module) => ({ default: module.Index })));

export default definePlugin({
    name: '@unding/content',
    slug: 'content',

    routes: () => [
        {
            path: "",
            element: <Index />,
        }
    ]
})
