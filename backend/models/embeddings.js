const { pipeline } = require('@xenova/transformers');

let embedder;

async function initEmbedder() {
    if (!embedder) {
        console.log("Loading embedding model...");
        embedder = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
        console.log("Embedder loaded!");
    }
}

// Convert the Tensor to a plain array
function tensorToArray(tensor) {
    if (tensor.data) return Array.from(tensor.data);
    return tensor; // fallback
}

// Generate embedding for a single text
async function getEmbedding(text) {
    await initEmbedder();
    const result = await embedder(text); // returns Tensor
    return tensorToArray(result[0][0]);  // take first token embedding
}

// Generate embeddings for an array of texts
async function getEmbeddingsArray(textArray) {
    const embeddings = [];
    for (const text of textArray) {
        const vector = await getEmbedding(text);
        embeddings.push(vector);
    }
    return embeddings;
}

module.exports = { getEmbedding, getEmbeddingsArray };
