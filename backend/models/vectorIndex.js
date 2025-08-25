// vectorIndex.js
const { embedText } = require("../utils/embeddings");  
const { cosineSimilarity, dotProduct, l2Distance } = require("../utils/similarity");

class VectorIndex {
  constructor(metric = "cosine") {
    this.index = []; // store { id, text, vector }
    this.metric = metric; // default similarity metric = cosine
  }

  // Add a new document to index
  async add(id, text) {
    const vector = await embedText(text); // create embedding
    this.index.push({ id, text, vector });
  }

  // Internal: choose similarity function
  _getScore(vecA, vecB) {
    switch (this.metric) {
      case "dot":
        return dotProduct(vecA, vecB);
      case "l2":
        return -l2Distance(vecA, vecB); // smaller = better, so negate
      default:
        return cosineSimilarity(vecA, vecB);
    }
  }

  // Search top-K most similar
  async search(query, topK = 3) {
    const queryVec = await embedText(query);

    // Calculate similarity score for each stored doc
    const results = this.index.map(item => ({
      id: item.id,
      text: item.text,
      score: this._getScore(queryVec, item.vector),
    }));

    // Sort by score (high → low)
    results.sort((a, b) => b.score - a.score);

    return results.slice(0, topK);
  }
}

module.exports = VectorIndex;
