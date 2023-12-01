import { useState, useEffect } from 'react';
import { HStack, Center, Box, Icon, View, VStack, Image, Input, Button, Text } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import EditPasswordHeader from './EditPasswordHeader';
import style from './Style';

import { putPassword } from '../../../services/users/users-service';
import { getKey } from '../../../common/session-info';

const EditPassword = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ error: false, message: '' });
  const [state, setState] = useState({ actualPassword: '', newPassword: '', repeatPassword: '' });
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [userId, setUserId] = useState();

  useEffect(() => {
    getKey('userId').then((value) => {
      setUserId(value);
    });
  }, [userId]);

  const handleChangePassword = async () => {
    setIsLoading(true);
    const response = await putPassword(userId, state);
    if (response.data) {
      navigation.navigate('Profile');
    } else {
      setError({ error: true, message: response });
    }
    setIsLoading(false);
  };

  return (
    <>
      <EditPasswordHeader navigation={navigation} />
      <Box safeAreaTop flex={1} width="100%" height="100%">
        <Center flex={1}>
          <Image
            source={require('../../../assets/images/login-icon.png')}
            alt="Signup image"
            size="xl"
            resizeMode="contain"
          />
          <VStack space={4} mt="5">
            <View style={style.view}>
              <HStack space={2} alignItems="center">
                <Input
                  type={showOldPassword ? 'text' : 'password'}
                  placeholder="Old Password"
                  name="password"
                  _focus={{
                    borderColor: 'muted.300',
                    backgroundColor: 'muted.100',
                  }}
                  InputLeftElement={
                    <Icon size="sm" color="gray.400" as={<Ionicons name="key-outline" />} marginLeft={3} />
                  }
                  InputRightElement={
                    <Button
                      variant="unstyled"
                      onPress={() => setShowOldPassword(!showOldPassword)}
                      _pressed={{ opacity: 0.5 }}>
                      <Icon
                        size="sm"
                        color="gray.400"
                        as={<Ionicons name={showOldPassword ? 'eye-off-outline' : 'eye-outline'} />}
                        marginLeft={3}
                      />
                    </Button>
                  }
                  onChange={(e) => setState({ ...state, actualPassword: e.nativeEvent.text })}
                  value={state.actualPassword}
                />
              </HStack>
            </View>
            <View style={style.view}>
              <HStack space={2} alignItems="center">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="New Password"
                  name="password"
                  _focus={{
                    borderColor: 'muted.300',
                    backgroundColor: 'muted.100',
                  }}
                  InputLeftElement={
                    <Icon size="sm" color="gray.400" as={<Ionicons name="key-outline" />} marginLeft={3} />
                  }
                  InputRightElement={
                    <Button
                      variant="unstyled"
                      onPress={() => setShowPassword(!showPassword)}
                      _pressed={{ opacity: 0.5 }}>
                      <Icon
                        size="sm"
                        color="gray.400"
                        as={<Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} />}
                        marginLeft={3}
                      />
                    </Button>
                  }
                  onChange={(e) => setState({ ...state, newPassword: e.nativeEvent.text })}
                  value={state.newPassword}
                />
              </HStack>
            </View>
            <View style={style.view}>
              <HStack alignItems="center">
                <Input
                  type={showRepeatPassword ? 'text' : 'password'}
                  placeholder="Repeat New Password"
                  name="password-repeat"
                  _focus={{
                    borderColor: 'muted.300',
                    backgroundColor: 'muted.100',
                  }}
                  InputLeftElement={
                    <Icon size="sm" color="gray.400" as={<Ionicons name="key-outline" />} marginLeft={3} />
                  }
                  InputRightElement={
                    <Button
                      variant="unstyled"
                      onPress={() => setShowRepeatPassword(!showRepeatPassword)}
                      _pressed={{ opacity: 0.5 }}>
                      <Icon
                        size="sm"
                        color="gray.400"
                        as={<Ionicons name={showRepeatPassword ? 'eye-off-outline' : 'eye-outline'} />}
                        marginLeft={3}
                      />
                    </Button>
                  }
                  onChange={(e) => {
                    if (e.nativeEvent.text !== state.newPassword) {
                      setError({ error: true, message: 'Passwords do not match' });
                    } else {
                      setError({ error: false, message: '' });
                      setState({ ...state, repeatPassword: e.nativeEvent.text });
                    }
                  }}
                />
              </HStack>
            </View>
            {error.error && <Text style={{ color: 'red' }}>{error.message}</Text>}
            <View pt={5}>
              <Button
                size="sm"
                style={style.signUpButton}
                backgroundColor={'black'}
                _text={style.signUpText}
                _pressed={style.signUpPressed}
                onPress={() => handleChangePassword()}
                isLoading={isLoading}
                disabled={isLoading || state.newPassword != state.repeatPassword}>
                {isLoading ? 'Loading...' : 'Change password'}
              </Button>
            </View>
          </VStack>
        </Center>
      </Box>
    </>
  );
};

export default EditPassword;
