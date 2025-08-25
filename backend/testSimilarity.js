const { getEmbedding } = require('./models/embeddings');
const { cosineSimilarity } = require('./models/similarity');

async function testCosine() {
    const text1 = "Save 20% of income";
    const text2 = "Cut unnecessary expenses";

    const emb1 = await getEmbedding(text1);
    const emb2 = await getEmbedding(text2);

    const similarity = cosineSimilarity(emb1, emb2);
    console.log("Cosine similarity:", similarity);
}

testCosine();
