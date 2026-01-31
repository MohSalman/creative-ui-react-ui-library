import type { Meta, StoryObj } from '@storybook/react-vite';
import { DatePicker } from './DatePicker';

const meta = {
  title: 'Form/Controls/DatePicker',
  component: DatePicker,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['outlined', 'underline', 'standard'] },
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    fullWidth: { control: 'boolean' },
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
    showTime: { control: 'boolean' },
  },
  args: { label: 'Select date' },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: 'Select date', variant: 'outlined', placeholder: 'Pick a date' },
};

export const WithTime: Story = {
  args: {
    label: 'Date and time',
    variant: 'outlined',
    showTime: true,
    placeholder: 'Pick date and time',
  },
};

export const CustomFormat: Story = {
  args: {
    label: 'Custom format',
    variant: 'outlined',
    formatDisplay: (d: Date) =>
      d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    placeholder: 'Pick a date',
  },
};

export const WithMinMax: Story = {
  args: {
    label: 'Within range',
    variant: 'outlined',
    minDate: new Date(new Date().setDate(1)),
    maxDate: new Date(new Date().setMonth(new Date().getMonth() + 2)),
    placeholder: 'Pick a date this month or next',
  },
};

export const WithHelperText: Story = {
  args: { label: 'Birth date', helperText: 'We use this for account verification.', variant: 'outlined' },
};

export const Error: Story = {
  args: { label: 'Required', helperText: 'Please select a date.', error: true, variant: 'outlined' },
};

export const Underline: Story = {
  args: { label: 'Date', variant: 'underline' },
};

export const Small: Story = {
  args: { label: 'Date', size: 'small', variant: 'outlined' },
};

export const FullWidth: Story = {
  args: { label: 'Date', fullWidth: true, variant: 'outlined' },
  parameters: { layout: 'padded' },
};
