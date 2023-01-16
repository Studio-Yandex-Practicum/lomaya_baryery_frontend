import type { ComponentStory, ComponentMeta } from '@storybook/react';

import { CheckIcon } from '../../src/ui/icons/check-icon';

export default {
  title: 'Icons',
  component: CheckIcon,
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
} as ComponentMeta<typeof CheckIcon>;

const Template: ComponentStory<typeof CheckIcon> = (args) => <CheckIcon {...args} />;

export const Check = Template.bind({});

Check.args = {
  type: 'link',
};
