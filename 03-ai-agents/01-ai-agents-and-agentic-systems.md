# AI Agents and Agentic Systems

## 1. What is an AI Agent?

An **AI agent** is a system that uses an LLM to understand a goal, decide what actions to take, interact with external tools and work toward completing a task.

A traditional LLM primarily receives a prompt and generates a response.

An AI agent can go further: it can decide what information it needs, call tools, evaluate the results and take additional actions.

**Example:**

User request:

> Find all overdue Jira tickets assigned to me and prepare a summary.

A normal LLM can explain how to find overdue tickets.

An AI agent could:
1. Understand the request.
2. Call the Jira API to retrieve assigned tickets.
3. Filter overdue tickets.
4. Summarize the results.
5. Return the summary to the user.

## 2. LLM vs AI Agent

| LLM | AI Agent |
|---|---|
| Generates responses based on input | Works toward a defined goal |
| Typically responds to a prompt | Can perform multiple steps |
| Does not inherently interact with external systems | Can use tools and APIs |
| Application controls the interaction | Agent can decide subsequent actions within its permitted scope |

An LLM is often the reasoning component of an AI agent, but an agent is a larger system built around it.

## 3. Core Components of an AI Agent

A typical agent consists of:

| Component | Responsibility |
|---|---|
| LLM | Interprets requests and helps decide actions |
| Instructions | Defines goals, behaviour and constraints |
| Tools | Allows interaction with external systems |
| Memory / State | Maintains relevant information across steps |
| Planning | Breaks complex tasks into smaller steps |
| Execution Loop | Coordinates actions and evaluates results |

Not every agent requires a sophisticated implementation of every component.

## 4. How does an AI Agent Work?

Most agentic systems follow an iterative execution loop.

```text
User Goal
    ↓
LLM Understands Request
    ↓
Decides Next Action
    ↓
Tool Execution
    ↓
Observes Tool Result
    ↓
Evaluate: Is the Goal Complete?
    ├── No → Continue the Loop
    └── Yes → Return Final Response
```

For example, consider an agent asked to investigate a production issue.

1. It identifies the affected service.
2. It queries monitoring data.
3. It examines relevant logs.
4. It identifies a possible cause.
5. It retrieves the relevant deployment history.
6. It prepares an incident summary.

The important characteristic is that the agent can use intermediate results to decide what to do next.

This is different from a fixed sequence of operations where every step is predetermined.

## 5. Workflows vs Agentic Systems

This is a common interview question.

**Workflow-based system:**
- Follows a predefined sequence of steps.
- The developer determines the execution path.
- Behaviour is generally predictable.
- Suitable for repetitive and structured tasks.

**Agentic system:**
- Uses an LLM to decide which action to take next.
- Can adapt its execution based on intermediate results.
- Supports more flexible, multi-step tasks.
- Requires stronger monitoring and control.

Example:

A document-processing workflow might always extract a PDF, validate its fields and store the result.

An agentic document-processing system might decide to retrieve missing information, inspect another document or request human clarification when necessary.

In practice, many production systems combine both approaches: deterministic workflows for critical operations and agents for flexible decision-making.

## 6. What is Agentic AI?

**Agentic AI** refers to AI systems designed to pursue goals through autonomous or semi-autonomous actions.

The term describes a broader approach to building AI applications rather than one specific framework or architecture.

An agentic system may:
- Plan multiple steps.
- Use external tools.
- Maintain state.
- Adapt based on feedback.
- Delegate tasks to other agents.
- Request human approval for sensitive operations.

Autonomy is not all-or-nothing. It should be limited according to the risk and importance of the task.

For example, an agent may independently investigate Jira tickets but require human approval before closing tickets or modifying production configurations.

## 7. What is an Agent Harness?

An **agent harness** is the surrounding software infrastructure that makes an LLM operate as an agent.

It manages responsibilities such as:

- Providing instructions and context.
- Exposing available tools.
- Executing tool calls.
- Maintaining conversation and execution state.
- Managing the agent's execution loop.
- Enforcing permissions, limits and safety checks.
- Handling errors and returning results.

The LLM helps decide what to do; the harness coordinates and controls how those decisions are executed.

This distinction is important because an agent's reliability depends not only on its model but also on the infrastructure around it.

## 8. Challenges in Building AI Agents

- **Unreliable decisions:** The model may choose an incorrect action.
- **Tool failures:** External APIs may fail or return unexpected results.
- **Infinite loops:** An agent may repeatedly perform actions without completing its goal.
- **Security risks:** An agent may access or modify information beyond its intended permissions.
- **Cost and latency:** Multiple LLM calls and tool executions increase resource usage.
- **Unpredictability:** Flexible execution makes testing and debugging more difficult.

Production agents need bounded execution, tool permissions, validation, logging and human approval for high-impact actions.

## 9. Quick Interview Revision

| Question | Key point |
|---|---|
| What is an AI agent? | An LLM-powered system that uses tools and actions to pursue goals. |
| LLM vs agent? | Response generation vs goal-oriented execution. |
| What are the core components? | LLM, instructions, tools, state, planning and execution loop. |
| What is an agentic loop? | Decide, act, observe and repeat until completion. |
| Workflow vs agent? | Predetermined execution vs dynamic decision-making. |
| What is Agentic AI? | AI systems capable of pursuing goals through actions. |
| What is an agent harness? | Infrastructure that manages execution, tools, state and controls. |
| Why is human approval important? | To control sensitive or high-impact actions. |

**Next:** Tools and Function Calling.