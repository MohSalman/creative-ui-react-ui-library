import type { Meta, StoryObj } from '@storybook/react-vite';
import { PageLayout } from './PageLayout';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { MainContent } from '../MainContent/MainContent';

const meta = {
  title: 'Layout/Components/PageLayout',
  component: PageLayout,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof PageLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Full: Story = {
  args: {
    header: <Header onLogin={() => {}} onLogout={() => {}} onCreateAccount={() => {}} />,
    children: (
      <MainContent>
        <h2>Page Content</h2>
        <p>This is the main content area with header and footer.</p>
      </MainContent>
    ),
    footer: <Footer>© 2025 Acme Inc.</Footer>,
  },
};

export const HeaderOnly: Story = {
  args: {
    header: <Header onLogin={() => {}} onLogout={() => {}} onCreateAccount={() => {}} />,
    children: <MainContent><p>Content without footer.</p></MainContent>,
  },
};
