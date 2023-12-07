import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { useGlobalStore } from "../../global/GlobalStoreContext";
import "../../styles/scss/page/_submits-status.scss";

const SubmitsStatus = (props) => {
  const { evaluatedEmployeeNameContext } = useGlobalStore();

  const navigate = useNavigate();

  return (
    <div className="submits-status-bg">
      <div className="submits-status-container">
        <FontAwesomeIcon
          className="submits-status-logo"
          icon={faCircleCheck}
          bounce
          size="2xl"
          style={{ color: "#68c62a" }}
        />
        <div className="submits-status-MSG">評価ありがとうございます。</div>
        <div className="submits-status-MSG">{`${evaluatedEmployeeNameContext.evaluatedEmployeeName}および直属の上司は通知を受け取ります！`}</div>
        <Button
          label="Back to Home"
          className="submits-status-btn"
          onClick={() => navigate("/colleague-feedback")}
        />
      </div>
    </div>
  );
};
export default SubmitsStatus;
