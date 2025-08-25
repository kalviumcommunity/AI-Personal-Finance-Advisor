const VectorIndex = require("./models/vectorIndex");
const { chainOfThoughtPrompt } = require("./utils/chainOfThoughts");

async function testCoT() {
  const myIndex = new VectorIndex();

  // Add sample tips
  await myIndex.add(1, "Save at least 20% of your income each month.");
  await myIndex.add(2, "Track your expenses using a spreadsheet.");
  await myIndex.add(3, "Avoid unnecessary subscriptions to save money.");

  // Generate CoT prompt
  const query = "How can I save more money?";
  const answer = await chainOfThoughtPrompt(query, myIndex);

  console.log(answer);
}

testCoT();
