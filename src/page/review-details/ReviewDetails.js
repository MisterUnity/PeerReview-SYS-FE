import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useGlobalStore } from "../../global/GlobalStoreContext";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import { SetEvaluation } from "../../api/evaluation/evaluationList";
import { BlockUI } from "primereact/blockui";
import { ProgressSpinner } from "primereact/progressspinner";
import "../../styles/scss/page/_review-details.scss";

const ReviewDetails = (props) => {
  const {
    evalItemNameContext,
    evaluatedEmployeeNameContext,
    loggedInEmployeeIdContext,
    showToast,
  } = useGlobalStore();
  const [blocked, setBlocked] = useState(false);
  const [Item1, setItem1] = useState("");
  const [Item2, setItem2] = useState("");
  const [selectedItem1, setSelectedItem1] = useState("null");
  const [selectedItem2, setSelectedItem2] = useState("null");
  const [textAreaValue, setTextAreaValue] = useState("");
  const navigate = useNavigate();

  async function submitsHandler() {
    setBlocked(true);
    const pendingDataSubmission = [
      { itemName: "Item-1", data: Item1 },
      { itemName: "Item-2", data: Item2 },
      { itemName: "dropdown-1", data: selectedItem1 },
      { itemName: "dropdown-2", data: selectedItem2 },
    ];
    // Empty Item Handling
    const problematicItem = pendingDataSubmission.find((item) => !item.data);
    if (problematicItem) {
      showToast("警告", `${problematicItem["itemName"]}空白にできません`, 3);
      setBlocked(false);
      return;
    }
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();

    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    SetEvaluation([
      [
        formattedDateTime,
        loggedInEmployeeIdContext.loggedInEmployeeID,
        evaluatedEmployeeNameContext.evaluatedEmployeeName,
        Item1,
        Item2,
        selectedItem1,
        selectedItem2,
        textAreaValue,
      ],
    ])
      .then((res) => {
        if (res.result.status == 200) {
          navigate("/submits-status");
        }
      })
      .catch((err) => {
        setBlocked(false);
        showToast("Error", `An error occurred when submitting the form.`, 3);
        console.log({ err });
      });
  }
  return (
    <BlockUI blocked={blocked}>
      <div className="review-details-bg">
        {blocked ? (
          <ProgressSpinner className="submits-progress" />
        ) : (
          <div className="review-details-container">
            <h1>{evalItemNameContext.evalItemName}</h1>
            <InputText
              className="review-details-title"
              value={Item1}
              onChange={(e) => setItem1(e.target.value)}
              placeholder={`${evalItemNameContext.evalItemName}に対する評価を入力してください。`}
              required
            />
            <InputText
              className="review-details-title"
              value={Item2}
              onChange={(e) => setItem2(e.target.value)}
              placeholder={`${evalItemNameContext.evalItemName}に対する評価を入力してください。`}
              required
            />
            <Dropdown
              className={"review-details-text-dropdown"}
              options={[]}
              value={selectedItem1}
              onChange={(e) => setSelectedItem1(e.value)}
              placeholder="協力能力"
              optionLabel="itemName"
              required
            />
            <Dropdown
              className={"review-details-text-dropdown"}
              options={[]}
              value={selectedItem2}
              onChange={(e) => setSelectedItem2(e.value)}
              placeholder="協力能力"
              optionLabel="itemName"
              required
            />
            <InputTextarea
              className="review-details-text-area"
              placeholder="その他の具体的な事項"
              value={textAreaValue}
              onChange={(e) => setTextAreaValue(e.target.value)}
              rows={5}
              cols={30}
              style={{ resize: "none" }}
              required
            />

            <Button
              className="review-details-Submits"
              label="Submits"
              onClick={() => submitsHandler()}
            />
          </div>
        )}
      </div>
    </BlockUI>
  );
};
export default ReviewDetails;
