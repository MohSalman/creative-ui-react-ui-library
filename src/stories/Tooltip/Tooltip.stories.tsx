import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tooltip } from './Tooltip';
import { Button } from '../Button/Button';

const meta = {
  title: 'Data Display/Tooltip',
  component: Tooltip,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Top: Story = {
  args: { content: 'Tooltip content', placement: 'top', children: <Button label="Hover me" /> },
};
export const Bottom: Story = {
  args: { content: 'Tooltip below', placement: 'bottom', children: <Button label="Hover me" /> },
};
