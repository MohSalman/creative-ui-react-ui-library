import type { Meta, StoryObj } from '@storybook/react-vite';
import { Menu } from './Menu';
import { Button } from '../Button/Button';

const meta = {
  title: 'Navigation/Menu',
  component: Menu,
  tags: ['autodocs'],
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

const menuItems = [
  { id: '1', label: 'Edit', onClick: () => {} },
  { id: '2', label: 'Duplicate', onClick: () => {} },
  { id: '3', label: 'divider', divider: true },
  { id: '4', label: 'Delete', onClick: () => {} },
];

export const Default: Story = {
  args: {
    trigger: <Button label="Open menu" onClick={() => {}} />,
    items: menuItems,
  },
};

export const WithLinks: Story = {
  args: {
    trigger: <button type="button" style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>Actions</button>,
    items: [
      { id: '1', label: 'Profile', href: '#' },
      { id: '2', label: 'Settings', href: '#' },
      { id: '3', label: 'divider', divider: true },
      { id: '4', label: 'Log out', onClick: () => {} },
    ],
  },
};
