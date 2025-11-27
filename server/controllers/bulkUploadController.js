const { OpenAI } = require('openai');
const fs = require('fs');
const path = require('path');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

module.exports = async (req, res) => {
  try {
    const files = req.files;
    const results = [];

    for (const file of files) {
      // Read image as base64
      const imageData = fs.readFileSync(file.path, { encoding: "base64" });

      // ------------------------------
      //  OPENAI 2025 NEW FORMAT
      // ------------------------------
      const response = await openai.chat.completions.create({
        model: "gpt-4.1",
        input: [
          {
            role: "user",
            content: [
              {
                type: "input_text",
                text: "Analyze the product image. Generate:\n- Product name\n- Detailed description\n- Estimated USD price\nReturn in JSON format."
              },
              {
                type: "input_image",
                image_url: `data:image/jpeg;base64,${imageData}`
              }
            ]
          }
        ],
        max_output_tokens: 300
      });

      // 2025 API → Output format changed!
      const aiText =
        response.output?.[0]?.content?.[0]?.text || "No response";

      results.push({
        filename: file.originalname,
        aiData: aiText
      });

      // Cleanup
      fs.unlinkSync(file.path);
    }

    res.json({ products: results });

  } catch (error) {
    console.error("Bulk Upload Error:", error);

    // Handle quota error
    if (error.code === "insufficient_quota") {
      return res.status(429).json({
        error: "OpenAI quota exceeded. Please add billing credits."
      });
    }

    res.status(500).json({ error: "Bulk upload failed." });
  }
};
