# Prompt Engineering

## 1. What is Prompt Engineering?

**Prompt engineering** is the process of designing and structuring instructions given to an LLM to obtain accurate, relevant and consistent outputs.

An LLM can have powerful capabilities, but the quality of its response depends significantly on how the task and its context are communicated.

Consider these two prompts:

**Vague prompt:**
```text
Explain this error.
```

**Well-structured prompt:**
```text
You are an experienced Java developer.

Analyze the following error log.

Identify:
1. The likely root cause.
2. The relevant error messages.
3. Recommended troubleshooting steps.

Use only the evidence in the log.
If the root cause cannot be established, clearly state that.
```

The second prompt provides a role, task, expected output and constraints. This reduces ambiguity and makes the response more useful.

## 2. Key Components of a Good Prompt

A well-designed prompt commonly contains:

| Component | Purpose |
|---|---|
| Role | Establishes the perspective or expertise expected |
| Task | Clearly describes what the model should do |
| Context | Provides relevant background information |
| Constraints | Defines limitations and boundaries |
| Output format | Specifies the expected response structure |
| Examples | Demonstrates the desired input-output behaviour |

Not every prompt needs all six components. Use them according to the complexity of the task.

## 3. System Prompt vs User Prompt

These are two important instruction types used when interacting with LLMs.

### System Prompt

A system prompt establishes the assistant's overall behaviour, role and operating constraints.

Example:
```text
You are an enterprise support assistant.

- Answer using authorized company documentation.
- Do not invent policies or procedures.
- If information is unavailable, say so.
- Keep responses concise and professional.
```

### User Prompt

A user prompt contains the specific request or task submitted by the user.

Example:
```text
What is the company's leave policy
for employees working remotely?
```

### Key Differences

| System Prompt | User Prompt |
|---|---|
| Defines overall behaviour | Defines the immediate task |
| Usually configured by the application | Usually provided by the user |
| Establishes instructions and constraints | Supplies questions and task-specific details |
| Can remain consistent across requests | Changes with each interaction |

**Important:** System messages and their precedence are API- and platform-dependent. Some systems expose additional instruction levels, such as developer messages. Do not assume every LLM interface implements an identical hierarchy.

## 4. Common Prompting Techniques

### Zero-Shot Prompting

Asking the model to perform a task without providing examples.

```text
Classify this support ticket as
Low, Medium or High priority.

Ticket: Checkout API is unavailable
for all customers.
```

Useful for straightforward tasks where the instructions are clear.

### Few-Shot Prompting

Providing a few examples to demonstrate the expected behaviour before asking the model to perform the task.

```text
Classify the following tickets.

Example 1:
Ticket: Password reset request
Classification: Low

Example 2:
Ticket: Payment service unavailable
Classification: High

Now classify:
Ticket: User cannot access dashboard
```

Examples help establish the expected pattern, especially when the required output or classification rules are not obvious.

### Chain-of-Thought Prompting

Encouraging a model to work through a problem in multiple reasoning steps rather than immediately producing an answer.

This can be useful for complex reasoning tasks, mathematical problems and multi-step analysis.

However, requesting or receiving a detailed explanation does not guarantee that it faithfully represents the model's internal reasoning. For practical applications, asking for a concise explanation, assumptions and supporting evidence is often more useful.

### Structured Output Prompting

Asking the model to return information in a predefined structure, such as JSON.

Example:
```text
Extract the incident details.

Return JSON with these fields:
{
  "service": "",
  "severity": "",
  "root_cause": "",
  "recommended_action": ""
}
```

Useful when integrating LLM responses into applications, APIs and automated workflows.

For production use, validate the generated structure against a schema rather than assuming the output is valid.

## 5. Best Practices

- **Be specific:** Clearly define what you expect instead of using vague instructions.
- **Provide relevant context:** Include only information needed for the task.
- **Set boundaries:** Explicitly state what the model should not do.
- **Specify the output format:** Use JSON, tables or bullet points when downstream processing requires them.
- **Use examples when necessary:** Few-shot examples can improve consistency.
- **Handle uncertainty:** Tell the model to acknowledge missing information instead of guessing.
- **Iterate and evaluate:** Test prompts with different inputs and edge cases rather than relying on one successful response.

## 6. Prompt Engineering vs Context Engineering

These concepts are related but not identical.

| Prompt Engineering | Context Engineering |
|---|---|
| Focuses on designing effective instructions | Focuses on managing all information available to the model |
| Defines what the model should do | Determines what information the model receives |
| Includes roles, tasks, constraints and examples | Includes instructions, history, retrieved documents, tools and memory |

For example, asking an assistant to answer using company policies is prompt engineering.

Retrieving the correct policy documents, selecting relevant conversation history and supplying the results within the context window are aspects of context engineering.

**Remember:** A well-written prompt cannot compensate for missing or irrelevant information.

## 7. Quick Interview Revision

| Question | Key point |
|---|---|
| What is prompt engineering? | Designing instructions to guide LLM outputs. |
| What makes a good prompt? | Clear task, relevant context, constraints and expected output. |
| System vs user prompt? | Overall behaviour and constraints vs immediate user request. |
| What is zero-shot prompting? | Performing a task without examples. |
| What is few-shot prompting? | Providing examples to guide the expected response. |
| What is chain-of-thought prompting? | Encouraging multi-step reasoning for complex tasks. |
| Why use structured output? | Makes responses easier to validate and integrate into applications. |
| Prompt vs context engineering? | Designing instructions vs managing the complete information supplied to the model. |

---

[← Previous: LLM Fundamentals](01-llm-fundamentals.md) · [Next: Embeddings and Vector Databases →](../02-embeddings-and-rag/01-embeddings-and-vector-databases.md)
