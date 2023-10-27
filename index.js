const express = require("express");
const cors = require("cors");
require("dotenv").config();

const Mailgun = require("mailgun.js");
const formData = require("form-data");

const app = express();
app.use(express.json());
app.use(cors());

const mailgun = new Mailgun(formData);
const client = mailgun.client({
  username: "RegisReacteur",
  key: process.env.MAILGUN_API_KEY,
});

app.get("/", (req, res) => {
  console.log("test formulaire route GET");
  res.status(200).json({ message: "welcome to oour new service" });
});

app.post("/form", async (req, res) => {
  const newEntry = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    subject: req.body.subject,
    message: req.body.message,
  };
  const { firstname, lastname, email, subject, message } = req.body;
  console.log(newEntry);

  const messageData = {
    from: `${firstname} ${lastname} <${email}>`,
    to: "rarlabosse@yahoo.fr",
    subject: subject,
    message: message,
  };

  try {
    const response = await client.messages.create(
      process.env.MAILGUN_DOMAIN,
      messageData
    );
  } catch (error) {
    console.error(error);
  }
  {
  }
});

app.listen(3000, () => {
  console.log("Server has server");
});
