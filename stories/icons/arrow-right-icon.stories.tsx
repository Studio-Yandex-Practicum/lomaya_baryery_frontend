import type { ComponentStory, ComponentMeta } from '@storybook/react';

import { ArrowRightIcon } from '../../src/ui/icons/arrow-right-icon';

export default {
  title: 'Icons',
  component: ArrowRightIcon,
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
} as ComponentMeta<typeof ArrowRightIcon>;

const Template: ComponentStory<typeof ArrowRightIcon> = (args) => <ArrowRightIcon {...args} />;

export const ArrowRight = Template.bind({});

ArrowRight.args = {
  type: 'link',
};
