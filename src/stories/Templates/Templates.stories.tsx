import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppShell } from '../AppShell/AppShell';
import { PageLayout } from '../PageLayout/PageLayout';
import { TopNav } from '../TopNav/TopNav';
import { Sidebar } from '../Sidebar/Sidebar';
import { MainContent } from '../MainContent/MainContent';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import { Button } from '../Button/Button';
import { Box } from '../Layout';

const TopNavContent = () => (
  <TopNav
    brand={<span>Acme</span>}
    children={
      <>
        <a href="#" className="topnav-link">Dashboard</a>
        <a href="#" className="topnav-link">Projects</a>
        <a href="#" className="topnav-link">Team</a>
      </>
    }
    actions={<Button label="Log out" size="small" onClick={() => {}} />}
  />
);

const SidebarNav = () => (
  <Sidebar style={{ minHeight: 400 }}>
    <nav className="sidebar-nav">
      <a href="#" className="sidebar-nav-item">Dashboard</a>
      <a href="#" className="sidebar-nav-item">Projects</a>
      <a href="#" className="sidebar-nav-item">Analytics</a>
      <a href="#" className="sidebar-nav-item">Settings</a>
    </nav>
  </Sidebar>
);

const meta = {
  title: 'Templates',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;
type Story = StoryObj<Meta>;

export const DashboardLayout: Story = {
  render: () => (
    <AppShell
      header={<TopNavContent />}
      sidebar={<SidebarNav />}
      footer={<Footer>© 2025 Acme Inc.</Footer>}
    >
      <MainContent>
        <h1 style={{ margin: '0 0 1rem' }}>Dashboard</h1>
        <Box padding="md" background="muted" rounded="md" style={{ marginBottom: '1rem' }}>
          <h3 style={{ margin: '0 0 0.5rem' }}>Welcome back</h3>
          <p style={{ margin: 0 }}>Overview of your projects and activity.</p>
        </Box>
        <Box padding="md" background="surface" rounded="md" border="default">
          <p style={{ margin: 0 }}>Content area for charts, widgets, etc.</p>
        </Box>
      </MainContent>
    </AppShell>
  ),
};

export const AuthLayout: Story = {
  render: () => (
    <PageLayout
      header={
        <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #e2e8f0' }}>
          <span style={{ fontWeight: 700, fontSize: '1.25rem' }}>Acme</span>
        </div>
      }
      footer={<Footer variant="minimal">© 2025 Acme Inc.</Footer>}
    >
      <MainContent maxWidth="sm" padding="lg">
        <div style={{ textAlign: 'center', padding: '2rem 0' }}>
          <h1 style={{ margin: '0 0 0.5rem' }}>Sign in</h1>
          <p style={{ margin: '0 0 1.5rem', color: '#64748b' }}>
            Enter your credentials to continue
          </p>
          <Box padding="lg" background="muted" rounded="md" style={{ textAlign: 'left' }}>
            <p style={{ margin: 0 }}>Form inputs would go here.</p>
          </Box>
        </div>
      </MainContent>
    </PageLayout>
  ),
};

export const FormLayout: Story = {
  render: () => (
    <PageLayout
      header={<TopNavContent />}
      footer={<Footer>© 2025 Acme Inc.</Footer>}
    >
      <MainContent maxWidth="md">
        <h1 style={{ margin: '0 0 1rem' }}>Form Layout</h1>
        <Box padding="lg" background="muted" rounded="md">
          <p style={{ margin: 0 }}>Form fields with standard layout and spacing.</p>
        </Box>
      </MainContent>
    </PageLayout>
  ),
};

export const SettingsLayout: Story = {
  render: () => (
    <AppShell
      header={<TopNavContent />}
      sidebar={<SidebarNav />}
    >
      <MainContent>
        <h1 style={{ margin: '0 0 1rem' }}>Settings</h1>
        <Box padding="md" background="surface" rounded="md" border="default" style={{ marginBottom: '1rem' }}>
          <h3 style={{ margin: '0 0 0.5rem' }}>Profile</h3>
          <p style={{ margin: 0 }}>Manage your account settings.</p>
        </Box>
        <Box padding="md" background="surface" rounded="md" border="default">
          <h3 style={{ margin: '0 0 0.5rem' }}>Preferences</h3>
          <p style={{ margin: 0 }}>Customize your experience.</p>
        </Box>
      </MainContent>
    </AppShell>
  ),
};

export const EmptyStateLayout: Story = {
  render: () => (
    <PageLayout
      header={<Header onLogin={() => {}} onLogout={() => {}} onCreateAccount={() => {}} />}
      footer={<Footer>© 2025 Acme Inc.</Footer>}
    >
      <MainContent>
        <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <h2 style={{ margin: '0 0 0.5rem' }}>Empty State</h2>
          <p style={{ margin: 0, color: '#64748b' }}>Header + main content + footer. No sidebar. Minimal layout.</p>
        </div>
      </MainContent>
    </PageLayout>
  ),
};
