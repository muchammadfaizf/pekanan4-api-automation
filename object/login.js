const request = require("supertest");
async function login(payload) {
  try {
    const response = await request("https://kasir-api.belajarqa.com")
    .post("/authentications")
    .send(payload);
    return response;
  } catch (error) {
    throw error;
  }
}

module.exports = { login };