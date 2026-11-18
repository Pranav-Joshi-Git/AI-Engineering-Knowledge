# Evaluation and Production of AI Systems

## 1. Why is AI Evaluation Important?

**AI evaluation** is the process of measuring how effectively an AI system performs its intended tasks.

A model producing a convincing response does not necessarily mean the response is correct or useful.

Evaluation helps determine whether the system is accurate, reliable, safe and suitable for production.

## 2. How Do We Evaluate LLMs?

Common evaluation dimensions include:

| Dimension | What it measures |
|---|---|
| Accuracy | Whether the response is factually correct |
| Relevance | Whether the response addresses the question |
| Faithfulness | Whether the response is supported by the provided context |
| Coherence | Whether the response is logically structured |
| Safety | Whether the response avoids harmful or restricted content |
| Latency | How long the system takes to respond |
| Cost | Resources consumed per request |

Evaluation methods include:

- **Human evaluation:** Domain experts review generated responses.
- **Automated evaluation:** Metrics or evaluation models assess outputs.
- **Benchmarking:** Models are tested against standardized datasets.
- **LLM-as-a-Judge:** Another LLM evaluates a generated response against defined criteria.

LLM-based evaluation is useful for scaling assessments, but it can also introduce evaluator bias and should be validated.

## 3. How Do We Evaluate RAG Systems?

RAG evaluation requires measuring both retrieval quality and answer quality.

### Retrieval Evaluation

Measures whether the system retrieves the correct information.

Common metrics:

- **Precision@K:** How many of the top K retrieved results are relevant?
- **Recall@K:** How many of the relevant documents were retrieved within the top K results.
- **MRR (Mean Reciprocal Rank):** Measures how highly the first relevant result appears.

### Generation Evaluation

Measures the quality of the answer generated using retrieved context.

Important dimensions:
- Faithfulness: Is the answer supported by retrieved information?
- Answer relevance: Does it address the user's question?
- Correctness: Is the answer factually accurate?

**Important:** A RAG system can fail because of poor retrieval even when the LLM generates a well-written answer.

## 4. What is AI Observability?

**AI observability** is the ability to monitor and understand the behaviour and performance of an AI application in production.

Useful information to monitor includes:

- User inputs and model outputs, subject to privacy controls.
- Model and prompt versions.
- Retrieved documents and retrieval scores.
- Tool calls and execution results.
- Errors and failed requests.
- Token consumption and cost.
- Response latency.

Observability helps developers investigate failures, identify performance issues and improve the system.

## 5. Important Production Metrics

| Metric | Meaning |
|---|---|
| Latency | Time taken to process a request |
| Throughput | Number of requests processed per unit of time |
| Error Rate | Percentage of requests that fail |
| Token Usage | Number of input and output tokens consumed |
| Cost per Request | Average cost of processing a request |
| Availability | Percentage of time the service is operational |

For example, an AI assistant may produce accurate responses but still be unsuitable for production if its latency or cost is too high.

## 6. How Do We Optimize AI Applications?

Common optimization techniques include:

- **Prompt optimization:** Remove unnecessary instructions and context.
- **Model selection:** Choose a model appropriate for the task and budget.
- **Caching:** Reuse results for repeated requests where safe.
- **RAG optimization:** Improve chunking, retrieval and reranking.
- **Token optimization:** Reduce unnecessary input and output tokens.
- **Parallel execution:** Execute independent tool calls simultaneously.
- **Model routing:** Use smaller models for simpler tasks and stronger models for complex tasks.

Optimization should balance quality, latency and cost rather than maximizing only one metric.

## 7. What is Model Routing?

**Model routing** is the process of selecting an appropriate model based on the complexity or requirements of a request.

Example:

- Simple classification → Smaller, faster model.
- Complex reasoning → More capable model.
- Specialized task → Domain-specific model.

This can reduce cost and latency while maintaining acceptable response quality.

## 8. Open-Source vs Proprietary Models

| Open-Weight Models | Proprietary Models |
|---|---|
| Model weights are available for use | Weights are generally not publicly available |
| Can often be self-hosted and customized | Commonly accessed through managed APIs |
| Greater deployment control | Less infrastructure management |
| Hosting and maintenance are the user's responsibility | Provider manages much of the infrastructure |
| Examples: Llama, Qwen | Examples: GPT, Claude |

**Important:** Open-weight does not always mean fully open-source. Licensing, training data and other components may not be publicly available.

## 9. What is CI/CD for AI Applications?

AI applications also require disciplined development and deployment practices.

A typical pipeline includes:

1. Code and configuration changes.
2. Automated unit and integration tests.
3. Prompt and model evaluation.
4. Security and quality checks.
5. Deployment to staging.
6. Production rollout.
7. Continuous monitoring and feedback.

For AI systems, testing should cover not only application code but also model behaviour, retrieval quality, tool execution and safety.

## 10. Quick Interview Revision

| Question | Key point |
|---|---|
| Why evaluate LLMs? | To measure accuracy, relevance, reliability and safety. |
| What is LLM-as-a-Judge? | Using another LLM to evaluate generated responses. |
| How do you evaluate RAG? | Measure retrieval quality and answer quality separately. |
| What is Precision@K? | Fraction of top K retrieved results that are relevant. |
| What is Recall@K? | Fraction of relevant results retrieved within top K. |
| What is AI observability? | Monitoring and understanding AI system behaviour in production. |
| Latency vs throughput? | Time per request vs requests processed per unit time. |
| What is model routing? | Selecting models based on task requirements. |
| Open-weight vs proprietary? | Accessible model weights vs provider-controlled model weights. |
| What is AI CI/CD? | Automated testing, evaluation, deployment and monitoring of AI applications. |