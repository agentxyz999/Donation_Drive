$(document).ready((e) => {
  const socket = io();
  //donate button clicked
  $("#donate").on("click", () => {
    socket.emit("donate", { amount: 10 });
  });
  socket.on("updateTotalAll", (data) => {
    // console.log(data.donations);
    $("h1 > span").text(data.donations);
  });
  //server thanked the user
  socket.on("donate-msg", (data) => {
    // console.log(data.msg);
    $(".card-body > h3").text(data.msg).fadeIn().fadeOut(2000);
  });
  //alert for redeeming
  socket.on("redeem-msg", (data) => {
    // console.log(data.msg);
    $(".card-body > h3").text(data.msg).fadeIn().fadeOut(2000);
  });

  //redeem
  $("#redeem").on("click", (e) => {
    socket.emit("redeem", { amount: 10 });
  });
});
