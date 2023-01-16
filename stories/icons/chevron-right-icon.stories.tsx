import type { ComponentStory, ComponentMeta } from '@storybook/react';

import { ChevronRightIcon } from '../../src/ui/icons/chevron-right-icon';

export default {
  title: 'Icons',
  component: ChevronRightIcon,
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
} as ComponentMeta<typeof ChevronRightIcon>;

const Template: ComponentStory<typeof ChevronRightIcon> = (args) => <ChevronRightIcon {...args} />;

export const ChevronRight = Template.bind({});

ChevronRight.args = {
  type: 'link',
};
