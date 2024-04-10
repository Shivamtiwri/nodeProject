const Register = require("../Models/register");

async function register(req, res) {
  const { name, email, number } = req.body;

  Register.create({ name, email, number })
    .then((category) => {
      if (category) {
        res
          .status(404)
          .json({ msg: " Category crated Sueess... !", response_code: 20 });
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = { register };
