import type { ComponentStory, ComponentMeta } from '@storybook/react';

import { AwardIcon } from '../../src/ui/icons/award-icon';

export default {
  title: 'Icons',
  component: AwardIcon,
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
} as ComponentMeta<typeof AwardIcon>;

const Template: ComponentStory<typeof AwardIcon> = (args) => <AwardIcon {...args} />;

export const Award = Template.bind({});

Award.args = {
  type: 'link',
};
