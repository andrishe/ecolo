import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { CustomButtonProps } from '@/types/type';

const bgVariants = {
  secondary: 'bg-secondary',
  tertiary: 'bg-grayWhite',
  white: 'bg-white',
};

const textVariants = {
  grayWhite: 'text-grayWhite',
  secondary: 'text-secondary',
};

const borderVariants = {
  primary: 'border-primary',
  secondary: 'border-secondary',
};

const CustomButton = ({
  onPress,
  title,
  iconLeft,
  bgVariant = 'secondary',
  textVariant = 'grayWhite',
  borderVariant = 'primary',

  className = '',
  ...props
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`w-full rounded-3xl p-3 flex flex-row justify-center items-center shadow-md shadow-grayBlack/70 ${bgVariants[bgVariant]} ${className} border ${borderVariants[borderVariant]}`}
      {...props}
    >
      {iconLeft && <View className="mr-2">{iconLeft}</View>}
      <Text className={`text-xl font-RobotoBold ${textVariants[textVariant]}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
