const Otp = require("../Models/otp");
const nodemailer = require("nodemailer");

async function OtpSend(req, res) {
  const { email } = req.body;
  function generateRandomNumber() {
    return Math.floor(Math.random() * 90000) + 10000;
  }

  const randomNumber = generateRandomNumber();

  const transporter = await nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "shivamti1536@gmail.com",
      pass: "penl lorg srvc ryoq",
    },
  });

  const mailOpction = {
    from: '"Shivam Tiwari 👻" <shivamti1536@gmail.com>', // sender address
    to: `${email}`, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: `<!DOCTYPE html>
           <html lang='en'>
            <head>
                <title>BIZZLANE</title>
                <meta charset='UTF-8'>
                <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no'>
            </head>
                <body style='font-family:Arial, Helvetica, sans-serif'>
                <div style='width:650px;margin:20px auto 10px;padding:0px; max-width: 100%;'>
                <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
                <div style="margin:50px auto;width:70%;padding:20px 0">
                    <div style="border-bottom:1px solid #eee">
                    <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Your Brand</a>
                    </div>
                    <p style="font-size:1.1em">Hi,</p>
                    <p>Thank you for choosing Your Brand. Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes</p>
                    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${randomNumber}</h2>
                    <p style="font-size:0.9em;">Regards,<br />Your Brand</p>
                    <hr style="border:none;border-top:1px solid #eee" />
                    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                    <p>Your Brand Inc</p>
                    <p>1600 Amphitheatre Parkway</p>
                    <p>California</p>
                    </div>
                </div>
                </div>
                </div>
                </body>
                    </html>
`,
  };
  try {
    await transporter.sendMail(mailOpction);

    // Check if data with the given ID exists
    let existingData = await Otp.findOne({ email: email });

    if (!existingData) {
      Otp.create({ email, otp: randomNumber })
        .then((result) => {
          if (result) {
            res.status(200).json({ msg: "Email sent...", Response_code: 200 });
          } else {
            res
              .status(500)
              .json({ msg: "Error creating OTP", Response_code: 500 });
          }
        })
        .catch((err) => {
          console.log(err);
          res
            .status(500)
            .json({ msg: "Error creating OTP", Response_code: 500 });
        });
    } else {
      Otp.updateOne({ email: email }, { otp: randomNumber })
        .then((result) => {
          if (result.modifiedCount > 0) {
            res.status(200).json({ msg: "Email send...", Response_code: 200 });
          } else {
            console.log(result);
            res.status(500).json({
              msg: "Error updating OTP1",

              Response_code: 500,
            });
          }
        })
        .catch((err) => {
          console.log(err);
          res
            .status(500)
            .json({ msg: "Error updating OTP2", Response_code: 500 });
        });
    }
  } catch (error) {
    res.status(2000).json({ msg: "Email not send", Response_code: 201 });
  }
}

async function OtpVerifay(req, res) {
  const { email, otp } = req.body;
  Otp.findOne({ email: email })
    .then((result) => {
      if (result.otp.toString() === otp) {
        res.status(200).json({
          msg: "Otp verifay",
          status: true,
          Response_code: 200,
        });
      } else {
        res.status(201).json({
          msg: "wrong Otp ",
          status: false,
          Response_code: 201,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "Error updating OTP2", Response_code: 500 });
    });
}

module.exports = { OtpSend, OtpVerifay };
