import { useState } from 'react';
import { HStack, Center, Box, View, VStack, Button, Input, Select, CheckIcon, Text } from 'native-base';
import EditProfileHeader from '../EditProfile/EditProfileHeader';
import style from './Style';
import UploadImage from './UploadImage';

import { putProfile } from '../../services/profiles/profiles-service';
import Regions from '../../common/Locations';
const regionsInstance = new Regions();

const EditProfile = ({ route, navigation }) => {
  const { profile } = route.params;
  const [profileInfo, setProfileInfo] = useState(profile);
  const [error, setError] = useState({ error: false, message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [regions, setRegions] = useState(regionsInstance.getRegions(profile.country));

  const handleEditProfile = async () => {
    setIsLoading(true);
    const response = await putProfile(profileInfo, profileInfo.userId);
    if (response.data) {
      navigation.replace('Profile');
    } else {
      setError({ error: true, message: response });
    }
    setIsLoading(false);
  };

  return (
    <>
      <EditProfileHeader navigation={navigation} />
      <Box safeAreaTop flex={1} width="100%" height="100%">
        <Center flex={1}>
          <UploadImage />
          <VStack space={3} mt="10">
            <View style={style.view}>
              <HStack space={2} alignItems="center">
                <Input
                  placeholder="Name"
                  _focus={{
                    borderColor: 'muted.300',
                    backgroundColor: 'muted.100',
                  }}
                  defaultValue={profile.name}
                  onChange={(e) => setProfileInfo({ ...profileInfo, name: e.nativeEvent.text })}
                />
              </HStack>
            </View>
            <View style={style.view}>
              <HStack space={2} alignItems="center">
                <Input
                  placeholder="Lastname"
                  _focus={{
                    borderColor: 'muted.300',
                    backgroundColor: 'muted.100',
                  }}
                  defaultValue={profile.lastname}
                  onChange={(e) => setProfileInfo({ ...profileInfo, lastname: e.nativeEvent.text })}
                />
              </HStack>
            </View>
            <View style={style.view}>
              <HStack space={2} alignItems="center">
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
                  defaultValue={profile.country}
                  onValueChange={(itemValue) => {
                    setProfileInfo({ ...profileInfo, country: itemValue });
                    setRegions(regionsInstance.getRegions(itemValue));
                  }}>
                  {regionsInstance.getCountries().map((country, index) => {
                    return <Select.Item key={index} label={country.name} value={country.value} />;
                  })}
                </Select>
              </HStack>
            </View>
            <View style={style.view}>
              <HStack space={2} alignItems="center">
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
                  defaultValue={profile.region}
                  onValueChange={(itemValue) => {
                    setProfileInfo({ ...profileInfo, region: itemValue });
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
                  defaultValue={profile.gender}
                  onValueChange={(itemValue) => {
                    setProfileInfo({ ...profileInfo, gender: itemValue });
                  }}>
                  <Select.Item label="Male" value="male" />
                  <Select.Item label="Female" value="female" />
                  <Select.Item label="Other" value="other" />
                </Select>
              </HStack>
            </View>
            {error.error && <Text style={{ color: 'red' }}>{error.message}</Text>}
            <Button
              size="sm"
              style={style.signUpButton}
              backgroundColor={'black'}
              _text={style.signUpText}
              _pressed={style.signUpPressed}
              isLoading={isLoading}
              onPress={() => handleEditProfile()}>
              Edit profile
            </Button>
          </VStack>
        </Center>
      </Box>
    </>
  );
};

export default EditProfile;
