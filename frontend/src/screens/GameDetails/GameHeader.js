import { Box, Text, HStack, StatusBar, VStack } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

function GameHeader({ navigation }) {
  return (
    <>
      <StatusBar bg="white" barStyle="light-content" w="100%" />
      <Box safeAreaTop bg="white" width="100%" />
      <HStack px="5" py="3" justifyContent="space-between" alignItems="center" w="100%" h="10%">
        <HStack alignItems="center">
          <Ionicons
            name="md-return-down-back-outline"
            size={24}
            color="black"
            onPress={() => navigation.navigate('Home')}
          />
        </HStack>
        <HStack flex={1} justifyContent="center">
          <VStack alignItems="center">
            <Text color="black" fontSize="24" fontWeight="bold">
              Game details
            </Text>
          </VStack>
        </HStack>
        <HStack alignItems="center">
          <Ionicons
            name="md-return-down-back-outline"
            size={24}
            color="white"
            disabled
          />
        </HStack>
      </HStack>
    </>
  );
}

export default GameHeader;
