import type { ComponentStory, ComponentMeta } from '@storybook/react';

import { FileCheckIcon } from '../../src/ui/icons/file-check-icon';

export default {
  title: 'Icons',
  component: FileCheckIcon,
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
} as ComponentMeta<typeof FileCheckIcon>;

const Template: ComponentStory<typeof FileCheckIcon> = (args) => <FileCheckIcon {...args} />;

export const FileCheck = Template.bind({});

FileCheck.args = {
  type: 'link',
};
