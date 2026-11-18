# Instructions, Context and Memory

## 1. What is Context Engineering?

**Context engineering** is the process of selecting, organizing and providing the right information to an LLM so it can perform a task effectively.

A model's output depends not only on the prompt but also on the instructions, conversation history, project information, tools and other context available to it.

Prompt engineering focuses on designing effective prompts, while context engineering manages the broader information supplied to the model.

## 2. Instructions vs Context vs Memory

These concepts are related but serve different purposes.

| Concept | Purpose | Example |
|---|---|---|
| Instructions | Define how the AI should behave | Follow the project's coding standards |
| Context | Provides information relevant to the current task | Project architecture and API documentation |
| Memory | Retains useful information for future interactions | User prefers TypeScript and Jest |

**Example:**

When asking an AI coding assistant to implement a feature:

- Instructions: Use existing coding conventions.
- Context: Understand the current project structure and related components.
- Memory: Remember previously established developer preferences.

Together, they help the model produce more relevant and consistent results.

## 3. What are AGENTS.md, CLAUDE.md and GEMINI.md?

These are instruction files used by different AI coding tools to provide persistent project-specific guidance.

| File | Common association |
|---|---|
| `AGENTS.md` | Codex and other compatible coding agents |
| `CLAUDE.md` | Claude Code |
| `GEMINI.md` | Gemini CLI |

They can contain:
- Project architecture and structure.
- Coding conventions and best practices.
- Build and test commands.
- Important dependencies.
- Development constraints.
- Instructions for working with the repository.

**Example:**

An `AGENTS.md` file might instruct an AI coding agent:

- Use existing Sling Models instead of introducing unnecessary new ones.
- Follow the project's naming conventions.
- Run relevant tests before suggesting changes.
- Do not modify generated files.

The exact supported filenames, discovery rules and instruction-loading behaviour depend on the tool.

## 4. What is context.md?

A `context.md` file is a project-defined convention for maintaining relevant project information that an AI assistant can refer to.

It is not a universally standardized AI protocol or a mandatory filename.

It may contain:
- Project overview.
- Architecture and module relationships.
- Important business rules.
- Technical decisions.
- API dependencies.
- Current implementation details.

**Example:**

For an AEM project, it could explain the relationship between Sites, DAM, Sling Models, workflows and external integrations.

This helps an AI assistant understand the project without repeatedly explaining the same background.

## 5. What is MEMORY.md?

A `MEMORY.md` file is commonly used as a persistent memory mechanism in AI coding workflows.

It can store information worth retaining across sessions, such as:

- Developer preferences.
- Frequently used commands.
- Important architectural decisions.
- Known issues and their solutions.
- Useful project-specific observations.

Unlike temporary conversation context, persistent memory is intended to make useful information available in future sessions.

The exact memory mechanism and file-loading behaviour depend on the AI tool.

## 6. Context Window and Context Management

An LLM has a limited context window, which determines how much input and conversation information it can process at a time.

Providing too much irrelevant information can:
- Increase token consumption and cost.
- Reduce the relevance of important information.
- Make context management harder.

Good context engineering focuses on providing relevant, accurate and sufficient information rather than simply providing more information.

Useful techniques include:
- Keeping instruction files concise.
- Loading relevant documentation when needed.
- Summarizing lengthy conversation history.
- Separating project instructions from detailed reference material.
- Avoiding duplicated or outdated information.

## 7. How Do These Files Work Together?

Consider an AI coding assistant working on an existing enterprise application.

| File / Information | What it provides |
|---|---|
| `AGENTS.md` | General repository-level instructions |
| `CLAUDE.md` | Claude Code-specific guidance |
| `GEMINI.md` | Gemini-specific guidance |
| `context.md` | Project architecture and technical background |
| `MEMORY.md` | Useful information retained across sessions |

These are illustrative conventions, not a mandatory universal structure. A project does not need all these files.

Also, there is no universal precedence order across all AI tools. Each tool defines how it discovers, combines and prioritizes instructions, including nested instructions and user-level settings.

## 8. Quick Interview Revision

| Question | Key point |
|---|---|
| What is context engineering? | Managing relevant information supplied to an LLM. |
| Prompt vs context engineering? | Designing prompts vs managing the broader information available to the model. |
| What are AGENTS.md, CLAUDE.md and GEMINI.md? | Tool-associated instruction files for AI coding agents. |
| What is context.md? | A convention for storing project-specific context. |
| What is MEMORY.md? | A convention for retaining useful information across sessions. |
| Why is context management important? | Improves relevance while controlling token usage. |
| Is there a universal instruction hierarchy? | No, precedence depends on the tool's implementation. |