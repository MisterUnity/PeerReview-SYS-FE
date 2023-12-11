const post = process.env.REACT_APP_API_BASE_URL;
export const SendEmail = (objEmailData) => {
  const { emailContent } = objEmailData;
  const contentData = {
    evaluator: emailContent["evaluator"],
    evaluatedItem: emailContent["evaluatedItem"],
    numberOfStarsReceived: emailContent["numberOfStarsReceived"],
    reasonForTheStars: emailContent["reasonForTheStars"],
    encouragingWords: emailContent["encouragingWords"],
    reasonsForTheEvaluation: emailContent["reasonsForTheEvaluation"],
    additionalComments: emailContent["additionalComments"],
  };
  fetch(`${post}email/send-email`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      emailAddress: objEmailData["emailAddress"],
      subject: objEmailData["subject"],
      content: contentData,
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
