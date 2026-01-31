import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppShell } from './AppShell';
import { TopNav } from '../TopNav/TopNav';
import { Sidebar } from '../Sidebar/Sidebar';
import { MainContent } from '../MainContent/MainContent';
import { Footer } from '../Footer/Footer';
import { Button } from '../Button/Button';

const TopNavContent = () => (
  <TopNav
    brand={<span>Acme</span>}
    children={
      <>
        <a href="#" className="topnav-link">Dashboard</a>
        <a href="#" className="topnav-link">Projects</a>
      </>
    }
    actions={<Button label="Log out" size="small" onClick={() => {}} />}
  />
);

const SidebarContent = () => (
  <Sidebar style={{ minHeight: 400 }}>
    <nav className="sidebar-nav">
      <a href="#" className="sidebar-nav-item">Dashboard</a>
      <a href="#" className="sidebar-nav-item">Projects</a>
      <a href="#" className="sidebar-nav-item">Team</a>
      <a href="#" className="sidebar-nav-item">Settings</a>
    </nav>
  </Sidebar>
);

const meta = {
  title: 'Layout/Components/AppShell',
  component: AppShell,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof AppShell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Full: Story = {
  args: {
    header: <TopNavContent />,
    sidebar: <SidebarContent />,
    children: (
      <MainContent>
        <h1>Dashboard</h1>
        <p>Main application content with header, sidebar, and footer.</p>
      </MainContent>
    ),
    footer: <Footer>© 2025 Acme Inc.</Footer>,
  },
};

export const NoSidebar: Story = {
  args: {
    header: <TopNavContent />,
    children: (
      <MainContent>
        <p>App without sidebar.</p>
      </MainContent>
    ),
  },
};

export const SidebarRight: Story = {
  args: {
    header: <TopNavContent />,
    sidebar: <SidebarContent />,
    sidebarPosition: 'right',
    children: <MainContent><p>Sidebar on the right.</p></MainContent>,
  },
};
