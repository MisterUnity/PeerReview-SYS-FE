import { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";
import { useGlobalStore } from "../../global/GlobalStoreContext";
import { GetSpreadsheet } from "../../api/spreadsheets/Spreadsheets";
import { ProgressSpinner } from "primereact/progressspinner";
import CustomCarousel from "../../components/carousel/CustomCarousel";
import BulletinBoard from "../../components/bulletin-board/BulletinBoard";
import PersonalData from "../../components/personal-data/PersonalData";
import CustomDialog from "../../components/dialog/CustomDialog";
import john_doe_picture from "../../assets/image/profile/staff_headshot/headshot-3.png";
import jane_smith_picture from "../../assets/image/profile/staff_headshot/headshot-1.png";
import bob_ohnson_picture from "../../assets/image/profile/staff_headshot/headshot-6.png";
import alice_williams_picture from "../../assets/image/profile/staff_headshot/headshot-2.png";
import charlie_brown_picture from "../../assets/image/profile/staff_headshot/headshot-4.png";
import eva_davis_picture from "../../assets/image/profile/staff_headshot/headshot-5.png";
import "../../styles/scss/page/_home-page.scss";
import "../../styles/scss/components/_custom-dialog-internal.scss";

const employeePictures = {
  "John Doe": john_doe_picture,
  "Jane Smith": jane_smith_picture,
  "Bob Johnson": bob_ohnson_picture,
  "Alice Williams": alice_williams_picture,
  "Charlie Brown": charlie_brown_picture,
  "Eva Davis": eva_davis_picture,
};
const evalItems = [
  { itemName: "協力能力", code: "Collaboration" },
  { itemName: "業務効率", code: "Work Efficiency" },
  { itemName: "専門知識", code: "Professional Knowledge" },
  { itemName: "責任感", code: "Responsibility" },
  { itemName: "問題解決能力", code: "Problem Solving" },
  { itemName: "チームワーク", code: "Teamwork" },
  { itemName: "適応力", code: "Adaptability" },
  { itemName: "仕事の態度", code: "Work Attitude" },
  { itemName: "学びの姿勢", code: "Learning Attitude" },
];
const evalItemsDescription = [
  {
    evalItem: "協力能力",
    description: "チームでの協力とコミュニケーション能力。",
  },
  { evalItem: "業務効率", description: "タスクのスピードと効率。" },
  { evalItem: "専門知識", description: "自身の専門領域の知識水準。" },
  { evalItem: "責任感", description: "仕事への責任感。" },
  { evalItem: "問題解決能力", description: "問題解決能力と創造的思考。" },
  { evalItem: "チームワーク", description: "チームでの協力と協働。" },
  { evalItem: "適応力", description: "変化への適応力と柔軟性。" },
  {
    evalItem: "仕事の態度",
    description: "仕事に対する前向きな態度とプロ意識。",
  },
  { evalItem: "学びの姿勢", description: "新しい知識とスキルへの学びの姿勢。" },
];

const HomePage = () => {
  const [clickedData, setClickedData] = useState({});
  const [employeeData, setEmployeeData] = useState(null);
  const [steps, setSteps] = useState(0);
  const [selectedItem, setSelectedItem] = useState(evalItems[0]);
  const [evalItemDescription, setEvalItemsDescription] = useState(
    evalItemsDescription[0]["description"]
  );
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const { evalItemNameContext, evaluatedEmployeeNameContext, showToast } =
    useGlobalStore();
  const navigate = useNavigate();
  useEffect(() => {
    getEmployeeListInit();
  }, []);

  useEffect(() => {
    if (selectedItem) {
      evalItemNameContext.setEvalItemName(selectedItem["itemName"]);

      // Switch Description Content Based on Dropdown Selection"
      const matchedDescription = evalItemsDescription.find(
        (evalItems) => evalItems.evalItem === selectedItem["itemName"]
      );
      setEvalItemsDescription(matchedDescription["description"]);
    }
  }, [selectedItem]);

  async function getEmployeeListInit() {
    const rangeEmployeeList = "employeeList";
    const rangeEvaluationList = "evaluationList";
    const objArrEmployeeList = await GetSpreadsheet(rangeEmployeeList)
      .then((res) => {
        try {
          /* status = 0。
          API發送成功，但找不到指定之試算表。
          API request was successful, 
          but the specified spreadsheet could not be found.*/
          if (res.status === 0) {
            showToast(
              "Error",
              `Unable to retrieve data from the specified spreadsheet.`,
              0
            );
            return;
          }

          const { values } = res.result.data;
          return values
            .map((row, rowIndex) => {
              // Skip the first entry; the first entry is just the header
              if (rowIndex !== 0) {
                let tempObj = {
                  id: row[0],
                  name: row[1],
                  position: row[2],
                  popularity: row[3],
                  email: row[4],
                  manager: row[5],
                };
                return tempObj;
              }
              return null; // Skip the header
            })
            .filter((obj) => obj !== null); // Remove null entries (header)
        } catch (error) {
          showToast("Error：", `${error}`, 0);
        }
      })
      .catch((error) => {
        showToast("Error", `${error}`, 0);
        //TODO 顯示dialog 獲取資料失敗，重新嘗試獲取資料的按鈕。
      });

    // 成功取得資料，但資料庫的員工清單為空。
    // Successfully obtained data, but the employee list in the database is empty.
    if (objArrEmployeeList.length < 1) {
      showToast(
        "Error",
        "The employee list in the database is empty. Please contact the relevant personnel for assistance.",
        0
      );
      return;
    }
    const arrEmployeeNameList = objArrEmployeeList.map((item) => item["name"]);
    await GetSpreadsheet(rangeEvaluationList)
      .then((res) => {
        try {
          const { values } = res.result.data;

          // 根據有被評價的員工姓名，找出該員工的詳細資料物件。
          /* Based on the evaluated employee's name, 
           locate the detailed information object for that employee.*/
          values.forEach((row) => {
            row.forEach((element) => {
              if (arrEmployeeNameList.includes(element)) {
                let foundObject = objArrEmployeeList.find(
                  (obj) => obj.name === element
                );
                // 增加該員工人氣度1點
                // Increase the popularity of that employee by 1 point.
                if (foundObject) {
                  const intPopularity = parseInt(foundObject["popularity"]);
                  const strPopularity = !isNaN(intPopularity)
                    ? (intPopularity + 1).toString()
                    : "0";
                  foundObject["popularity"] = strPopularity;
                }
              }
            });
          });

          // 新增一個圖片屬性，並根據名稱匹配相應的照片。
          /* Add a new property for the pictures and match 
          the corresponding photos based on the names. */
          const objArrNewEmployeeList = objArrEmployeeList.map((employee) => {
            const { name } = employee;
            const picture = employeePictures[name];
            return { ...employee, picture };
          });

          // 根據人氣度做排序處理（由高到低）
          // Sort processing based on popularity (from high to low).
          const objArrFinalResult = objArrNewEmployeeList.sort((a, b) => {
            const popularityA = parseInt(a.popularity);
            const popularityB = parseInt(b.popularity);
            return popularityB - popularityA;
          });

          // 追加物件index。
          // Additional object index
          objArrFinalResult.forEach((employee, index) => {
            employee["index"] = index;
          });
          setEmployeeData(objArrFinalResult);
        } catch (error) {
          showToast("Error", `${error}`, 0);
        }
      })
      .catch((error) => {
        showToast("Error", `${error}`, 0);
      });
  }

  function getStaffInfoHandler(staffIndex) {
    evaluatedEmployeeNameContext.setEvaluatedEmployeeName(
      employeeData[staffIndex]["name"]
    );
    setClickedData(employeeData[staffIndex]);
    setIsDialogVisible(true);
  }

  function dialogVisibleHandler() {
    setIsDialogVisible(false);

    // Initialize Dropdown Menu and Evaluation Description
    setSelectedItem(evalItems[0]);
    setEvalItemsDescription(evalItemsDescription[0]["description"]);

    // Initialize Dialog Display Content"
    setSteps(0);
  }

  function stepsHandler() {
    setSteps((prev) => {
      // Toggle Dialog Display Content
      // 1：staffConfirmation
      // 0：evalItemConfirmation
      return prev === 0 ? 1 : 0;
    });
  }

  const staffConfirmation = (
    <div className="staff-confirmation">
      <PersonalData employeeData={clickedData} />
      <div className="staff-confirmation-internal-bottom-Section">
        <Button
          label="Positive Review"
          className="bottom-section-btn"
          onClick={() => stepsHandler(1)}
        />
      </div>
    </div>
  );

  const evalItemConfirmation = (
    <div className="eval-item-confirmation">
      <div className="eval-item-confirmation-top-section">
        <span className="eval-item-title">評価項目：</span>
        <Dropdown
          className="eval-item-dropdown"
          value={selectedItem}
          onChange={(e) => setSelectedItem(e.value)}
          options={evalItems}
          optionLabel="itemName"
          placeholder="協力能力"
        />
        <div className="eval-item-description">{evalItemDescription}</div>
      </div>
      <div className="eval-item-confirmation-bottom-Section">
        <Button
          label="Back"
          className="bottom-section-btn-e"
          onClick={() => stepsHandler(0)}
        />
        <Button
          label="Fill in the details"
          className="bottom-section-btn-e"
          onClick={() => navigate("/review-details")}
        />
      </div>
    </div>
  );

  return (
    <div className="home-page-bg">
      <span className="sign-out">
        <Button
          className="sign-out-btn"
          size="large"
          label="Sign Out"
          onClick={() => navigate("/")}
        />
      </span>
      <div className="home-page-container">
        <div className="bulletin-board-container">
          <BulletinBoard />
        </div>
        <div className="staff-list-container">
          {employeeData ? (
            <CustomCarousel
              employeeData={employeeData}
              onGetStaffIndex={getStaffInfoHandler}
            />
          ) : (
            <ProgressSpinner className="staff-list-progressSpinner" />
          )}
          <CustomDialog
            visible={isDialogVisible}
            onHide={dialogVisibleHandler}
            style={{
              width: "25vw",
            }}
          >
            {steps === 0 ? staffConfirmation : evalItemConfirmation}
          </CustomDialog>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
