import { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useGlobalStore } from "../../global/GlobalStoreContext";
import { useNavigate } from "react-router-dom";
import { InputTextarea } from "primereact/inputtextarea";
import { SetEvaluation } from "../../api/evaluation/evaluationList";
import { BlockUI } from "primereact/blockui";
import { ProgressSpinner } from "primereact/progressspinner";
import { Rating } from "primereact/rating";
import { SendEmail } from "../../api/email/Email";
import "../../styles/scss/page/_review-details.scss";

const ReviewDetails = (props) => {
  const { evalItemNameContext, loggedInEmployeeIdContext, showToast } =
    useGlobalStore();
  const [blocked, setBlocked] = useState(false);
  const [Star, setStar] = useState("1");
  const [reasonForTheStars, setReasonForTheStars] = useState("");
  const [encouragingWords, setEncouragingWords] = useState("");
  const [reasonsForTheEvaluation, setReasonsForTheEvaluation] = useState("");
  const [additionalComments, setAdditionalComments] = useState("");
  const navigate = useNavigate();

  async function submitsHandler() {
    setBlocked(true);
    const pendingDataSubmission = [
      { itemName: "星に対する理由", data: reasonForTheStars },
      { itemName: "評価の理由", data: reasonsForTheEvaluation },
    ];
    // 確保欄位不為空
    // Empty Item Handling
    const problematicItem = pendingDataSubmission.find((item) => !item.data);
    if (problematicItem) {
      showToast("警告", `${problematicItem["itemName"]}欄の空欄不可`, 3);
      setBlocked(false);
      return;
    }
    // 創建資料時間。
    // Creation timestamp.
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
        localStorage.getItem("employeeName"),
        evalItemNameContext.evalItemName,
        Star,
        reasonForTheStars,
        encouragingWords,
        reasonsForTheEvaluation,
        additionalComments,
      ],
    ])
      .then((res) => {
        try {
          if (res.result.status === 200) {
            SendEmail({
              emailAddress: "misterunity2000@gmail.com",
              subject: "Evaluation Notification.",
              emailContent: {
                evaluator: loggedInEmployeeIdContext.loggedInEmployeeID,
                evaluatedItem: evalItemNameContext.evalItemName,
                numberOfStarsReceived: Star,
                reasonForTheStars: reasonForTheStars,
                encouragingWords: encouragingWords,
                reasonsForTheEvaluation: reasonsForTheEvaluation,
                additionalComments: additionalComments,
              },
            });
            localStorage.removeItem("EvaluationItem");
            navigate("/submits-status");
          }
        } catch (error) {
          showToast("Error", `${error}`, 0);
        } finally {
          setBlocked(false);
        }
      })
      .catch((error) => {
        setBlocked(false);
        showToast("Error", `An error occurred when submitting the form.`, 3);
      });
  }
  function backHandler() {
    localStorage.setItem(
      "EvaluationItem",
      `${evalItemNameContext.evalItemName}`
    );
    navigate("/home-page");
  }

  return (
    <BlockUI blocked={blocked}>
      <div className="review-details-bg">
        {blocked ? (
          <ProgressSpinner className="submits-progress" />
        ) : (
          <div className="review-details-container">
            <h1>{evalItemNameContext.evalItemName}</h1>
            <Rating
              value={Star}
              onChange={(e) => setStar(e.value)}
              cancel={false}
            />
            <InputText
              className="review-details-title"
              value={reasonForTheStars}
              onChange={(e) => setReasonForTheStars(e.target.value)}
              placeholder={`星に対する理由を入力してください。`}
              required
            />
            <InputText
              className="review-details-title"
              value={encouragingWords}
              onChange={(e) => setEncouragingWords(e.target.value)}
              placeholder={`ポジディブな言葉を入力してください。`}
              required
            />
            <InputText
              className="review-details-title"
              value={reasonsForTheEvaluation}
              onChange={(e) => setReasonsForTheEvaluation(e.target.value)}
              placeholder={`評價する理由を入力してください。`}
              required
            />
            <InputTextarea
              className="review-details-text-area"
              placeholder="その他の具体的な事項"
              value={additionalComments}
              onChange={(e) => setAdditionalComments(e.target.value)}
              rows={5}
              cols={30}
              style={{ resize: "none" }}
              required
            />
            <div className="review-details-btn-container">
              <Button
                className="review-details-btn"
                label="back"
                onClick={() => backHandler()}
              />
              <Button
                className="review-details-btn"
                label="Submits"
                onClick={() => submitsHandler()}
              />
            </div>
          </div>
        )}
      </div>
    </BlockUI>
  );
};
export default ReviewDetails;
