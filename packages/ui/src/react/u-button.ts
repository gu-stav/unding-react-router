import * as React from 'react';
import { createComponent } from '@lit/react';

import { UButton } from '../components';

export const Button = createComponent({
    tagName: 'u-button',
    elementClass: UButton,
    react: React,
});
