import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import { ZoomIcon } from '../../src/ui/icons/zoom-icon';

export default {
  title: 'Icons',
  component: ZoomIcon,
  argTypes: {
    type: {
      options: [
        'link',
        'link-active',
        'interface-primary',
        'interface-secondary',
        'interface-black',
        'interface-white',
        'success',
        'pending',
        'error',
      ],
      control: { type: 'radio' },
    },
  },
} as ComponentMeta<typeof ZoomIcon>;

const Template: ComponentStory<typeof ZoomIcon> = (args) => <ZoomIcon {...args} />;

export const Zoom = Template.bind({});

Zoom.args = {
  type: 'link',
};
