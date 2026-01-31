import type { Meta, StoryObj } from '@storybook/react-vite';
import { Sidebar } from './Sidebar';

const NavContent = () => (
  <nav className="sidebar-nav">
    <a href="#" className="sidebar-nav-item">Dashboard</a>
    <a href="#" className="sidebar-nav-item">Projects</a>
    <a href="#" className="sidebar-nav-item">Team</a>
    <a href="#" className="sidebar-nav-item">Settings</a>
  </nav>
);

const meta = {
  title: 'Layout/Components/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <NavContent />,
    style: { minHeight: 300 },
  },
};

export const Narrow: Story = {
  args: {
    width: 'narrow',
    children: <NavContent />,
    style: { minHeight: 300 },
  },
};

export const Wide: Story = {
  args: {
    width: 'wide',
    children: <NavContent />,
    style: { minHeight: 300 },
  },
};

export const Right: Story = {
  args: {
    position: 'right',
    children: <NavContent />,
    style: { minHeight: 300 },
  },
};

export const Collapsed: Story = {
  args: {
    collapsed: true,
    children: <NavContent />,
    style: { minHeight: 300 },
  },
};
