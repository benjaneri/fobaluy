import { Box, Text, HStack, StatusBar, Menu, Pressable, Divider, VStack } from 'native-base';
import { SimpleLineIcons, Ionicons } from '@expo/vector-icons';

function ProfileHeader({ setDeleteAlertOpened, navigation, publicProfile }) {
  return (
    <>
      <StatusBar bg="white" barStyle="light-content" w="100%" />
      <Box safeAreaTop bg="white" width="100%" />
      <HStack px="5" py="3" justifyContent="space-between" alignItems="center" w="100%" h="10%">
        <HStack alignItems="center">
          <Ionicons
            name="md-return-down-back-outline"
            size={24}
            color={publicProfile ? 'black' : 'white'}
            onPress={() => navigation.navigate('PlayersRanking')}
          />
        </HStack>
        <HStack flex={1} justifyContent="center">
          <VStack alignItems="center">
            <Text color="black" fontSize="24" fontWeight="bold">
              {publicProfile ? 'User profile' : 'My Profile'}
            </Text>
            <Text color="black" fontSize="10" fontWeight="light"></Text>
          </VStack>
        </HStack>
        {!publicProfile && (
          <HStack alignItems="center" pb={4}>
            <Menu
              w="190"
              trigger={(triggerProps) => {
                return (
                  <Pressable accessibilityLabel="More options menu" {...triggerProps}>
                    <SimpleLineIcons name="settings" size={24} color="black" />
                  </Pressable>
                );
              }}>
              <Menu.Item m={1} onPress={() => navigation.navigate('EditPassword')}>
                Change password
              </Menu.Item>
              <Divider w="100%" />
              <Menu.Item m={1} _text={{ color: 'danger.500' }} onPress={() => setDeleteAlertOpened(true)}>
                Delete account
              </Menu.Item>
            </Menu>
          </HStack>
        )}
      </HStack>
    </>
  );
}

export default ProfileHeader;
