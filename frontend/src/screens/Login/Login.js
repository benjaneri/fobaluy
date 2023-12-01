import { useEffect, useState } from 'react';
import { Link, HStack, Center, Box, Icon, View, VStack, Image, Input, Button, Checkbox, Text } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import style from './Style';
import { storeKey } from '../../common/session-info';
import { postLogin } from '../../services/users/users-service';

function Login({ route, navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ error: false, message: '' });
  const [state, setState] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const { setUserLoggedIn } = route.params;

  useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
    });
  }, []);

  const removeListener = () => {
    navigation.addListener('beforeRemove', (e) => {
      navigation.dispatch(e.data.action);
    });
  };

  const handleLogin = async () => {
    setIsLoading(true);
    const response = await postLogin(state.email, state.password);
    console.log(response);
    if (response.data) {
      storeKey('token', response.data.token);
      storeKey('userId', '' + response.data.userId);
      removeListener();
      setUserLoggedIn(true);
      setIsLoading(false);
    } else {
      if (response.code === 'ERR_NETWORK') {
        setError({ error: true, message: 'Something went wrong. Please try again later' });
      } else {
        setError({ error: true, message: 'You have entered an invalid username or password' });
      }
      setIsLoading(false);
      setState({ ...state, password: '' });
    }
  };

  return (
    <>
      <Box safeAreaTop flex={1} width="100%" height="100%">
        <Center flex={1}>
          <Image
            source={require('../../assets/images/login-icon.png')}
            alt="Login image"
            size="xl"
            resizeMode="contain"
          />
          <VStack space={3} mt="5">
            <View style={style.view}>
              <HStack space={2} alignItems="center">
                <Input
                  placeholder="Email"
                  _focus={{
                    borderColor: 'muted.300',
                    backgroundColor: 'muted.100',
                  }}
                  InputLeftElement={
                    <Icon size="sm" color="gray.400" as={<Ionicons name="person-outline" />} marginLeft={3} />
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
                  _focus={{
                    borderColor: 'muted.300',
                    backgroundColor: 'muted.100',
                  }}
                  InputLeftElement={
                    <Icon size="sm" color="gray.400" as={<Ionicons name="key-outline" />} marginLeft={3} />
                  }
                  onChange={(e) => setState({ ...state, password: e.nativeEvent.text })}
                  value={state.password}
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
                />
              </HStack>
            </View>
            {error.error && <Text style={[style.error, { color: 'red' }]}>{error.message}</Text>}
            <HStack justifyContent="space-between" paddingBottom={'5'}>
              <Checkbox value="remember" size="sm" colorScheme="dark" _checked={{ backgroundColor: 'black' }}>
                Remember me
              </Checkbox>
              <Link
                _text={{
                  fontWeight: 'medium',
                  fontSize: 'xs',
                }}
                alignSelf="flex-start"
                mt={1}>
                Forgot Password?
              </Link>
            </HStack>
            <Button
              size="sm"
              style={style.signInButton}
              backgroundColor={'white'}
              _text={style.signInText}
              _pressed={style.signInPressed}
              onPress={() => handleLogin()}
              disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Sign in'}
            </Button>
            <Button
              size="sm"
              style={style.signUpButton}
              backgroundColor={'black'}
              _text={style.signUpText}
              _pressed={style.signUpPressed}
              onPress={() => navigation.navigate('Signup')}>
              Sign up
            </Button>
          </VStack>
        </Center>
      </Box>
    </>
  );
}

export default Login;
