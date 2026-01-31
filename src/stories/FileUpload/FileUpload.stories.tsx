import type { Meta, StoryObj } from '@storybook/react-vite';
import { FileUpload } from './FileUpload';

const meta = {
  title: 'Form/Controls/FileUpload',
  component: FileUpload,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    multiple: { control: 'boolean' },
    showPreview: { control: 'boolean' },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
  },
  args: { label: 'Upload file' },
} satisfies Meta<typeof FileUpload>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: 'Upload file', placeholder: 'Drag and drop files here, or click to browse' },
};

export const Multiple: Story = {
  args: { label: 'Upload files', multiple: true, placeholder: 'Drop multiple files or click to select' },
};

export const AcceptImages: Story = {
  args: { label: 'Upload image', accept: 'image/*', multiple: true, placeholder: 'Drop images or click to browse' },
};

export const WithHelperText: Story = {
  args: { label: 'Document', helperText: 'PDF or Word, max 10MB.', placeholder: 'Drop file here' },
};

export const Error: Story = {
  args: { label: 'Required', helperText: 'Please upload a file.', error: true },
};

export const Disabled: Story = {
  args: { label: 'Upload', disabled: true },
};

export const WithoutPreview: Story = {
  args: { label: 'Upload (no preview)', showPreview: false, placeholder: 'Preview disabled' },
};
