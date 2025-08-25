# AI Personal Finance Advisor

**Version:** 1.0
**Author:** Ramsundhar
**Tech Stack:** Node.js, Express, JavaScript, @xenova/transformers, GPT4All JS, JSON

---

## **Project Overview**

The **AI Personal Finance Advisor** is a fully local, open-source Node.js application designed to help users analyze their spending, suggest budgeting strategies, and predict potential savings. It uses **local embeddings**, a **vector database**, and a **free LLM in JavaScript** to deliver structured financial advice.

The system emphasizes **structured output**, **chain-of-thought reasoning**, and **dynamic prompting strategies** to generate actionable recommendations in JSON format:

```json
{
  "category": "Food",
  "advice": "Cook meals at home instead of eating out.",
  "expected_savings": 200,
  "confidence": 0.9
}
```

---

## **Key Features**

1. **User Spending Analysis**

   * Accepts user spending data and queries.
   * Evaluates expenses across multiple categories.

2. **Embeddings**

   * Uses `@xenova/transformers` (or `sentence-transformers-js`) to generate embeddings for:

     * User spending data
     * Financial advice tips
   * Embeddings allow semantic similarity comparisons between user data and tips.

3. **Vector Database**

   * Stores embeddings in a local **in-memory array** or `faiss-node`.
   * Retrieves top-N financial tips based on similarity to user spending.

4. **Similarity Measures**

   * Supports **Cosine Similarity**, **Dot Product**, and **Euclidean (L2) distance** in JavaScript.
   * Determines which financial tips are most relevant to the user’s spending.

5. **Prompting Strategies**

   * **Zero-shot prompting:** Generate advice without examples.
   * **One-shot prompting:** Provide a single example to guide the model.
   * **Multi-shot prompting:** Provide multiple examples to improve model output.
   * **Chain-of-Thought:** AI explains reasoning step-by-step before giving final advice.
   * **Dynamic Prompting:** Adjust prompt based on user query type.

6. **Function Calling**

   * Includes functions for:

     * Retrieving user transaction history
     * Computing similarity
     * Calling the local LLM

7. **Structured JSON Output**

   * Ensures advice is always output in a predictable structure:

     ```json
     { "category", "advice", "expected_savings", "confidence" }
     ```

8. **System & User Prompts**

   * System prompts define AI behavior.
   * User prompts define spending query and context.

9. **Stop Sequence & Response Control**

   * Stops over-generation by the LLM.
   * Supports **temperature**, **top-k**, and **top-p** to control randomness and creativity.

10. **Token Logging**

    * Tracks tokens used per LLM call (if supported by model).

11. **Evaluation**

    * Includes **sample spending reports**.
    * Judge function evaluates model output against expected results.

---

## **Tech Stack**

| Component       | Technology / Library                            | Purpose                                       |
| --------------- | ----------------------------------------------- | --------------------------------------------- |
| Backend         | Node.js + Express                               | API server and endpoints                      |
| Embeddings      | @xenova/transformers / sentence-transformers-js | Generate vector representations of text       |
| Vector Database | In-memory array / faiss-node                    | Store and search embeddings                   |
| LLM             | GPT4All JS (local)                              | Generate advice and reasoning                 |
| Data Storage    | JSON files                                      | Store financial tips and sample user spending |

---

## **Folder Structure**

```
ai-personal-finance-advisor/
│
├── package.json
├── server.js
├── README.md
│
├── config/
│   └── llmConfig.js
│
├── data/
│   ├── financialTips.json
│   └── sampleSpending.json
│
├── models/
│   └── embeddings.js
│
├── utils/
│   ├── similarity.js
│   ├── vectorDB.js
│   ├── promptBuilder.js
│   └── evaluation.js
│
├── functions/
│   └── financeFunctions.js
│
└── routes/
    └── financeRoutes.js
```

---

## **Setup Instructions**

1. **Clone the repository**

```bash
git clone https://github.com/username/ai-personal-finance-advisor.git
cd ai-personal-finance-advisor
```

2. **Install dependencies**

```bash
npm install express body-parser @xenova/transformers gpt4all
```

3. **Prepare financial tips**

* Edit `data/financialTips.json` with your custom tips.

4. **Prepare sample spending reports**

* Edit `data/sampleSpending.json`.

5. **Start the server**

```bash
node server.js
```

* Server runs on `http://localhost:3000`.

6. **Test API**

```bash
POST http://localhost:3000/api/finance/advice
Body: { "query": "I spent $400 on food, $120 on transport, $200 on entertainment." }
```

---

## **Workflow Explained**

1. **User Query**

   * User sends spending data to the API.

2. **Embeddings**

   * Generate embeddings for both user query and stored financial tips.

3. **Vector DB Search**

   * Find tips most similar to user spending.

4. **Similarity Calculation**

   * Cosine, dot, or L2 similarity ranks tips.

5. **Dynamic Prompt Generation**

   * Build prompt based on retrieved tips and query type.

6. **LLM Reasoning**

   * GPT4All JS model performs **chain-of-thought reasoning** and outputs **structured JSON**.

7. **Structured JSON Output**

   * `{category, advice, expected_savings, confidence}`

8. **Evaluation**

   * Compare output against sample dataset for correctness.

---

## **LLM Concepts Applied**

| Concept                     | Implementation in Project                                            |
| --------------------------- | -------------------------------------------------------------------- |
| Embeddings                  | `@xenova/transformers` to convert text into vectors                  |
| Vector Database             | In-memory array stores embeddings for search                         |
| Similarity Measures         | Cosine, Dot, L2 in `utils/similarity.js`                             |
| Prompting Strategies        | Zero-shot, One-shot, Multi-shot, Chain-of-Thought, Dynamic Prompting |
| Function Calling            | `financeFunctions.js` calls LLM & retrieves user data                |
| Structured Output           | JSON with defined keys                                               |
| Temperature / Top-K / Top-P | Configurable in LLM call (`llm.generate`)                            |
| Stop Sequence               | Stops AI from over-generating responses                              |
| Token Logging               | Logs number of tokens used per LLM call                              |

---

## **Evaluation Dataset**

* Contains at least **5 sample spending reports** in `data/sampleSpending.json`.
* `utils/evaluation.js` computes correctness score (0-1) based on:

  * Correct category
  * Correct advice
  * Accuracy of expected savings
  * Confidence alignment

---

## **Future Enhancements**

1. Use **faiss-node** for scalable vector search.
2. Integrate **MongoDB** for persistent user spending and advice history.
3. Add **user authentication** and **personalized dashboards**.
4. Allow **batch processing** of multiple users.
5. Enhance **dynamic prompting** with **context awareness** over multiple queries.

---


