import type { ComponentStory, ComponentMeta } from '@storybook/react';

import { NoteEditIcon } from '../../src/ui/icons/note-edit-icon';

export default {
  title: 'Icons',
  component: NoteEditIcon,
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
} as ComponentMeta<typeof NoteEditIcon>;

const Template: ComponentStory<typeof NoteEditIcon> = (args) => <NoteEditIcon {...args} />;

export const NoteEdit = Template.bind({});

NoteEdit.args = {
  type: 'link',
};
