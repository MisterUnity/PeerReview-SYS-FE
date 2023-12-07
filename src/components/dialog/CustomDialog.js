import { Dialog } from "primereact/dialog";

const CustomDialog = (props) => {
  const { header, visible, style, onHide, children } = props;
  const defaultStyle = {
    width: "50vw",
  };
  return (
    <Dialog
      header={header}
      visible={visible}
      style={style ? style : defaultStyle}
      onHide={onHide}
    >
      {children}
    </Dialog>
  );
};
export default CustomDialog;
