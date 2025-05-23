import React from 'react';
import {TouchableOpacity} from 'react-native';
import CustomText from '../atoms/CustomText';
import {useAuthStore} from '../../store/AuthStore';

const LogoutButton = ({style}: {style?: object}) => {
  const logout = useAuthStore(state => state.logout);

  return (
    <TouchableOpacity onPress={logout} style={style}>
      <CustomText size={45}>🚪</CustomText>
    </TouchableOpacity>
  );
};

export default LogoutButton;
