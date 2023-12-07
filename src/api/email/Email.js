export const SendEmail = (emailAddress) => {
  fetch(`http://localhost:3001/email/send-email`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      emailAddress: "misterunity2000@gmail.com",
    }),
  })
    .then((res) => {
      //   return res.json();
      console.log(res.json());
    })
    .catch((err) => {
      throw err;
    });
};
