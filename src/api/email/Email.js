const post = process.env.REACT_APP_API_BASE_URL;
export const SendEmail = (emailAddress) => {
  fetch(`${post}email/send-email`, {
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
    .catch((error) => {
      throw error.json();
    });
};
