import type { ComponentStory, ComponentMeta } from '@storybook/react';

import { CalendarIcon } from '../../src/ui/icons/calendar-icon';

export default {
  title: 'Icons',
  component: CalendarIcon,
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
} as ComponentMeta<typeof CalendarIcon>;

const Template: ComponentStory<typeof CalendarIcon> = (args) => <CalendarIcon {...args} />;

export const Calendar = Template.bind({});

Calendar.args = {
  type: 'link',
};
