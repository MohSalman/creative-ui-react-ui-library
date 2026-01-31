import type { Meta, StoryObj } from '@storybook/react-vite';
import { TopNav } from './TopNav';
import { Button } from '../Button/Button';

const meta = {
  title: 'Layout/Components/TopNav',
  component: TopNav,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof TopNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    brand: <span>Acme</span>,
    children: (
      <>
        <a href="#" className="topnav-link">Dashboard</a>
        <a href="#" className="topnav-link">Projects</a>
        <a href="#" className="topnav-link">Team</a>
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

export const Sticky: Story = {
  args: {
    ...Default.args,
    sticky: true,
  },
};
