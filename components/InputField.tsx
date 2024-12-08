import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TextInput,
  Platform,
  Keyboard,
} from 'react-native';
import React, { useState } from 'react';

import { InputFieldProps } from '../types/type';

const InputField = ({
  label,
  placeholder,
  value,
  icon,
  onChangeText,
  labelStyle,
  containerStyle,
  inputStyle,
  iconStyle,
  secureTextEntry = false,
  keyboardType = 'default',
  className,
  ...props
}: InputFieldProps) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="my-2 w-full">
          <Text
            className={`text-lg font-RobotoRegular text-grayBlack mb-3 ${labelStyle}`}
          >
            {label}
          </Text>
          <View
            className={`flex flex-row justify-start items-center relative bg-White rounded-3xl border ${
              isFocused ? 'border-primary' : 'border-green'
            } ${containerStyle}`}
          >
            {icon && <View className={`ml-4 ${iconStyle}`}>{icon}</View>}
            <TextInput
              className={`rounded-full p-4 font-RobotoMedium text-[15px] flex-1 ${inputStyle} text-left`}
              secureTextEntry={secureTextEntry}
              keyboardType={keyboardType}
              placeholder={placeholder}
              value={value}
              onChangeText={onChangeText}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              {...props}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default InputField;
