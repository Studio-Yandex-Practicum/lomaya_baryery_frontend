import type { ComponentStory, ComponentMeta } from '@storybook/react';

import { CircleCheckIcon } from '../../src/ui/icons/circle-check-icon';

export default {
  title: 'Icons',
  component: CircleCheckIcon,
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
} as ComponentMeta<typeof CircleCheckIcon>;

const Template: ComponentStory<typeof CircleCheckIcon> = (args) => <CircleCheckIcon {...args} />;

export const CircleCheck = Template.bind({});

CircleCheck.args = {
  type: 'link',
};
