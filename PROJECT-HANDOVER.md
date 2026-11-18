# Project Handover: Building a Reusable AI Knowledge Repository

## 1. Project Objective

I want to build a structured, long-term AI knowledge repository that covers important concepts across Large Language Models, RAG, AI Agents, MCP, Context Engineering, AI Security, and AI Engineering.

This repository will initially help me prepare for an internal Emerging Technologies interview, but it must remain generic and reusable for long-term learning, future interviews, and practical engineering work.

This is NOT intended to be:
- A temporary interview-preparation document.
- A collection of copied definitions from articles or videos.
- An academic or research-level textbook.
- A collection of disconnected notes.

It should become a well-organized, technically accurate, practical AI knowledge base that I can continuously expand and improve.

## 2. My Technical Background and Target Audience

My background:
- B.Tech in Computer Science.
- 4+ years of experience as an AEM developer.
- Experience with enterprise web applications, Adobe Experience Manager, DAM, workflows, schedulers, APIs, and JavaScript.
- Familiar with general software engineering and development concepts.
- Currently building deeper understanding of AI, LLMs, RAG, agents, MCP, and modern AI engineering.

Write for someone with a software engineering background who is learning AI engineering.

Assume I understand general programming and software architecture, but do not assume that I already know specialized AI terminology or mathematics.

The explanations should also be suitable for discussing these topics with experienced architects and senior engineers.

Do not exaggerate my professional AI experience. Practical examples can be hypothetical enterprise scenarios unless I explicitly provide an actual project example.

## 3. Repository Structure

Use the following initial structure:

ai-knowledge/
│
├── README.md
│
├── 01-llm-fundamentals/
│   ├── README.md
│   ├── llm-fundamentals.md
│   └── prompt-engineering.md
│
├── 02-embeddings-and-rag/
│   ├── README.md
│   ├── embeddings-and-vector-databases.md
│   └── rag-architecture-and-optimization.md
│
├── 03-ai-agents/
│   ├── README.md
│   ├── ai-agents-and-agentic-systems.md
│   ├── tools-and-function-calling.md
│   ├── mcp.md
│   └── agent-orchestration.md
│
├── 04-context-engineering/
│   ├── README.md
│   ├── instructions-context-and-memory.md
│   └── skills-and-sub-agents.md
│
├── 05-ai-security-and-reliability/
│   ├── README.md
│   └── ai-security-and-reliability.md
│
└── 06-ai-engineering/
    ├── README.md
    ├── model-training-and-fine-tuning.md
    └── evaluation-and-production.md

This is the initial structure, not a rigid restriction. If a file becomes too large or multiple concepts deserve independent treatment, propose a sensible split.

Avoid creating excessive small files.

The root README should explain:
- What this repository is.
- Its objectives.
- The major knowledge areas.
- How the repository is organized.
- How to navigate the content.

Each section-level README should briefly explain what that section covers and link to its files.

Do not include interview dates, preparation status, completion percentages, daily progress, or personal study trackers anywhere in the repository.

Keep the repository evergreen and independent of any particular company or interview.

## 4. Complete Topic Inventory

Include all the following topics. Do not silently remove topics because they appear basic or less important.

### Section 1: LLM Fundamentals

1. What are Large Language Models (LLMs)?
2. Tokens and tokenization.
3. Context window and context limits.
4. Temperature and its impact on output.
5. Top-K and Top-P sampling.
6. Transformers and attention mechanism (high-level understanding).
7. Prompt engineering.
8. System prompts vs user prompts.

### Section 2: Embeddings and RAG

1. Embeddings and semantic similarity.
2. Vector databases.
3. Similarity search and indexing:
   - HNSW.
   - IVF.
   - LSH.
4. Chunking strategies and overlap.
5. RAG architecture and pipeline.
6. RAG optimization:
   - Caching.
   - Metadata filtering.
   - Reranking.
7. RAG vs fine-tuning.

### Section 3: AI Agents and Agentic Systems

1. LLM vs AI agents.
2. AI agent architecture:
   - LLM.
   - Tools.
   - Planning.
   - Execution loop.
   - Context.
3. Tool calling and function calling.
4. Agent harness.
5. Model Context Protocol (MCP):
   - What MCP is.
   - Why MCP is needed.
   - Host, client and server architecture.
   - Tools, resources and prompts.
   - MCP vs traditional APIs.
6. LangChain vs LangGraph.
7. Multi-agent systems and sub-agents.
8. Agent orchestration.

### Section 4: Agent Configuration and Context Engineering

1. AGENTS.md, CLAUDE.md and GEMINI.md.
2. context.md and context engineering.
3. MEMORY.md and persistent memory.
4. Skills and skill-creator.
5. Instruction vs context vs memory vs skills.
6. Skills precedence and instruction hierarchy.
7. Sub-agent delegation and coordination.

Explain platform-specific behaviour carefully. Do not assume that every AI coding assistant loads files, resolves instructions, or invokes skills in exactly the same way.

### Section 5: AI Security and Reliability

1. Prompt injection.
2. Direct vs indirect prompt injection.
3. Jailbreaking.
4. Hallucinations and mitigation.
5. Guardrails and content filtering.
6. Data leakage and access control.
7. Responsible AI.

### Section 6: AI Engineering and Production

1. Fine-tuning and LoRA (high-level).
2. Traditional ML vs Deep Learning vs Generative AI.
3. Supervised vs unsupervised vs reinforcement learning.
4. AI evaluation and monitoring.
5. Retrieval quality vs response quality.
6. Latency, throughput and error rates.
7. Open-source vs proprietary models.
8. AI coding assistants:
   - GitHub Copilot.
   - Claude Code.

The above inventory is the baseline. Additional closely related concepts can be introduced when they genuinely improve understanding, but do not let the scope expand unnecessarily.

## 5. Writing Style and Tone

This is one of the most important requirements.

Write in simple, natural, conversational English.

The notes should sound like an experienced software developer explaining a concept to another engineer during an interview.

Avoid:
- Textbook-style definitions.
- Academic writing.
- Excessive jargon.
- Complicated sentences.
- Unnecessary introductory paragraphs.
- Repeating the same explanation in multiple sections.
- Overly long paragraphs.
- Marketing language and exaggerated claims.

Prefer:
- Direct explanations.
- Short paragraphs.
- Clear headings.
- Practical examples.
- Simple analogies where useful.
- Technically accurate terminology.
- Concise but meaningful technical depth.

For example, instead of:

"Retrieval-Augmented Generation is an advanced paradigm that synergistically combines parametric knowledge encoded within large language models with non-parametric external knowledge repositories."

Prefer:

"RAG allows an LLM to use external information while generating an answer. Instead of depending only on what the model learned during training, the system first retrieves relevant information from an external knowledge source and provides it to the model as context."

The second explanation is the preferred writing style.

Do not oversimplify concepts to the point of becoming technically incorrect.

## 6. Standard Structure for Every Topic

Use the following structure as the default template.

### 1. What is it?
Explain the concept in simple language. Start with the direct meaning rather than a long introduction.

### 2. Why do we need it?
Explain the problem it solves and why it is useful.

### 3. How does it work?
Explain the underlying mechanism or workflow in logical steps.

Use diagrams or simple flow representations when they genuinely improve understanding.

### 4. Practical example
Give a realistic example that demonstrates the concept.

Prefer enterprise and software engineering examples.

### 5. Important concepts and technical details
Cover the important components, terminology, configurations, algorithms, or implementation considerations relevant to the topic.

### 6. Comparisons, limitations and trade-offs
Include relevant comparisons and limitations.

For example:
- RAG vs fine-tuning.
- MCP vs APIs.
- LLM vs AI agent.
- LangChain vs LangGraph.
- Vector search vs keyword search.

Explain when a particular approach is useful and what its limitations are.

### 7. Connection with other concepts
Where useful, briefly explain how this topic connects to other areas of AI.

This section is optional when the connection is obvious or would create unnecessary repetition.

Important: This is a flexible template, not a mandatory checklist. Do not force every heading into every topic. Keep the explanation natural.

## 7. Examples and Practical Scenarios

Prefer examples from enterprise software development.

Useful recurring scenarios include:

- An employee asking an AI assistant about an internal HR policy.
- An enterprise chatbot retrieving information from company documents.
- An AI coding assistant searching a codebase and modifying files.
- An agent retrieving Jira issues or interacting with Git repositories.
- A centralized Digital Asset Management platform where AI helps search, classify, or update metadata.
- An enterprise workflow that uses AI to analyse documents and recommend actions.

Use these examples where relevant, not everywhere.

A simple example should be enough to make a concept understandable.

Do not invent claims about real-world production implementations.

When explaining a hypothetical enterprise architecture, clearly present it as an example rather than an actual deployed solution.

## 8. Diagrams, Code and Technical Depth

Use diagrams selectively.

Good candidates include:
- Transformer architecture at a high level.
- RAG ingestion and query pipelines.
- MCP client-server architecture.
- AI agent execution loop.
- Multi-agent orchestration.
- Context engineering architecture.

Use Mermaid diagrams when they improve clarity.

Use code examples only when they help explain an implementation concept, such as tool calling, embedding generation, or a simple RAG pipeline.

Do not add code simply to make a document look technical.

Do not go excessively deep into mathematical derivations, algorithm internals, or implementation details unless the concept requires it.

For example, explain what HNSW does and why it is used, but do not spend pages deriving its internal graph construction algorithm.

The target is strong conceptual and practical understanding, not research-level specialization.

## 9. Priority and Depth

Use three priority levels internally within the notes:

- HIGH: Core concepts that should be understood properly and explained confidently.
- MEDIUM: Important supporting concepts that require a good conceptual understanding.
- BASIC: Concepts where a clear high-level understanding is sufficient.

These labels should appear next to topic headings, not in a separate progress tracker.

Depth should depend on the topic's importance.

For HIGH topics, cover the concept, working mechanism, examples, important details, limitations and trade-offs.

For MEDIUM topics, provide a good explanation and relevant examples without excessive depth.

For BASIC topics, focus on what it means, why it exists and where it is used.

Do not confuse priority with document length. A short explanation can still be technically complete.

## 10. Accuracy and Research Standards

Technical accuracy is more important than producing content quickly.

When researching:
- Prefer official documentation and primary technical sources.
- Use reputable engineering documentation and technical articles as supporting references.
- Verify important technical claims against reliable sources.
- Distinguish established standards from vendor-specific implementations.
- Clearly identify platform-dependent behaviour.
- Do not invent features, configuration rules, or capabilities.
- Do not present assumptions as facts.

For rapidly evolving topics such as MCP, agent frameworks, AI coding assistants and model capabilities, verify that the explanation reflects current behaviour.

Add a small References section at the end of a topic or document when external sources materially inform it.

Avoid excessive citations for basic concepts, but retain useful official documentation links.

## 11. Avoiding Duplication

Some topics naturally overlap.

For example:
- Fine-tuning appears in both RAG comparisons and model training.
- Context appears in LLM fundamentals, agents and context engineering.
- Sub-agents appear in agentic systems and context engineering.
- Tool calling appears in both agent architecture and MCP.
- Monitoring appears in RAG optimization and AI production.

Handle this carefully.

Explain the complete concept in its primary location.

In other documents, provide a short explanation or a link to the primary section rather than copying the same content.

The repository should have a clear source of truth for each major concept.

## 12. File and Markdown Standards

Maintain consistent Markdown formatting.

Use:
- H1 for the document title.
- H2 for major topics.
- H3 for subsections.
- H4 only when genuinely required.
- Bullet lists for related information.
- Numbered lists for ordered workflows.
- Tables for comparisons where they make the information easier to understand.
- Code blocks for code and Mermaid diagrams.

Keep filenames descriptive and lowercase, using hyphens.

Add internal links between related documents.

Avoid excessively deep heading hierarchies.

Each file should have a clear scope and should be independently understandable.

## 13. Repository Maintenance Rules

This repository will evolve continuously.

Whenever new concepts are added:
- Place them in the most appropriate existing file.
- Create a new file only when it provides a meaningful organizational benefit.
- Update the relevant section README and root README when the structure changes.
- Add cross-links where useful.
- Preserve existing useful explanations.
- Avoid rewriting entire documents when only a small correction is needed.
- Keep terminology and formatting consistent across files.

Do not introduce preparation status, interview tracking, daily progress, or personal notes into the repository.

## 14. Initial Execution Instructions

Before creating files:

1. Inspect the repository and confirm its current contents.
2. Understand the complete project requirements in this document.
3. Create the proposed directory structure.
4. Create the root README and section-level READMEs.
5. Create the topic files with clear headings and placeholders or concise topic outlines.
6. Ensure that every topic in the inventory has an assigned location.
7. Check that internal links and filenames are consistent.

For this initial task, focus on building the repository structure and organizing the topic inventory.

Do not attempt to generate all 47 topic explanations in one massive operation.

After setting up the structure, show me:
- The final directory tree.
- The mapping of every topic to its file.
- Any recommended structural changes.
- Any topics that may overlap and how you handled them.

Wait for my approval before generating the complete topic content.

## 15. Most Important Principle

The goal is not to create the largest possible AI documentation repository.

The goal is to create a technically accurate, easy-to-understand, practical and maintainable knowledge base.

Every explanation should help me answer three questions:

1. What is this concept?
2. Why and how is it used?
3. What are its practical implications, limitations or trade-offs?

If a paragraph does not improve understanding, remove it.

If a topic needs more depth to avoid an incomplete or misleading explanation, add that depth.

Quality, clarity, accuracy and maintainability take priority over quantity.
