const express = require("express");
const app = express();
const server = app.listen(8003, () => console.log("listening on port 8003"));
const io = require("socket.io")(server);

app.use(express.static(__dirname + "/static"));

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

let donations = 0;
//when user is connected
io.on("connection", (socket) => {
  //when user donated
  socket.on("donate", (data) => {
    donations += data.amount;
    socket.emit("donate-msg", { msg: "Thank you for your donation!" });
    io.emit("updateTotalAll", { donations }); //broadcast to all connected users
  });
  //when user redeemed
  socket.on("redeem", (data) => {
    // console.log(data.amount);
    if (donations == 0) {
      socket.emit("redeem-msg", { msg: "You cannot redeem at the moment!" });
    } else {
      donations -= data.amount;
      socket.emit("redeem-msg", { msg: "You have successfully redeemed!" });
      io.emit("updateTotalAll", { donations }); //broadcast to all connected users
    }
  });
});

//render the donation page
app.get("/", function (req, res) {
  res.render("index", { donations });
});
