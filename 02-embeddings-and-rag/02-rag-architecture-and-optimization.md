# RAG Architecture and Optimization

## 1. What is RAG?

**RAG (Retrieval-Augmented Generation)** is a technique that combines information retrieval with LLM generation.

Instead of relying only on knowledge learned during training, an LLM retrieves relevant information from an external knowledge source and uses it to generate its response.

For example, consider an employee asking:

> What is our company's remote work policy for international employees?

The answer may exist in internal company documents, but the LLM may not know those private policies.

RAG retrieves the relevant policy and supplies it to the LLM as context.

## 2. Why do we need RAG?

LLMs have some important limitations:

- Their training knowledge may be outdated.
- They don't automatically know private enterprise information.
- They can hallucinate when information is missing.
- Fine-tuning is not always practical for frequently changing information.

RAG addresses these problems by providing relevant external information at inference time.

**Important:** RAG can reduce hallucinations by grounding responses in retrieved evidence, but it does not eliminate them.

## 3. RAG Architecture: Two Main Phases

RAG generally involves two phases: **Indexing** and **Retrieval & Generation**.

### A. Indexing Phase (Preparation)

Before users ask questions, documents are prepared and indexed.

```text
Documents
    ↓
Document Extraction
    ↓
Chunking
    ↓
Embedding Model
    ↓
Vector Database
```

1. **Document extraction:** Extract text from PDFs, Word files, web pages and other sources.
2. **Chunking:** Divide large documents into smaller meaningful sections.
3. **Embedding:** Convert each chunk into a numerical vector.
4. **Storage:** Store vectors alongside the original text and metadata.

This preparation is generally performed before the retrieval request.

### B. Retrieval and Generation Phase

When a user asks a question:

```text
User Question
      ↓
Generate Query Embedding
      ↓
Retrieve Relevant Chunks
      ↓
Build Prompt with Retrieved Context
      ↓
Large Language Model
      ↓
Generated Answer
```

1. Convert the user's question into an embedding.
2. Search the vector database for relevant chunks.
3. Retrieve the original text and associated metadata.
4. Supply the retrieved information along with instructions and the question to the LLM.
5. Generate a response grounded in the supplied context.

## 4. What is Chunking?

Chunking means dividing large documents into smaller pieces before generating embeddings.

For example, a 100-page HR policy document can be divided into multiple chunks, each containing a section or a group of paragraphs.

Why is it necessary?

- Embedding models have input limits.
- Smaller sections make retrieval more focused.
- The LLM receives relevant passages instead of entire documents.
- It helps control context-window usage.

### Chunk Size and Overlap

- **Small chunks:** More precise retrieval, but may lose surrounding context.
- **Large chunks:** Preserve more context, but may introduce irrelevant information.
- **Overlap:** Repeats some content between adjacent chunks to avoid losing information at boundaries.

There is no universally optimal chunk size. It depends on document structure, query types and the embedding model.

## 5. Retrieval Techniques

### Dense Retrieval

Uses embeddings and vector similarity to retrieve semantically related content.

Example: Searching for "forgot login credentials" can retrieve a document titled "Password Reset Procedure".

### Sparse Retrieval

Uses keyword-based techniques such as BM25 to identify documents based on matching terms.

This can work particularly well for exact names, product IDs, error codes and technical identifiers.

### Hybrid Search

Combines dense and sparse retrieval.

For example, an enterprise assistant may use semantic similarity to understand the question while also matching an exact application error code.

Hybrid search can improve retrieval when queries contain both conceptual language and specific keywords.

## 6. RAG Optimization Techniques

Retrieving documents is not enough. The quality of retrieved information directly affects the generated response.

Common optimization techniques include:

| Technique | Purpose |
|---|---|
| Metadata filtering | Restricts results by department, category, date or permissions. |
| Hybrid search | Combines semantic and keyword retrieval. |
| Reranking | Reorders retrieved chunks based on their relevance to the query. |
| Query rewriting | Reformulates unclear questions to improve retrieval. |
| Caching | Reuses suitable previous results to reduce latency and cost. |
| Better chunking | Improves the relevance and completeness of retrieved content. |

### What is Reranking?

A retrieval system may initially return the top 20 chunks based on vector similarity.

A **reranker** evaluates the relationship between the query and each retrieved chunk more closely and reorders them.

The application can then send only the best few chunks to the LLM.

This helps improve relevance without requiring the initial search to be extremely expensive.

## 7. RAG vs Fine-Tuning

These approaches solve different problems.

| RAG | Fine-Tuning |
|---|---|
| Retrieves external information at inference time | Trains a model further using additional data |
| Useful for private and frequently changing information | Useful for adapting behaviour, style or specialized task performance |
| Knowledge is supplied through context | Model parameters are updated |
| Source documents can be updated without retraining the model | Changes generally require another training process |

Example:

- A company frequently updates its leave policy → RAG is a suitable approach.
- A company wants a model to consistently follow a specialized classification format → Fine-tuning may help.

They are not mutually exclusive. An application can use both.

## 8. Challenges and Limitations of RAG

- **Poor retrieval:** Relevant information may not be retrieved.
- **Bad chunking:** Important context may be separated or lost.
- **Outdated documents:** Retrieval can return obsolete information.
- **Access control:** Users must only retrieve documents they are authorized to access.
- **Context overload:** Too many retrieved chunks can introduce noise.
- **Hallucinations:** The LLM may still misinterpret or go beyond the retrieved evidence.

RAG quality depends on the entire pipeline, not just the LLM or vector database.

## 9. Quick Interview Revision

| Question | Key point |
|---|---|
| What is RAG? | Retrieves external information and supplies it to an LLM for generation. |
| Why do we need RAG? | To use private, current and domain-specific information. |
| What are the two main RAG phases? | Indexing and retrieval/generation. |
| Why is chunking needed? | To divide documents into manageable, retrievable sections. |
| What is hybrid search? | Combining semantic vector search and keyword search. |
| What is reranking? | Reordering retrieved results based on relevance. |
| RAG vs fine-tuning? | External knowledge retrieval vs updating model parameters. |
| Does RAG eliminate hallucinations? | No, it reduces risk by grounding answers in retrieved evidence. |

**Next:** AI Agents and Agentic Systems.