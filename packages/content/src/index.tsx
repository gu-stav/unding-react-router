import React from 'react';
import { definePlugin } from "@unding/studio";

import { Index } from './routes/Index';

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
