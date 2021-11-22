import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text, TextInput } from 'react-native';
import { images } from './MyInfoImages';
import IconButton from './MyInfoIconButton';
import { useNavigation } from '@react-navigation/native'

export const Contents = ({ pwCk1, onChangePwCk1, newPw, onChangeNewPw, pwCk2, onChangePwCk2, onPress }) => {

    const navigation = useNavigation();

    return (
      <View style={[styles.container, {height: 340, backgroundColor: '#CEEDFF', marginTop: 50}]}>
        <View style={styles.myInfo}>
          <IconButton type={images.email}/>
          <TextInput
          secureTextEntry={true}
          style={styles.myInfoText}
          onChangeText={onChangePwCk1}
          value={pwCk1}
          placeholder="기존 비밀번호"
          keyboardType="numeric"
          />
        </View>
        <View style={styles.myInfo}>
          <IconButton type={images.email}/>
          <TextInput
          secureTextEntry={true}
          style={styles.myInfoText}
          onChangeText={onChangeNewPw}
          value={newPw}
          placeholder="새 비밀번호"
          keyboardType="numeric"
          />
        </View>
        <View style={styles.myInfo}>
          <IconButton type={images.email}/>
          <TextInput
          secureTextEntry={true}
          style={styles.myInfoText}
          onChangeText={onChangePwCk2}
          value={pwCk2}
          placeholder="비밀번호 확인"
          keyboardType="numeric"
          />
        </View>
        <View>
          <TouchableOpacity
            style={styles.btn}
            onPress={onPress}
            >
            <Text style={[{ fontSize: 18 }, styles.text]}>변경</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      width: '95%',
      justifyContent: 'center',
      height: 190,
    },
    myInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 10,
      padding: 5,
      margin: 3,
    },
    myInfoText: {
      flex: 1,
      fontSize: 22,
    },
    footer: {
      height: 80,
    },
    btnContainer: {
      flex: 1,
      justifyContent: "center",
      paddingHorizontal: 10
    },
    btn: {
      backgroundColor: "#5AA0C8",
      borderRadius: 10,
      //width: Platform.OS === "android" ? 155 : "50%",
      margin: 10,
      alignItems: "center",
      paddingVertical: 8,
      padding: 10,
      width: '90%',
    },
    text: {
      color: "white",
      fontWeight: "bold",
      margin: 10,
    },
  });