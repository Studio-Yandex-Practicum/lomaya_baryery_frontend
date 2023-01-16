import type { ComponentStory, ComponentMeta } from '@storybook/react';

import { ChevronLeftIcon } from '../../src/ui/icons/chevron-left-icon';

export default {
  title: 'Icons',
  component: ChevronLeftIcon,
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
} as ComponentMeta<typeof ChevronLeftIcon>;

const Template: ComponentStory<typeof ChevronLeftIcon> = (args) => <ChevronLeftIcon {...args} />;

export const ChevronLeft = Template.bind({});

ChevronLeft.args = {
  type: 'link',
};
