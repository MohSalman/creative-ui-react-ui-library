import type { Meta, StoryObj } from '@storybook/react-vite';

import { Typography } from './Typography';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/Typography',
  component: Typography,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark', 'disabled'],
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#story-args
  args: { children: 'test' },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const headingOne: Story = {
  args: {
    children: "test",
    variant: "h1"
  },
};

export const headingTwo: Story = {
  args: {
    // primary: false,
    children: 'test',
    variant: "h2"
  },
};

export const headingThree: Story = {
  args: {
    variant: "h3",
    children: 'test',
  },
};

export const headingFour: Story = {
  args: {
    variant: "h4",
    children: 'test',
  },
};

export const headingFive: Story = {
  args: {
    variant: "h5",
    children: "<div>test</div>"
  }
};

export const HeadingSix: Story = {
  args: {
    variant: "h6",
    children: "<div>test</div>"
  }
};

export const BodyOne: Story = {
  args: {
    variant: "body",
    children: "test"
  } 
};

export const BodyTwo: Story = {
  args: {
    variant: "body2",
    children: "test"
  }
};

export const Caption: Story = {
  args: {
    variant: "caption",
    children: "<div>test</div>"
  }
};

export const Overline: Story = {
  args: {
    variant: "overline",
    children: "test"
  }
};

export const Subtitle1: Story = {
  args: {
    variant: "subtitle1",
    children: "test"
  }
};    

export const Subtitle2: Story = {
  args: {
    variant: "subtitle2",
    children: "test"
  }
};

export const AlignLeft: Story = {
  args: {
    variant: "body",
    children: "test",
    align: "left"
  }
};

export const AlignCenter: Story = {
  args: {
    variant: "body",
    children: "test",
    align: "center"     
  }
};

export const AlignRight: Story = {
  args: {
    variant: "body",
    children: "test",
    align: "right"
  }
};

export const AlignJustify: Story = {
  args: {
    variant: "body",
    children: "test",
    align: "justify"
  }
};

export const ThemeColor: Story = {
  args: {
    variant: "body",
    children: "test",
    color: "primary"
  }
};
