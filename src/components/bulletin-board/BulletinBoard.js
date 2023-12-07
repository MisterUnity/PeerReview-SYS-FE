const childContainerClass = "bulletin-board-child-container";
const slogan_Jp = (
  <h1>
    良い評価を広げ、チームで進化。
    <br />
    私たちの力はお互いのケアから生まれます。
  </h1>
);
const slogan_En = (
  <h3>
    Spread the praise, advance as a team. Our strength comes from mutual care.
  </h3>
);
const btnSlogan = "ポジティブなエネルギーはここから始まります";

const BulletinBoard = (props) => {
  return (
    <div className="bulletin-board">
      <div className={`${childContainerClass}`}>{slogan_Jp}</div>
      <div className={`${childContainerClass}`}>{slogan_En}</div>
      <div className={`${childContainerClass}`}>{btnSlogan}</div>
    </div>
  );
};
export default BulletinBoard;
