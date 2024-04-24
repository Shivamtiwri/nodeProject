const Register = require("../Models/register");

async function register(req, res) {
  const { first_name, last_name, email, number, password, re_password } =
    req.body;
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

async function updateRegister(req, res) {
  const id = req.query._id;
  const {  first_name, last_name, email, number, password, re_password } = req.body;
  
  // Find the existing document with the given ID
  Register.findById(id)
    .then((existingUser) => {
      if (!existingUser) {
        return res.status(404).json({ msg: "User not found", response_code: 404 });
      }

      // Update the existing document with new data
      existingUser.first_name = first_name;
      existingUser.last_name = last_name;
      existingUser.email = email;
      existingUser.number = number;
      existingUser.password = password;
      existingUser.re_password = re_password;

      // Save the updated document
      existingUser.save()
        .then(() => {
          res.status(200).json({ msg: "User updated successfully", response_code: 200 });
        })
        .catch((err) => {
          console.error(err);
          res.status(500).json({ msg: "Internal server error", response_code: 500 });
        });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ msg: "Internal server error", response_code: 500 });
    });
}




async function deleteRegister(req, res) {
  const id = req.query._id;
  console.log(id);
  Register.deleteOne({_id:id})
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

module.exports = { register, getRegister,deleteRegister,updateRegister };
