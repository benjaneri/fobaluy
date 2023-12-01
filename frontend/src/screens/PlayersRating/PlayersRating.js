import { useState } from 'react';
import { Box, Input, Icon } from 'native-base';
import { Fontisto } from '@expo/vector-icons';
import BottomNavigationBar from '../../components/bottom-navigation-bar/BottomNavigationBar';
import PlayersRatingHeader from './PlayersRatingHeader';
import PlayersList from './PlayersList';

function PlayersRating({ route, navigation }) {
  const [searchText, setSearchText] = useState('');
  const game = route.params.game;
  const [players, setPlayers] = useState(game.players);

  const handleSearch = (text) => {
    setSearchText(text);
    if (text == '') {
      setPlayers(game.players);
    } else {
      let filteredPlayers = players.filter((player) => {
        return player.username.toLowerCase().includes(text.toLowerCase());
      });
      setPlayers(filteredPlayers);
    }
  };

  return (
    <>
      <PlayersRatingHeader courtName={game.courtName} navigation={navigation} />
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
            <PlayersList players={players} game={game} navigation={navigation} />
          </Box>
        </Box>
        <BottomNavigationBar navigation={navigation} page={2} />
      </Box>
    </>
  );
}

export default PlayersRating;
