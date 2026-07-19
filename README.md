# AI Capstone

> A React + TypeScript capstone project built with AI-assisted development workflows.

## Description

This repository hosts the **AI Capstone** project — a web application developed as part of the AI-assisted development setup assignment. The goal is to practice modern frontend development, Git/GitHub workflows, and using AI tools effectively throughout the build process.

**Status:** Initial setup — repository scaffolded; Vite + React app coming next.

## Tech Stack


| Technology                                    | Purpose                        |
| --------------------------------------------- | ------------------------------ |
| [React](https://react.dev/)                   | UI library                     |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe JavaScript           |
| [Vite](https://vitejs.dev/)                   | Build tool and dev server      |
| [Node.js](https://nodejs.org/)                | Runtime and package management |


## Goals

- [ ] Initialize Vite + React + TypeScript project
- [ ] Set up Git workflow with Conventional Commits
- [ ] Build core capstone features
- [ ] Document setup, usage, and development workflow
- [ ] Deploy the application (optional)

## Getting Started

### Prerequisites

- **Node.js** 20+ (LTS recommended)
- **npm** (included with Node.js)
- **Git**

Verify your setup:

```bash
node --version
npm --version
git --version
```

### Clone the repository

```bash
git clone https://github.com/<your-username>/AI-Capstone.git
cd AI-Capstone
```

### Install and run

> These commands apply once the Vite scaffold is initialized.

```bash
npm install
npm run dev
```

The dev server runs at [http://localhost:5173](http://localhost:5173) by default.

### Other commands

```bash
npm run build    # Production build
npm run preview  # Preview production build locally
```

## Project Structure

```
AI-Capstone/
├── src/              # Application source code (after scaffold)
├── public/           # Static assets
├── CLAUDE.md         # AI and coding conventions
├── .gitignore
└── README.md
```

## Git Workflow

This project uses [Conventional Commits](https://www.conventionalcommits.org/):


| Prefix      | Use for                                    |
| ----------- | ------------------------------------------ |
| `feat:`     | New features                               |
| `fix:`      | Bug fixes                                  |
| `docs:`     | Documentation changes                      |
| `refactor:` | Code changes that aren't fixes or features |
| `chore:`    | Tooling, config, or maintenance            |


Example:

```bash
git commit -m "feat: add project header component"
```

For full coding and AI development guidelines, see `[CLAUDE.md](./CLAUDE.md)`.

## Environment Variables

Create a `.env` file in the project root for local secrets (never commit this file):

```env
# VITE_API_URL=https://example.com/api
```

Variables exposed to the client must be prefixed with `VITE_`.

## License

This project is for educational purposes as part of a capstone assignment.