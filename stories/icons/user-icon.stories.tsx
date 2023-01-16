import type { ComponentStory, ComponentMeta } from '@storybook/react';

import { UserIcon } from '../../src/ui/icons/user-icon';

export default {
  title: 'Icons',
  component: UserIcon,
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
} as ComponentMeta<typeof UserIcon>;

const Template: ComponentStory<typeof UserIcon> = (args) => <UserIcon {...args} />;

export const User = Template.bind({});

User.args = {
  type: 'link',
};
