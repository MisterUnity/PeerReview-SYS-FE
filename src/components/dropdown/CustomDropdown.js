import React, { Fragment, useEffect, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { useGlobalStore } from "../../global/GlobalStoreContext ";
export default function CustomDropdown(props) {
  const [selectedItem, setSelectedItem] = useState(null);
  const { item, onSetDescription, className, style } = props;
  const { evalItemNameContext } = useGlobalStore();

  useEffect(() => {
    if (selectedItem) {
      onSetDescription(selectedItem["itemName"]);
      evalItemNameContext.setEvalItemName(selectedItem["itemName"]);
    }
  }, [selectedItem]);

  return (
    <Fragment>
      <Dropdown
        value={selectedItem}
        onChange={(e) => setSelectedItem(e.value)}
        options={item}
        optionLabel="itemName"
        placeholder="協力能力"
        className={`${className} `}
      />
    </Fragment>
  );
}
