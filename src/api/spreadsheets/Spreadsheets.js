// 目前只有一個SheetID，以個SheetID就是一個Excel大檔案
const sheetID = "1WvnyaR9E9Aefab02Bwnx5rs-1FGPfSjBcFs8Xbd2P1Y";

export const GetSpreadsheet = (rang) => {
  return fetch(
    `http://localhost:3001/sheet/getdata?sheetID=${sheetID}&range=${rang}`,
    {
      method: "GET",
    }
  )
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      throw err;
    });
};
