import { useState } from 'react';
import { HStack, Center, Box, View, VStack, Image, Input, Button, Select, CheckIcon, Text } from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import { formatDateTime } from '../../common/utils';
import EditGameHeader from './EditGameHeader';
import style from './Style';

import { putGame } from '../../services/games/games-service';

const EditGame = ({ route, navigation }) => {
  const [date, setDate] = useState(new Date());
  const [dateOpened, setDateOpened] = useState(false);
  const [hourOpened, setHourOpened] = useState(false);
  const [error, setError] = useState({ error: false, message: '' });
  const [loading, setLoading] = useState(false);
  const { game } = route.params;
  const [editGame, setEditGame] = useState(game);

  const editGameHandler = async () => {
    setLoading(true);
    editGame.players = [];
    const response = await putGame(game.id, editGame);
    if (response.data) {
      navigation.replace('Home');
    } else {
      setError({ error: true, message: response });
    }
    setLoading(false);
  };

  return (
    <>
      <EditGameHeader navigation={navigation} />
      <Box safeAreaTop flex={1} width="100%" height="100%">
        <Center flex={1}>
          <Image
            source={require('../../assets/images/login-icon.png')}
            alt="Edit game image"
            size="xl"
            resizeMode="contain"
          />
          <VStack space={4} mt="5">
            <View style={style.view}>
              <HStack alignItems="center">
                <Input
                  placeholder="Court Name"
                  defaultValue={game.courtName}
                  value={editGame.courtName}
                  onChange={(e) => setEditGame({ ...editGame, courtName: e.nativeEvent.text })}
                  _focus={{
                    borderColor: 'muted.300',
                    backgroundColor: 'muted.100',
                  }}
                />
              </HStack>
            </View>
            <View style={style.view}>
              <HStack alignItems="center">
                <Input
                  placeholder="Location"
                  defaultValue={game.location}
                  value={editGame.location}
                  onChange={(e) => setEditGame({ ...editGame, location: e.nativeEvent.text })}
                  _focus={{
                    borderColor: 'muted.300',
                    backgroundColor: 'muted.100',
                  }}
                />
              </HStack>
            </View>
            <View style={style.view}>
              <HStack alignItems="center">
                <Select
                  placeholder="Select level"
                  defaultValue={game.level}
                  onValueChange={(itemValue) => setEditGame({ ...editGame, level: itemValue })}
                  _focus={{
                    borderColor: 'muted.300',
                    backgroundColor: 'muted.100',
                  }}
                  minWidth={'100%'}
                  _selectedItem={{
                    bg: 'teal.600',
                    endIcon: <CheckIcon size="5" />,
                  }}>
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
                  placeholder="Amount"
                  defaultValue={'' + game.playersAmount}
                  value={'' + editGame.playersAmount}
                  onChange={(e) => setEditGame({ ...editGame, playersAmount: e.nativeEvent.text })}
                  _focus={{
                    borderColor: 'muted.300',
                    backgroundColor: 'muted.100',
                  }}
                  keyboardType="numeric"
                />
              </HStack>
            </View>
            <View style={style.view}>
              <HStack alignItems="center" space="2%">
                <Input
                  placeholder="Date"
                  value={formatDateTime(new Date(game.startDate))}
                  _focus={{
                    borderColor: 'muted.300',
                    backgroundColor: 'muted.100',
                  }}
                  width="49%"
                  showSoftInputOnFocus={false}
                  onPressIn={() => {
                    setDateOpened(true);
                  }}
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
                    value={new Date()}
                    onChange={(event, selectedHour) => {
                      const selectedDate = date;
                      selectedDate.setHours(selectedHour.getHours());
                      selectedDate.setMinutes(selectedHour.getMinutes());
                      setHourOpened(false);
                      setDate(selectedDate);
                      setEditGame({ ...editGame, startDate: selectedDate });
                    }}
                  />
                )}
                <Input
                  placeholder="Game Duration"
                  type="number"
                  defaultValue={'' + game.duration}
                  value={'' + editGame.duration}
                  _focus={{
                    borderColor: 'muted.300',
                    backgroundColor: 'muted.100',
                  }}
                  width="49%"
                  keyboardType="numeric"
                />
              </HStack>
            </View>
            {error.error && <Text style={[style.error, { color: 'red' }]}>{error.message}</Text>}
            <View pt={5}>
              <Button
                size="sm"
                style={style.signUpButton}
                backgroundColor={'black'}
                _text={style.signUpText}
                _pressed={style.signUpPressed}
                isLoading={loading}
                disabled={loading}
                onPress={() => editGameHandler()}>
                Save game
              </Button>
            </View>
          </VStack>
        </Center>
      </Box>
    </>
  );
};

export default EditGame;
