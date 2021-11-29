import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Checkbox from "expo-checkbox";
import { setCheck, setValue } from "../../../../modules/admin/class/course";
import { useIsFocused } from "@react-navigation/core";

const CheckBoxIcon = ({ item, style }) => {
  const dispatch = useDispatch();
  const [isSelected, setSelection] = useState(false);
  const checkId = useSelector(({ classes }) => classes.checkid);
  const isFocused = useIsFocused();
  const onValueChange = useCallback(() => {
    // 어떤 버튼도 선택하지 않았을 때
    if (!checkId) {
      setSelection(true);
      dispatch(setCheck(true));
      dispatch(setValue(item.c_idx));
    }
    // 버튼이 선택되어 있을 때
    else {
      setSelection(false);
      dispatch(setCheck(false));
      dispatch(setValue(null));
    }
    // checkId && valueId === item.c_idx && dispatch(setCheck(false));
    // dispatch(setCheck(true));
    // isSelected && dispatch(setValue(item.c_idx));
    // console.log("후: ", isSelected, checkId, item.c_idx, valueId);
  }, [isSelected]);

  useEffect(() => {
    if (isFocused) {
      setSelection(false);
      dispatch(setCheck(false));
      dispatch(setValue(null));
      console.log(isSelected, checkId);
    }
  }, [isFocused]);

  return (
    <Checkbox
      style={style}
      value={isSelected}
      onValueChange={onValueChange}
      disabled={checkId ? (!isSelected ? true : false) : false}
      color={isSelected ? "#4630EB" : "black"}
    />
  );
};

export default CheckBoxIcon;
