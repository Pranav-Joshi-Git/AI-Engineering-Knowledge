# LLM Fundamentals

## 1. What is an LLM?

A **Large Language Model (LLM)** is a machine learning model trained on large amounts of text and other data to understand and generate language.

At its core, a language model learns to predict the next token based on the tokens that came before it.

For example:

> The capital of France is ...

The model assigns probabilities to possible next tokens. `Paris` would likely receive a high probability.

This prediction process is repeated to generate a complete response.

```text
Input → Predict next token → Append token
      → Predict next token → Append token → ...
```

This is called **autoregressive generation**.

Predicting the next token may sound like simple autocomplete, but learning to do this across huge amounts of text, code and other data allows LLMs to develop useful representations of language, concepts, relationships and patterns.

**Important:** An LLM generates likely continuations. It does not automatically verify whether its output is factually correct.

## 2. How are LLMs trained?

LLM development generally involves two broad stages.

### Pre-training

- The model is trained on large datasets containing text, code and other information.
- It learns by predicting missing or subsequent tokens, depending on the training objective.
- Its predictions are compared with the training targets, and its internal parameters are adjusted.
- Repeating this process at scale allows the model to learn patterns and relationships in the data.

The result is a **base model** with broad language capabilities.

### Post-training

A base model may not naturally behave like a helpful assistant. Post-training improves how it responds to instructions and interacts with users.

Common techniques include:

- **Supervised Fine-Tuning (SFT):** Training on examples of desired inputs and responses.
- **Preference optimization:** Using human or AI feedback to encourage better responses.
- **Reinforcement Learning:** Optimizing model behaviour using reward signals.

The exact combination varies across models.

**Remember:** Pre-training builds broad capabilities; post-training shapes how the model behaves.

## 3. Training vs Inference

These are two fundamentally different operations.

| Training | Inference |
|---|---|
| Learns from training data | Uses an already-trained model |
| Updates model parameters | Normally keeps parameters unchanged |
| Computationally expensive | Performed when a user sends a request |
| Builds or improves the model | Generates predictions and responses |

For example, when we provide an LLM with a company leave policy and ask a question, the model is performing **inference**, not training.

The policy becomes part of the request context. It does not permanently update the model's knowledge.

## 4. How does an LLM process text? Tokens and Tokenization

LLMs do not directly process text as humans see it. Text is first converted into numerical representations.

A **token** is a unit of text processed by the model. It can represent:

- A complete word
- Part of a word
- Punctuation
- Whitespace or another text fragment

A **tokenizer** converts text into tokens and maps them to numerical token IDs.

For example, the phrase:

```text
"application deployment failed"
```

might be split into:

```text
["application", " deployment", " failed"]
```

The exact tokenization depends on the model's tokenizer.

### Why use tokens instead of words or characters?

- A word-based vocabulary would struggle with new words, technical terms and identifiers.
- Character-based tokenization would create very long sequences.
- Subword tokenization provides a practical middle ground.

Common approaches include **Byte Pair Encoding (BPE)** and **Unigram Language Model tokenization**.

### What happens after tokenization?

Each token ID is mapped to a numerical vector called a **token embedding**.

These vectors provide the model with numerical representations that can be processed by its neural network.

As information passes through Transformer layers, these representations become context-aware.

**Interview distinction: Token embeddings vs Semantic embeddings**

| Token embeddings | Semantic embeddings |
|---|---|
| Used internally by language models | Commonly used in search and retrieval systems |
| Represent individual input tokens | Represent text such as sentences or documents |
| Help the model process language | Help identify semantically similar content |

We'll explore semantic embeddings in the RAG section.

### Why do token counts matter?

Token counts affect:

- Context window limits.
- API usage and pricing.
- Processing time and computational requirements.
- Maximum input and output sizes.

A common rough estimate is one token per four English characters, but this varies considerably by language, tokenizer and content. Always use the relevant tokenizer when exact counts matter.

## 5. Context Window

The **context window** is the maximum amount of information, measured in tokens, that a model can process for a particular request or generation.

Think of it as the model's working space.

For an enterprise assistant, the context might contain:

```text
System instructions
Conversation history
Retrieved company documents
Tool responses
User's latest question
Generated response
```

The model uses this available context to generate its answer.

### Input and output tokens

Context capacity is not reserved only for the user's question.

It can be consumed by:

- Instructions and conversation history.
- Retrieved documents and tool outputs.
- The user's current question.
- Generated output.

Exact accounting varies by provider and model, especially for multimodal inputs and internal reasoning.

### Does a larger context window always mean better answers?

No.

A larger window allows more information to be supplied, but it does not guarantee that the model will use every piece of information equally well.

For example, supplying six months of application logs to diagnose a failure that occurred ten minutes ago may introduce unnecessary noise.

Good context management involves selecting relevant information rather than simply supplying as much as possible.

Common techniques include:

- Retrieving only relevant documents.
- Summarizing older conversation history.
- Removing duplicate or irrelevant information.
- Splitting large tasks into smaller stages.

## 6. Context vs Weights vs Memory

These three concepts are frequently confused.

| Concept | Meaning | Example |
|---|---|---|
| Model weights | Knowledge and patterns learned during training | General knowledge of programming |
| Context | Information supplied for the current inference | A runbook included in a request |
| Persistent memory | Information stored externally and made available in later interactions | A saved user preference or conversation summary |

An LLM does not automatically remember every previous interaction.

An application can store conversation history and send relevant portions back to the model during subsequent requests.

Therefore, memory is generally an application-level capability built around the model, rather than an automatic property of the model itself.

## 7. Transformer Architecture

Most modern generative LLMs are based on the **Transformer architecture**, introduced in the 2017 research paper *Attention Is All You Need*.

The Transformer enables models to process relationships between tokens using an attention mechanism.

Many popular text-generating LLMs use a **decoder-only Transformer** architecture.

A simplified view:

```text
Input tokens
     ↓
Token embeddings + positional information
     ↓
Transformer blocks
     ├── Self-attention
     ├── Feed-forward network
     ├── Residual connections
     └── Normalization
     ↓
Output scores (logits)
     ↓
Next-token selection
```

### What is Self-Attention?

Self-attention allows the model to determine how much information from other relevant token positions should contribute to the representation of a particular position.

It uses three learned representations:

- **Query (Q):** What information is this token looking for?
- **Key (K):** What information does another token offer for matching?
- **Value (V):** What information can be contributed if that token is relevant?

Query-key comparisons produce attention scores. These scores are normalized into weights, which determine how the value vectors are combined.

For example:

```text
The database connection pool was exhausted.
The checkout API started timing out.
```

Attention helps the model capture relationships between concepts such as `connection pool`, `exhausted` and `timing out`, even when they occur at different positions.

### What are Attention Heads?

Transformers use multiple attention heads to learn different patterns of relationships in parallel.

Their learned behaviours can differ, but we should not assume that each head has one fixed, human-readable responsibility.

### What does the Feed-Forward Network do?

After attention, a feed-forward network applies additional transformations to each token's representation.

Residual connections and normalization help information flow through the deep network and support stable processing.

### What is Causal Attention?

A generative model must not use future tokens when predicting the next token.

**Causal masking** prevents a token position from attending to later positions.

This ensures that generation follows the autoregressive process: the model uses the prompt and the response generated so far to predict the next token.

### What is KV Cache?

During generation, the model repeatedly processes the growing sequence.

A **Key-Value (KV) cache** stores previously calculated key and value representations so they can be reused in subsequent generation steps.

This reduces redundant computation and improves inference efficiency.

## 8. Decoding: How does the model choose the next token?

After processing the input, the model produces a score for every token in its vocabulary. These scores are called **logits**.

A softmax function converts the logits into probabilities.

A decoding strategy determines how the next token is selected from these probabilities.

Two broad approaches are:

- **Greedy decoding:** Always selects the highest-probability token.
- **Sampling:** Selects a token probabilistically from the available distribution.

Temperature, Top-K and Top-P influence sampling behaviour.

### Temperature

Temperature controls how concentrated or distributed the probability distribution becomes.

- **Below 1:** Makes the distribution more concentrated around high-probability tokens.
- **1:** Retains the original probability scale.
- **Above 1:** Makes the distribution flatter, giving lower-probability candidates more opportunity.

Practical example:

- Lower temperature: More consistent responses for structured summaries.
- Higher temperature: More variation when brainstorming ideas.

Temperature changes output behaviour, not the model's underlying knowledge or factual accuracy.

Some providers use temperature `0` to request greedy or nearly deterministic behaviour. Exact reproducibility is not guaranteed across all implementations.

### Top-K Sampling

Top-K restricts the candidate set to the K highest-probability tokens before sampling.

For example, if K = 3, only the three most likely tokens remain eligible.

It uses a fixed candidate count at each generation step.

### Top-P Sampling (Nucleus Sampling)

Top-P retains the smallest group of highest-probability tokens whose cumulative probability reaches a specified threshold.

For example, if P = 0.8:

| Candidate | Probability |
|---|---:|
| A | 0.50 |
| B | 0.20 |
| C | 0.15 |
| D | 0.10 |
| E | 0.05 |

A and B together contribute 0.70, so C is also included to cross the 0.80 threshold.

Unlike Top-K, the number of retained candidates can change at each step.

| Parameter | What it controls |
|---|---|
| Temperature | Probability distribution |
| Top-K | Maximum number of candidates |
| Top-P | Cumulative probability retained |

These parameters interact, and not every provider exposes all of them. Their exact behaviour should be checked against the selected model's API documentation.

## 9. Important Limitations of LLMs

Understanding these limitations is essential when designing real-world AI applications.

**Hallucinations**

An LLM can produce convincing but incorrect information. It generates likely continuations rather than inherently verifying facts.

**Knowledge limitations**

The model's weights do not automatically contain current information, private company documents or live application data.

**Context limitations**

The model can only use information made available to it. Large inputs can also introduce noise or reduce effective use of relevant information.

**Non-deterministic output**

The same input can produce different responses depending on decoding settings and serving implementation.

**No automatic persistent memory**

Information from previous interactions must be stored and made available again if it is needed later.

These limitations are addressed through techniques such as RAG, context engineering, tool calling, validation and application-level controls.

## 10. Quick Interview Revision

| Question | Key point |
|---|---|
| What is an LLM? | A large neural language model that learns patterns and generates tokens. |
| What is autoregressive generation? | Predicting and generating one token at a time using previous tokens. |
| What is the difference between pre-training and post-training? | Learning broad capabilities vs shaping instruction-following behaviour. |
| Training vs inference? | Updating model parameters vs using existing parameters to generate output. |
| What is tokenization? | Converting text into token IDs. |
| What is a context window? | Maximum token capacity available for a model's current processing. |
| Does an LLM remember conversations? | Not automatically; applications can store and resupply conversation history. |
| What is self-attention? | A mechanism for combining information across relevant token positions. |
| What is causal masking? | Prevents a position from attending to future positions during autoregressive generation. |
| What is KV caching? | Reusing previous key-value computations to make generation more efficient. |
| Temperature vs Top-K vs Top-P? | Controls probability distribution vs candidate count vs cumulative probability. |
| Why do LLMs hallucinate? | Likely text generation does not guarantee factual verification. |

---

[Next: Prompt Engineering →](02-prompt-engineering.md)
