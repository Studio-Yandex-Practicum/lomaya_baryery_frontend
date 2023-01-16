import type { ComponentStory, ComponentMeta } from '@storybook/react';

import { ChevronDownIcon } from '../../src/ui/icons/chevron-down-icon';

export default {
  title: 'Icons',
  component: ChevronDownIcon,
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
} as ComponentMeta<typeof ChevronDownIcon>;

const Template: ComponentStory<typeof ChevronDownIcon> = (args) => <ChevronDownIcon {...args} />;

export const ChevronDown = Template.bind({});

ChevronDown.args = {
  type: 'link',
};
