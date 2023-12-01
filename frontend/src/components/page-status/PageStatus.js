import { Center, Image, Text } from 'native-base';

const PageStatus = ({ message, staticImage = false }) => {
  return (
    <Center flex={1}>
      <Image
        source={staticImage ? require('../../assets/images/default-icon.png') : require('../../assets/images/loading-gif.gif')}
        alt="Loading icon"
        size="xl"
        resizeMode="contain"
        style={{ width: 100, height: 100 }}
      />
      <Text>{message}</Text>
    </Center>
  );
};

export default PageStatus;
