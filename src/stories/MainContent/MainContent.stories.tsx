import type { Meta, StoryObj } from '@storybook/react-vite';
import { MainContent } from './MainContent';

const meta = {
  title: 'Layout/Components/MainContent',
  component: MainContent,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof MainContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <h1>Page Title</h1>
        <p>Main content goes here. This area is constrained by max-width and has padding.</p>
      </>
    ),
  },
};

export const Narrow: Story = {
  args: {
    maxWidth: 'sm',
    children: <p>Constrained to 640px max-width.</p>,
  },
};
