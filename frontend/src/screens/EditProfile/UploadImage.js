import { useState, useEffect } from 'react';
import { Image, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export default function UploadImage() {
  const [image, setImage] = useState(null);
  const addImage = async () => {
    let _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
    if (!_image.canceled) {
      setImage(_image.assets[0].uri);
    }
  };

  const checkForCameraRollPermission = async () => {
    const permissionsStatus = await ImagePicker.getMediaLibraryPermissionsAsync();
    if (permissionsStatus.status !== 'granted') {
      const s2 = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (s2.status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  useEffect(() => {
    checkForCameraRollPermission();
  }, []);

  return (
    <View style={imageUploaderStyles.container}>
      {!image && (
        <Image source={require('../../assets/images/default-profile.jpg')} style={{ width: 150, height: 150 }} />
      )}
      {image && <Image source={{ uri: image }} style={{ width: 150, height: 150 }} />}
      <View style={imageUploaderStyles.uploadBtnContainer}>
        <TouchableOpacity onPress={addImage} style={imageUploaderStyles.uploadBtn}>
          <Text>{image ? 'Edit' : 'Upload'} Image</Text>
          <AntDesign name="camera" size={20} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const imageUploaderStyles = StyleSheet.create({
  container: {
    elevation: 2,
    height: 150,
    width: 150,
    backgroundColor: '#efefef',
    position: 'relative',
    borderRadius: 999,
    overflow: 'hidden',
  },
  uploadBtnContainer: {
    opacity: 0.7,
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: 'lightgrey',
    width: '100%',
    height: '25%',
  },
  uploadBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
