import { FlatList } from 'react-native';
import { Box, Text, VStack, Icon } from 'native-base';
import { Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { formatDateTime } from '../../common/utils';

function RatingsList({ ratings, setIsRefreshing, isRefreshing }) {
  return (
    <>
      {ratings.length > 0 && (
        <FlatList
          data={ratings}
          refreshing={isRefreshing}
          onRefresh={() => setIsRefreshing(true)}
          renderItem={({ item: rating }) => (
            <Box flexDirection="row" alignItems="center" p={2}>
              <Box mr={2}>
                <Image
                  source={{ uri: `https://randomuser.me/api/portraits/men/${rating.playerQualifier}.jpg` }}
                  alt="Profile image"
                  style={{ width: 50, height: 50, borderRadius: 25 }}
                />
              </Box>
              <Box flex={1} ml={2}>
                <VStack>
                  <Text fontSize="lg">{rating.Game.courtName}</Text>
                  <Text>
                    <Text fontWeight="bold">Qualifier:</Text> @{rating.qualifier.username}
                  </Text>
                  <Text>
                    <Text fontWeight="bold">Comment: </Text>
                    {rating.comment}
                  </Text>
                </VStack>
              </Box>
              <VStack>
                <Box flexDirection="row" alignItems="center">
                  <Icon as={<Ionicons name="star" />} color="yellow.400" size="lg" />
                  <Text ml={1} fontSize={'20'}>
                    {rating.rating}
                  </Text>
                </Box>
                <Box>
                  <Text fontSize="xs" color="gray.500">
                    {formatDateTime(new Date(rating.Game.startDate))}
                  </Text>
                </Box>
              </VStack>
            </Box>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </>
  );
}

export default RatingsList;
