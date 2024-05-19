const OpenAIWrapper = require("../config/OpenAIWrapper");
const inputPrompt = require("../models/input-prompt")


module.exports = {
  async sendText(req, res) {
    const openaiAPI = OpenAIWrapper.configuration();
    const inputModel = new inputPrompt(req.body)

    try {
      const response = await openaiAPI.chat.completions.create(
        OpenAIWrapper.textCompletion(inputModel)
      );

      return res.status(200).json({
        success: true,
        data: response.choices[0].message.content,
      });
    } catch (error) {
      console.error("Error creating completion:", error);
      return res.status(400).json({
        success: false,
        data: error.response ? error.response.data : "Erro no servidor",
      });
    }
  },
};
