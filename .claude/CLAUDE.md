# Project Instructions

Commit each logical feature regularly.

## Tool Preferences

- Use `pnpm` for package management
- TypeScript strict mode for all new code
- Use Tailwind CSS for styling
- Use shadcn/ui for components: install via `pnpm dlx shadcn@latest add <component-name>`
  - Never import Radix UI components directly, always use shadcn wrappers
  - Example: `pnpm dlx shadcn@latest add button input card dialog`
- Prefer functional components with hooks
- Keep components minimal and focused
