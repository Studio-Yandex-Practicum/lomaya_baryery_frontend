import type { ComponentStory, ComponentMeta } from '@storybook/react';

import { UsersIcon } from '../../src/ui/icons/users-icon';

export default {
  title: 'Icons',
  component: UsersIcon,
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
} as ComponentMeta<typeof UsersIcon>;

const Template: ComponentStory<typeof UsersIcon> = (args) => <UsersIcon {...args} />;

export const Users = Template.bind({});

Users.args = {
  type: 'link',
};
