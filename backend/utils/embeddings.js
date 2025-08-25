const { pipeline } = require("@xenova/transformers");

let embedder;

async function initEmbedder() {
  if (!embedder) {
    console.log("Loading embedding model...");
    embedder = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
    console.log("✅ Embedder loaded!");
  }
  return embedder;
}

// Convert Tensor → Array
function tensorToArray(tensor) {
  if (tensor.data) return Array.from(tensor.data);
  if (Array.isArray(tensor)) return tensor.flat(Infinity);
  return tensor;
}

// Generate embedding for single text
async function embedText(text) {
  const model = await initEmbedder();
  const result = await model(text, { pooling: "mean", normalize: true });
  return tensorToArray(result);
}

// Batch embedding
async function embedTexts(textArray) {
  const model = await initEmbedder();
  const result = await model(textArray, { pooling: "mean", normalize: true });
  return result.map(tensorToArray);
}

module.exports = { embedText, embedTexts };
