import type { Meta, StoryObj } from '@storybook/react-vite';

import { Card } from './Card';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/Card',
  component: Card,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#story-args
  args: { children: 'test' },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    children: "test",
    variant: "primary"
  },
};

export const Secondary: Story = {
  args: {
    // primary: false,
    children: 'test',
    variant: "secondary"
  },
};

export const Success: Story = {
  args: {
    variant: "success",
    children: 'test',
  },
};

export const Danger: Story = {
  args: {
    variant: "danger",
    children: 'test',
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    children: "<div>test</div>"
  }
};

export const Info: Story = {
  args: {
    variant: "info",
    children: "<div>test</div>"
  }
};

export const Light: Story = {
  args: {
    variant: "light",
    children: "<div>test</div>"
  }
};

export const Dark: Story = {
  args: {
    variant: "dark",
    children: "<div>test</div>"
  }
};

export const Disabled: Story = {
  args: {
    variant: "disabled",
    children: "<div>test</div>"
  }
};