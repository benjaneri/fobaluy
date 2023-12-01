import { useEffect, useState } from 'react';
import { HStack, Center, Box, View, VStack, Button, Input, Image, Text } from 'native-base';
import StarRating from 'react-native-star-rating-widget';
import PlayerRateHeader from './PlayerRateHeader';
import style from './Style';
import { postRating } from '../../../services/ratings/ratings-service';
import { getKey } from '../../../common/session-info';

const PlayerRate = ({ route, navigation }) => {
  const { player, game } = route.params;
  const [rating, setRating] = useState({ rating: 0, comment: '', played: true });
  const [error, setError] = useState({ error: false, message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState();

  useEffect(() => {
    getKey('userId').then((id) => {
      setUserId(id);
    });
  }, [userId]);

  const handleRating = async () => {
    setIsLoading(true);
    const ratingData = {
      playerQualified: player.id,
      playerQualifier: userId,
      gameId: game.id,
      ...rating,
    };
    const response = await postRating(ratingData);
    if (response.data) {
      navigation.replace('PlayersRating', { game });
    } else {
      setError({ error: true, message: response });
    }
    setIsLoading(false);
  };

  return (
    <>
      <PlayerRateHeader navigation={navigation} game={game} />
      <Box safeAreaTop flex={1} width="100%" height="100%">
        <Center flex={1}>
          <Image
            source={{ uri: `https://randomuser.me/api/portraits/men/${player.id}.jpg` }}
            alt="Profile image"
            size="xl"
            resizeMode="contain"
            style={{ width: 100, height: 100, borderRadius: 100, borderColor: 'black', borderWidth: 0.1 }}
          />
          <HStack justifyContent="center" mb={12}>
            <Text color="gray.600" fontSize="20" fontWeight="bold">
              @{player.username}
            </Text>
          </HStack>
          <HStack justifyContent="center">
            <StarRating
              rating={rating.rating}
              onChange={(value) => setRating({ ...rating, rating: value })}
              starSize={40}
              color="black"
            />
          </HStack>
          <VStack space={3} mt="10">
            <View style={style.view}>
              <HStack space={2} alignItems="center">
                <Input
                  placeholder="Comment (optional)"
                  type="text"
                  _focus={{
                    borderColor: 'muted.300',
                    backgroundColor: 'muted.100',
                  }}
                  multiline={true}
                  numberOfLines={4}
                  value={rating.comment}
                  onChange={(e) => setRating({ ...rating, comment: e.nativeEvent.text })}
                />
              </HStack>
              {error.error && <Text style={{ color: 'red' }}>{error.message}</Text>}
            </View>
            <Button
              size="sm"
              style={style.signUpButton}
              backgroundColor={'black'}
              _text={style.signUpText}
              _pressed={style.signUpPressed}
              onPress={handleRating}
              isLoading={isLoading}
              disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Submit rating'}
            </Button>
          </VStack>
        </Center>
      </Box>
    </>
  );
};

export default PlayerRate;
