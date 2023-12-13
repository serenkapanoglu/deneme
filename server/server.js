require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const connectDB = require("./config/dbConn");
const imageRoutes = require("./routes/imagesRoutes");
const twitterRoutes = require("./routes/twitterRoutes");
const usersJobs = require("./schedules/usersJobs");
require("./schedules/postsJobs");

connectDB();

//app.use(cors(corsOptions));
app.use(cors({
  origin: "*",
}));

app.use(express.json());
app.use('/tags', require('./routes/tagRoutes'))
app.use("/users", require("./routes/userRoutes"));
app.use("/posts", require("./routes/postRoutes"));
app.use("/comment", require("./routes/commentRoutes"));
app.use("/crowns", require("./routes/achievementsRoutes"));
app.use("/notifications", require("./routes/notificationRoutes"));
app.use("/auth", require('./routes/authenticationRoutes'));
app.use('/voiting', require('./routes/voitingRouters'));
app.use('/votes', require('./routes/votesRouter'));
app.use('/wallet', require('./routes/walletRoutes'));
app.use('/walletmethod', require('./routes/walletMethodRoutes'));
app.use('/wallettransaction', require('./routes/walletTrasactionRoutes'));


//Update ranking schedule
usersJobs();

twitterRoutes(app);
imageRoutes(app);

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB')
  app.listen(8000, () => console.log('Server running on port 8000'))
})

mongoose.connection.on('error', err => {
  console.log(err)
})