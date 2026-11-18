# LLM Fundamentals

You are supporting a production system. A deployment finished twenty minutes ago, the checkout API is timing out and several pages of logs have arrived in the incident channel. You give the logs to an AI assistant and ask:

> Explain the likely failure and draft a short status update. Do not claim anything that the logs do not support.

A few seconds later, it produces a clear explanation. It can feel as though the assistant read the incident, understood the system and wrote the answer in one step. Underneath, the process is much more mechanical: text becomes tokens, tokens enter a limited context window, Transformer layers process their relationships and a decoding method selects the output one token at a time.

This page follows that path. The goal is not to learn the mathematics of model training. It is to build a dependable mental model for engineering with LLMs.

## Begin with the one thing the model does repeatedly

A **language model** estimates how likely different continuations are for a sequence. If a status update begins with:

> Checkout errors increased immediately after...

the model may consider `deployment` more likely than `lunch`. It does not choose an entire response at once. It selects a next token, adds it to the sequence and calculates the next set of possibilities. Generation continues until it reaches a stopping condition.

```text
input → predict one token → append it → predict another token → ... → stop
```

This is **autoregressive generation**. It is the basic generation pattern behind many modern LLMs.

A modern generative **large language model**, or LLM, is typically a neural network from the Transformer family, trained at a large scale. "Large" has no official threshold. It may refer to the number of learned parameters, the amount of training data, the training computation or a combination of them.

Predicting the next token may sound like sophisticated autocomplete, but doing it well across books, code, documentation and conversations requires the model to learn a wide range of patterns. Those patterns include language structure, associations between concepts, common forms of reasoning and conventions used in software. This allows one model to perform many tasks without a separate hard-coded workflow for each task.

There is an important limit hidden in that description: the model generates a likely continuation. It does not automatically prove that the continuation is true. Fluent language and verified information are different properties.

## What training contributes—and what it does not

During **pre-training**, a model processes a large dataset and repeatedly practises a prediction objective. Each error is used to adjust millions or billions of numerical values called **parameters** or **weights**. Over many training steps, the weights encode useful statistical patterns from the training data.

Pre-training usually creates a base model that can continue text but may not reliably behave like an assistant. **Post-training** then shapes its behaviour. Depending on the model, this may use examples of good responses, preference comparisons, reinforcement-learning techniques, safety training and other methods. The result is better at following instructions and producing responses people find useful.

This gives us two very different sources of information:

- **Weights** contain patterns acquired during training. They are not a searchable collection of the original documents.
- **Context** contains the information supplied for the request being processed now.

The incident logs belong in the second category. The model was not trained on a production failure that happened twenty minutes ago. Even if it learned general facts about timeouts and connection pools, the actual evidence must come from the current incident data.

Training and inference are also different operations. Training changes the weights and is computationally expensive. **Inference** uses the existing weights to process an input and generate an output. Pasting a runbook into a prompt normally provides temporary context; it does not teach the model permanently or update its weights.

### An LLM is not the whole assistant

The model performs inference. The surrounding software decides which instructions, messages, files and tool results to give it. That software may also authenticate users, search documents, call monitoring APIs, save conversation history and validate the response.

This distinction explains why two products using the same underlying model can behave differently. They may construct different context, expose different tools or apply different controls. It also explains why saying "the LLM remembers the conversation" is often imprecise: a product may store the conversation and supply it again when the next model call is made.

## The request is broken into tokens

Models operate on numerical inputs, not directly on the characters shown in an editor. A **tokenizer** converts text into units called **tokens** and maps each token to an integer from a fixed vocabulary.

Tokens do not line up neatly with words. A token can represent a word, part of a word, punctuation, whitespace or another text fragment. The exact split depends on the tokenizer.

For illustration, a tokenizer might split a log message like this:

```text
"paymentService timed out"

→ ["payment", "Service", " timed", " out"]
→ [token IDs]
```

That split is conceptual; a real tokenizer may produce different pieces.

### Why not use words or characters?

A vocabulary containing every possible word would grow without limit. It would still struggle with new library names, identifiers, spelling mistakes and domain-specific terms. A character-only vocabulary avoids unknown words, but turns normal sentences into long sequences and increases the work the model must perform.

Subword tokenization sits between those extremes. Frequent text can use larger pieces, while unfamiliar text can be assembled from smaller ones. Byte Pair Encoding and unigram language-model tokenization are common approaches, although model providers choose different vocabularies and implementations.

Each token ID is then mapped to a learned vector called an **embedding**. The embedding gives the Transformer a numerical starting representation for that token. The representation will change as it passes through the model and absorbs information from the surrounding context.

Search systems also use embeddings, but usually with a different objective: representing a passage or item so that semantically related items can be found. That use is explained in [Embeddings and Vector Databases](../02-embeddings-and-rag/embeddings-and-vector-databases.md).

### Tokens become an engineering unit

Token counts affect the system in several ways:

- Model input and output limits are expressed in tokens.
- Hosted services commonly measure usage and pricing in tokens.
- A longer input generally needs more computation.
- A longer output requires more sequential generation steps.
- Operations involving exact characters can behave unexpectedly when token boundaries differ from character boundaries.

Rules such as "one token is about four characters" are only rough estimates for some tokenizers and languages. Source code, identifiers, tables, non-English languages and even whitespace can change the count. When a real limit or cost depends on it, use the counting method published for the selected model.

## The context window defines the active working set

After tokenization, the request becomes part of the model's **context**: the sequence of information available for the current generation.

For the incident assistant, the active context could contain:

```text
assistant instructions
previous incident conversation
deployment details
selected log entries
service topology returned by a tool
the engineer's question
the answer generated so far
```

The **context window** is the maximum token capacity available to the model for this work. Input and generated output usually consume that capacity together, although providers expose input, output and reasoning limits in different ways. Images, audio, tool results or internal reasoning may also contribute for models that support them.

### Capacity is not the same as useful attention

A large context window allows an application to send more material. It does not guarantee that every token will influence the answer equally or that adding material will improve the result.

Imagine supplying six months of logs to diagnose a twenty-minute incident. The relevant error may technically fit, but it now competes with a large amount of noise. Long-context research has also found that model performance can change depending on where relevant information appears within a long input.

Good context design is selective. For this incident, the application might include logs from the affected services around the deployment time, the relevant configuration change and a small portion of the runbook. It should leave unrelated logs outside the request.

When the available material is too large, an application can:

- retrieve only the passages relevant to the question;
- summarize older conversation turns;
- remove repeated tool output;
- divide a large task into smaller stages;
- reserve enough capacity for the required answer.

If the limit is exceeded, behaviour depends on the system: the request may fail, input may be truncated or older content may be compacted. Silent removal is particularly risky because the model cannot use information it never receives.

### Context is temporary; memory requires storage

Context exists for the inference being performed. Persistent memory requires another component to store information and later place the useful part back into context. Some APIs manage conversation state on the caller's behalf, while others require the application to send the history explicitly.

The mechanism matters less than the boundary: storage can preserve information between calls, but the model can use only the information made available during the present generation. [Instructions, Context and Memory](../04-context-engineering/instructions-context-and-memory.md) develops this distinction further.

## The Transformer makes each token context-aware

Token embeddings by themselves do not contain the meaning of the whole request. The word `pool`, for example, could refer to a connection pool, a thread pool or a swimming pool. The surrounding tokens determine which interpretation is useful.

Transformers build context-aware representations by passing the sequence through a stack of processing blocks. The original Transformer, introduced in 2017, used an encoder and a decoder for tasks such as translation. Many text-generating LLMs use a **decoder-only** design derived from the same ideas.

Each block contains an attention mechanism and a feed-forward network, along with residual connections and normalization. Stacking many blocks lets the model repeatedly refine what each position represents.

### The sequence needs position information

The same tokens in a different order can express a different event:

```text
restart followed the failure
failure followed the restart
```

Self-attention alone does not establish token order, so a Transformer includes positional information. Implementations vary—there is no single positional technique used by every LLM—but each gives the model a way to distinguish where tokens occur in the sequence.

### Attention moves relevant information between positions

**Self-attention** lets a position combine information from other relevant positions. It is calculated using learned query, key and value representations:

- The **query** represents what a position is looking for.
- A **key** represents how another position can be matched.
- A **value** contains information that can be passed along when that match is important.

Query-key comparisons produce attention weights. Those weights control how values are combined into an updated representation.

Consider these two log lines:

```text
10:42 deployment changed the database pool limit from 80 to 8
10:44 checkout requests began waiting for database connections
```

While producing an incident explanation, attention can help the model connect `pool limit`, `8`, `waiting` and `database connections`, even though the terms occur at different positions. The model learned how to form such connections during training; an engineer did not encode this specific relationship as a rule.

This does not mean an attention weight is a proof of causation. The logs show a strong clue, but production diagnosis may still require metrics, traces or an experiment.

### Causal attention prevents looking ahead

A generating model must not use output that has not been generated. **Causal masking** ensures that each position can attend only to itself and earlier positions, not later output positions. During inference, the model therefore uses the prompt and the response prefix to predict the next token.

This constraint makes generation sequential. The model cannot finalize token 100 before tokens 1 through 99 exist. Implementations commonly use a **key-value cache** to reuse attention information from earlier tokens, avoiding unnecessary recalculation, but new output tokens are still produced in order.

### Multiple heads, then further processing

Transformers calculate several attention patterns in parallel through **multiple attention heads**. Different heads can contribute different relationships or representations, but their roles are learned and distributed; it is usually misleading to claim that a particular head has one permanent human-readable job.

After attention, a feed-forward network transforms each position independently. Residual connections preserve useful earlier information, while normalization helps keep processing stable across a deep stack of blocks.

The final layer produces a score for every token in the vocabulary. These scores are called **logits**. Logits are not yet the answer—they are the raw material for choosing the next token.

## Decoding turns scores into a choice

A softmax operation converts logits into a probability distribution. Suppose the model is writing:

> The immediate trigger was likely the database pool...

It could produce this illustrative distribution:

| Candidate | Probability |
|---|---:|
| ` reduction` | 0.58 |
| ` change` | 0.24 |
| ` setting` | 0.10 |
| ` failure` | 0.05 |
| other tokens | 0.03 |

A **decoding strategy** decides how to select from that distribution. Always taking the highest-probability token is called greedy decoding. Sampling introduces controlled randomness by drawing from the distribution. Temperature, Top-K and Top-P change how that sampling behaves.

## Temperature controls how strongly probabilities are separated

**Temperature** rescales the logits before softmax.

- Below `1`, differences are amplified. The distribution becomes more concentrated around high-scoring tokens.
- At `1`, the original scale is retained.
- Above `1`, differences are reduced. More candidates receive a meaningful chance of selection.

This affects variation, not knowledge. A low temperature may make repeated incident summaries more consistent, but it cannot make an unsupported diagnosis become true. A high temperature can be useful when exploring several possible user-facing messages, but it also permits less likely continuations.

Some APIs accept a value of `0` as a request for greedy or nearly greedy behaviour. That is a provider convention; mathematically, the normal temperature calculation does not divide logits by zero.

Output may still vary at low settings because platforms, model implementations and serving infrastructure do not all make the same determinism guarantees. Treat reproducibility as something to test with the chosen service, not as an automatic result of setting temperature to zero.

## Top-K and Top-P restrict the candidate set

Temperature changes the distribution. **Top-K** and **Top-P** remove candidates before sampling and then normalize the remaining probabilities.

### Top-K uses a fixed count

With Top-K, only the `K` highest-probability tokens remain eligible. If `K` is `3` in the example above, the candidate set contains `reduction`, `change` and `setting`, regardless of how confident the distribution is.

A small K reduces unusual continuations. The limitation is that one fixed count is used both when the model is highly confident and when several alternatives are genuinely plausible.

### Top-P uses cumulative probability

Top-P is also called **nucleus sampling**. Tokens are sorted from most to least probable, and the smallest group whose probabilities reach at least `P` is retained.

If `P` is `0.8` in the example, `reduction` contributes `0.58`; adding `change` brings the total to `0.82`. Those two tokens form the nucleus. On a more uncertain step, many tokens might be required to reach the same threshold.

This makes Top-P adaptive: the candidate count shrinks when probability is concentrated and expands when probability is spread out.

| Setting | Changes | Candidate-set behaviour |
|---|---|---|
| Temperature | Relative probability | Does not directly set a candidate count. |
| Top-K | Maximum candidate count | Fixed for each generation step. |
| Top-P | Probability mass retained | Candidate count changes by step. |

These controls interact, so tuning several simultaneously can make results difficult to explain. Evaluate them using representative inputs and a quality measure that matches the task.

Not every hosted model exposes every setting. Supported controls, ranges and behaviour can vary by provider, model and API version. That is an integration detail to verify rather than a universal property of LLMs.

## Trace the incident request from beginning to end

The complete request now looks less mysterious:

1. The incident application gathers authorized instructions, selected logs, deployment information and the engineer's question.
2. A tokenizer converts that content to token IDs. The application ensures the request and expected answer fit within the model's limits.
3. Token and positional representations pass through Transformer blocks.
4. Causal self-attention lets each output position use the prompt and the response written so far.
5. The final layer produces logits for the next token.
6. The decoding configuration selects a token using the available sampling controls.
7. Steps 4 through 6 repeat until the model stops.
8. The surrounding application may validate the format, attach links to evidence and deliver the response.

The model is central to this flow, but it is not responsible for every step. Access control, log collection, tool execution, evidence links and persistent incident history belong to the application around it.

## The practical consequences of this design

Several behaviours that otherwise seem surprising follow directly from the mechanism:

- **Plausible is not necessarily correct.** Generation optimizes a learned continuation, not a fact-checking operation.
- **Current information must be supplied.** Recent logs, private documents and live system state are not guaranteed to exist in the weights.
- **Context quality matters.** A large amount of irrelevant input can be less useful than a small amount of well-selected evidence.
- **Memory is engineered around the model.** Stored history becomes useful only when the system retrieves and supplies it.
- **Output can vary.** Sampling and implementation details can lead to different valid continuations for the same request.
- **Decoding cannot repair missing evidence.** Temperature or Top-P may change phrasing, but they cannot recover a log line that was never included.

These limits do not make LLMs impractical. They tell us what the surrounding system must provide: reliable context, appropriate controls, validation and clear boundaries between generated language and authoritative data.

The next topic moves from how the model generates text to how we communicate a task clearly: [Prompt Engineering](prompt-engineering.md).

## References

- Vaswani et al., [*Attention Is All You Need*](https://arxiv.org/abs/1706.03762) (2017).
- Ouyang et al., [*Training Language Models to Follow Instructions with Human Feedback*](https://arxiv.org/abs/2203.02155) (2022).
- Holtzman et al., [*The Curious Case of Neural Text Degeneration*](https://arxiv.org/abs/1904.09751) (2020).
- Liu et al., [*Lost in the Middle: How Language Models Use Long Contexts*](https://arxiv.org/abs/2307.03172) (2023).
- Google AI for Developers, [Understand and Count Tokens](https://ai.google.dev/gemini-api/docs/tokens).
- Hugging Face Transformers, [Text Generation](https://huggingface.co/docs/transformers/main_classes/text_generation).
