import React from 'react';
import type { ComponentStory } from '@storybook/react';
import styles from '../../ui/tooltip/tooltip.module.css';

interface ITooltip {
  text: string;
  posX: number;
  posY: number;
}

const Tooltip = React.forwardRef<HTMLParagraphElement, ITooltip>(({ text, posX, posY }, ref) => (
  <>
    <p ref={ref} className={styles.tooltip} style={{ top: posY, left: posX, position: 'static' }}>
      {text}
    </p>
    <h3 style={{ fontFamily: 'sans-serif', fontWeight: 400 }}>
      Нажми Show code, чтобы посмотреть описание 👇
    </h3>
  </>
));

export default {
  title: 'Tooltip(HOC)',
};

const Template: ComponentStory<typeof Tooltip> = (args) => <Tooltip {...args} />;

export const Default = Template.bind({});

Default.args = {
  text: 'Best awasome tooltip in the world',
};

Default.parameters = {
  docs: {
    source: {
      code: `//exapmle how use HOC with component Button
import { withTooltip } from ./ui/tooltip/tooltip.tsx;
import { Button, TButtonProps } from ./ui/button/button.tsx;

const ButtonWithTooltip = withTooltip<TButtonProps>(Button);

<ButtonWithTooltip type={'disabled'} htmlType={'button'} tooltipText={'example tooltip text'} tooltipEnabled={true}>
  Button text
</ButtonWithTooltip>
      `,
      language: 'tsx',
      type: 'auto',
    },
  },
};
