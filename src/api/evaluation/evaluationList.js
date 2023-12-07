import { GetSpreadsheet } from "../../api/spreadsheets/Spreadsheets";
const post = process.env.REACT_APP_POST;

// Spreadsheet ID.
const sheetID = "1WvnyaR9E9Aefab02Bwnx5rs-1FGPfSjBcFs8Xbd2P1Y";

// Worksheet name in the spreadsheet.
const rangeEvaluationList = "evaluationList";

export const SetEvaluation = async (data) => {
  // Retrieve the current location of the existing data.
  const range = await GetSpreadsheet(rangeEvaluationList)
    .then((res) => {
      const { values } = res.result.data;
      return values.length;
    })
    .catch((err) => {
      throw err;
    });
  // Submit the new data to be filled in.
  return fetch(`${post}sheet/updatedata`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      sheetID,
      range: `'${rangeEvaluationList}'!A${range + 1}:H${range + 1}`,
      valueInputOpt: 1,
      values: data,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      throw err;
    });
};
