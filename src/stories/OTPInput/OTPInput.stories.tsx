import type { Meta, StoryObj } from '@storybook/react-vite';
import { OTPInput } from './OTPInput';

const meta = {
  title: 'Form/Fields/OTPInput',
  component: OTPInput,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof OTPInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { length: 6 },
};

export const FourDigits: Story = {
  args: { length: 4 },
};

export const WithError: Story = {
  args: { length: 6, error: true },
};

export const Disabled: Story = {
  args: { length: 6, value: '123456', disabled: true },
};
