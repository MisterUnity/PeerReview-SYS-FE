import { Carousel } from "primereact/carousel";
import PersonalData from "../personal-data/PersonalData";
import "../../styles/scss/components/_custom-carousel.scss";

export default function CustomCarousel(props) {
  const { employeeData, onGetStaffIndex } = props;
  const responsiveOptions = [
    {
      breakpoint: "1199px",
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: "991px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "767px",
      numVisible: 1,
      numScroll: 1,
    },
  ];

  function itemTemplate(employeeData) {
    return (
      <div className="item-template" onClick={(e) => focusHandler(e)}>
        <PersonalData employeeData={employeeData} />
      </div>
    );
  }

  function focusHandler(e) {
    // active樣式處理
    const itemTemplates = document.querySelectorAll(".item-template");
    const targetElement = e.currentTarget;
    itemTemplates.forEach((element) => {
      element.classList.remove("focus");
    });
    targetElement.classList.add("focus");

    // 獲取被點擊 Element的Index
    let classList;
    const childWithClassName = targetElement.querySelector(".personal-data");
    try {
      classList = Array.from(childWithClassName.classList);
      const ElementIndex = classList.find((className) =>
        className.startsWith("staff-index-")
      );
      const staffIndex = Number(ElementIndex.match(/\d+/)[0]);
      onGetStaffIndex(staffIndex);
    } catch (error) {
      console.log(`獲取被點擊Element的Index發生錯誤：${error}`);
    }
  }

  return (
    <Carousel
      className="custom-carousel"
      value={employeeData}
      numVisible={3}
      numScroll={3}
      responsiveOptions={responsiveOptions}
      circular
      autoplayInterval={3000}
      itemTemplate={itemTemplate}
    />
  );
}
