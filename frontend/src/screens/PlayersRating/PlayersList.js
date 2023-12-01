import { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { Box, Text, VStack, Button } from 'native-base';
import { Image } from 'react-native';
import style from './Style';
import { getRatingsDoneByPlayerAndGame } from '../../services/ratings/ratings-service';
import { playerAlreadyQualified } from '../../common/utils';
import { getKey } from '../../common/session-info';

function PlayersList({ players, game, navigation }) {
  const [ratings, setRatings] = useState([]);
  const [userId, setUserId] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const getRatings = async () => {
      const userId = await getKey('userId');
      setUserId(userId);
      const response = await getRatingsDoneByPlayerAndGame(userId, game.id);
      setRatings(response.data);
      setLoading(false);
    };
    getRatings();
  }, [userId]);

  return (
    <FlatList
      data={players}
      renderItem={({ item: player }) => (
        <Box flexDirection="row" alignItems="center" p={4}>
          <Box mr={2}>
            <Image
              source={{ uri: `https://randomuser.me/api/portraits/men/${player.id}.jpg` }}
              alt="Profile image"
              style={{ width: 50, height: 50, borderRadius: 25 }}
            />
          </Box>
          <Box flex={1} ml={2}>
            <Text fontSize="lg">@{player.username}</Text>
          </Box>
          <VStack>
            {!playerAlreadyQualified(ratings, player.id) && player.id != userId && !loading && (
              <Box flexDirection="row" alignItems="center" mt={2}>
                <Button
                  size="xs"
                  style={style.rateButton}
                  backgroundColor={'black'}
                  _text={style.rateText}
                  _pressed={style.ratePressed}
                  onPress={() => navigation.navigate('PlayerRate', { player, game })}>
                  Rate player
                </Button>
              </Box>
            )}
            {player.id == userId && !loading && (
              <Box flexDirection="row" alignItems="center" mt={2}>
                <Button size="xs" backgroundColor={'blue.500'} disabled={true}>
                  You
                </Button>
              </Box>
            )}
          </VStack>
        </Box>
      )}
      keyExtractor={(item) => item.id.toString()}
    />
  );
}

export default PlayersList;
