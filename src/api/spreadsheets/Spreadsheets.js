// Spreadsheet ID.
const sheetID = "1WvnyaR9E9Aefab02Bwnx5rs-1FGPfSjBcFs8Xbd2P1Y";
const post = process.env.REACT_APP_API_BASE_URL;

export const GetSpreadsheet = (rang) => {
  return fetch(`${post}sheet/getdata?sheetID=${sheetID}&range=${rang}`, {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .catch((error) => {
      throw error;
    });
};
