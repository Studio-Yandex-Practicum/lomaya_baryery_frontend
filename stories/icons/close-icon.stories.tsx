import type { ComponentStory, ComponentMeta } from '@storybook/react';

import { CloseIcon } from '../../src/ui/icons/close-icon';

export default {
  title: 'Icons',
  component: CloseIcon,
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
} as ComponentMeta<typeof CloseIcon>;

const Template: ComponentStory<typeof CloseIcon> = (args) => <CloseIcon {...args} />;

export const Close = Template.bind({});

Close.args = {
  type: 'link',
  onClick: () => {},
};
