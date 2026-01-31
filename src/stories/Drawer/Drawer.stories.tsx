import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Drawer } from './Drawer';
import { Button } from '../Button/Button';

const meta = {
  title: 'Feedback/Drawer',
  component: Drawer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    open: { control: false },
    onClose: { control: false },
    position: {
      control: 'select',
      options: ['left', 'right', 'top', 'bottom'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large', 'full'],
    },
    showCloseButton: { control: 'boolean' },
    closeOnOverlayClick: { control: 'boolean' },
  },
} satisfies Meta<typeof Drawer>;

export default meta;

type Story = StoryObj<typeof meta>;

const DrawerTrigger = (props: Partial<React.ComponentProps<typeof Drawer>>) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button label="Open drawer" onClick={() => setOpen(true)} />
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        title="Drawer title"
        footer={
          <>
            <Button label="Cancel" variant="light" onClick={() => setOpen(false)} />
            <Button label="Save" variant="primary" onClick={() => setOpen(false)} />
          </>
        }
        {...props}
      >
        {props.children ?? 'Drawer body content. Use for filters, settings, or side panels.'}
      </Drawer>
    </>
  );
};

export const Right: Story = {
  render: () => (
    <DrawerTrigger position="right">
      Drawer slides in from the right (default).
    </DrawerTrigger>
  ),
};

export const Left: Story = {
  render: () => (
    <DrawerTrigger position="left">
      Drawer slides in from the left.
    </DrawerTrigger>
  ),
};

export const Top: Story = {
  render: () => (
    <DrawerTrigger position="top">
      Drawer slides down from the top.
    </DrawerTrigger>
  ),
};

export const Bottom: Story = {
  render: () => (
    <DrawerTrigger position="bottom">
      Drawer slides up from the bottom (sheet style).
    </DrawerTrigger>
  ),
};

export const Small: Story = {
  render: () => (
    <DrawerTrigger position="right" size="small">
      Small drawer (narrow width).
    </DrawerTrigger>
  ),
};

export const Medium: Story = {
  render: () => (
    <DrawerTrigger position="right" size="medium">
      Medium drawer. Default size.
    </DrawerTrigger>
  ),
};

export const Large: Story = {
  render: () => (
    <DrawerTrigger position="right" size="large">
      Large drawer (wider panel).
    </DrawerTrigger>
  ),
};

export const Full: Story = {
  render: () => (
    <DrawerTrigger position="right" size="full">
      Full-width drawer. Covers full height for left/right.
    </DrawerTrigger>
  ),
};

export const WithoutCloseButton: Story = {
  render: () => (
    <DrawerTrigger showCloseButton={false}>
      Drawer without header close button. Use overlay or Escape.
    </DrawerTrigger>
  ),
};

export const NoOverlayClose: Story = {
  render: () => (
    <DrawerTrigger closeOnOverlayClick={false}>
      Clicking the backdrop does not close this drawer.
    </DrawerTrigger>
  ),
};
