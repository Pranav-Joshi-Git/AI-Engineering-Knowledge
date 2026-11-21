# Tools and Function Calling

## 1. What is Tool Calling?

**Tool calling** allows an LLM-powered application or agent to interact with external systems by requesting the execution of predefined functions.

An LLM cannot inherently access a database, call an API or send an email. Tools provide these capabilities.

**Example:**

User: "What is the weather in Pune?"

1. The LLM identifies that current weather information is required.
2. It selects the weather tool and generates the required arguments, such as `{"city": "Pune"}`.
3. The application executes the tool.
4. The tool returns weather data.
5. The LLM uses the result to formulate a response.

## 2. How Does Function Calling Work?

Function calling is a structured mechanism through which a model requests a function to be executed.

Typical flow:

```text
User Request
     ↓
LLM Receives Available Tool Definitions
     ↓
LLM Selects a Tool
     ↓
Generates Structured Arguments
     ↓
Application Validates and Executes Function
     ↓
Tool Result Returned to LLM
     ↓
LLM Generates Final Response
```

**Important:** The LLM generally does not execute the function itself. It generates a structured tool-call request, and the surrounding application executes it.

## 3. What is a Tool Definition?

A tool definition describes the function available to the model.

It generally contains:

- **Name:** Function identifier.
- **Description:** What the function does and when to use it.
- **Parameters:** Expected input arguments.
- **Schema:** Structure and data types of the arguments, often defined using JSON Schema.

Example:

```json
{
  "name": "get_employee_details",
  "description": "Retrieve employee information by ID",
  "parameters": {
    "type": "object",
    "properties": {
      "employee_id": {
        "type": "string"
      }
    },
    "required": ["employee_id"]
  }
}
```

The model uses this definition to understand when and how to request the function.

## 4. Tool Calling vs API Calling

| Tool Calling | API Calling |
|---|---|
| Model decides when a tool is needed | Application or developer initiates the API call |
| Model generates structured arguments | Application constructs the request |
| Requires an execution layer | Executed by the application or service |
| Enables dynamic, model-driven actions | Often follows predefined application logic |

Tool calling and API calling are not competing technologies.

A tool may internally call a REST API. Tool calling provides the LLM with a controlled interface to request that operation.

## 5. What is Parallel Tool Calling?

An LLM may request multiple independent tools in a single turn.

Example: A user asks for a summary of an employee's leave balance and attendance.

The agent could request:
- Leave balance retrieval.
- Attendance retrieval.

If the operations are independent, the application can execute them in parallel and return both results to the model.

This can reduce overall latency compared with executing every operation sequentially.

## 6. Tool Calling vs Structured Output

These concepts are related but serve different purposes.

| Tool Calling | Structured Output |
|---|---|
| Requests an action or external operation | Produces data in a defined format |
| Can trigger application-side execution | Does not inherently execute anything |
| Example: Retrieve employee details | Example: Return employee details as JSON |

A tool call may itself use structured JSON arguments, but not every structured response is a tool call.

## 7. Important Considerations

Tool calling introduces real-world execution risks.

- **Validation:** Validate arguments before execution.
- **Authorization:** Check whether the user or agent has permission.
- **Error handling:** Handle API failures and unexpected responses.
- **Security:** Never expose unrestricted database or system access.
- **Confirmation:** Require human approval for sensitive actions.
- **Idempotency:** Prevent duplicate operations when retrying actions such as payments or record creation.

The model should never be treated as the security boundary. Enforce permissions and validations in the application.

## 8. Quick Interview Revision

| Question | Key point |
|---|---|
| What is tool calling? | Allows an LLM to request external operations through predefined tools. |
| Does the LLM execute tools? | No, the application executes the requested function. |
| What is function calling? | A structured mechanism for requesting function execution. |
| What is a tool schema? | Defines the function's name, description and expected arguments. |
| Can multiple tools run together? | Yes, independent tool calls can execute in parallel. |
| Tool calling vs API calling? | Model-driven tool selection vs direct application-driven API execution. |
| Tool calling vs structured output? | Requesting an action vs generating data in a defined format. |
| How do you secure tool execution? | Validation, authorization, restricted permissions and human approval. |

---

[← Previous: AI Agents and Agentic Systems](01-ai-agents-and-agentic-systems.md) · [Next: Model Context Protocol (MCP) →](03-mcp.md)
