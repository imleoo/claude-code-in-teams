# CODEBUDDY.md

This is a VitePress-based Chinese technical book project about "Document-Driven AI Development (DDAD)" - a methodology for AI-enhanced team collaboration in software development.

## Project Overview

**Title**: 团队Vibe Coding开发指南 - DDAD方法论 (Team Vibe Coding Development Guide - DDAD Methodology)

**Description**: AI时代下的团队协作开发实践指南 (Practical Guide to Team Collaboration Development in the AI Era)

**Core Concept**: DDAD (Document-Driven AI Development) - using structured documentation as collaboration protocols for AI-human teamwork

## Development Commands

### Essential Commands
```bash
# Install dependencies
npm install

# Start local development server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to GitHub Pages
npm run deploy
```

### Project Structure
```
claude-code-in-teams/
├── .vitepress/           # VitePress configuration
│   └── config.js        # Main site configuration
├── part1-5/              # Book content (5 main parts)
│   ├── chapter1.md      # Chapters with nested sections
│   └── ...
├── appendix/            # Tools, templates, and references
├── public/              # Static assets (images, etc.)
├── index.md            # Homepage content
└── SUMMARY.md          # Table of contents structure
```

## Content Architecture

### Book Organization
- **Part 1**: Introduction and Core Concepts (开篇与核心概念)
- **Part 2**: Tool Preparation and Basic Operations (工具准备与基础操作) 
- **Part 3**: Team Collaboration Core Processes (团队协作核心流程)
- **Part 4**: Practical Case Studies (实战案例)
- **Part 5**: Best Practices and Problem Solving (最佳实践与问题解决)
- **Appendix**: Tools, Templates, and Assessment (附录)

### Key Themes
- **DDAD Methodology**: Documentation as collaboration protocol
- **Vibe Coding**: High-trust, high-flow human-AI collaboration state
- **Risk Management**: AI participation strategies based on risk levels
- **Team Collaboration**: Multi-session parallel development workflows

### Content Structure Pattern
Each chapter follows a consistent structure:
- Main chapter file with overview
- Nested sections in subdirectories
- Cross-references between related content
- Practical examples and case studies

## Configuration Details

### VitePress Configuration
Located in `.vitepress/config.js`:
- Base URL: `/claude-code-in-teams/` (GitHub Pages deployment)
- Sidebar navigation with collapsible sections
- Chinese language content with proper encoding

### Deployment
- Automatic deployment via GitHub Actions on push to `main` branch
- Static site generation for GitHub Pages
- No server-side rendering required

## Content Development Guidelines

### File Naming Convention
- Use kebab-case for file names (e.g., `chapter-1.md`)
- Chinese content with proper markdown formatting
- Subdirectories for nested sections (e.g., `part1/chapter1/`)

### Markdown Structure
- Frontmatter for metadata (when applicable)
- Chinese headings with proper hierarchy
- Code blocks for technical content
- Mermaid diagrams for visual explanations

### Documentation Standards
- Focus on practical, actionable content
- Include real-world case studies
- Maintain consistent terminology (DDAD, Vibe Coding, etc.)
- Cross-reference related sections

## Language and Localization

- Primary language: Chinese (Simplified)
- Technical terms may use English equivalents
- Maintain consistent terminology translation
- Support Chinese character encoding in all files

## Working with This Project

When contributing to this codebase:
1. Follow the existing content structure and patterns
2. Maintain Chinese language consistency
3. Use the established chapter/section organization
4. Reference existing templates in the appendix
5. Ensure all links work correctly in the VitePress build

## Important Notes

- This is a documentation project, not a software application
- All content is written in Chinese
- Focus on educational and practical guidance
- Case studies demonstrate real-world DDAD implementation