import * as React from "react";
import { Platform } from "react-native";
import ClassManageAndroidContainer from "../../../containers/admin/class/class_manage/ClassManageContainer.android";
import ClassManageWebContainer from "../../../containers/admin/class/class_manage/ClassManageContainer.web";

const ClassManagePage = () => {
  return Platform.OS === "android" ? (
      <ClassManageAndroidContainer
      />
    ) : (
      <ClassManageWebContainer/>
    );
};

export default ClassManagePage;
