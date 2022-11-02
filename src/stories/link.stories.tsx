import type { Meta } from '@storybook/react';

export default {
  title: 'SpreadsheetLink',
} as Meta;

export const Default = (args: unknown) => {
  return <a className={'text text_type_main-default spreadsheetLink'}>Название задания</a>;
};
