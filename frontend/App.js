import { useEffect, useState } from 'react';
import { LogBox } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { isUserLoggedIn } from './src/services/users/users-service';
import { getKey } from './src/common/session-info';

import Login from './src/screens/Login/Login';
import Signup from './src/screens/Signup/Signup';
import Profile from './src/screens/Profile/Profile';
import CreateProfile from './src/screens/CreateProfile/CreateProfile';
import EditProfile from './src/screens/EditProfile/EditProfile';
import EditPassword from './src/screens/EditProfile/EditPassword/EditPassword';
import Home from './src/screens/Home/Home';
import CreateGame from './src/screens/CreateGame/CreateGame';
import EditGame from './src/screens/EditGame/EditGame';
import GameDetails from './src/screens/GameDetails/GameDetails';
import GamesHistory from './src/screens/GamesHistory/GamesHistory';
import PlayersRanking from './src/screens/PlayersRanking/PlayersRanking';
import PlayersRating from './src/screens/PlayersRating/PlayersRating';
import PlayerRate from './src/screens/PlayersRating/PlayerRate/PlayerRate';
import PlayerRatesHistory from './src/screens/PlayerRatesHistory/PlayerRatesHistory';

LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);
LogBox.ignoreAllLogs();

export default function App() {
  const Stack = createNativeStackNavigator();
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [createProfile, setCreateProfile] = useState(false);

  useEffect(() => {
    const checkInitialState = async () => {
      const res = await isUserLoggedIn();
      setUserLoggedIn(res);
      setCreateProfile(!!(await getKey('createProfile')));
    };
    checkInitialState();
  });

  return (
    <NativeBaseProvider>
      <NavigationContainer theme={{ colors: { background: 'white' } }}>
        <Stack.Navigator>
          {!userLoggedIn ? (
            <>
              <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false, animation: 'none' }}
                initialParams={{ setUserLoggedIn }}
              />
              <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false, animation: 'none' }} />
            </>
          ) : (
            <>
              {createProfile && (
                <Stack.Screen
                  name="CreateProfile"
                  component={CreateProfile}
                  options={{ headerShown: false, animation: 'none' }}
                />
              )}
              <Stack.Screen name="Home" component={Home} options={{ headerShown: false, animation: 'none' }} />
              <Stack.Screen
                name="PlayerRatesHistory"
                component={PlayerRatesHistory}
                options={{ headerShown: false, animation: 'none' }}
              />
              <Stack.Screen
                name="Profile"
                component={Profile}
                options={{ headerShown: false, animation: 'none' }}
                initialParams={{ setUserLoggedIn }}
              />
              <Stack.Screen
                name="EditProfile"
                component={EditProfile}
                options={{ headerShown: false, animation: 'none' }}
              />
              <Stack.Screen
                name="EditPassword"
                component={EditPassword}
                options={{ headerShown: false, animation: 'none' }}
              />
              <Stack.Screen
                name="CreateGame"
                component={CreateGame}
                options={{ headerShown: false, animation: 'none' }}
              />
              <Stack.Screen name="EditGame" component={EditGame} options={{ headerShown: false, animation: 'none' }} />
              <Stack.Screen
                name="GameDetails"
                component={GameDetails}
                options={{ headerShown: false, animation: 'none' }}
              />
              <Stack.Screen
                name="GamesHistory"
                component={GamesHistory}
                options={{ headerShown: false, animation: 'none' }}
              />
              <Stack.Screen
                name="PlayersRanking"
                component={PlayersRanking}
                options={{ headerShown: false, animation: 'none' }}
              />
              <Stack.Screen
                name="PlayersRating"
                component={PlayersRating}
                options={{ headerShown: false, animation: 'none' }}
              />
              <Stack.Screen
                name="PlayerRate"
                component={PlayerRate}
                options={{ headerShown: false, animation: 'none' }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
