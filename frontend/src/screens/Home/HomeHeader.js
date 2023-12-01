import { useState } from 'react';
import { Box, Text, HStack, StatusBar, VStack, Menu, Pressable, Divider, Select, CheckIcon, Input } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import style from './Style';

function HomeHeader({ gamesAmount, navigation, filters, setFilters }) {
  const [actualFilters, setActualFilters] = useState(filters);

  return (
    <>
      <StatusBar bg="white" barStyle="light-content" w="100%" />
      <Box safeAreaTop bg="white" width="100%" />
      <HStack px="5" py="3" justifyContent="space-between" alignItems="center" w="100%" h="10%">
        <HStack alignItems="center">
          <Menu
            w="250"
            trigger={(triggerProps) => {
              return (
                <Pressable accessibilityLabel="More options menu" {...triggerProps}>
                  <Ionicons name="md-funnel-outline" size={24} color="black" />
                </Pressable>
              );
            }}>
            <Menu.Item m={1} disabled={true} _pressed={{ backgroundColor: 'transparent' }}>
              Filters:
            </Menu.Item>
            <Divider w="100%" />
            <Menu.Item m={1} disabled={true} _pressed={{ backgroundColor: 'transparent' }}>
              Players amount:
              <Input
                placeholder="Players   amount"
                keyboardType="numeric"
                width={'42%'}
                _focus={{
                  borderColor: 'muted.300',
                  backgroundColor: 'muted.100',
                }}
                ml={2}
                mr={4}
                value={actualFilters.playersAmount}
                onChange={(e) => setActualFilters({ ...filters, playersAmount: e.nativeEvent.text })}
              />
            </Menu.Item>
            <Menu.Item
              m={1}
              onPress={() => navigation.navigate('EditPassword')}
              _pressed={{ backgroundColor: 'transparent' }}>
              Level:
              <Select
                placeholder="Select  level"
                _focus={{
                  borderColor: 'muted.300',
                  backgroundColor: 'muted.100',
                }}
                minWidth={'80%'}
                ml={2}
                onValueChange={(itemValue) => setActualFilters({ ...actualFilters, level: itemValue })}
                defaultValue={actualFilters.level}
                _selectedItem={{
                  bg: 'teal.600',
                  endIcon: <CheckIcon size="5" />,
                }}>
                <Select.Item label="Beginner" value="beginner" />
                <Select.Item label="Intermediate" value="intermediate" />
                <Select.Item label="Advanced" value="advanced" />
              </Select>
            </Menu.Item>
            <Menu.Item _pressed={{ backgroundColor: 'transparent' }}>
              <HStack width={'120%'}>
                <Box width={'50%'}>
                  <Menu.Item
                    size="sm"
                    style={style.clearButton}
                    backgroundColor={'white'}
                    width="70%"
                    height=""
                    borderRadius={5}
                    _text={style.clearText}
                    _pressed={style.clearPressed}
                    onPress={() => {
                      setFilters({ active: 'true', level: '' });
                      setActualFilters({ active: '', level: '' });
                    }}>
                    Clear
                  </Menu.Item>
                </Box>
                <Box width={'50%'}>
                  <Menu.Item
                    size="sm"
                    style={style.applyButton}
                    backgroundColor={'black'}
                    width="70%"
                    height=""
                    borderRadius={5}
                    _text={style.applyText}
                    _pressed={style.applyPressed}
                    onPress={() => setFilters(actualFilters)}>
                    Apply
                  </Menu.Item>
                </Box>
              </HStack>
            </Menu.Item>
          </Menu>
        </HStack>
        <HStack flex={1} justifyContent="center">
          <VStack alignItems="center">
            <Text color="black" fontSize="24" fontWeight="bold">
              Games
            </Text>
            <Text color="black" fontSize="10" fontWeight="light">
              {gamesAmount} games available
            </Text>
          </VStack>
        </HStack>
        <HStack alignItems="center">
          <Ionicons name="md-add-outline" size={24} color="black" onPress={() => navigation.navigate('CreateGame')} />
        </HStack>
      </HStack>
    </>
  );
}

export default HomeHeader;
