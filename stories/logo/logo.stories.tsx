import type { ComponentStory, ComponentMeta } from '@storybook/react';

import { Logo } from '../../src//ui/logo/logo';

export default {
  title: 'Logo',
  component: Logo,
  argTypes: {
    className: {
      type: 'string',
      description: 'bem mix',
    },
  },
} as ComponentMeta<typeof Logo>;

export const Default: ComponentStory<typeof Logo> = (args) => <Logo {...args} />;
