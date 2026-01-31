import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Box,
  Stack,
  Flex,
  Grid,
  Container,
  Divider,
  Spacer,
  Center,
} from './index';

const meta = {
  title: 'Layout/Primitives',
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;

export const BoxDefault: StoryObj<Meta> = {
  render: () => (
    <Box padding="md" background="muted" rounded="md" border="default">
      Box with padding, background, rounded corners and border
    </Box>
  ),
};

export const BoxVariants: StoryObj<Meta> = {
  render: () => (
    <Stack direction="horizontal" gap="md">
      <Box padding="sm" background="subtle" rounded="sm">
        Subtle
      </Box>
      <Box padding="sm" background="muted" rounded="md">
        Muted
      </Box>
      <Box padding="sm" background="surface" rounded="lg" border="default">
        Surface
      </Box>
    </Stack>
  ),
};

export const StackVertical: StoryObj<Meta> = {
  render: () => (
    <Stack direction="vertical" gap="sm">
      <Box padding="sm" background="muted" rounded="sm">Item 1</Box>
      <Box padding="sm" background="muted" rounded="sm">Item 2</Box>
      <Box padding="sm" background="muted" rounded="sm">Item 3</Box>
    </Stack>
  ),
};

export const StackHorizontal: StoryObj<Meta> = {
  render: () => (
    <Stack direction="horizontal" gap="sm" align="center">
      <Box padding="sm" background="muted" rounded="sm">A</Box>
      <Box padding="sm" background="muted" rounded="sm">B</Box>
      <Box padding="sm" background="muted" rounded="sm">C</Box>
    </Stack>
  ),
};

export const FlexRow: StoryObj<Meta> = {
  render: () => (
    <Flex gap="md" justify="between" align="center">
      <Box padding="sm" background="muted" rounded="sm">Left</Box>
      <Box padding="sm" background="muted" rounded="sm">Center</Box>
      <Box padding="sm" background="muted" rounded="sm">Right</Box>
    </Flex>
  ),
};

export const FlexColumn: StoryObj<Meta> = {
  render: () => (
    <Flex direction="column" gap="sm" align="stretch" style={{ width: 200 }}>
      <Box padding="sm" background="muted" rounded="sm">Row 1</Box>
      <Box padding="sm" background="muted" rounded="sm">Row 2</Box>
      <Box padding="sm" background="muted" rounded="sm">Row 3</Box>
    </Flex>
  ),
};

export const GridFixed: StoryObj<Meta> = {
  render: () => (
    <Grid columns={3} gap="md" style={{ width: 320 }}>
      {[1, 2, 3, 4, 5, 6].map((n) => (
        <Box key={n} padding="md" background="muted" rounded="sm">
          Cell {n}
        </Box>
      ))}
    </Grid>
  ),
};

export const GridAuto: StoryObj<Meta> = {
  render: () => (
    <Grid columns="auto-fill" minColumnWidth="120px" gap="sm" style={{ width: 400 }}>
      {[1, 2, 3, 4, 5, 6].map((n) => (
        <Box key={n} padding="sm" background="muted" rounded="sm">
          Item {n}
        </Box>
      ))}
    </Grid>
  ),
};

export const ContainerDemo: StoryObj<Meta> = {
  render: () => (
    <div style={{ width: '100%', maxWidth: 1400, margin: '0 auto' }}>
      <Container maxWidth="md" padding="md" style={{ background: 'rgba(0,0,0,0.04)', borderRadius: 8 }}>
        <p>Container with max-width md (768px), centered with padding.</p>
      </Container>
    </div>
  ),
};

export const DividerHorizontal: StoryObj<Meta> = {
  render: () => (
    <Stack direction="vertical" gap="md" style={{ width: 200 }}>
      <span>Above</span>
      <Divider orientation="horizontal" spacing="md" />
      <span>Below</span>
    </Stack>
  ),
};

export const DividerVertical: StoryObj<Meta> = {
  render: () => (
    <Flex direction="row" gap="md" align="center" style={{ height: 60 }}>
      <span>Left</span>
      <Divider orientation="vertical" spacing="md" />
      <span>Right</span>
    </Flex>
  ),
};

export const DividerVariants: StoryObj<Meta> = {
  render: () => (
    <Stack direction="vertical" gap="lg" style={{ width: 240 }}>
      <div><span>Solid</span><Divider variant="solid" spacing="sm" /></div>
      <div><span>Dashed</span><Divider variant="dashed" spacing="sm" /></div>
      <div><span>Dotted</span><Divider variant="dotted" spacing="sm" /></div>
    </Stack>
  ),
};

export const SpacerDemo: StoryObj<Meta> = {
  render: () => (
    <Flex direction="row" align="center">
      <span>Start</span>
      <Spacer size="lg" />
      <span>End</span>
    </Flex>
  ),
};

export const SpacerGrow: StoryObj<Meta> = {
  render: () => (
    <Flex direction="row" style={{ width: 300 }} align="center">
      <span>Left</span>
      <Spacer grow />
      <span>Right</span>
    </Flex>
  ),
};

export const CenterDemo: StoryObj<Meta> = {
  render: () => (
    <Center axis="both" minHeight={200} style={{ background: 'rgba(0,0,0,0.04)', borderRadius: 8, width: 400 }}>
      <Box padding="md" background="surface" rounded="md" border="default">
        Centered content
      </Box>
    </Center>
  ),
};

export const AllPrimitives: StoryObj<Meta> = {
  render: () => (
    <Container maxWidth="lg" padding="md">
      <Stack direction="vertical" gap="xl">
        <Box padding="md" background="surface" rounded="lg" border="default">
          <Stack direction="vertical" gap="sm">
            <h3 style={{ margin: 0 }}>Layout Primitives</h3>
            <Divider orientation="horizontal" spacing="sm" />
            <Grid columns={2} gap="md">
              <Box padding="md" background="muted" rounded="md">Grid Cell 1</Box>
              <Box padding="md" background="muted" rounded="md">Grid Cell 2</Box>
            </Grid>
            <Flex direction="row" gap="sm" justify="end">
              <Box padding="xs" background="subtle" rounded="sm">Flex item</Box>
              <Spacer grow />
              <Box padding="xs" background="subtle" rounded="sm">Another</Box>
            </Flex>
          </Stack>
        </Box>
      </Stack>
    </Container>
  ),
};
