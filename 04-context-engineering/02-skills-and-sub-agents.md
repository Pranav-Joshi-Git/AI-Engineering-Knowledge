# Skills and Sub-Agents

## 1. What are AI Agent Skills?

**Skills** are reusable packages of instructions, knowledge and sometimes supporting scripts that teach an AI agent how to perform a specific type of task.

Instead of repeatedly explaining a complex procedure, developers can define it once and allow compatible agents to use it when required.

**Example:**

An AEM development skill could guide an AI coding assistant to:
- Follow AEM component development conventions.
- Create Sling Models using project standards.
- Follow HTL best practices.
- Run the appropriate validation and tests.

Skills make specialized knowledge reusable across tasks.

## 2. What Does a Skill Typically Contain?

A skill commonly includes:

| Component | Purpose |
|---|---|
| Instructions | Explains how to perform the task |
| Reference files | Provides detailed documentation or examples |
| Scripts | Automates repeatable operations where supported |
| Metadata | Describes the skill and helps the agent identify when to use it |

In some implementations, a skill has a `SKILL.md` file containing its name, description and instructions.

The exact structure depends on the agent platform.

## 3. How Do Skills Work?

Many skill implementations use progressive disclosure.

Instead of loading every skill's complete instructions into the context immediately, the agent initially discovers available skills through their metadata.

When a relevant skill is selected, the agent loads its detailed instructions and supporting resources.

Typical flow:

```text
User Request
     ↓
Agent Identifies Relevant Skill
     ↓
Loads Skill Instructions
     ↓
Uses Supporting References / Scripts
     ↓
Performs the Task
     ↓
Returns Result
```

This helps reduce unnecessary context consumption while keeping specialized capabilities available.

## 4. What is a Skill Creator?

A **skill creator** is a tool or workflow that helps developers create and maintain reusable agent skills.

It can help with:
- Defining the skill's purpose.
- Creating the required folder structure.
- Writing skill instructions.
- Adding reference documentation and scripts.
- Validating the skill structure.

It is not a separate AI architecture or a mandatory component of every agent.

## 5. What are Sub-Agents?

A **sub-agent** is a specialized agent delegated a particular task by a primary agent.

Sub-agents can operate with their own instructions, context and tools, depending on the platform.

**Example:**

When implementing a new application feature, a coding agent could delegate:

- Research sub-agent: Explore the existing architecture.
- Coding sub-agent: Implement the required changes.
- Testing sub-agent: Generate and run relevant tests.
- Review sub-agent: Inspect the implementation for issues.

The primary agent coordinates their work and uses their results.

## 6. Skills vs Sub-Agents

This is an important distinction.

| Skills | Sub-Agents |
|---|---|
| Reusable knowledge and procedures | Separate delegated AI workers |
| Teach an agent how to perform a task | Delegate a task to another agent |
| Typically loaded when relevant | Invoked when separate execution is useful |
| Do not inherently require another agent | Involve another agent execution context |

**Simple analogy:**

- Skill = A reusable instruction manual.
- Sub-agent = A specialist assigned to perform a task.

A sub-agent may also use relevant skills.

## 7. Skills vs MCP

Both extend AI agent capabilities, but in different ways.

| Skills | MCP |
|---|---|
| Provide reusable instructions and knowledge | Standardizes connections to external capabilities |
| Guide how a task should be performed | Enables access to tools, resources and prompts |
| Often contain documentation and scripts | Uses a client-server protocol |
| Example: AEM development guidelines | Example: Access Jira through an MCP server |

They can work together. An agent can use a skill that explains how to investigate a Jira issue and an MCP server that provides the actual Jira integration.

## 8. Quick Interview Revision

| Question | Key point |
|---|---|
| What are agent skills? | Reusable instructions and resources for specialized tasks. |
| What is progressive disclosure? | Loading detailed instructions only when relevant. |
| What is SKILL.md? | A commonly used file defining a skill's metadata and instructions. |
| What is a skill creator? | A tool or workflow for creating and maintaining skills. |
| What is a sub-agent? | A specialized agent delegated a task by another agent. |
| Skills vs sub-agents? | Reusable knowledge vs delegated execution. |
| Skills vs MCP? | Instructions for performing tasks vs standardized external integrations. |
| Can a sub-agent use skills? | Yes, depending on the agent platform. |

---

[← Previous: Instructions, Context and Memory](01-instructions-context-and-memory.md) · [Next: AI Security and Reliability →](../05-ai-security-and-reliability/01-ai-security-and-reliability.md)
