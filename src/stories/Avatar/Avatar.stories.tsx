import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from './Avatar';

const meta = {
  title: 'Data Display/Avatar',
  component: Avatar,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Fallback: Story = { args: { fallback: 'JD' } };
export const Small: Story = { args: { size: 'sm', fallback: 'AB' } };
export const Large: Story = { args: { size: 'lg', fallback: 'XY' } };
