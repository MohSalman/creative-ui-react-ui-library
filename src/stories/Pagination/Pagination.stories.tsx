import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Pagination } from './Pagination';

const meta = {
  title: 'Navigation/Pagination',
  component: Pagination,
  tags: ['autodocs'],
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    return (
      <div>
        <p style={{ marginBottom: '1rem' }}>Page {page} of 10</p>
        <Pagination
          page={page}
          totalPages={10}
          onPageChange={setPage}
        />
      </div>
    );
  },
};

export const ManyPages: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    return (
      <div>
        <p style={{ marginBottom: '1rem' }}>Page {page} of 50</p>
        <Pagination
          page={page}
          totalPages={50}
          onPageChange={setPage}
          siblingCount={2}
        />
      </div>
    );
  },
};

export const NoFirstLast: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    return (
      <Pagination
        page={page}
        totalPages={10}
        onPageChange={setPage}
        showFirstLast={false}
      />
    );
  },
};
