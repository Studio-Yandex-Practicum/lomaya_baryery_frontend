import type { ComponentStory, ComponentMeta } from '@storybook/react';

import { AlertIcon } from '../../src/ui/icons/alert-icon';

export default {
  title: 'Icons',
  component: AlertIcon,
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
} as ComponentMeta<typeof AlertIcon>;

const Template: ComponentStory<typeof AlertIcon> = (args) => <AlertIcon {...args} />;

export const Alert = Template.bind({});

Alert.args = {
  type: 'link',
};
