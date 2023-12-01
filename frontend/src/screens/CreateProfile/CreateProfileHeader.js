import { Box, Text, HStack, StatusBar, VStack } from 'native-base';

function CreateProfileHeader() {
  return (
    <>
      <StatusBar bg="white" barStyle="light-content" w="100%" />
      <Box safeAreaTop bg="white" width="100%" />
      <HStack px="5" py="3" justifyContent="space-between" alignItems="center" w="100%" h="10%">
        <HStack flex={1} justifyContent="center">
          <VStack space={1} alignItems="center">
            <Text color="black" fontSize="24" fontWeight="bold">
              Create profile
            </Text>
            <Text color="black" fontSize="14" fontWeight="light">
              This is the last step to start playing!
            </Text>
          </VStack>
        </HStack>
      </HStack>
    </>
  );
}

export default CreateProfileHeader;
