var express = require("express");
var path = require("path");

var app = express();
var port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var reservations = [
  {
    name: "José Carlos",
    phoneNumber: 18004144444,
    email: "some@email.com",
    uid: 12345,
  },
  {
    name: "José Carlos",
    phoneNumber: 18004144444,
    email: "some@email.com",
    uid: 12345,
  },
  {
    name: "José Carlos",
    phoneNumber: 18004144444,
    email: "some@email.com",
    uid: 12345,
  },
  {
    name: "José Carlos",
    phoneNumber: 18004144444,
    email: "some@email.com",
    uid: 12345,
  },
];

var waitlist = [];

const maxCapacity = 5;
var currentCapacity = reservations.length;

app.listen(port, () => console.log(`Server listening on ${port}`));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/pages/home.html"));
});

app.get("/tables", (req, res) => {
  res.sendFile(path.join(__dirname, "/pages/tables.html"));
});

app.get("/reserve", (req, res) => {
  res.sendFile(path.join(__dirname, "/pages/reserve.html"));
});

app.get("/api/tables", (req, res) => {
  return res.json(reservations);
});

app.get("/api/waitlist", (req, res) => {
  return res.json(waitlist);
});

app.post("/api/tables", (req, res) => {
  console.log("Received: ", req.body);
  console.log("Current capacity: ", currentCapacity);
  let newReservation = req.body;
  if (currentCapacity < maxCapacity) {
    currentCapacity++;
    reservations.push(newReservation);
    res.json({
      type: "success",
      message: "Your reservation was added succesfully",
    });
  } else {
    waitlist.push(newReservation);
    res.json({
      type: "failure",
      message:
        "We are sorry, there are no tables available, you have been added to our waitlist",
    });
  }
});

app.post("/api/clear", (req, res) => {
  reservations = [];
  waitlist = [];
  currentCapacity = 0;
  return res.json({ result: "success" });
});
