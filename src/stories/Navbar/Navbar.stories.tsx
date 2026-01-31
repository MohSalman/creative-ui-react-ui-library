import type { Meta, StoryObj } from '@storybook/react-vite';
import { Navbar } from './Navbar';
import { Button } from '../Button/Button';

const meta = {
  title: 'Navigation/Navbar',
  component: Navbar,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    brand: <span>Acme</span>,
    children: (
      <>
        <a href="#" className="navbar-link navbar-link--active">Home</a>
        <a href="#" className="navbar-link">Products</a>
        <a href="#" className="navbar-link">About</a>
        <a href="#" className="navbar-link">Contact</a>
      </>
    ),
    actions: (
      <>
        <Button label="Log in" size="small" variant="secondary" onClick={() => {}} />
        <Button label="Sign up" size="small" onClick={() => {}} />
      </>
    ),
  },
};

export const Minimal: Story = {
  args: {
    ...Default.args,
    variant: 'minimal',
  },
};

export const Elevated: Story = {
  args: {
    ...Default.args,
    variant: 'elevated',
  },
};
