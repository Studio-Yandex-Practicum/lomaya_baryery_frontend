import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { StatusLabel } from '../../src/ui/status-label';

export default {
  title: 'StatusLabel',
  component: StatusLabel,
  argTypes: {
    statusText: {
      type: 'string',
      defaultValue: 'Новая',
    },
    type: {
      options: ['current', 'new', 'past', 'approved', 'rejected', 'review'],
      control: { type: 'radio' },
    },
    icon: {
      options: [undefined, 'CircleCheckIcon', 'CircleStopIcon', 'CircleWarningIcon'],
      control: { type: 'radio' },
      defaultValue: undefined,
    },
  },
} as ComponentMeta<typeof StatusLabel>;

const Template: ComponentStory<typeof StatusLabel> = (args) => <StatusLabel {...args} />;

export const Shift = Template.bind({});
Shift.args = {
  type: 'new',
  statusText: 'Новая',
};

export const Participant = Template.bind({});
Participant.args = {
  type: 'approved',
  icon: 'CircleCheckIcon',
  statusText: 'Участник одобрен',
};
