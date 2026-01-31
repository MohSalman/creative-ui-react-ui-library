import type { Meta, StoryObj } from '@storybook/react-vite';
import { Footer } from './Footer';

const meta = {
  title: 'Layout/Components/Footer',
  component: Footer,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <span>© 2025 Acme Inc.</span>
        <nav>
          <a href="#">Privacy</a>
          <span style={{ margin: '0 0.5rem' }}>|</span>
          <a href="#">Terms</a>
        </nav>
      </>
    ),
  },
};

export const Minimal: Story = {
  args: {
    variant: 'minimal',
    children: '© 2025 Acme Inc. All rights reserved.',
  },
};

export const Centered: Story = {
  args: {
    variant: 'centered',
    children: '© 2025 Acme Inc. · Privacy · Terms · Contact',
  },
};
