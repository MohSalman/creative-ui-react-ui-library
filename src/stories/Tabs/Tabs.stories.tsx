import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tabs } from './Tabs';

const tabItems = [
  { id: 'overview', label: 'Overview', content: <p>Overview content goes here.</p> },
  { id: 'details', label: 'Details', content: <p>Details content goes here.</p> },
  { id: 'settings', label: 'Settings', content: <p>Settings content goes here.</p> },
  { id: 'disabled', label: 'Disabled', content: <p>Disabled tab.</p>, disabled: true },
];

const meta = {
  title: 'Navigation/Tabs',
  component: Tabs,
  tags: ['autodocs'],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: tabItems,
  },
};

export const Underline: Story = {
  args: {
    items: tabItems,
    variant: 'underline',
  },
};

export const Pills: Story = {
  args: {
    items: tabItems,
    variant: 'pills',
  },
};
