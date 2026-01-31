import type { Meta, StoryObj } from '@storybook/react-vite';
import { Table } from './Table';
import type { TableColumn } from './Table';

type Row = {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  joined: string;
};

const columns: TableColumn<Row>[] = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'role', label: 'Role', sortable: true, align: 'center' },
  {
    key: 'status',
    label: 'Status',
    sortable: true,
    align: 'center',
    render: (val) => (
      <span
        style={{
          padding: '0.25rem 0.5rem',
          borderRadius: '9999px',
          fontSize: '0.75rem',
          fontWeight: 500,
          background:
            val === 'Active'
              ? 'rgba(22, 163, 74, 0.15)'
              : val === 'Pending'
                ? 'rgba(245, 158, 11, 0.15)'
                : 'rgba(100, 116, 139, 0.15)',
          color:
            val === 'Active'
              ? 'rgb(22, 163, 74)'
              : val === 'Pending'
                ? 'rgb(245, 158, 11)'
                : 'rgb(100, 116, 139)',
        }}
      >
        {String(val)}
      </span>
    ),
  },
  { key: 'joined', label: 'Joined', sortable: true, align: 'right' },
];

const sampleData: Row[] = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active', joined: '2024-01-15' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', status: 'Active', joined: '2024-02-20' },
  { id: 3, name: 'Carol White', email: 'carol@example.com', role: 'Viewer', status: 'Pending', joined: '2024-03-10' },
  { id: 4, name: 'David Brown', email: 'david@example.com', role: 'Editor', status: 'Active', joined: '2024-01-08' },
  { id: 5, name: 'Eve Davis', email: 'eve@example.com', role: 'Admin', status: 'Inactive', joined: '2023-12-01' },
  { id: 6, name: 'Frank Miller', email: 'frank@example.com', role: 'Viewer', status: 'Active', joined: '2024-04-05' },
  { id: 7, name: 'Grace Lee', email: 'grace@example.com', role: 'Editor', status: 'Pending', joined: '2024-04-12' },
  { id: 8, name: 'Henry Wilson', email: 'henry@example.com', role: 'Viewer', status: 'Active', joined: '2024-02-28' },
  { id: 9, name: 'Ivy Taylor', email: 'ivy@example.com', role: 'Admin', status: 'Active', joined: '2023-11-20' },
  { id: 10, name: 'Jack Anderson', email: 'jack@example.com', role: 'Editor', status: 'Inactive', joined: '2024-01-30' },
  { id: 11, name: 'Kate Thomas', email: 'kate@example.com', role: 'Viewer', status: 'Active', joined: '2024-03-22' },
  { id: 12, name: 'Leo Martinez', email: 'leo@example.com', role: 'Editor', status: 'Pending', joined: '2024-04-01' },
];

const meta = {
  title: 'Data Display/Table',
  component: Table,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    sortable: { control: 'boolean' },
    pagination: { control: 'boolean' },
    striped: { control: 'boolean' },
    bordered: { control: 'boolean' },
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    pageSize: { control: 'number' },
  },
  args: {
    columns,
    data: sampleData,
    getRowKey: (row: Row) => row.id,
  },
} satisfies Meta<typeof Table>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    sortable: true,
    pagination: true,
    pageSize: 10,
    striped: false,
    bordered: true,
    size: 'medium',
  },
};

export const WithPagination: Story = {
  args: {
    data: sampleData,
    columns,
    getRowKey: (row: Row) => row.id,
    pagination: true,
    pageSize: 5,
    pageSizeOptions: [5, 10, 25],
  },
};

export const WithSorting: Story = {
  args: {
    data: sampleData,
    columns,
    getRowKey: (row: Row) => row.id,
    sortable: true,
    pagination: true,
  },
};

export const Striped: Story = {
  args: {
    data: sampleData,
    columns,
    getRowKey: (row: Row) => row.id,
    striped: true,
    bordered: true,
    pagination: true,
  },
};

export const Small: Story = {
  args: {
    data: sampleData,
    columns,
    getRowKey: (row: Row) => row.id,
    size: 'small',
    pagination: true,
  },
};

export const Large: Story = {
  args: {
    data: sampleData,
    columns,
    getRowKey: (row: Row) => row.id,
    size: 'large',
    pagination: true,
  },
};

export const NoPagination: Story = {
  args: {
    data: sampleData.slice(0, 5),
    columns,
    getRowKey: (row: Row) => row.id,
    pagination: false,
  },
};

export const NoSorting: Story = {
  args: {
    data: sampleData,
    columns,
    getRowKey: (row: Row) => row.id,
    sortable: false,
    pagination: true,
  },
};

export const Empty: Story = {
  args: {
    data: [],
    columns,
    getRowKey: (row: Row) => row.id,
    pagination: true,
  },
};

export const CenteredColumn: Story = {
  args: {
    data: sampleData,
    columns: [
      { key: 'name', label: 'Name', sortable: true },
      { key: 'role', label: 'Role', sortable: true, align: 'center' },
      { key: 'joined', label: 'Joined', sortable: true, align: 'right' },
    ],
    getRowKey: (row: Row) => row.id,
    pagination: true,
  },
};
