import { useEffect, useState } from 'react';
import { Box, Input, Icon } from 'native-base';
import { Fontisto } from '@expo/vector-icons';
import BottomNavigationBar from '../../components/bottom-navigation-bar/BottomNavigationBar';
import GamesHistoryList from './GamesHistoryList';
import GameHistoryHeader from './GamesHistoryHeader';
import DeleteGameAlert from '../../components/delete-game-alert/DeleteGameAlert';
import PageStatus from '../../components/page-status/PageStatus';
import { getUserGames } from '../../services/games/games-service';
import { getKey } from '../../common/session-info';

function Home({ navigation }) {
  const [searchText, setSearchText] = useState('');
  const [games, setGames] = useState([]);
  const [gamesAmount, setGamesAmount] = useState(games.length);
  const [deleteAlertOpened, setDeleteAlertOpened] = useState(false);
  const [gameId, setGameId] = useState(0);
  const [userId, setUserId] = useState();
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    getHistoricGames();
    setIsRefreshing(false);
  }, [userId, deleteAlertOpened, isRefreshing]);

  const getHistoricGames = async () => {
    setLoading(true);
    const userId = await getKey('userId');
    setUserId(userId);
    const data = await getUserGames(userId, false);
    if (data) {
      setGames(data);
      setGamesAmount(data.length);
    }
    setLoading(false);
  };

  return (
    <>
      <GameHistoryHeader gamesAmount={gamesAmount} />
      <Box safeAreaTop flex={1} width="100%" height="100%">
        <Input
          placeholder="Search"
          value={searchText}
          onChangeText={setSearchText}
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
              <GamesHistoryList
                games={games}
                setDeleteAlertOpened={setDeleteAlertOpened}
                setGameId={setGameId}
                navigation={navigation}
                isRefreshing={isRefreshing}
                setIsRefreshing={setIsRefreshing}
              />
            )}
            {loading && <PageStatus message="loading..." />}
            {games.length == 0 && !loading && <PageStatus message="No games played" staticImage={true} />}
          </Box>
        </Box>
        <DeleteGameAlert
          deleteAlertOpened={deleteAlertOpened}
          setDeleteAlertOpened={setDeleteAlertOpened}
          gameId={gameId}
        />
        <BottomNavigationBar navigation={navigation} page={0} />
      </Box>
    </>
  );
}

export default Home;
