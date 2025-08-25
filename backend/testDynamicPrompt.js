const { createDynamicPrompt } = require('./utils/dynamicPrompting');

const userGoal = "Save money for a new laptop";
const userProfile = { age: 20, income: 15000 };

const prompt = createDynamicPrompt(userGoal, userProfile);
console.log("Generated Prompt:\n", prompt);
