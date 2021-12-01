import { Contents } from '../../components/myinfo/MyInfoPassUpdate'
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Alert } from 'react-native';
import { checkPw, updatePw } from '../../modules/myinfo/myInfo'
import { useNavigation } from '@react-navigation/native'

const MyInfoPassUpdateContainer = () => {

  const navigation = useNavigation();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [passwordConfirmError, setPasswordConfirmError] = useState('');
  const [emptyError, setEmptyError] = useState('');
  const [checkError1, setCheckError1] = useState('');
  const [checkError2, setCheckError2] = useState('');
  const [edit, setEdit] = useState(true);

  const dispatch = useDispatch();

  const { phone, check, loadingCheck } = useSelector(({ auth, myinfo, loading }) => ({
    phone: auth.userInfo.userPhone,
    check: myinfo.check,
    loadingCheck: loading['myinfo/CHECK_PW'],
  }));
  const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?)(!@$%^&*-]).{8,16}$/;

  console.log('기존 비밀번호'+currentPassword);
  console.log('새 비밀번호'+newPassword);
  console.log('비밀번호 확인'+passwordConfirm);
  
  function onPress(){
  
    if(newPassword.length > 0 && regex.test(newPassword) === false ){
      setNewPasswordError('8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.')
      console.log('비밀번호 유효성 체크(새 비밀번호) : ', newPasswordError);
    } else {
      setNewPasswordError('');
    }
  
    if(passwordConfirm.length > 0 && passwordConfirm !== newPassword){
      setPasswordConfirmError('비밀번호가 일치하지 않습니다')
      console.log('비밀번호 확인 유효성 체크(비밀번호 확인) : ', passwordConfirmError);
    } else {
      setPasswordConfirmError('');
    }

    if(currentPassword === '' || newPassword === '' || passwordConfirm === ''){
      setEmptyError('빈 항목이 있습니다.')
    } else {
      setEmptyError('');
    }

    if(edit === true){
      setCheckError2('기존 비밀번호를 확인해주세요.')
    } else {
      setCheckError2('');
    }

    if(newPasswordError === '' && passwordConfirmError === '' && 
      emptyError === '' && checkError1 === '' && checkError2 === '' && edit === false){
      dispatch(updatePw({newPassword, phone}));
      Alert.alert('비밀번호가 성공적으로 변경되었습니다.');
      setTimeout(()=>{
        navigation.goBack()
      }, 800);
    }

  }

  const onCheck = () => {
    dispatch(checkPw({currentPassword, phone}));
    if((currentPassword) && check === true){
      setCheckError1('')
      setEdit(false)
    } 
    else if(currentPassword !== '') {
      setCheckError1((()=>('비밀번호가 일치하지 않습니다')))
    }
  }


  return (
      <Contents
        currentPassword={currentPassword}
        setCurrentPassword={setCurrentPassword}
        newPassword={newPassword}
        setNewPassword={setNewPassword}
        passwordConfirm={passwordConfirm}
        setPasswordConfirm={setPasswordConfirm}
        newPasswordError={newPasswordError}
        passwordConfirmError={passwordConfirmError}
        onPress={onPress}
        emptyError={emptyError}
        checkError1={checkError1}
        onCheck={onCheck}
        loadingCheck={loadingCheck}
        checkError2={checkError2}
        edit={edit}
      />
  );
};

export default MyInfoPassUpdateContainer;