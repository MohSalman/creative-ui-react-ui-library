import type { Meta, StoryObj } from '@storybook/react-vite';
import { Textarea } from './Textarea';

const meta = {
  title: 'Form/Controls/Textarea',
  component: Textarea,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['outlined', 'underline', 'standard'] },
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    resize: { control: 'select', options: ['none', 'vertical', 'horizontal', 'both'] },
    fullWidth: { control: 'boolean' },
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: { label: 'Message', placeholder: 'Enter your message...' },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: 'Message', placeholder: 'Enter your message...', variant: 'outlined', rows: 4 },
};

export const WithHelperText: Story = {
  args: {
    label: 'Description',
    placeholder: 'Describe...',
    helperText: 'Max 500 characters.',
    variant: 'outlined',
    rows: 4,
  },
};

export const Error: Story = {
  args: {
    label: 'Required',
    placeholder: 'Enter text',
    helperText: 'This field is required.',
    error: true,
    variant: 'outlined',
  },
};

export const Underline: Story = {
  args: { label: 'Notes', variant: 'underline', placeholder: 'Notes...', rows: 3 },
};

export const NoResize: Story = {
  args: { label: 'Fixed height', resize: 'none', rows: 3, variant: 'outlined' },
};

export const FullWidth: Story = {
  args: { label: 'Comment', fullWidth: true, variant: 'outlined', rows: 4 },
  parameters: { layout: 'padded' },
};

export const Small: Story = {
  args: { label: 'Short note', size: 'small', variant: 'outlined', rows: 2 },
};
