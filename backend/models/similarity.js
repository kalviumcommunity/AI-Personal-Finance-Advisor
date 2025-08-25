
// Cosine similarity between two vectors
function cosineSimilarity(vecA, vecB) {
    if (vecA.length !== vecB.length) {
        throw new Error("Vectors must be the same length");
    }

    let dot = 0;
    let normA = 0;
    let normB = 0;

    for (let i = 0; i < vecA.length; i++) {
        dot += vecA[i] * vecB[i];
        normA += vecA[i] * vecA[i];
        normB += vecB[i] * vecB[i];
    }

    if (normA === 0 || normB === 0) return 0;

    return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

// Dot product
function dotProduct(a, b) {
  let dot = 0.0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
  }
  return dot;
}
// L2 (Euclidean) distance
function l2Distance(a, b) {
  let sum = 0.0;
  for (let i = 0; i < a.length; i++) {
    sum += Math.pow(a[i] - b[i], 2);
  }
  return Math.sqrt(sum);
}

module.exports = { cosineSimilarity, dotProduct, l2Distance };

