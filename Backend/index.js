const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 3000;

connectDB();

app.use("/api/merchandise", require("./routes/merchandise"));
app.use("/api/users", require("./routes/users"));
app.use("/api/admission", require("./routes/admission"));
app.use("/api/payment", require("./routes/payment"));
app.use("/api/orders", require("./routes/orderComplete"));
app.use("/api/admin", require("./routes/admin"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
