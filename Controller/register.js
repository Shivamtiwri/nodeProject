const Register = require("../Models/register");

async function register(req, res) {
  const { first_name, last_name, email, number, password, re_password } =
    req.body;
console.log(req.body);
  Register.findOne({ email: email })
    .then((result) => {
      if (result?.email === email) {
        res
          .status(201)
          .json({ msg: "Email alrady Register... !", response_code: 201 });
      } else {
        Register.create({
          first_name,
          last_name,
          email,
          number,
          password,
          re_password,
        })
          .then((category) => {
            if (category) {
              res
                .status(200)
                .json({ msg: " Register Sueess... !", response_code: 200 });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

async function getRegister(req, res) {
  Register.find()
    .then((category) => {
      if (category) {
        res
          .status(200)
          .json({
            msg: " Register Sueess... !",
            count:category.length,
            data: category,
            response_code: 200,
          });
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = { register, getRegister };
