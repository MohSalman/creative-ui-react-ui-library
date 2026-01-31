import type { Meta, StoryObj } from '@storybook/react-vite';
import { Switch } from './Switch';

const meta = {
  title: 'Form/Controls/Switch',
  component: Switch,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['with-text', 'without-text'] },
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    disabled: { control: 'boolean' },
  },
  args: { label: 'Enable notifications' },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { variant: 'with-text', label: 'Enable notifications' },
};

export const WithoutText: Story = {
  args: { variant: 'without-text' },
};

export const Checked: Story = {
  args: { variant: 'with-text', label: 'Checked by default', defaultChecked: true },
};

export const Disabled: Story = {
  args: { variant: 'with-text', label: 'Disabled', disabled: true },
};

export const Small: Story = {
  args: { variant: 'with-text', label: 'Small size', size: 'small' },
};

export const Large: Story = {
  args: { variant: 'with-text', label: 'Large size', size: 'large' },
};
