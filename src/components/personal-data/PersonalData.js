import "../../styles/scss/components/_personal-data.scss";

const PersonalData = (props) => {
  const { index, popularity, name, position, picture } = props.employeeData;
  return (
    <div className={`personal-data staff-index-${index}`}>
      <div className="profile-picture">
        <img src={picture} alt="staff-dashboard" />
      </div>
      <div className="profile-staff-info">
        <div className="staff-popularity">popularity：{popularity}</div>
        <div className="staff-name">Name：{name}</div>
        <div className="staff-position">Position：{position}</div>
      </div>
    </div>
  );
};
export default PersonalData;
