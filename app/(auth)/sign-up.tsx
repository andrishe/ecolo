import { View, Text, ScrollView, Image, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import InputField from '@/components/InputField';
import { Lock, Mail, User } from 'lucide-react-native';
import CustomButton from '@/components/CustomButton';
import { Link, useRouter } from 'expo-router';
import { ReactNativeModal } from 'react-native-modal';
import { images } from '@/constants/images';
import OtherAuth from '@/components/OtherAuth';
import { useSignUp } from '@clerk/clerk-expo';
import { insertProfile } from '../../supabase/supabaseClient'; // Importer la fonction utilitaire

const SignUp = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });

  const { isLoaded, signUp, setActive } = useSignUp();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [verification, setVerification] = useState({
    state: 'default', // États possibles : default, pending, success, failed
    error: '',
    code: '',
  });

  useEffect(() => {
    const timeout = '';
    setTimeout(() => {
      if (verification.state === 'success') {
        setShowSuccessModal(true);
      }
    }, 1000);
    return () => clearTimeout(timeout);
  }, [verification.state]);

  // Fonction de gestion de l'inscription
  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      // Étape 1 : Créer l'utilisateur
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });

      // Étape 2 : Préparer la vérification par code
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      // Mise à jour de l'état
      setVerification({ ...verification, state: 'pending' });
    } catch (err: any) {
      // Gestion des erreurs
      console.log(JSON.stringify(err, null, 2));
      Alert.alert(
        'Erreur',
        err.errors?.[0]?.message || "Une erreur s'est produite"
      );
    }
  };

  // Fonction de vérification du code
  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      // Tentative de vérification
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      if (completeSignUp.status === 'complete') {
        // Activer la session
        await setActive({ session: completeSignUp.createdSessionId });

        // Insérer le profil dans la base de données
        const { data, error } = await insertProfile({
          username: form.username,
          email: form.email,
        });

        if (error) {
          console.error('Error inserting profile:', error);
        } else {
          console.log('Inserted profile:', data);
        }

        // Mise à jour des états
        setVerification({ ...verification, state: 'success' });
      } else {
        setVerification({
          ...verification,
          state: 'failed',
          error: 'La vérification a échoué. Veuillez réessayer.',
        });
      }
    } catch (err: any) {
      // Gestion des erreurs
      setVerification({
        ...verification,
        state: 'failed',
        error: err.errors?.[0]?.message || "Une erreur s'est produite",
      });
    }
  };

  return (
    <ScrollView className="bg-white flex-1">
      <View className="flex-1 bg-white">
        {/* En-tête */}
        <View className="w-[400px] h-[200px] mt-10">
          <Image
            source={images.sign}
            resizeMode="cover"
            className="w-full h-full"
          />
          <Text className="text-grayBlack font-RobotoBold text-3xl mt-3 left-5">
            Créez Votre Compte
          </Text>
        </View>

        {/* Formulaire */}
        <View className="p-5 mt-10">
          <InputField
            label="Nom"
            placeholder="Entrez votre nom"
            icon={<User size={18} color={'#66ab82'} />}
            value={form.username}
            onChangeText={(text) => setForm({ ...form, username: text })}
          />

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
            secureTextEntry={true}
            value={form.password}
            onChangeText={(text) => setForm({ ...form, password: text })}
          />

          <CustomButton
            title="S'inscrire"
            onPress={onSignUpPress}
            className="mt-8"
          />

          <OtherAuth />

          <Link
            href="/sign-in"
            className="text-gray font-RobotoRegular text-center text-lg mt-10"
          >
            <Text>Vous avez déjà un compte? </Text>
            <Text className="text-primary">Connectez-vous</Text>
          </Link>
        </View>

        {/* Modal de vérification */}
        <ReactNativeModal isVisible={verification.state === 'pending'}>
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Text className="text-3xl text-grayBlack font-RobotoBold text-center mb-2">
              Vérification
            </Text>
            <Text className="text-base text-gray font-Roboto text-center mb-5">
              Nous avons envoyé un code de vérification à {form.email}.
            </Text>

            <InputField
              label="Code de vérification"
              icon={<Lock size={18} color={'#66ab82'} />}
              placeholder="12345"
              value={verification.code}
              keyboardType="numeric"
              onChangeText={(code) =>
                setVerification({ ...verification, code })
              }
            />
            {verification.error && (
              <Text className="text-red-500 text-sm mt-1">
                {verification.error}
              </Text>
            )}
            <CustomButton
              title="Vérification de l'adresse e-mail"
              onPress={onPressVerify}
              className="mt-5 shadow-none"
            />
          </View>
        </ReactNativeModal>

        <ReactNativeModal isVisible={showSuccessModal}>
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Image
              source={images.check}
              resizeMode="cover"
              className="w-[110px] h-[110px] mx-auto my-5 bg-success rounded-full"
            />
            <Text className="text-3xl text-grayBlack font-Roboto text-center">
              Vérifié
            </Text>
            <Text className="text-base text-gray font-Roboto text-center mt-2">
              Vous avez vérifié votre compte avec succès.
            </Text>
            <CustomButton
              title="Accueil"
              onPress={() => {
                router.push(`/(root)/(tabs)/home`);
                setShowSuccessModal(false);
              }}
              className="mt-5 shadow-none"
            />
          </View>
        </ReactNativeModal>
      </View>
    </ScrollView>
  );
};

export default SignUp;
