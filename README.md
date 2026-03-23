# Syndorela POC

A polished prototype for an AI-powered legacy modernization platform (syndorela.com).

## Overview
This is a front-end-heavy POC built with Next.js to demonstrate the workflow of modernizing legacy codebases. It features a deep engineering workbench aesthetic and demonstrates:
1. **Repository Ingestion** - Browse legacy source code with risk assessment.
2. **Analysis & Reports** - Deep scan findings, security smells, and health metrics.
3. **Pseudo-Project Explorer** - Intermediate editable representation of the system.
4. **Diagram Studio** - Visualizing architecture and flows with React Flow.
5. **Generation Studio** - Producing modern target services (NestJS, FastAPI, etc.) with AI.
6. **AI Copilot** - Persistent context-aware assistant throughout the workflow.
7. **CLI Integration** - Mirroring the CLI-first engine capabilities.

## Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS + shadcn/ui
- **Icons:** Lucide React
- **Motion:** Framer Motion
- **Visualizations:** React Flow
- **Editor:** Monaco Editor (@monaco-editor/react)
- **Language:** TypeScript

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm / yarn / pnpm

### Installation
```bash
npm install
```

### Running the Demo
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the landing page.
Click **"Launch Demo Workspace"** to enter the workbench.

## Design Direction
- **Desktop-first** SaaS dashboard aesthetic.
- **Dark mode** by default for a cinematic "deep engineering" feel.
- **2xl rounded cards**, soft glows, and strong hierarchy.
- **CLI-first** philosophy reflected in the UI.

## Mock Data
The app uses realistic demo data based on a fictional legacy PHP CRM system, stored in `src/lib/mock-data/`. No real backend or database is required.
