const express = require("express");
const fileUpload = require("express-fileupload");

const user = require("./routes/user");

const errorHandler = require("./middlewares/errorHandler");

const port = process.env.PORT || 4000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(fileUpload());

app.use(express.static("public"));

app.use("/", user);

app.all("*", (req, res, next) => {
  next({ statusCode: 404, message: "Endpoint not found" });
});

app.use(errorHandler);

app.listen(port, () => console.log(`Server running on ${port}`));
