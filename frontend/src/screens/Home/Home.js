import { useEffect, useState } from 'react';
import { Text, Box, Input, Icon, HStack, Pressable } from 'native-base';
import { Fontisto } from '@expo/vector-icons';
import BottomNavigationBar from '../../components/bottom-navigation-bar/BottomNavigationBar';
import HomeHeader from './HomeHeader';
import GamesList from './GamesList';
import DeleteGameAlert from '../../components/delete-game-alert/DeleteGameAlert';
import PageStatus from '../../components/page-status/PageStatus';
import { getGames, getUserGames } from '../../services/games/games-service';
import { getKey } from '../../common/session-info';

function Home({ navigation }) {
  const [searchText, setSearchText] = useState('');
  const [selectedGamesBox, setSelectedGamesBox] = useState(1);
  const [games, setGames] = useState([]);
  const [gamesFiltered, setGamesFiltered] = useState([]);
  const [filters, setFilters] = useState({ active: 'true', level: '', playersAmount: '' });
  const [gamesAmount, setGamesAmount] = useState(0);
  const [deleteAlertOpened, setDeleteAlertOpened] = useState(false);
  const [gameId, setGameId] = useState(null);
  const [userId, setUserId] = useState();
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    getKey('userId').then((id) => {
      setUserId(id);
    });
    getKey('createProfile').then((createProfile) => {
      if (createProfile) {
        navigation.replace('CreateProfile');
      }
    });
  }, [userId]);

  useEffect(() => {
    filteredGames();
  }, [filters]);

  useEffect(() => {
    setLoading(true);
    selectedGamesBox == 1 ? getAllGames() : getMyGames();
    setIsRefreshing(false);
  }, [selectedGamesBox, isRefreshing]);

  const getAllGames = async () => {
    const data = await getGames(true);
    if (data) {
      setGames(data);
      setGamesAmount(data.length);
    }
    setLoading(false);
  };

  const getMyGames = async () => {
    const data = await getUserGames(userId, true);
    if (data) {
      setGames(data);
      setGamesAmount(data.length);
    }
    setLoading(false);
  };

  const filteredGames = async () => {
    const data = await getGames('true', filters.playersAmount, filters.courtName, filters.level);
    if (data) {
      setGames(data);
      setGamesAmount(data.length);
    }
    setLoading(false);
  };

  const handleSearch = (text) => {
    setSearchText(text);
    let filteredGames = games.filter((game) => {
      return game.courtName.toLowerCase().includes(text.toLowerCase());
    });
    setGamesFiltered(filteredGames);
  };

  return (
    <>
      <HomeHeader
        gamesAmount={gamesAmount}
        navigation={navigation}
        filters={filters}
        setFilters={setFilters}
        setSelectedGamesBox={setSelectedGamesBox}
      />
      <Box safeAreaTop flex={1} width="100%" height="100%">
        <Input
          placeholder="Search"
          value={searchText}
          onChangeText={handleSearch}
          alignSelf={'center'}
          width={'90%'}
          _focus={{
            borderColor: 'muted.300',
            backgroundColor: 'muted.100',
          }}
          InputLeftElement={
            <Icon size="sm" color="gray.400" as={<Fontisto name="search" size={24} color="black" />} marginLeft={3} />
          }
        />
        <Box pt="5" height="100%">
          <Box height="79%">
            {!loading && games.length > 0 && (
              <GamesList
                games={searchText ? gamesFiltered : games}
                navigation={navigation}
                setDeleteAlertOpened={setDeleteAlertOpened}
                setGameId={setGameId}
                section={selectedGamesBox}
                userId={userId}
                setIsRefreshing={setIsRefreshing}
                isRefreshing={isRefreshing}
              />
            )}
            {loading && <PageStatus message="Loading..." />}
            {games.length == 0 && !loading && <PageStatus message="No games found" staticImage={true} />}
          </Box>
          <Box height="11%">
            <HStack justifyContent="center" alignItems="center">
              <Pressable
                width="50%"
                height="100%"
                alignItems="center"
                justifyContent="center"
                backgroundColor={selectedGamesBox == 1 ? '#EDEDED' : 'transparent'}
                onPress={() => {
                  setSelectedGamesBox(1);
                  setGames([]);
                }}>
                <Text textAlign="center">All games</Text>
              </Pressable>
              <Pressable
                width="50%"
                height="100%"
                alignItems="center"
                justifyContent="center"
                backgroundColor={selectedGamesBox == '2' ? '#EDEDED' : 'transparent'}
                onPress={() => {
                  setSelectedGamesBox(2);
                  setGames([]);
                }}>
                <Text textAlign="center">My games</Text>
              </Pressable>
            </HStack>
          </Box>
        </Box>
        <DeleteGameAlert
          deleteAlertOpened={deleteAlertOpened}
          setDeleteAlertOpened={setDeleteAlertOpened}
          setIsRefreshing={setIsRefreshing}
          gameId={gameId}
        />
        <BottomNavigationBar navigation={navigation} page={2} />
      </Box>
    </>
  );
}

export default Home;
