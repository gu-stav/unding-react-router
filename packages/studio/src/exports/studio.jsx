import * as React from 'react';
import ReactDOM from 'react-dom/client';

import { Studio } from '../studio/src/index';

export function renderStudio(rootNode, config) {
    ReactDOM
        .createRoot(rootNode)
        .render(<Studio config={config} />)
}

export { Studio };
