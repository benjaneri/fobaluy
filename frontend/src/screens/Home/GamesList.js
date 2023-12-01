import { FlatList } from 'react-native';
import { Box, Text, HStack, IconButton, VStack, Pressable, Icon } from 'native-base';
import { Image } from 'react-native';
import { Feather, SimpleLineIcons } from '@expo/vector-icons';
import { isUserGamePlayer } from '../../services/games/games-service';
import { playersAmount } from '../../common/utils';

function GamesList({ games, section, navigation, setGameId, setDeleteAlertOpened, userId, setIsRefreshing, isRefreshing }) {
  const userJoined = (game) => {
    return isUserGamePlayer(game, userId);
  };

  return (
    <>
      {games.length > 0 && (
        <FlatList
          data={games}
          refreshing={isRefreshing}
          onRefresh={() => {setIsRefreshing(true);}}
          renderItem={({ item: game }) => (
            <Box flexDirection="row" alignItems="center" p={2}>
              <Box mr={2}>
                <Image
                  source={require('../../assets/images/court.jpg')}
                  alt="Profile image"
                  style={{ width: 50, height: 50, borderRadius: 25 }}
                />
              </Box>
              <Box flex={1} ml={2}>
                <Text fontSize="lg">{game.courtName}</Text>
                <Text>
                  <Text fontWeight="bold">Level:</Text> {game.level}
                </Text>
                <Text>
                  <Text fontWeight="bold">Players:</Text> {playersAmount(game)}
                </Text>
              </Box>
              <VStack>
                {game.creatorId == userId && section == 2 && (
                  <HStack space={2}>
                    <IconButton
                      icon={<Feather name="edit" size={16} color="black" />}
                      onPress={() => navigation.navigate('EditGame', { game })}
                    />
                    <IconButton
                      icon={<SimpleLineIcons name="trash" size={16} color="#96334B" />}
                      onPress={() => {
                        setDeleteAlertOpened(true);
                        setGameId(game.id);
                      }}
                    />
                  </HStack>
                )}
                {userJoined(game) && section == 1 && (
                  <Box width="100%" pt={2}>
                    <Box flexDirection="row-reverse" alignItems="center">
                      <Box bg="blue.500" borderRadius="full" px={2} width="60px">
                        <Text color="white" fontSize="sm">
                          Joined
                        </Text>
                      </Box>
                    </Box>
                  </Box>
                )}
                {!userJoined(game) && section == 1 && (
                  <Box width="100%" pt={2}>
                    <Box flexDirection="row-reverse" alignItems="center">
                      <Box bg="#2DA84F" borderRadius="full" px={2}>
                        <Text color="white" fontSize="sm">
                          Join
                        </Text>
                      </Box>
                    </Box>
                  </Box>
                )}
                <Pressable
                  onPress={() => navigation.navigate('GameDetails', { game, userId })}
                  style={({ pressed }) => [{ backgroundColor: pressed ? '#EDEDED' : 'transparent' }]}>
                  <HStack flexDirection="row-reverse" alignItems="center" p={4}>
                    <Icon size="md" as={<Feather name="chevron-right" size={24} color="black" />} color="black" />
                  </HStack>
                </Pressable>
              </VStack>
            </Box>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </>
  );
}

export default GamesList;
