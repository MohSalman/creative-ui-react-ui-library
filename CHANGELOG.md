# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Advanced Concepts documentation (token-based theming, dark/light mode, compound components, controlled/uncontrolled patterns, versioning)
- Dark theme support via `ThemeProvider` `mode` and `onModeChange` props
- `darkTheme` export for dark mode styling
- `data-theme` attribute on document root for theme-aware CSS
- `useTheme()` hook now returns `{ theme, mode, setMode }`

## [1.0.15] - 2025-01-30

### Added
- Layout primitives: Box, Stack, Flex, Grid, Container, Divider, Spacer, Center
- FileUpload component with preview (inline thumbnails for images, file cards for others)
- DatePicker: custom calendar with year/month selection, dropdown positioning, scroll sync
- Select: searchable, multi-select, clearable, plain option rows
- Modal, Drawer, Toast components with variants
- Table: pagination, sorting, interactive design
- Switch, Textarea components
- Input: outlined, underline, standard variants; prefix, postfix, icons, password toggle
- Checkbox, Radio: with-text / without-text variants

### Changed
- Storybook section renamed from "Example" to "Components"
- Storybook sidebar ordering: Components, Layout primitives, Advanced Concepts, Configure

---

## Version history

- **1.0.x** – Component library with theming, form controls, overlays, and layout primitives
