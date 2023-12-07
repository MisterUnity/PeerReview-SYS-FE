import { GetSpreadsheet } from "../../api/spreadsheets/Spreadsheets";

// 目前只有一個SheetID，以個SheetID就是一個Excel大檔案
const sheetID = "1WvnyaR9E9Aefab02Bwnx5rs-1FGPfSjBcFs8Xbd2P1Y";

// 一個range就是隸屬於SheetID之下，range可以是底下的整個工作表名稱，也可以是工作表裡面的特定範圍
const rangeEvaluationList = "evaluationList";

export const SetEvaluation = async (data) => {
  const range = await GetSpreadsheet(rangeEvaluationList)
    .then((res) => {
      const { values } = res.result.data;
      return values.length;
    })
    .catch((err) => {
      throw err;
    });
  return fetch(`http://localhost:3001/sheet/updatedata`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      sheetID,
      range: `'${rangeEvaluationList}'!A${range + 1}:E${range + 1}`,
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
