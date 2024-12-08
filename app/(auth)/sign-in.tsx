import { View, Text, ScrollView, Image } from 'react-native';
import React, { useState } from 'react';
import InputField from '@/components/InputField';
import { Eye, Lock, Mail, User } from 'lucide-react-native';
import CustomButton from '@/components/CustomButton';
import { Link } from 'expo-router';
import OtherAuth from '@/components/OtherAuth';

const SignIn = () => {
  const [form, setForm] = useState<{
    email: string;
    password: string;
  }>({
    email: '',
    password: '',
  });

  const handleSingIn = async () => {};
  return (
    <ScrollView className="bg-white flex-1">
      <View className="flex-1 bg-white">
        <View className="w-[400px] h-[200px] mt-10">
          <Image
            source={require('../../assets/images/Sign_in.png')}
            resizeMode="cover"
            className="w-full h-full"
          />
          <Text className="text-grayBlack font-RobotoBold text-3xl mt-3 left-5">
            Connectez-Vous
          </Text>
        </View>

        <View className=" p-5 mt-10">
          <InputField
            label="Email"
            placeholder="Entrez votre email"
            icon={<Mail size={18} color={'#66ab82'} />}
            value={form.email}
            onChangeText={(text) => setForm({ ...form, email: text })}
          />

          <InputField
            label="Mot de passe"
            placeholder="Entrez votre mot de passe"
            icon={<Lock size={18} color={'#66ab82'} />}
            value={form.password}
            onChangeText={(text) => setForm({ ...form, password: text })}
          />

          <CustomButton
            title="Connexion"
            onPress={handleSingIn}
            className="mt-8"
          />

          <OtherAuth />

          <Link
            href="/sign-up"
            className="text-gray font-RobotoRegular text-center text-lg mt-10"
          >
            <Text>Je n'ai pas de compte? </Text>
            <Text className="text-primary">Inscrivez-vous</Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignIn;
