import { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import { Box, Text, HStack, IconButton, Button } from 'native-base';
import { Image } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import style from './Style';
import { playersAmount } from '../../common/utils';
import { getKey } from '../../common/session-info';

function GamesList({ games, setDeleteAlertOpened, setGameId, navigation, setIsRefreshing, isRefreshing }) {
  const [userId, setUserId] = useState();

  useEffect(() => {
    getKey('userId').then((id) => {
      setUserId(id);
    });
  }, [userId]);

  return (
    <FlatList
      data={games}
      refreshing={isRefreshing}
      onRefresh={() => {
        setIsRefreshing(true);
      }}
      renderItem={({ item: game }) => (
        <Box flexDirection="row" alignItems="center" p={2}>
          <Box mr={2}>
            <Image
              source={require('../../assets/images/court.jpg')}
              alt="Court image"
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
          <HStack space={2}>
            <Box flexDirection="column" p={2}>
              {game.creatorId === userId && (
                <Box flexDirection="row-reverse" alignItems="right">
                  <IconButton
                    icon={<SimpleLineIcons name="trash" size={16} color="#96334B" />}
                    onPress={() => {
                      setDeleteAlertOpened(true);
                      setGameId(game.id);
                    }}
                  />
                </Box>
              )}
              <Box flexDirection="row" alignItems="center" mt={2}>
                <Button
                  size="xs"
                  style={style.rateButton}
                  backgroundColor={'black'}
                  _text={style.rateText}
                  _pressed={style.ratePressed}
                  onPress={() => navigation.navigate('PlayersRating', { game })}>
                  Rate players
                </Button>
              </Box>
            </Box>
          </HStack>
        </Box>
      )}
      keyExtractor={(game) => game.id.toString()}
    />
  );
}

export default GamesList;
