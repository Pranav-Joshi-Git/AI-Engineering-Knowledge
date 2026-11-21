import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'AI Engineering Knowledge',
  description:
    'A practical knowledge base on LLMs, RAG, agents, MCP, context engineering and AI engineering.',
  lang: 'en',
  cleanUrls: true,
  lastUpdated: true,

  // The root README is the home page. The handover file is internal and is not published.
  rewrites: { 'README.md': 'index.md' },
  srcExclude: ['PROJECT-HANDOVER.md'],

  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'LLM Fundamentals', link: '/01-llm-fundamentals/01-llm-fundamentals' },
      { text: 'RAG', link: '/02-embeddings-and-rag/01-embeddings-and-vector-databases' },
      { text: 'Agents', link: '/03-ai-agents/01-ai-agents-and-agentic-systems' },
    ],

    sidebar: [
      {
        text: '1. LLM Fundamentals',
        items: [
          { text: 'LLM Fundamentals', link: '/01-llm-fundamentals/01-llm-fundamentals' },
          { text: 'Prompt Engineering', link: '/01-llm-fundamentals/02-prompt-engineering' },
        ],
      },
      {
        text: '2. Embeddings and RAG',
        items: [
          { text: 'Embeddings and Vector Databases', link: '/02-embeddings-and-rag/01-embeddings-and-vector-databases' },
          { text: 'RAG Architecture and Optimization', link: '/02-embeddings-and-rag/02-rag-architecture-and-optimization' },
        ],
      },
      {
        text: '3. AI Agents',
        items: [
          { text: 'AI Agents and Agentic Systems', link: '/03-ai-agents/01-ai-agents-and-agentic-systems' },
          { text: 'Tools and Function Calling', link: '/03-ai-agents/02-tools-and-function-calling' },
          { text: 'Model Context Protocol (MCP)', link: '/03-ai-agents/03-mcp' },
          { text: 'Agent Orchestration', link: '/03-ai-agents/04-agent-orchestration' },
        ],
      },
      {
        text: '4. Context Engineering',
        items: [
          { text: 'Instructions, Context and Memory', link: '/04-context-engineering/01-instructions-context-and-memory' },
          { text: 'Skills and Sub-Agents', link: '/04-context-engineering/02-skills-and-sub-agents' },
        ],
      },
      {
        text: '5. AI Security and Reliability',
        items: [
          { text: 'AI Security and Reliability', link: '/05-ai-security-and-reliability/01-ai-security-and-reliability' },
        ],
      },
      {
        text: '6. AI Engineering',
        items: [
          { text: 'Model Training and Fine-Tuning', link: '/06-ai-engineering/01-model-training-and-fine-tuning' },
          { text: 'Evaluation and Production', link: '/06-ai-engineering/02-evaluation-and-production' },
        ],
      },
    ],

    search: { provider: 'local' },
    outline: { level: [2, 3] },
  },
})
