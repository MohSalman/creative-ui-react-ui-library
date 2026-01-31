import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from './Input';

const meta = {
  title: 'Form/Controls/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['outlined', 'underline', 'standard'],
      description: 'Visual style of the input',
    },
    label: {
      control: 'text',
      description: 'Label above the input',
    },
    id: {
      control: 'text',
      description: 'Id for input (label htmlFor matches this)',
    },
    helperText: {
      control: 'text',
      description: 'Helper or error text below',
    },
    error: {
      control: 'boolean',
      description: 'Error state',
    },
    disabled: {
      control: 'boolean',
    },
    fullWidth: {
      control: 'boolean',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    placeholder: {
      control: 'text',
    },
    showPasswordToggle: {
      control: 'boolean',
      description: 'Show clickable eye icon to toggle password visibility (when type is password)',
    },
  },
  args: {
    placeholder: 'Placeholder',
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

// ----- Variants -----
export const Outlined: Story = {
  args: {
    variant: 'outlined',
    label: 'Outlined',
    id: 'outlined-demo',
    placeholder: 'Outlined input',
  },
};

export const Underline: Story = {
  args: {
    variant: 'underline',
    label: 'Underline',
    id: 'underline-demo',
    placeholder: 'Underline input',
  },
};

export const Standard: Story = {
  args: {
    variant: 'standard',
    label: 'Standard (no border)',
    id: 'standard-demo',
    placeholder: 'Standard input',
  },
};

// ----- With helper text -----
export const WithHelperText: Story = {
  args: {
    variant: 'outlined',
    label: 'Email',
    id: 'email-helper',
    placeholder: 'you@example.com',
    helperText: 'We will never share your email.',
  },
};

// ----- With error -----
export const WithError: Story = {
  args: {
    variant: 'outlined',
    label: 'Email',
    id: 'email-error',
    placeholder: 'you@example.com',
    helperText: 'Please enter a valid email address.',
    error: true,
  },
};

// ----- Prefix & Postfix -----
export const WithPrefix: Story = {
  args: {
    variant: 'outlined',
    label: 'Amount',
    id: 'amount-prefix',
    placeholder: '0.00',
    prefix: '$',
  },
};

export const WithPostfix: Story = {
  args: {
    variant: 'outlined',
    label: 'Website',
    id: 'website-postfix',
    placeholder: 'example',
    postfix: '.com',
  },
};

export const WithPrefixAndPostfix: Story = {
  args: {
    variant: 'outlined',
    label: 'Price',
    id: 'price-both',
    placeholder: '100',
    prefix: '$',
    postfix: 'USD',
  },
};

// ----- Icon input -----
const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const LockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

export const WithStartIcon: Story = {
  args: {
    variant: 'outlined',
    label: 'Search',
    id: 'search-icon',
    placeholder: 'Search…',
    startIcon: <SearchIcon />,
  },
};

export const WithEndIcon: Story = {
  args: {
    variant: 'outlined',
    label: 'Password',
    id: 'password-icon',
    type: 'password',
    placeholder: '••••••••',
    showPasswordToggle: true,
  },
};

export const WithStartAndEndIcons: Story = {
  args: {
    variant: 'outlined',
    label: 'Secure field',
    id: 'secure-icons',
    type: 'password',
    placeholder: 'Enter password',
    startIcon: <LockIcon />,
    showPasswordToggle: true,
  },
};

// ----- Sizes -----
export const Small: Story = {
  args: {
    variant: 'outlined',
    label: 'Small',
    id: 'small-demo',
    size: 'small',
    placeholder: 'Small input',
  },
};

export const Large: Story = {
  args: {
    variant: 'outlined',
    label: 'Large',
    id: 'large-demo',
    size: 'large',
    placeholder: 'Large input',
  },
};

// ----- States -----
export const Disabled: Story = {
  args: {
    variant: 'outlined',
    label: 'Disabled',
    id: 'disabled-demo',
    placeholder: 'Disabled input',
    disabled: true,
  },
};

export const FullWidth: Story = {
  args: {
    variant: 'outlined',
    label: 'Full width',
    id: 'fullwidth-demo',
    placeholder: 'Full width input',
    fullWidth: true,
  },
  parameters: {
    layout: 'padded',
  },
};
