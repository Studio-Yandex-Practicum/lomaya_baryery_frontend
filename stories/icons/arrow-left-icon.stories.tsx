import type { ComponentStory, ComponentMeta } from '@storybook/react';

import { ArrowLeftIcon } from '../../src/ui/icons/arrow-left-icon';

export default {
  title: 'Icons',
  component: ArrowLeftIcon,
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
} as ComponentMeta<typeof ArrowLeftIcon>;

const Template: ComponentStory<typeof ArrowLeftIcon> = (args) => <ArrowLeftIcon {...args} />;

export const ArrowLeft = Template.bind({});

ArrowLeft.args = {
  type: 'link',
};
