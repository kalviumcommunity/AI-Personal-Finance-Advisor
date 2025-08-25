// testEmbedding.js
const { getEmbedding, getEmbeddingsArray } = require('./models/embeddings');

async function test() {
    const tips = [
        "Cook meals at home instead of eating out.",
        "Track monthly subscriptions and cancel unused ones.",
        "Use cashback apps for groceries and online shopping."
    ];

    const embeddings = await getEmbeddingsArray(tips);
    console.log("Generated embeddings for tips:");
    embeddings.forEach((vec, i) => {
        console.log(`Tip ${i+1} length: ${vec.length}, sample values: ${vec.slice(0,5)}`);
    });

    const userQuery = "I spent $400 on food and $120 on transport this month.";
    const userEmbedding = await getEmbedding(userQuery);
    console.log("\nUser query embedding length:", userEmbedding.length, "sample:", userEmbedding.slice(0,5));
}

test();
