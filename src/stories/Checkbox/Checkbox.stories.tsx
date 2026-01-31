import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from './Checkbox';

const meta = {
  title: 'Form/Controls/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['with-text', 'without-text'],
      description: 'Show label text beside the checkbox or just the box',
    },
    label: {
      control: 'text',
      description: 'Label text (when variant is with-text)',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    disabled: {
      control: 'boolean',
    },
    checked: {
      control: 'boolean',
    },
  },
  args: {
    label: 'Option',
  },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithText: Story = {
  args: {
    variant: 'with-text',
    label: 'Accept terms and conditions',
  },
};

export const WithoutText: Story = {
  args: {
    variant: 'without-text',
    label: undefined,
  },
};

export const Checked: Story = {
  args: {
    variant: 'with-text',
    label: 'Checked by default',
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  args: {
    variant: 'with-text',
    label: 'Disabled checkbox',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    variant: 'with-text',
    label: 'Disabled and checked',
    disabled: true,
    defaultChecked: true,
  },
};

export const Small: Story = {
  args: {
    variant: 'with-text',
    label: 'Small size',
    size: 'small',
  },
};

export const Large: Story = {
  args: {
    variant: 'with-text',
    label: 'Large size',
    size: 'large',
  },
};

export const Group: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <Checkbox variant="with-text" label="Option A" name="group" value="a" />
      <Checkbox variant="with-text" label="Option B" name="group" value="b" />
      <Checkbox variant="with-text" label="Option C" name="group" value="c" defaultChecked />
    </div>
  ),
};
