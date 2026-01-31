import type { Meta, StoryObj } from '@storybook/react-vite';
import { ToastProvider, useToast, SingleToast } from './Toast';
import { Button } from '../Button/Button';

const meta = {
  title: 'Feedback/Toast',
  component: SingleToast,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    message: { control: 'text' },
    variant: {
      control: 'select',
      options: ['default', 'success', 'error', 'warning', 'info'],
    },
    closeable: { control: 'boolean' },
    duration: { control: 'number', description: 'Auto-dismiss time (ms); progress bar shows remaining time' },
    showProgressBar: { control: 'boolean' },
  },
  decorators: [
    (Story) => (
      <ToastProvider position="top-right">
        <Story />
      </ToastProvider>
    ),
  ],
} satisfies Meta<typeof SingleToast>;

export default meta;

type Story = StoryObj<typeof meta>;

/* Single toast variants (no provider needed for display) */
export const Default: Story = {
  args: {
    message: 'This is a default toast.',
    variant: 'default',
    closeable: true,
  },
};

export const Success: Story = {
  args: {
    message: 'Action completed successfully.',
    variant: 'success',
    closeable: true,
  },
};

export const Error: Story = {
  args: {
    message: 'Something went wrong. Please try again.',
    variant: 'error',
    closeable: true,
  },
};

export const Warning: Story = {
  args: {
    message: 'Please review your input before continuing.',
    variant: 'warning',
    closeable: true,
  },
};

export const Info: Story = {
  args: {
    message: 'Here is some helpful information.',
    variant: 'info',
    closeable: true,
  },
};

export const NotCloseable: Story = {
  args: {
    message: 'This toast has no close button (e.g. auto-dismiss only).',
    variant: 'default',
    closeable: false,
  },
};

export const WithProgressBar: Story = {
  args: {
    message: 'Toast with progress bar showing remaining time (10 seconds).',
    variant: 'success',
    duration: 10000,
    showProgressBar: true,
  },
};

export const NoProgressBar: Story = {
  args: {
    message: 'Progress bar hidden via showProgressBar: false.',
    variant: 'info',
    duration: 5000,
    showProgressBar: false,
  },
};

/* With provider: trigger toasts via useToast */
function ToastDemo({ position }: { position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right' }) {
  const toast = useToast();
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
      <Button
        label="Default"
        variant="light"
        onClick={() => toast.addToast({ message: 'Default toast', variant: 'default' })}
      />
      <Button
        label="Success"
        variant="success"
        onClick={() => toast.addToast({ message: 'Success!', variant: 'success' })}
      />
      <Button
        label="Error"
        variant="danger"
        onClick={() => toast.addToast({ message: 'Error occurred.', variant: 'error' })}
      />
      <Button
        label="Warning"
        variant="warning"
        onClick={() => toast.addToast({ message: 'Warning message.', variant: 'warning' })}
      />
      <Button
        label="Info"
        variant="info"
        onClick={() => toast.addToast({ message: 'Info message.', variant: 'info' })}
      />
      <Button
        label="Long duration"
        variant="secondary"
        onClick={() => toast.addToast({ message: 'This one stays 10 seconds.', duration: 10000 })}
      />
      <Button
        label="No auto-dismiss"
        variant="light"
        onClick={() => toast.addToast({ message: 'Stays until closed.', duration: 0 })}
      />
    </div>
  );
}

export const WithProviderTopRight: Story = {
  render: () => (
    <ToastProvider position="top-right">
      <ToastDemo />
    </ToastProvider>
  ),
  decorators: [],
};

export const WithProviderBottomCenter: Story = {
  render: () => (
    <ToastProvider position="bottom-center">
      <ToastDemo />
    </ToastProvider>
  ),
  decorators: [],
};

export const WithProviderTopLeft: Story = {
  render: () => (
    <ToastProvider position="top-left">
      <ToastDemo />
    </ToastProvider>
  ),
  decorators: [],
};

export const WithProviderBottomRight: Story = {
  render: () => (
    <ToastProvider position="bottom-right">
      <ToastDemo />
    </ToastProvider>
  ),
  decorators: [],
};
