import { GetSpreadsheet } from "../../api/spreadsheets/Spreadsheets";

const post = process.env.REACT_APP_API_BASE_URL;
// Spreadsheet ID.
const sheetID = "1WvnyaR9E9Aefab02Bwnx5rs-1FGPfSjBcFs8Xbd2P1Y";

// Worksheet name in the spreadsheet.
const rangeEvaluationList = "evaluationList";

export const SetEvaluation = async (data) => {
  // Retrieve the current location of the existing data.
  const range = await GetSpreadsheet(rangeEvaluationList)
    .then((res) => {
      try {
        const { values } = res.result.data;
        return values.length;
      } catch (error) {
        throw error;
      }
    })
    .catch((error) => {
      throw error.json();
    });

  // 無法取得存入資料的起始儲存格位置。
  // Unable to obtain the starting cell position for storing data.
  if (isNaN(range)) {
    throw new Error(
      "Unable to obtain the starting cell position for storing data."
    );
  }
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
    .catch((error) => {
      throw error.json();
    });
};
