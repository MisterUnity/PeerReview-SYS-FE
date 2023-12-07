import { createContext, useContext, useState, useRef } from "react";
import { Toast } from "primereact/toast";

const GlobalStoreContext = createContext();

const GlobalContextProvider = ({ children }) => {
  // 登入系統員工 ID Start
  const [loggedInEmployeeID, setLoggedInEmployeeID] = useState("");
  const loggedInEmployeeIDHandler = (EmployeeID) => {
    setLoggedInEmployeeID(EmployeeID);
  };
  const loggedInEmployeeIdContext = {
    loggedInEmployeeID: loggedInEmployeeID,
    setLoggedInEmployeeID: loggedInEmployeeIDHandler,
  };
  // 登入系統員工 ID End

  // 被評價員工名稱 Start
  const [evaluatedEmployeeName, setEvaluatedEmployeeName] = useState("");
  const evaluatedEmployeeNameHandler = (evaluatedEmployeeName) => {
    setEvaluatedEmployeeName(evaluatedEmployeeName);
  };
  const evaluatedEmployeeNameContext = {
    evaluatedEmployeeName: evaluatedEmployeeName,
    setEvaluatedEmployeeName: evaluatedEmployeeNameHandler,
  };
  // 被評價員工名稱 End

  // 設置評估項目名稱 Start
  const [evalItemName, setEvalItemName] = useState("");
  const evalItemNameHandler = (evalItemName) => {
    setEvalItemName(evalItemName);
  };
  const evalItemNameContext = {
    evalItemName: evalItemName,
    setEvalItemName: evalItemNameHandler,
  };
  // 設置評估項目名稱 End

  // 被評價內容 Start
  const [reviewContent, setReviewContent] = useState("");
  const reviewContentHandler = (content) => {
    setReviewContent(content);
  };
  const reviewContext = {
    reviewContent: reviewContent,
    setReviewContent: reviewContentHandler,
  };
  // 被評價內容 End

  // 表單發送狀態處理 start
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitStatusHandler = (bStatus) => {
    setIsSubmitting(bStatus);
  };
  const submitContext = {
    submitStatus: isSubmitting,
    onSetSubmitStatus: submitStatusHandler,
  };
  // 表單發送狀態處理 End

  // 吐司條功能 Start
  const toast = useRef();
  const showToast = (title, content, statusCode) => {
    let severity;
    switch (statusCode) {
      case 0:
        severity = "error";
        break;
      case 1:
        severity = "success";
        break;
      case 2:
        severity = "info";
        break;
      case 3:
        severity = "warn";
        break;
      default:
        severity = "success";
        break;
    }
    toast.current.show({
      severity: severity,
      summary: title,
      detail: content,
      life: 3000,
    });
  };
  // 吐司條功能 End

  return (
    <GlobalStoreContext.Provider
      value={{
        loggedInEmployeeIdContext,
        evaluatedEmployeeNameContext,
        evalItemNameContext,
        reviewContext,
        submitContext,
        showToast,
      }}
    >
      {children}
      <Toast ref={toast}></Toast>
    </GlobalStoreContext.Provider>
  );
};
export default GlobalContextProvider;

export function useGlobalStore() {
  const context = useContext(GlobalStoreContext);
  if (!context) {
    throw new Error("useGlobalStore must be used within a GlobalStoreProvider");
  }
  return context;
}
