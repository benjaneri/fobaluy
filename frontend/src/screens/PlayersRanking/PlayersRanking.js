import { useEffect, useState } from 'react';
import { Text, Box, Input, Icon, HStack, Pressable } from 'native-base';
import { Fontisto } from '@expo/vector-icons';
import BottomNavigationBar from '../../components/bottom-navigation-bar/BottomNavigationBar';
import PlayersRankingHeader from './PlayersRankingHeader';
import PlayersRankingList from './PlayersRankingList';
import PageStatus from '../../components/page-status/PageStatus';
import { getRecords, getRecordsByLevel, getRecordsByRegion } from '../../services/records/records-service';

function PlayersRanking({ navigation }) {
  const [searchText, setSearchText] = useState('');
  const [selectedRankingBox, setSelectedRankingBox] = useState(1);
  const [playersRanking, setPlayersRanking] = useState([]);
  const [filteredPlayersRanking, setFilteredPlayersRanking] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const oneThird = 100 / 3;

  const handleBoxClick = async (box) => {
    setLoading(true);
    setSelectedRankingBox(box);
    setSearchText('');
    if (box == 1) {
      getTopRecordsByRegion();
    } else if (box == 2) {
      getTopRecords();
    } else {
      getTopRecordsByLevel();
    }
    setIsRefreshing(false);
  };

  const getTopRecords = async () => {
    const records = await getRecords(100);
    if (records) {
      setPlayersRanking(records);
      setLoading(false);
    }
  };

  const getTopRecordsByRegion = async () => {
    const records = await getRecordsByRegion(100);
    if (records) {
      setPlayersRanking(records);
      setLoading(false);
    }
  };

  const getTopRecordsByLevel = async () => {
    const records = await getRecordsByLevel(100);
    if (records) {
      setPlayersRanking(records);
      setLoading(false);
    }
  };

  const handleSearch = (text) => {
    setSearchText(text);
    let filteredPlayers = playersRanking;
    filteredPlayers = filteredPlayers.filter((player) => {
      return player.user.username.toLowerCase().includes(text.toLowerCase());
    });
    setFilteredPlayersRanking(filteredPlayers);
  };

  useEffect(() => {
    setLoading(true);
    getTopRecordsByRegion();
  }, []);

  useEffect(() => {
    handleBoxClick(selectedRankingBox);
  }, [isRefreshing]);

  return (
    <>
      <PlayersRankingHeader />
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
          {loading && <PageStatus message="Loading..." />}
          {!loading && (
            <Box height="79%">
              <PlayersRankingList
                players={searchText ? filteredPlayersRanking : playersRanking}
                navigation={navigation}
                filters={searchText}
                setIsRefreshing={setIsRefreshing}
                isRefreshing={isRefreshing}
              />
            </Box>
          )}
          <Box height="21%">
            <HStack justifyContent="center" alignItems="center" height="100%">
              <Pressable
                width={oneThird + '%'}
                height="100%"
                alignItems="center"
                backgroundColor={selectedRankingBox == 1 ? '#EDEDED' : 'transparent'}
                onPress={() => handleBoxClick(1)}
                pt="3">
                <Text textAlign="center">Regional</Text>
              </Pressable>
              <Pressable
                width={oneThird + '%'}
                height="100%"
                alignItems="center"
                backgroundColor={selectedRankingBox == 2 ? '#EDEDED' : 'transparent'}
                onPress={() => handleBoxClick(2)}
                pt="3">
                <Text textAlign="center">Global</Text>
              </Pressable>
              <Pressable
                width={oneThird + '%'}
                height="100%"
                alignItems="center"
                backgroundColor={selectedRankingBox == 3 ? '#EDEDED' : 'transparent'}
                onPress={() => handleBoxClick(3)}
                pt="3">
                <Text textAlign="center">Level</Text>
              </Pressable>
            </HStack>
          </Box>
        </Box>
        <BottomNavigationBar navigation={navigation} page={1} />
      </Box>
    </>
  );
}

export default PlayersRanking;
