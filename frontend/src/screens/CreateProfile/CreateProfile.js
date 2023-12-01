import { useState } from 'react';
import { HStack, Center, Box, Icon, View, VStack, Image, Input, Button, Select, CheckIcon, Text } from 'native-base';
import { Ionicons, Fontisto } from '@expo/vector-icons';
import style from './Style';
import CreateProfileHeader from './CreateProfileHeader';

import { postProfile } from '../../services/profiles/profiles-service';
import { deleteKey, getKey } from '../../common/session-info';
import Regions from '../../common/Locations';
const regionsInstance = new Regions();

const CreateProfile = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ error: false, message: '' });
  const [state, setState] = useState({ name: '', lastname: '', region: '', gender: '' });
  const [regions, setRegions] = useState(regionsInstance.getRegions('Uruguay'));

  const handleCreateProfile = async () => {
    setIsLoading(true);
    const userId = await getKey('userId');
    const response = await postProfile(state, userId);
    if (response) {
      if (response.status != 201) {
        setError({ error: true, message: response.response.data });
        setIsLoading(false);
        return;
      } else {
        await deleteKey('createProfile');
        navigation.navigate('Home');
      }
      await deleteKey('createProfile');
    } else {
      setError({ error: true, message: response });
    }
    setIsLoading(false);
  };

  return (
    <>
      <CreateProfileHeader navigation={navigation} />
      <Box safeAreaTop flex={1} width="100%" height="100%">
        <Center flex={1}>
          <Image
            source={require('../../assets/images/login-icon.png')}
            alt="Create profile image"
            size="xl"
            resizeMode="contain"
          />
          <VStack space={4} mt="5">
            <View style={style.view}>
              <HStack space={'2%'} alignItems="center">
                <Input
                  placeholder="Name"
                  _focus={{
                    borderColor: 'muted.300',
                    backgroundColor: 'muted.100',
                  }}
                  width={'100%'}
                  InputLeftElement={
                    <Icon size="sm" color="gray.400" as={<Ionicons name="person-outline" />} marginLeft={3} />
                  }
                  value={state.name}
                  onChange={(e) => setState({ ...state, name: e.nativeEvent.text })}
                />
              </HStack>
            </View>
            <View style={style.view}>
              <HStack alignItems="center">
                <Input
                  placeholder="Lastname"
                  _focus={{
                    borderColor: 'muted.300',
                    backgroundColor: 'muted.100',
                  }}
                  width={'100%'}
                  InputLeftElement={
                    <Icon size="sm" color="gray.400" as={<Ionicons name="person-outline" />} marginLeft={3} />
                  }
                  value={state.lastname}
                  onChange={(e) => setState({ ...state, lastname: e.nativeEvent.text })}
                />
              </HStack>
            </View>
            <View style={style.view}>
              <HStack space={2} alignItems="center">
                <Select
                  placeholder="Select country"
                  _focus={{
                    borderColor: 'muted.300',
                    backgroundColor: 'muted.100',
                  }}
                  minWidth={'100%'}
                  _selectedItem={{
                    bg: 'teal.600',
                    endIcon: <CheckIcon size="5" />,
                  }}
                  defaultValue={state.country}
                  onValueChange={(itemValue) => {
                    setState({ ...state, country: itemValue });
                    setRegions(regionsInstance.getRegions(itemValue));
                  }}>
                  {regionsInstance.getCountries().map((country, index) => {
                    return <Select.Item key={index} label={country.name} value={country.value} />;
                  })}
                </Select>
              </HStack>
            </View>
            <View style={style.view}>
              <HStack alignItems="center">
                <Select
                  placeholder="Select region"
                  _focus={{
                    borderColor: 'muted.300',
                    backgroundColor: 'muted.100',
                  }}
                  minWidth={'100%'}
                  _selectedItem={{
                    bg: 'teal.600',
                    endIcon: <CheckIcon size="5" />,
                  }}
                  InputLeftElement={<Icon size="sm" color="gray.400" as={<Fontisto name="world-o" />} marginLeft={3} />}
                  value={state.region}
                  onValueChange={(itemValue) => {
                    setState({ ...state, region: itemValue });
                  }}>
                  {regions.map((region, index) => {
                    return <Select.Item key={index} label={region.name} value={region.value} />;
                  })}
                </Select>
              </HStack>
            </View>
            <View style={style.view}>
              <HStack space={2} alignItems="center">
                <Select
                  placeholder="Select gender"
                  _focus={{
                    borderColor: 'muted.300',
                    backgroundColor: 'muted.100',
                  }}
                  minWidth={'100%'}
                  _selectedItem={{
                    bg: 'teal.600',
                    endIcon: <CheckIcon size="5" />,
                  }}
                  value={state.gender}
                  onValueChange={(itemValue) => setState({ ...state, gender: itemValue })}>
                  <Select.Item label="Male" value="male" />
                  <Select.Item label="Female" value="female" />
                  <Select.Item label="Other" value="other" />
                </Select>
              </HStack>
            </View>
            {error.error && <Text style={{ color: 'red' }}>{error.message}</Text>}
            <View pt={5}>
              <Button
                size="sm"
                style={style.createProfileButton}
                backgroundColor={'black'}
                _text={style.createProfileText}
                _pressed={style.createProfilePressed}
                onPress={() => handleCreateProfile()}
                isLoading={isLoading}
                disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Create profile'}
              </Button>
            </View>
          </VStack>
        </Center>
      </Box>
    </>
  );
};

export default CreateProfile;
