import { View, Text, Image, TextInput } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react'

const SignupPage = ({ onSignup }) => {
    const navigate = useNavigation()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
  
    const handleSignup = async () => {
      const response = await fetch(`http://localhost:3000/user/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
            
          },
          body: JSON.stringify({
            email,
            username,
            password
          })
        });
        const accessToken = ' ';
        const res = await response.json()
        // Call the onSignIn function passed from the parent component
        onSignup(res.user);
        localStorage.setItem('token', res.token)
        navigation.navigate("HomePage")
    };

  return (
    <View className="bg-white h-full w-full">
        <StatusBar style="light" />
        {/* <Image className="h-full w-full absolute" source={require('../../assets/images/background.png')} /> */}

        <View className="flex-row justify-around w-full absolute">
            {/* <Image className="h-[225] w-[90]" source={require('../../assets/images/light.png')} />  */}
        </View>

        <View className="h-full w-full flex justify-around pt-48">
           <View className="flex items-center">
                <Text className="text-white font-bold tracking-wider text-5xl">SignUp</Text>
            </View>

            <View className="flex item-center mx-4 space-y-4">
                <View className="bg-black/5 p-5 rounded-2xl w-full">
                    <TextInput placeholder='Email' placeholderTextColor={'gray'} />
                </View>
                <View className="bg-black/5 p-5 rounded-2xl w-full">
                    <TextInput className="border relative bg-gray-100 p-1"
                    type="text"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                     required />
                </View>
                <View className="bg-black/5 p-5 rounded-2xl w-full">
                    <TextInput placeholder='Username' placeholderTextColor={'gray'} />
                </View>
                <View className="bg-black/5 p-5 rounded-2xl w-full">
                    <TextInput className="border relative bg-gray-100 p-1"
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                     required />
                </View>
                <View className="bg-black/5 p-5 rounded-2xl w-full">
                    <TextInput placeholder='Password' placeholderTextColor={'gray'} />
                </View>
                <View className="bg-black/5 p-5 rounded-2xl w-full mb-3">
                    <TextInput className="border relative bg-gray-100 p-1"
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required />
                </View>

                <View className="w-full">
                    <TouchableOpacity onPress={e =>handleSignup()} 
                        className="w-full bg-sky-400 p-3 rounded-2xl mb-3">
                            <Text className="text-xl text-white font-bold text-center">SignUp</Text>
                    </TouchableOpacity>
                </View>    
            </View>
            <View className="flex-row justify-center">
                <Text>Already have an account?</Text>
                <TouchableOpacity onPress={()=> navigate.push('LoginPage')}>
                    <Text className="text-sky-600 font-bold">Login</Text>
                </TouchableOpacity>
            </View> 
        </View>
    </View>
  )
}

export default SignupPage