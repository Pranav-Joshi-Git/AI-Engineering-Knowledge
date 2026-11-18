# Model Training and Fine-Tuning

## 1. Traditional ML vs Deep Learning vs Generative AI

These terms represent related but different concepts.

| Concept | Meaning | Example |
|---|---|---|
| Machine Learning | Models learn patterns from data to make predictions | Spam detection |
| Deep Learning | ML using multi-layer neural networks | Image recognition |
| Generative AI | AI that generates new content | Text and image generation |

Deep learning is a subset of machine learning. Generative AI can use deep learning architectures such as Transformers.

## 2. Types of Machine Learning

### A. Supervised Learning

The model learns from labelled training data containing inputs and their expected outputs.

Example: Training a model using emails labelled as spam or not spam.

Common tasks:
- Classification
- Regression

### B. Unsupervised Learning

The model discovers patterns or structures in data without predefined labels.

Example: Grouping customers based on purchasing behaviour.

Common tasks:
- Clustering
- Dimensionality reduction

### C. Reinforcement Learning

An agent learns through interactions with an environment, receiving rewards or penalties based on its actions.

Example: Training an agent to play a game by rewarding successful moves.

## 3. What is Model Training?

**Model training** is the process of adjusting a model's parameters using data so it can learn patterns and perform a task.

Typical process:

1. Collect and prepare training data.
2. Select a model architecture.
3. Feed training examples into the model.
4. Calculate the prediction error using a loss function.
5. Update model parameters using optimization techniques.
6. Evaluate performance using validation and test data.

In neural networks, backpropagation calculates gradients, and optimizers such as Adam update model weights.

## 4. What is Fine-Tuning?

**Fine-tuning** is the process of taking an already pretrained model and training it further on a more specific dataset to adapt its behaviour to a particular task or domain.

Example:

A general-purpose LLM can be fine-tuned using domain-specific customer support conversations to improve its ability to handle support-related tasks.

Benefits:
- Adapts model behaviour to specific tasks.
- Can improve consistency in specialized domains.
- May reduce the need for lengthy instructions in some use cases.

Fine-tuning requires suitable training data and evaluation. It does not automatically make a model more factually accurate.

## 5. Fine-Tuning vs RAG vs Prompt Engineering

This is an important interview distinction.

| Approach | What it changes | Best suited for |
|---|---|---|
| Prompt Engineering | Instructions given to the model | Controlling output and task behaviour |
| RAG | Information supplied to the model at inference time | Accessing external or frequently updated knowledge |
| Fine-Tuning | Model parameters | Adapting behaviour, style or task-specific patterns |

**Example:**

An enterprise assistant needs to answer questions using frequently updated company policies.

- Prompt Engineering: Instruct it to answer clearly and follow a defined format.
- RAG: Retrieve the latest policy documents.
- Fine-Tuning: Adapt the model to a specific response style or recurring task.

These approaches can also be combined.

## 6. What is Transfer Learning?

**Transfer learning** is the process of using knowledge learned by a model on one task or dataset as the starting point for another task.

Fine-tuning a pretrained model is a common application of transfer learning.

Instead of training a model from scratch, developers reuse existing learned representations and adapt them.

## 7. What is LoRA?

**LoRA (Low-Rank Adaptation)** is a parameter-efficient fine-tuning technique.

Instead of updating all the original model weights, LoRA introduces small trainable matrices into selected model layers while keeping the original weights frozen.

Benefits:
- Fewer trainable parameters.
- Lower memory requirements.
- Reduced training cost.
- Easier storage and switching of task-specific adaptations.

LoRA is particularly useful when adapting large language models with limited computing resources.

## 8. What is Quantization?

**Quantization** reduces the numerical precision used to represent model weights and sometimes activations.

For example, a model may use 16-bit floating-point weights instead of 32-bit floating-point weights, or lower-bit representations such as 8-bit or 4-bit.

Benefits:
- Lower memory consumption.
- Reduced storage requirements.
- Potentially faster inference.
- Enables deployment on more resource-constrained hardware.

Trade-off: Aggressive quantization can reduce model quality or accuracy.

## 9. Quick Interview Revision

| Question | Key point |
|---|---|
| ML vs DL? | DL uses multi-layer neural networks and is a subset of ML. |
| What is Generative AI? | AI that generates new content. |
| What is supervised learning? | Learning from labelled data. |
| What is unsupervised learning? | Finding patterns without predefined labels. |
| What is reinforcement learning? | Learning through actions and rewards. |
| What is fine-tuning? | Further training a pretrained model for a specific purpose. |
| RAG vs fine-tuning? | External knowledge at inference vs adapting model parameters. |
| What is transfer learning? | Reusing knowledge learned from another task. |
| What is LoRA? | Parameter-efficient fine-tuning using low-rank trainable matrices. |
| What is quantization? | Reducing numerical precision to optimize model size and inference. |