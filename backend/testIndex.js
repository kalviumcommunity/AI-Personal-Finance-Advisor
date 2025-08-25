(async () => {
  const VectorIndex = require("./models/vectorIndex");
  const index = new VectorIndex("cosine"); // cosine | dot | l2

  // Add some docs
  await index.add(1, "I love pizza with cheese");
  await index.add(2, "The sky is blue and beautiful");
  await index.add(3, "Artificial Intelligence is amazing");

  // Query
  const results = await index.search("AI and machine learning", 2);
  console.log(results);
})();
