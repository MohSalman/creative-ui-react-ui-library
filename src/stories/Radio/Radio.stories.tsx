import type { Meta, StoryObj } from '@storybook/react-vite';
import { Radio } from './Radio';

const meta = {
  title: 'Form/Controls/Radio',
  component: Radio,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['with-text', 'without-text'],
      description: 'Show label text beside the radio or just the circle',
    },
    label: {
      control: 'text',
      description: 'Label text (when variant is with-text)',
    },
    name: {
      control: 'text',
      description: 'Name for the radio group',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    disabled: {
      control: 'boolean',
    },
  },
  args: {
    label: 'Option',
    name: 'demo',
  },
} satisfies Meta<typeof Radio>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithText: Story = {
  args: {
    variant: 'with-text',
    label: 'Option A',
    name: 'with-text-demo',
  },
};

export const WithoutText: Story = {
  args: {
    variant: 'without-text',
    label: undefined,
    name: 'without-text-demo',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'with-text',
    label: 'Disabled option',
    name: 'disabled-demo',
    disabled: true,
  },
};

export const Small: Story = {
  args: {
    variant: 'with-text',
    label: 'Small size',
    name: 'small-demo',
    size: 'small',
  },
};

export const Large: Story = {
  args: {
    variant: 'with-text',
    label: 'Large size',
    name: 'large-demo',
    size: 'large',
  },
};

export const Group: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <Radio variant="with-text" label="Option A" name="group" value="a" />
      <Radio variant="with-text" label="Option B" name="group" value="b" defaultChecked />
      <Radio variant="with-text" label="Option C" name="group" value="c" />
    </div>
  ),
};

export const GroupWithoutText: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Radio variant="without-text" label="Option 1" name="group-no-text" value="1" />
      <Radio variant="without-text" label="Option 2" name="group-no-text" value="2" defaultChecked />
      <Radio variant="without-text" label="Option 3" name="group-no-text" value="3" />
    </div>
  ),
};
