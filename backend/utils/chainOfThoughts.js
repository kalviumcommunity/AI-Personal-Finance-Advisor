// backend/prompts/chainOfThought.js
const VectorIndex = require("../models/vectorIndex");
const { embedText } = require("./embeddings");
const { cosineSimilarity } = require("./similarity");

/**
 * Chain of Thought Prompt
 * Generates an explanation step-by-step using stored tips or knowledge.
 * @param {string} query - The user question
 * @param {VectorIndex} vectorIndex - Your vector index containing tips or docs
 */
async function chainOfThoughtPrompt(query, vectorIndex) {
  // Step 1: Find top-3 relevant tips
  const topTips = await vectorIndex.search(query, 3);

  // Step 2: Build a step-by-step reasoning prompt
  let reasoning = `Let's reason step by step to answer the question: "${query}"\n\n`;
  reasoning += "Here are some useful tips:\n";

  topTips.forEach((tip, idx) => {
    reasoning += `${idx + 1}. ${tip.text} (Similarity Score: ${tip.score.toFixed(2)})\n`;
  });

  reasoning += "\nBased on the above tips, the detailed answer is:";

  // Step 3: Optionally, you can call an LLM here to continue the CoT reasoning
  // For now, we return the reasoning text as a placeholder
  return reasoning;
}

module.exports = { chainOfThoughtPrompt };
