# Embeddings and Vector Databases

## 1. What are Embeddings?

An **embedding** is a numerical representation of data, such as text, images or audio, in the form of a vector.

The purpose is to represent the meaning and characteristics of data in a way that allows machines to compare and process it.

For example:

- "How do I reset my password?"
- "I forgot my login credentials."

Although the wording differs, both sentences have similar meanings. An embedding model can convert them into vectors that are close to each other in the embedding space.

```text
Text → Embedding Model → Numerical Vector
```

Unlike keyword search, which primarily matches exact terms, semantic search can identify content based on meaning.

## 2. How do Embeddings Work?

An embedding model is trained to convert input data into vectors that capture useful semantic relationships.

For example:

```text
"Reset password" → [0.21, 0.84, 0.32, ...]
"Forgot credentials" → [0.23, 0.81, 0.35, ...]
"Company holiday policy" → [0.75, 0.12, 0.91, ...]
```

These are illustrative vectors, not actual model outputs.

Semantically similar inputs tend to have vectors that are close under the similarity measure used by the system.

The vectors are not human-readable definitions. Their dimensions collectively represent learned features and relationships.

## 3. Measuring Similarity

Once text is converted into vectors, we need a way to measure how similar two vectors are.

Common similarity measures include:

**Cosine Similarity**

Measures the cosine of the angle between two vectors. It focuses on their direction rather than magnitude.

- Closer to 1: More similar directions.
- Around 0: Little directional similarity.
- Closer to -1: Opposite directions.

**Euclidean Distance**

Measures the straight-line distance between two vectors. A smaller distance indicates closer vectors.

**Dot Product**

Multiplies corresponding vector values and sums the results. Higher values indicate stronger alignment, but the result can also depend on vector magnitude.

The appropriate metric depends on the embedding model and how its vectors are normalized and trained.

## 4. What is a Vector Database?

A **vector database** is a database designed to store, index and retrieve vector embeddings efficiently.

Consider an enterprise application containing thousands of company documents.

Searching every document using keyword matching may miss relevant information when the user's wording differs from the document.

A vector database allows the application to retrieve documents based on semantic similarity.

### Typical workflow

```text
Documents
    ↓
Split into chunks
    ↓
Embedding Model
    ↓
Generate vectors
    ↓
Store vectors + metadata
    ↓
Vector Database
```

When a user asks a question:

```text
User Question
     ↓
Embedding Model
     ↓
Query Vector
     ↓
Similarity Search
     ↓
Relevant Document Chunks
```

The retrieved chunks can then be supplied to an LLM as context. This is one of the foundations of RAG.

## 5. What is Metadata?

Along with vectors, we often store metadata describing the original content.

For example:

```json
{
  "document": "leave-policy.pdf",
  "department": "HR",
  "category": "Leave Policy",
  "page": 12
}
```

Metadata helps filter search results before or during retrieval.

For example, an employee asking about parental leave may only need documents belonging to the HR department and the relevant policy category.

Metadata filtering improves retrieval relevance and can also support access-control decisions. However, authorization must be enforced by the application, not assumed from similarity search alone.

## 6. How does Vector Search Scale?

Searching every vector individually becomes expensive as the dataset grows.

Vector databases therefore use **Approximate Nearest Neighbor (ANN)** techniques to retrieve similar vectors efficiently.

Common indexing approaches include:

- **HNSW (Hierarchical Navigable Small World):** Builds a graph of connections between vectors, allowing efficient navigation toward nearby candidates.
- **IVF (Inverted File Index):** Groups vectors into clusters and searches selected clusters instead of scanning the entire dataset.
- **LSH (Locality-Sensitive Hashing):** Uses hashing techniques designed to place similar vectors into the same or nearby buckets with high probability.

These techniques trade some retrieval accuracy for better search performance, depending on their configuration.

**Exact search** compares against all vectors, while ANN methods aim to find sufficiently good matches faster.

## 7. Popular Vector Database Options

Some commonly used solutions include:

| Technology | Description |
|---|---|
| Pinecone | Managed vector database service |
| Milvus | Open-source vector database |
| Weaviate | Vector database with semantic search capabilities |
| Chroma | Lightweight vector database commonly used in AI applications |
| FAISS | Library for efficient similarity search; not a full database by itself |
| pgvector | Vector similarity search extension for PostgreSQL |

The right choice depends on scale, infrastructure, filtering requirements, operational complexity and cost.

## 8. Quick Interview Revision

| Question | Key point |
|---|---|
| What is an embedding? | Numerical vector representation of data. |
| Why use embeddings? | To represent semantic relationships and enable similarity search. |
| Semantic search vs keyword search? | Meaning-based retrieval vs term-based matching. |
| What is a vector database? | Stores, indexes and retrieves vectors efficiently. |
| What is cosine similarity? | Measures directional similarity between vectors. |
| What is metadata filtering? | Restricts retrieval using associated attributes. |
| What is ANN? | Approximate Nearest Neighbor search for efficient vector retrieval. |
| HNSW vs IVF? | Graph-based navigation vs cluster-based search. |
| Is FAISS a vector database? | Primarily a similarity-search library, not a complete database. |

**Next:** RAG Architecture and Optimization.