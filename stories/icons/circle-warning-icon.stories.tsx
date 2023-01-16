import type { ComponentStory, ComponentMeta } from '@storybook/react';

import { CircleWarningIcon } from '../../src/ui/icons/circle-warning-icon';

export default {
  title: 'Icons',
  component: CircleWarningIcon,
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
} as ComponentMeta<typeof CircleWarningIcon>;

const Template: ComponentStory<typeof CircleWarningIcon> = (args) => (
  <CircleWarningIcon {...args} />
);

export const CircleWarning = Template.bind({});

CircleWarning.args = {
  type: 'link',
};
