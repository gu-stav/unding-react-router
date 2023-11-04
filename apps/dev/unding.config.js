import { defineConfig } from '@unding/studio';
import content from '@unding/content';

import { Button } from './components/Button';

export default defineConfig({
    baseUrl: '/dev',

    components: {
        Button
    },

    plugins: [
        content({
            something: true
        })
    ],
});
