import { FlatList, Pressable } from 'react-native';
import { Box, Text, HStack, Icon, VStack } from 'native-base';
import { Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import style from './Style';

function PlayersRankingList({ players, navigation, filters, setIsRefreshing, isRefreshing }) {
  return (
    <FlatList
      data={players}
      refreshing={isRefreshing}
      onRefresh={() => {
        setIsRefreshing(true);
      }}
      renderItem={({ item, index }) => (
        <Box>
          <Pressable
            onPress={() => navigation.replace('Profile', { playerId: item.userId, publicProfile: true })}
            style={({ pressed }) => [{ backgroundColor: pressed ? '#EDEDED' : 'transparent' }]}
            key={index}>
            <HStack alignItems="center" p={5}>
              {index === 0 && !filters && (
                <Image
                  source={require('../../assets/images/1_Place_Medal_Badge.png')}
                  alt={`${item.firstName} ${item.lastName}`}
                  style={style.image}
                />
              )}
              {index === 1 && !filters && (
                <Image
                  source={require('../../assets/images/2_Place_Medal_Badge.png')}
                  alt={`${item.firstName} ${item.lastName}`}
                  style={style.image}
                />
              )}
              {index === 2 && !filters && (
                <Image
                  source={require('../../assets/images/3_Place_Medal_Badge.png')}
                  alt={`${item.firstName} ${item.lastName}`}
                  style={style.image}
                />
              )}
              {index > 2 && !filters && (
                <Box style={style.image} justifyContent="center">
                  <Text fontWeight="bold" mr={2} textAlign="center">
                    {index + 1}
                  </Text>
                </Box>
              )}
              <Image
                source={{ uri: `https://randomuser.me/api/portraits/men/${item.userId}.jpg` }}
                alt={`${item.firstName} ${item.lastName}`}
                borderRadius={50}
                style={style.image}
              />
              <VStack>
                <Text fontWeight="bold">@{item.user.username}</Text>
                <Text>
                  {item.user.profile ? item.user.profile.region + ', ' : ''}
                  {item.user.profile ? item.user.profile.country : ''}
                </Text>
              </VStack>
              <Icon ml="auto" size="md" as={<Feather name="chevron-right" size={24} color="black" />} />
            </HStack>
          </Pressable>
        </Box>
      )}
      keyExtractor={(item) => item.id.toString()}
    />
  );
}

export default PlayersRankingList;
