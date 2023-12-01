import { HStack, Center, Box, Icon, Pressable, View } from 'native-base';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import style from './Style';

function BottomNavigationBar({ navigation, page }) {
  const selected = page;

  return (
    <View style={style.view}>
      <Box flex={1}>
        <HStack bg="#FFFFFF" alignItems="center" shadow={6}>
          <Pressable
            cursor="pointer"
            opacity={selected === 0 ? 1 : 0.5}
            py="3"
            flex={1}
            onPress={() => {
              navigation.navigate('GamesHistory');
            }}>
            <Center>
              <Icon
                as={<Ionicons name={selected === 0 ? 'football' : 'football-outline'} />}
                style={style.buttons}
                size="5"
              />
            </Center>
          </Pressable>
          <Pressable
            cursor="pointer"
            opacity={selected === 1 ? 1 : 0.5}
            py="2"
            flex={1}
            onPress={() => {
              navigation.navigate('PlayersRanking');
            }}>
            <Center>
              <Icon as={<MaterialCommunityIcons name="podium" />} style={style.buttons} size="5" />
            </Center>
          </Pressable>
          <Pressable
            cursor="pointer"
            onPress={() => {
              navigation.navigate('Home');
            }}
            style={style.homeButton}
            _pressed={style.homeButtonPressed}
            backgroundColor={'#2DA84F'}>
            <Center>
              <Icon as={<MaterialCommunityIcons name="soccer-field" />} color="#FFFFFF" size="7" />
            </Center>
          </Pressable>
          <Pressable
            cursor="pointer"
            opacity={selected === 3 ? 1 : 0.6}
            py="2"
            flex={1}
            onPress={() => navigation.navigate('PlayerRatesHistory')}>
            <Center>
              <Icon
                as={<MaterialCommunityIcons name={selected === 3 ? 'comment-quote' : 'comment-quote-outline'} />}
                style={style.buttons}
                size="5"
              />
            </Center>
          </Pressable>
          <Pressable
            cursor="pointer"
            opacity={selected === 4 ? 1 : 0.5}
            py="2"
            flex={1}
            onPress={() => {
              navigation.navigate('Profile');
            }}>
            <Center>
              <Icon
                as={<MaterialCommunityIcons name={selected === 4 ? 'account' : 'account-outline'} />}
                style={style.buttons}
                size="5"
              />
            </Center>
          </Pressable>
        </HStack>
      </Box>
    </View>
  );
}

export default BottomNavigationBar;
