import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Modal } from './Modal';
import { Button } from '../Button/Button';

const meta = {
  title: 'Feedback/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    open: { control: false },
    onClose: { control: false },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large', 'fullscreen'],
    },
    showCloseButton: { control: 'boolean' },
    closeOnOverlayClick: { control: 'boolean' },
    closeOnEscape: { control: 'boolean' },
  },
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

const ModalTrigger = (props: Partial<React.ComponentProps<typeof Modal>>) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button label="Open modal" onClick={() => setOpen(true)} />
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Modal title"
        footer={
          <>
            <Button label="Cancel" variant="light" onClick={() => setOpen(false)} />
            <Button label="Confirm" variant="primary" onClick={() => setOpen(false)} />
          </>
        }
        {...props}
      >
        {props.children ?? 'Modal body content goes here. You can put any content inside.'}
      </Modal>
    </>
  );
};

export const Default: Story = {
  render: () => (
    <ModalTrigger>
      Default medium modal with title, body, and footer buttons.
    </ModalTrigger>
  ),
};

export const Small: Story = {
  render: () => (
    <ModalTrigger size="small">
      Small modal (max-width 24rem).
    </ModalTrigger>
  ),
};

export const Medium: Story = {
  render: () => (
    <ModalTrigger size="medium">
      Medium modal (max-width 32rem). This is the default size.
    </ModalTrigger>
  ),
};

export const Large: Story = {
  render: () => (
    <ModalTrigger size="large">
      Large modal (max-width 48rem). Good for forms or longer content.
    </ModalTrigger>
  ),
};

export const Fullscreen: Story = {
  render: () => (
    <ModalTrigger size="fullscreen">
      Fullscreen modal. Covers the entire viewport.
    </ModalTrigger>
  ),
};

export const WithoutCloseButton: Story = {
  render: () => (
    <ModalTrigger showCloseButton={false}>
      Modal without header close button. Use overlay or Escape to close.
    </ModalTrigger>
  ),
};

export const NoOverlayClose: Story = {
  render: () => (
    <ModalTrigger closeOnOverlayClick={false}>
      Clicking the backdrop does not close this modal. Use the close button or Escape.
    </ModalTrigger>
  ),
};

export const NoTitle: Story = {
  render: () => (
    <ModalTrigger title={undefined} showCloseButton={true}>
      Modal with no title. Only close button in header.
    </ModalTrigger>
  ),
};

export const NoFooter: Story = {
  render: () => (
    <ModalTrigger footer={undefined}>
      Modal without footer. Just title and body.
    </ModalTrigger>
  ),
};
