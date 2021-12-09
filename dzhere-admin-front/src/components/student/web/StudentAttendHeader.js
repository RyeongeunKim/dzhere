import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Picker,
  TouchableOpacity,
  Button,
} from "react-native";
import styles from "./Styles";

const StudentAttendHeaderWeb = (props) => {
  const agList = props.agencyList;
  const lessonList = props.clist;

  return (
    <>    
      <View style={stylesBase.container}>
        <View style={stylesBase.header}>
          <View style={styles.picker}>
            <Text style={[styles.text, { marginLeft: 15 }]}>기관</Text>
            <Picker style={[styles.pickerText]}>
              {agList.map((v) => (
                <Picker.Item label={v.ag_name} value={v.ag_idx} />
              ))}
            </Picker>
          </View>
          <View style={styles.picker}>
            <Text style={[styles.text, { marginLeft: 15 }]}>강의</Text>
            <Picker style={[styles.pickerText]} onValueChange={props.handleSelectLesson}>
              {lessonList.map((v,i) => (
                <Picker.Item label={v.c_name} value={i} />
              ))}
            </Picker>
          </View>
        </View>
          <View style={{ alignSelf: "flex-end", margin: 10 }}>
            <Button title={"검색"} color={"#5AA0C8"} onPress={props.handleSearchBtn}/>
          </View>
      </View>
    </>
  );
};

const stylesBase = StyleSheet.create({
  container: {
    paddingHorizontal: "20%",
    justifyContent: "center",
    width: '100%',
    flex: 3,
  },
  header: {
    padding: "3%",
    margin: 10,
    marginTop: 60,
    borderRadius: 15,
    backgroundColor: "#CEEDFF",
  },
});

export default StudentAttendHeaderWeb;
