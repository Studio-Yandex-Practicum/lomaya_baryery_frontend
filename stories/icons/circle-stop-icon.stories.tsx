import type { ComponentStory, ComponentMeta } from '@storybook/react';

import { CircleStopIcon } from '../../src/ui/icons/circle-stop-icon';

export default {
  title: 'Icons',
  component: CircleStopIcon,
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
    size: {
      options: ['18', '24'],
      control: { type: 'radio' },
      defaultValue: '24',
    },
  },
} as ComponentMeta<typeof CircleStopIcon>;

const Template: ComponentStory<typeof CircleStopIcon> = (args) => <CircleStopIcon {...args} />;

export const CircleStop = Template.bind({});

CircleStop.args = {
  type: 'link',
};
