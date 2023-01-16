import type { ComponentStory, ComponentMeta } from '@storybook/react';

import { PlusIcon } from '../../src/ui/icons/plus-icon';

export default {
  title: 'Icons',
  component: PlusIcon,
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
} as ComponentMeta<typeof PlusIcon>;

const Template: ComponentStory<typeof PlusIcon> = (args) => <PlusIcon {...args} />;

export const Plus = Template.bind({});

Plus.args = {
  type: 'link',
};
