import { Box, Text, HStack, StatusBar, VStack } from 'native-base';

function RatingsHeader({ ratesAmount }) {
  return (
    <>
      <StatusBar bg="white" barStyle="light-content" w="100%" />
      <Box safeAreaTop bg="white" width="100%" />
      <HStack px="5" py="3" justifyContent="space-between" alignItems="center" w="100%" h="10%">
        <HStack flex={1} justifyContent="center">
          <VStack alignItems="center">
            <Text color="black" fontSize="24" fontWeight="bold">
              Ratings
            </Text>
            <Text color="black" fontSize="10" fontWeight="light">
              {ratesAmount} ratings received
            </Text>
          </VStack>
        </HStack>
      </HStack>
    </>
  );
}

export default RatingsHeader;
