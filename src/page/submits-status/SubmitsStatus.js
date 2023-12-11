import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import "../../styles/scss/page/_submits-status.scss";

const SubmitsStatus = (props) => {
  const navigate = useNavigate();
  const employeeName = localStorage.getItem("employeeName");
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
        <div className="submits-status-MSG">{`${employeeName}および直属の上司は`}</div>
        <div className="submits-status-MSG">{`通知を受け取ります！`}</div>
        <Button
          label="Back to Home"
          className="submits-status-btn"
          onClick={() => {
            localStorage.removeItem("employeeName");
            navigate("/home-page");
          }}
        />
      </div>
    </div>
  );
};
export default SubmitsStatus;
