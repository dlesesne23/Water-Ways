import React from 'react';
import { View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const NavUser = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Button
        title="Login as User"
        onPress={() => navigation.navigate('UserLogin', { role: 'user' })}
      />
      <Button
        title="Login as Driver"
        onPress={() => navigation.navigate('DriverLogin', { role: 'driver' })}
      />
      <Button
        title="Signup as User"
        onPress={() => navigation.navigate('UserSignup', { role: 'user' })}
      />
      <Button
        title="Signup as Driver"
        onPress={() => navigation.navigate('DriverSignup', { role: 'driver' })}
      />
    </View>
  );
};

export default NavUser;