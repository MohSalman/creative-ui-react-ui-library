import type { Meta, StoryObj } from '@storybook/react-vite';
import { StatCard } from './StatCard';

const meta = {
  title: 'Data Display/StatCard',
  component: StatCard,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof StatCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { title: 'Total Revenue', value: '$45,231', subtitle: '+20% from last month' },
};
export const WithIcon: Story = {
  args: {
    title: 'Active Users',
    value: '2,350',
    subtitle: '+180 this week',
    icon: '👥',
  },
};
