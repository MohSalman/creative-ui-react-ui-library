import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './Badge';

const meta = {
  title: 'Data Display/Badge',
  component: Badge,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { children: 'Badge' } };
export const Primary: Story = { args: { variant: 'primary', children: 'Primary' } };
export const Success: Story = { args: { variant: 'success', children: 'Active' } };
export const Danger: Story = { args: { variant: 'danger', children: 'Error' } };
export const Small: Story = { args: { size: 'sm', children: 'Small' } };
