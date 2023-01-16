import type { ComponentStory, ComponentMeta } from '@storybook/react';

import { SearchIcon } from '../../src/ui/icons/search-icon';

export default {
  title: 'Icons',
  component: SearchIcon,
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
} as ComponentMeta<typeof SearchIcon>;

const Template: ComponentStory<typeof SearchIcon> = (args) => <SearchIcon {...args} />;

export const Search = Template.bind({});

Search.args = {
  type: 'link',
};
