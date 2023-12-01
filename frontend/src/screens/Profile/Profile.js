import { useEffect, useState } from 'react';
import { FlatList, HStack, Center, Box, Icon, View, VStack, Image, Button, Text } from 'native-base';
import { Ionicons, EvilIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import BottomNavigationBar from '../../components/bottom-navigation-bar/BottomNavigationBar';
import PageStatus from '../../components/page-status/PageStatus';
import ProfileHeader from './ProfileHeader';
import style from './Style';
import DeleteUserAlert from './DeleteUserAlert';

import { getProfile } from '../../services/profiles/profiles-service';
import { getRecord } from '../../services/records/records-service';
import { getUserAchievements } from '../../services/achievements/achievements-service';
import { getKey, deleteAllKeys } from '../../common/session-info';

const Profile = ({ route, navigation }) => {
  const [profile, setProfile] = useState({});
  const [record, setRecord] = useState({});
  const [achievements, setAchievements] = useState({});
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState();
  const [deleteAlertOpened, setDeleteAlertOpened] = useState(false);
  const { setUserLoggedIn, publicProfile, playerId } = route.params;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let userId;
    if (publicProfile) {
      setUserId(playerId);
      userId = playerId;
    } else {
      userId = await getKey('userId');
      const createProfile = await getKey('createProfile');
      if (createProfile) {
        navigation.replace('CreateProfile');
      }
      setUserId(userId);
    }
    fetchProfile(userId);
    fetchRecord(userId);
    fetchAchievements(userId);
  };

  const fetchProfile = async (userId) => {
    const response = await getProfile(userId);
    if (!response) {
      return;
    }
    setProfile(response.dataValues);
    setLoading(false);
  };

  const fetchRecord = async (userId) => {
    const response = await getRecord(userId);
    if (!response) {
      return;
    }
    setRecord(response);
  };

  const fetchAchievements = async (userId) => {
    const response = await getUserAchievements(userId);
    if (!response) {
      return;
    }
    setAchievements(response);
  };

  const handleLogout = async () => {
    await deleteAllKeys();
    setUserLoggedIn(false);
  };

  return (
    <>
      <ProfileHeader
        setDeleteAlertOpened={setDeleteAlertOpened}
        navigation={navigation}
        publicProfile={publicProfile}
      />
      <Box safeAreaTop flex={1} width="100%" height="100%">
        {loading && (
          <Box height="92%">
            <PageStatus message="Loading..." />
          </Box>
        )}
        {!loading && (
          <Center flex={1}>
            <Image
              source={{ uri: `https://randomuser.me/api/portraits/men/${profile.userId}.jpg` }}
              alt="Profile image"
              size="xl"
              resizeMode="contain"
              style={{ width: 100, height: 100, borderRadius: 100, borderColor: 'black', borderWidth: 0.1 }}
            />
            <VStack mt="5" width="75%">
              <HStack alignItems="center" justifyContent="center">
                <Text color="gray.700" fontSize="24">
                  {profile.name + ' '}
                  {profile.lastname}
                </Text>
              </HStack>
              <HStack alignItems="center" justifyContent="center">
                <Text color="gray.400" ml="2" fontSize="16">
                  {profile.region}, {profile.country}
                </Text>
              </HStack>
              <HStack alignItems="center" justifyContent="center">
                <Text color="gray.400" ml="2" fontSize="16">
                  Gender: {profile.gender}
                </Text>
              </HStack>
              <HStack pt="10%">
                <Box width="50%">
                  <Text color="black" fontSize="30" textAlign={'center'}>
                    {record.gamesPlayed}
                  </Text>
                  <Text color="black" fontSize="20" fontWeight="light" textAlign={'center'}>
                    Games played
                  </Text>
                </Box>
                <Box width="50%">
                  <Text color="black" fontSize="30" textAlign={'center'}>
                    {record.avgRating}
                  </Text>
                  <Text color="black" fontSize="20" fontWeight="light" textAlign={'center'}>
                    Average rating
                  </Text>
                </Box>
              </HStack>
              <HStack pt="15%">
                <Text color="black" fontSize="16" fontWeight="bold">
                  Achievements
                </Text>
              </HStack>
              <HStack>
                <FlatList
                  data={achievements}
                  maxH={150}
                  renderItem={({ item }) => (
                    <HStack space={2} pt={3} alignItems="center">
                      {item.length > 0 && item[0].id.includes('play') && (
                        <Icon
                          as={<Ionicons name="football-outline" size={24} color="black" />}
                          color="black"
                          size="xl"
                        />
                      )}
                      {item.length > 0 && item[0].id.includes('create') && (
                        <Icon as={<Ionicons name="create-outline" size={24} color="black" />} color="black" size="xl" />
                      )}
                      {item.length > 0 && item[0].id.includes('goodbehaviour') && (
                        <Icon as={<Ionicons name="happy-outline" size={24} color="black" />} color="black" size="xl" />
                      )}
                      {item.length > 0 && item[0].id.includes('rate') && (
                        <Icon
                          as={<MaterialCommunityIcons name="lead-pencil" size={24} color="black" />}
                          color="black"
                          size="xl"
                        />
                      )}
                      {item.length == 0 && (
                        <Icon as={<EvilIcons name="question" size={24} color="black" />} color="black" size="xl" />
                      )}
                      <Text color="black" fontSize="16">
                        {item.length > 0 ? item[0].title : 'Unkown achievement'}
                      </Text>
                    </HStack>
                  )}
                />
              </HStack>
              {!publicProfile && (
                <HStack space={2} pt="15%" alignItems="center">
                  <View width="49.5%">
                    <Button
                      size="sm"
                      style={style.editButton}
                      backgroundColor={'black'}
                      _text={style.editText}
                      _pressed={style.editPressed}
                      onPress={() => navigation.navigate('EditProfile', { profile })}>
                      Edit profile
                    </Button>
                  </View>
                  <View width="49%">
                    <Button
                      size="sm"
                      backgroundColor={'#96334B'}
                      _pressed={style.logoutPressed}
                      onPress={() => handleLogout()}>
                      Logout
                    </Button>
                  </View>
                </HStack>
              )}
            </VStack>
          </Center>
        )}
        <DeleteUserAlert
          deleteAlertOpened={deleteAlertOpened}
          setDeleteAlertOpened={setDeleteAlertOpened}
          userId={userId}
          setUserLoggedIn={setUserLoggedIn}
        />
        <BottomNavigationBar navigation={navigation} page={publicProfile ? 1 : 4} />
      </Box>
    </>
  );
};

export default Profile;
