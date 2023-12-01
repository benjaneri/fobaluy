import { useState } from 'react';
import { HStack, Center, Box, Icon, View, VStack, Image, Input, Button, Select, CheckIcon, Text } from 'native-base';
import { Ionicons, Fontisto } from '@expo/vector-icons';
import SignupHeader from './SignupHeader';
import style from './Style';

import { postSignup } from '../../services/users/users-service';
import { storeKey } from '../../common/session-info';

const Signup = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ error: false, message: '' });
  const [state, setState] = useState({ username: '', email: '', password: '', repeatPassword: '', country: 'Uruguay' });
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const handleSignup = async () => {
    setIsLoading(true);
    const response = await postSignup(state);
    if (response.data) {
      await storeKey('createProfile', 'true');
      navigation.navigate('Login');
    } else {
      setError({ error: true, message: response });
    }
    await storeKey('createProfile', 'true');
    setIsLoading(false);
  };

  return (
    <>
      <SignupHeader navigation={navigation} />
      <Box safeAreaTop flex={1} width="100%" height="100%">
        <Center flex={1}>
          <Image
            source={require('../../assets/images/login-icon.png')}
            alt="Signup image"
            size="xl"
            resizeMode="contain"
          />
          <VStack space={4} mt="5">
            <View style={style.view}>
              <HStack space={'2%'} alignItems="center">
                <Input
                  placeholder="Username"
                  _focus={{
                    borderColor: 'muted.300',
                    backgroundColor: 'muted.100',
                  }}
                  width={'49%'}
                  InputLeftElement={
                    <Icon size="sm" color="gray.400" as={<Ionicons name="person-outline" />} marginLeft={3} />
                  }
                  value={state.username}
                  onChange={(e) => setState({ ...state, username: e.nativeEvent.text })}
                />
                <Select
                  placeholder="Select country"
                  _focus={{
                    borderColor: 'muted.300',
                    backgroundColor: 'muted.100',
                  }}
                  minWidth={'49%'}
                  _selectedItem={{
                    bg: 'teal.600',
                    endIcon: <CheckIcon size="5" />,
                  }}
                  InputLeftElement={<Icon size="sm" color="gray.400" as={<Fontisto name="world-o" />} marginLeft={3} />}
                  value={state.country}
                  defaultValue={state.country}
                  onValueChange={(itemValue) => setState({ ...state, country: itemValue })}>
                  <Select.Item label="Uruguay" value="Uruguay" />
                  <Select.Item label="Argentina" value="Argentina" />
                </Select>
              </HStack>
            </View>
            <View style={style.view}>
              <HStack alignItems="center">
                <Input
                  type="email"
                  placeholder="Email"
                  _focus={{
                    borderColor: 'muted.300',
                    backgroundColor: 'muted.100',
                  }}
                  InputLeftElement={
                    <Icon size="sm" color="gray.400" as={<Ionicons name="mail-outline" />} marginLeft={3} />
                  }
                  value={state.email}
                  onChange={(e) => setState({ ...state, email: e.nativeEvent.text })}
                />
              </HStack>
            </View>
            <View style={style.view}>
              <HStack space={2} alignItems="center">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
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
                  onChange={(e) => setState({ ...state, password: e.nativeEvent.text })}
                  value={state.password}
                />
              </HStack>
            </View>
            <View style={style.view}>
              <HStack alignItems="center">
                <Input
                  type={showRepeatPassword ? 'text' : 'password'}
                  placeholder="Repeat password"
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
                    if (e.nativeEvent.text !== state.password) {
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
                onPress={() => handleSignup()}
                isLoading={isLoading}
                disabled={isLoading || state.password != state.repeatPassword}>
                {isLoading ? 'Loading...' : 'Sign up'}
              </Button>
            </View>
          </VStack>
        </Center>
      </Box>
    </>
  );
};

export default Signup;
