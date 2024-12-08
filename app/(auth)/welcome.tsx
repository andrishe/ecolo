import CustomButton from '@/components/CustomButton';
import { router } from 'expo-router';
import { Text, Image, SafeAreaView, View } from 'react-native';

const Welcome = () => {
  return (
    <SafeAreaView className="flex h-full items-center  bg-white ">
      <Image
        source={require('../../assets/images/eco.png')}
        resizeMode="cover"
        className="w-full h-[400px]"
      />

      <Text className="text-grayBlack font-RobotoBold font-extrabold text-center text-5xl mt-16">
        GreenWorld
      </Text>

      <Text className="text-gray font-RobotoRegular text-center text-xl  mt-3">
        Protégeons nos espaces, un signalement à la fois
      </Text>

      <CustomButton
        title="Bienvenue"
        className="w-11/12 mt-20"
        onPress={() => router.push('/sign-up')}
      />
    </SafeAreaView>
  );
};

export default Welcome;
