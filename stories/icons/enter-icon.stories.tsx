import type { ComponentStory, ComponentMeta } from '@storybook/react';

import { EnterIcon } from '../../src/ui/icons/enter-icon';

export default {
  title: 'Icons',
  component: EnterIcon,
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
} as ComponentMeta<typeof EnterIcon>;

const Template: ComponentStory<typeof EnterIcon> = (args) => <EnterIcon {...args} />;

export const Enter = Template.bind({});

Enter.args = {
  type: 'link',
};
