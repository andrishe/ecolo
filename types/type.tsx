export type CustomButtonProps = {
  title: string;
  iconLeft?: React.ReactNode;
  onPress: () => void;
  bgVariant?: 'secondary' | 'tertiary' | 'white';
  textVariant?: 'grayWhite' | 'secondary';
  borderVariant?: 'primary' | 'secondary';
  className?: string;
};

export type InputFieldProps = {
  label: string;
  placeholder: string;
  icon?: React.ReactNode;
  value: string;
  onChangeText: (text: string) => void;
  labelStyle?: object;
  containerStyle?: object;
  inputStyle?: object;
  iconStyle?: object;
  secureTextEntry?: boolean;
  className?: string;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
};
