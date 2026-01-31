import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tag } from './Tag';

const meta = {
  title: 'Data Display/Tag',
  component: Tag,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { children: 'Design' } };
export const Outline: Story = { args: { variant: 'outline', children: 'React' } };
export const Removable: Story = { args: { children: 'Tag', onRemove: () => {} } };
