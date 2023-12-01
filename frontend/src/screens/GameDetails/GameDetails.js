import { useState } from 'react';
import { HStack, Box, View, VStack, Image, Button, Text, FlatList } from 'native-base';
import BottomNavigationBar from '../../components/bottom-navigation-bar/BottomNavigationBar';
import GameHeader from './GameHeader';
import style from './Style';
import { formatDateTime } from '../../common/utils';
import { joinGame, leaveGame, isUserGamePlayer } from '../../services/games/games-service';
import { playersAmount } from '../../common/utils';

const GameDetails = ({ route, navigation }) => {
  const [loading, setLoading] = useState(false);
  const { game, userId } = route.params;
  const userJoined = isUserGamePlayer(game, userId);

  const handleJoinGame = async () => {
    setLoading(true);
    await joinGame(game.id, userId)
      .then(() => {
        navigation.replace('Home');
      })
      .catch((error) => {
        console.log(error);
      });
    setLoading(false);
  };

  const handleLeaveGame = async () => {
    setLoading(true);
    await leaveGame(game.id, userId)
      .then(() => {
        navigation.replace('Home');
      })
      .catch((error) => {
        console.log(error);
      });
    setLoading(false);
  };

  return (
    <>
      <GameHeader navigation={navigation} />
      <Box safeAreaTop flex={1} width="100%" height="100%">
        <Image
          source={require('../../assets/images/court.jpg')}
          alt="Signup image"
          size="xl"
          resizeMode="contain"
          style={{ width: '100%', height: '32%', borderColor: 'black', borderWidth: 0.1 }}
        />
        <Box pt={'5%'}>
          <VStack mt="2" width="100%" alignItems="center">
            <HStack alignItems="center" justifyContent="center">
              <Text color="gray.700" fontSize="24">
                {game.courtName}
              </Text>
            </HStack>
            <HStack alignItems="center" justifyContent="center">
              <Text color="gray.700" fontSize="16">
                <Text fontWeight={'bold'}>Date:</Text> {formatDateTime(new Date(game.startDate))}
              </Text>
            </HStack>
            <HStack alignItems="center" justifyContent="center">
              <Text color="gray.700" fontSize="16">
                <Text fontWeight={'bold'}>Level:</Text> {game.level}
              </Text>
            </HStack>
            <HStack alignItems="center" justifyContent="center">
              <Text color="gray.700" fontSize="16">
                <Text fontWeight={'bold'}> Players: </Text> {playersAmount(game)}
              </Text>
            </HStack>
            <HStack width="80%">
              <VStack>
                <Text color="gray.700" fontSize="15" fontWeight="bold" mt={5}>
                  Joined players:
                </Text>
                <FlatList
                  data={game.players}
                  height="40%"
                  minW="100%"
                  renderItem={({ item }) => (
                    <HStack space={2} pt={3} alignItems="center">
                      <Image
                        source={{ uri: `https://randomuser.me/api/portraits/men/${item.id}.jpg` }}
                        alt="Profile image"
                        style={{ width: 50, height: 50, borderRadius: 25 }}
                      />
                      <Text color="gray.700" fontSize="16" pl={2}>
                        @{item.username}
                      </Text>
                    </HStack>
                  )}
                />
              </VStack>
            </HStack>
            <HStack space={2} alignItems="center">
              <View pt={5} width="80%">
                {!userJoined && (
                  <Button
                    size="sm"
                    variant="outline"
                    style={style.joinButton}
                    backgroundColor={'#2DA84F'}
                    _text={style.joinText}
                    _pressed={style.joinPressed}
                    isLoading={loading}
                    disabled={loading}
                    onPress={handleJoinGame}>
                    {loading ? 'Loading...' : 'Join game'}
                  </Button>
                )}
                {userJoined && (
                  <Button
                    size="sm"
                    variant="outline"
                    style={style.leaveButton}
                    backgroundColor={'#96334B'}
                    _text={style.leaveText}
                    _pressed={style.leavePressed}
                    isLoading={loading}
                    disabled={loading}
                    onPress={handleLeaveGame}>
                    {loading ? 'Loading...' : 'Leave game'}
                  </Button>
                )}
              </View>
            </HStack>
          </VStack>
        </Box>
      </Box>
      <BottomNavigationBar navigation={navigation} page={2} />
    </>
  );
};

export default GameDetails;
