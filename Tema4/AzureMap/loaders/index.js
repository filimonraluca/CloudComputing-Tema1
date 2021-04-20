const Logger = require("./logger");

module.exports = async ({ expressApp }) => {
  try {
    Logger.info("✌️ Express loaded");
  } catch (error) {
    Logger.error(error);
  }
};
