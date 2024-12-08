import { View, Text, Image } from 'react-native';
import React from 'react';
import CustomButton from '@/components/CustomButton';
import { icons } from '@/constants/images';

const OtherAuth = () => {
  const handleGoogleSignIn = async () => {};
  return (
    <View>
      <View className="flex flex-row justify-center items-center mt-4 gap-x-3">
        <View className="flex-1 h-[1px] bg-gray" />
        <Text className="text-gray font-RobotoRegular text-lg">ou</Text>
        <View className="flex-1 h-[1px] bg-gray" />
      </View>
      <CustomButton
        title="Connectez-vous avec Google  "
        className="mt-5 w-full shadow-none"
        iconLeft={
          <Image
            source={icons.google}
            resizeMode="contain"
            className="w-5 h-5 mx-5"
          />
        }
        bgVariant="white"
        borderVariant="secondary"
        textVariant="secondary"
        onPress={handleGoogleSignIn}
      />
    </View>
  );
};

export default OtherAuth;
