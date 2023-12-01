import { useEffect, useState } from 'react';
import { Box, Input, Icon } from 'native-base';
import { Fontisto } from '@expo/vector-icons';
import BottomNavigationBar from '../../components/bottom-navigation-bar/BottomNavigationBar';
import RatingsHeader from './RatingsHeader';
import RatingsList from './RatingsList';
import PageStatus from '../../components/page-status/PageStatus';

import { getRatingsReceivedByPlayer } from '../../services/ratings/ratings-service';
import { getKey } from '../../common/session-info';

function Home({ navigation }) {
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  const [ratings, setRatings] = useState([]);
  const [filteredRatings, setFilteredRatings] = useState([]);
  const [userId, setUserId] = useState();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleSearch = (text) => {
    setSearchText(text);
    if (text === '') {
      getRatings();
    } else {
      const filteredRatings = ratings.filter(
        (rating) =>
          rating.Game.courtName.includes(text) ||
          rating.qualifier.username.includes(text) ||
          rating.comment.includes(text),
      );
      setFilteredRatings(filteredRatings);
    }
  };

  useEffect(() => {
    getKey('userId').then((id) => {
      setUserId(id);
    });
  }, [userId]);

  const getRatings = async () => {
    const userId = await getKey('userId');
    setUserId(userId);
    const data = await getRatingsReceivedByPlayer(userId);
    if (data) {
      setRatings(data);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    getRatings();
  }, []);

  useEffect(() => {
    setLoading(true);
    getRatings();
    setIsRefreshing(false);
  }, [isRefreshing]);

  return (
    <>
      <RatingsHeader ratesAmount={ratings.length} />
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
            {!loading && ratings.length > 0 && (
              <RatingsList
                ratings={searchText ? filteredRatings : ratings}
                setIsRefreshing={setIsRefreshing}
                isRefreshing={isRefreshing}
              />
            )}
            {loading && <PageStatus message="Loading..." />}
            {!loading && ratings.length === 0 && <PageStatus message="No ratings found" staticImage={true} />}
          </Box>
        </Box>
        <BottomNavigationBar navigation={navigation} page={3} />
      </Box>
    </>
  );
}

export default Home;
