import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select } from './Select';
import type { SelectOption } from './Select';

const defaultOptions: SelectOption[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' },
  { value: 'elderberry', label: 'Elderberry' },
  { value: 'fig', label: 'Fig' },
  { value: 'grape', label: 'Grape' },
  { value: 'honeydew', label: 'Honeydew' },
];

const meta = {
  title: 'Form/Controls/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    options: {
      description: 'Options for the dropdown',
      control: false,
    },
    multiSelect: {
      control: 'boolean',
      description: 'Checkbox dropdown (multi-select)',
    },
    searchable: {
      control: 'boolean',
      description: 'Show search input to filter options',
    },
    clearable: {
      control: 'boolean',
      description: 'Show clear button when there is a selection',
    },
    placeholder: {
      control: 'text',
    },
    label: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
    error: {
      control: 'boolean',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    fullWidth: {
      control: 'boolean',
    },
  },
  args: {
    options: defaultOptions,
    placeholder: 'Select...',
  },
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Single select with radio-style options (default) */
export const SingleSelect: Story = {
  args: {
    label: 'Choose one',
    multiSelect: false,
    searchable: false,
    clearable: true,
  },
};

/** Multi-select with checkbox-style options */
export const MultiSelect: Story = {
  args: {
    label: 'Choose multiple',
    multiSelect: true,
    searchable: false,
    clearable: true,
  },
};

/** Single select with search to filter options */
export const Searchable: Story = {
  args: {
    label: 'Search options',
    multiSelect: false,
    searchable: true,
    clearable: true,
  },
};

/** Multi-select + searchable */
export const MultiSelectSearchable: Story = {
  args: {
    label: 'Search and select multiple',
    multiSelect: true,
    searchable: true,
    clearable: true,
  },
};

/** With clear button (shown when something is selected) */
export const Clear: Story = {
  args: {
    label: 'Clearable select',
    multiSelect: false,
    searchable: false,
    clearable: true,
    defaultValue: 'banana',
  },
};

/** All features: multi + search + clear */
export const AllFeatures: Story = {
  args: {
    label: 'Multi, searchable, clearable',
    multiSelect: true,
    searchable: true,
    clearable: true,
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Fruit',
    helperText: 'Pick your favorite fruit(s).',
    multiSelect: false,
    searchable: true,
    clearable: true,
  },
};

export const Error: Story = {
  args: {
    label: 'Required field',
    helperText: 'Please select at least one option.',
    error: true,
    multiSelect: false,
    searchable: false,
    clearable: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    disabled: true,
    defaultValue: 'apple',
    multiSelect: false,
    searchable: false,
    clearable: true,
  },
};

export const Small: Story = {
  args: {
    label: 'Small size',
    size: 'small',
    multiSelect: false,
    searchable: false,
    clearable: true,
  },
};

export const Large: Story = {
  args: {
    label: 'Large size',
    size: 'large',
    multiSelect: false,
    searchable: false,
    clearable: true,
  },
};

export const FullWidth: Story = {
  args: {
    label: 'Full width',
    fullWidth: true,
    multiSelect: false,
    searchable: true,
    clearable: true,
  },
  parameters: {
    layout: 'padded',
  },
};
