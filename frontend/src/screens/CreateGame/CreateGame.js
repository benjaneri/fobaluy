import { useEffect, useState } from 'react';
import { HStack, Center, Box, View, VStack, Image, Input, Button, Select, CheckIcon, Text } from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import { formatDateTime } from '../../common/utils';
import CreateGameHeader from './CreateGameHeader';
import style from './Style';
import { postGame } from '../../services/games/games-service';
import { getProfile } from '../../services/profiles/profiles-service';
import { getKey } from '../../common/session-info';

const CreateGame = ({ navigation }) => {
  const [date, setDate] = useState(new Date());
  const [hour] = useState(new Date());
  const [dateOpened, setDateOpened] = useState(false);
  const [hourOpened, setHourOpened] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({});
  const [error, setError] = useState({ error: false, message: '' });
  const [game, setGame] = useState({
    courtName: '',
    country: '',
    region: '',
    location: '',
    level: '',
    playersAmount: '',
    startDate: '',
    duration: '',
  });

  useEffect(() => {
    setLoading(true);
    getKey('userId').then((id) => {
      setGame({ ...game, creatorId: id, players: [{ id: id }] });
    });
    setLoading(false);
  }, []);

  useEffect(() => {
    setLoading(true);
    getKey('userId').then((id) => {
      if (id) {
        getProfileInfo(id);
      }
    });
    setLoading(false);
  }, []);

  const getProfileInfo = async (id) => {
    const profile = await getProfile(id);
    if (profile.dataValues) {
      setProfile(profile.dataValues);
      setGame({ ...game, country: profile.dataValues.country, region: profile.dataValues.region, creatorId: id, players: [{ id: id }] });
      console.log(profile.dataValues);
    }
  };

  const createGame = async () => {
    setLoading(true);
    if (profile) {
      setGame({ ...game, country: profile.country, region: profile.region });
    }
    const response = await postGame(game);
    if (response) {
      if (response.status != 201) {
        setError({ error: true, message: response.response.data });
        setLoading(false);
        return;
      }
      navigation.replace('Home');
    } else {
      setError({ error: true, message: response });
    }
    setLoading(false);
  };

  return (
    <>
      <CreateGameHeader navigation={navigation} />
      <Box safeAreaTop flex={1} width="100%" height="100%">
        <Center flex={1}>
          <Image
            source={require('../../assets/images/login-icon.png')}
            alt="Create game image"
            size="xl"
            resizeMode="contain"
          />
          <VStack space={4} mt="5">
            <View style={style.view}>
              <HStack alignItems="center">
                <Input
                  placeholder="Court Name"
                  _focus={{
                    borderColor: 'muted.300',
                    backgroundColor: 'muted.100',
                  }}
                  value={game.courtName}
                  onChangeText={(text) => setGame({ ...game, courtName: text })}
                />
              </HStack>
            </View>
            <View style={style.view}>
              <HStack alignItems="center">
                <Input
                  placeholder="Address"
                  _focus={{
                    borderColor: 'muted.300',
                    backgroundColor: 'muted.100',
                  }}
                  value={game.location}
                  onChangeText={(text) => setGame({ ...game, location: text })}
                />
              </HStack>
            </View>
            <View style={style.view}>
              <HStack alignItems="center">
                <Select
                  placeholder="Select level"
                  _focus={{
                    borderColor: 'muted.300',
                    backgroundColor: 'muted.100',
                  }}
                  minWidth={'100%'}
                  _selectedItem={{
                    bg: 'teal.600',
                    endIcon: <CheckIcon size="5" />,
                  }}
                  value={game.level}
                  onValueChange={(itemValue) => setGame({ ...game, level: itemValue })}>
                  <Select.Item label="Beginner" value="beginner" />
                  <Select.Item label="Intermediate" value="intermediate" />
                  <Select.Item label="Advanced" value="advanced" />
                </Select>
              </HStack>
            </View>
            <View style={style.view}>
              <HStack space={2} alignItems="center">
                <Input
                  type="number"
                  placeholder="Players Amount"
                  _focus={{
                    borderColor: 'muted.300',
                    backgroundColor: 'muted.100',
                  }}
                  keyboardType="numeric"
                  value={game.playersAmount}
                  onChangeText={(text) => setGame({ ...game, playersAmount: text })}
                />
              </HStack>
            </View>
            <View style={style.view}>
              <HStack alignItems="center" space="2%">
                <Input
                  placeholder="Date"
                  _focus={{
                    borderColor: 'muted.300',
                    backgroundColor: 'muted.100',
                  }}
                  width="49%"
                  showSoftInputOnFocus={false}
                  onPressIn={() => {
                    setDateOpened(true);
                  }}
                  value={formatDateTime(date)}
                />
                {dateOpened && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                      const currentDate = selectedDate || date;
                      setDate(currentDate);
                      setDateOpened(false);
                      setHourOpened(true);
                    }}
                  />
                )}
                {hourOpened && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    mode="time"
                    dateFormat="24hs"
                    display="default"
                    value={hour}
                    onChange={(event, selectedHour) => {
                      const selectedDate = date;
                      selectedDate.setHours(selectedHour.getHours());
                      selectedDate.setMinutes(selectedHour.getMinutes());
                      setHourOpened(false);
                      setDate(selectedDate);
                      setGame({ ...game, startDate: selectedDate });
                    }}
                  />
                )}
                <Input
                  placeholder="Game Duration"
                  _focus={{
                    borderColor: 'muted.300',
                    backgroundColor: 'muted.100',
                  }}
                  width="49%"
                  keyboardType="numeric"
                  value={game.duration}
                  onChangeText={(text) => setGame({ ...game, duration: text })}
                />
              </HStack>
            </View>
            {error.error && <Text style={[style.error, { color: 'red' }]}>{error.message}</Text>}
            <View pt={5}>
              <Button
                size="sm"
                style={style.createGameButton}
                backgroundColor={'black'}
                _text={style.createGameText}
                _pressed={style.createGamePressed}
                isLoading={loading}
                onPress={() => createGame()}>
                {loading ? 'loading...' : 'Create game'}
              </Button>
            </View>
          </VStack>
        </Center>
      </Box>
    </>
  );
};

export default CreateGame;
