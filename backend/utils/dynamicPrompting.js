// Function to create a dynamic prompt
function createDynamicPrompt(userGoal, userProfile = {}) {
  let prompt = `You are a smart financial advisor.\n`;
  
  if (userProfile.age) {
    prompt += `The user is ${userProfile.age} years old.\n`;
  }
  if (userProfile.income) {
    prompt += `The user earns ₹${userProfile.income} per month.\n`;
  }

  prompt += `Goal: ${userGoal}\n`;
  prompt += `Provide step-by-step actionable advice in simple language.`;

  return prompt;
}

module.exports = { createDynamicPrompt };