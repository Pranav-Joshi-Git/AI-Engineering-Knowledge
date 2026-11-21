# Model Context Protocol (MCP)

## 1. What is MCP?

**MCP (Model Context Protocol)** is an open protocol that standardizes how AI applications connect to external tools, data sources and services.

Without MCP, developers often build custom integrations for every AI application and external service.

MCP provides a common communication standard, making integrations more reusable.

**Example:**

An AI assistant needs to:
- Read files from a local system.
- Retrieve information from a database.
- Search Jira tickets.

Instead of implementing every integration differently, the assistant can connect to MCP servers that expose these capabilities through a standardized protocol.

## 2. Why Do We Need MCP?

Consider an application integrating with five different external services.

Without a common protocol, each application may need its own custom integration for every service.

MCP reduces this integration complexity by standardizing communication.

Key benefits:
- **Standardization:** Common protocol for connecting AI applications to external systems.
- **Reusability:** The same MCP server can support multiple compatible clients.
- **Separation of concerns:** AI applications and external integrations can evolve independently.
- **Extensibility:** New tools and data sources can be added without building every integration from scratch.

MCP does not eliminate APIs. MCP servers can internally communicate with existing REST APIs, databases and other systems.

## 3. MCP Architecture

MCP follows a client-server architecture.

| Component | Responsibility |
|---|---|
| MCP Host | AI application that manages the overall interaction |
| MCP Client | Maintains a connection with an MCP server |
| MCP Server | Exposes tools, resources and prompts |

**Example:**

Imagine an AI-powered development assistant.

- Host: The AI coding application.
- Client: The MCP client managed by the application.
- Server: A GitHub MCP server exposing repository-related capabilities.

The host can connect to multiple MCP servers through separate MCP clients.

## 4. How Does MCP Work?

```text
User
  ↓
MCP Host (AI Application)
  ↓
MCP Client
  ↓
MCP Server
  ↓
External System (API / Database / Files)
  ↓
Result returned through MCP
  ↓
AI Application uses the result
```

Typical flow:

1. The host establishes a connection with an MCP server.
2. The client and server exchange initialization information and capabilities.
3. The client can discover available tools, resources and prompts.
4. The AI application uses the available capabilities when required.
5. The server communicates with the underlying system and returns results.

MCP commonly uses JSON-RPC 2.0 for message communication.

## 5. Core MCP Primitives

MCP provides three important server-side primitives:

| Primitive | Purpose | Example |
|---|---|---|
| Tools | Perform actions | Create a Jira ticket |
| Resources | Provide data or context | Read a project document |
| Prompts | Provide reusable prompt templates | Generate a code review prompt |

**Important distinction:**
- Tools are generally model-controlled: the model can request their execution.
- Resources are generally application-controlled: the host decides how to make their contents available.
- Prompts are generally user-controlled: the application can expose them for selection and use.

These are protocol-level interaction patterns, not restrictions on what an application can implement.

## 6. MCP vs Traditional API Integration

| Traditional API Integration | MCP |
|---|---|
| Application-specific integration logic | Standardized protocol for AI application integrations |
| Each client implements API-specific handling | MCP client communicates through a common protocol |
| API defines its own endpoints and contracts | MCP defines a common interaction model |
| Often requires custom integration for each application | MCP servers can be reused by compatible clients |

MCP does not replace REST APIs or other integration mechanisms. It provides a standardized layer through which AI applications can access capabilities exposed by servers.

## 7. MCP Transport Mechanisms

MCP supports different ways to communicate between clients and servers.

- **stdio:** Client launches a local MCP server as a subprocess and communicates through standard input and output. Common for local integrations.
- **Streamable HTTP:** Client communicates with a remote MCP server over HTTP, supporting streaming where needed.

The transport determines how messages travel; the MCP protocol defines their structure and meaning.

## 8. MCP Security Considerations

MCP integrations can expose sensitive systems and data, so security is essential.

- Authenticate and authorize connections appropriately.
- Restrict tools to the minimum required permissions.
- Validate tool inputs and outputs.
- Protect credentials and sensitive information.
- Treat external content as untrusted because it may contain prompt injection.
- Require confirmation for sensitive operations where appropriate.

An MCP connection does not automatically make a tool safe or authorized.

## 9. Quick Interview Revision

| Question | Key point |
|---|---|
| What is MCP? | An open protocol standardizing connections between AI applications and external capabilities. |
| Why do we need MCP? | Reusable integrations and reduced custom integration effort. |
| What are its components? | Host, Client and Server. |
| What are its three primitives? | Tools, Resources and Prompts. |
| What is the role of an MCP host? | AI application managing MCP interactions. |
| What does an MCP client do? | Maintains communication with an MCP server. |
| Does MCP replace APIs? | No, MCP can expose capabilities backed by existing APIs. |
| What communication format does MCP use? | JSON-RPC 2.0. |
| What are its common transports? | stdio and Streamable HTTP. |
| Is MCP itself an AI agent? | No, it is a protocol that enables integrations for AI applications. |

---

[← Previous: Tools and Function Calling](02-tools-and-function-calling.md) · [Next: Agent Orchestration →](04-agent-orchestration.md)
