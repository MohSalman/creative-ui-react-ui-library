import type { Meta, StoryObj } from '@storybook/react-vite';
import { Alert } from './Alert';

const meta = {
  title: 'Feedback/Alert',
  component: Alert,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = { args: { variant: 'info', children: 'Your session will expire in 5 minutes.' } };
export const Success: Story = { args: { variant: 'success', title: 'Success', children: 'Your changes have been saved.' } };
export const Warning: Story = { args: { variant: 'warning', children: 'Please review before submitting.' } };
export const Danger: Story = { args: { variant: 'danger', title: 'Error', children: 'Something went wrong.' } };
export const Dismissible: Story = { args: { variant: 'info', children: 'Dismiss me', onClose: () => {} } };
