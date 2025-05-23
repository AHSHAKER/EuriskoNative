import React, {useState} from 'react';
import {Modal, View, TouchableOpacity, StyleSheet} from 'react-native';
import MapView, {Marker, MapPressEvent} from 'react-native-maps';
import CustomText from '../atoms/CustomText';

const LocationPicker = ({visible, onClose, onLocationPicked}) => {
  console.log('Modal visible:', visible);
  const [selectedLocation, setSelectedLocation] = useState({
    latitude: 36.8065,
    longitude: 10.1815,
  });

  const handleMapPress = (e: MapPressEvent) => {
    console.log('Map pressed:', e.nativeEvent.coordinate);
    setSelectedLocation(e.nativeEvent.coordinate);
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <MapView
        style={{flex: 1}}
        initialRegion={{
          ...selectedLocation,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        onPress={handleMapPress}>
        <Marker coordinate={selectedLocation} />
      </MapView>
      <View style={styles.actions}>
        <TouchableOpacity onPress={onClose} style={styles.cancel}>
          <CustomText style={styles.text}>Cancel</CustomText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            onLocationPicked(selectedLocation);
            onClose();
          }}
          style={styles.confirm}>
          <CustomText style={styles.text}>Confirm</CustomText>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: 'white',
  },
  cancel: {
    backgroundColor: '#ccc',
    padding: 12,
    borderRadius: 6,
  },
  confirm: {
    backgroundColor: '#28a745',
    padding: 12,
    borderRadius: 6,
  },
  text: {
    color: 'white',
  },
});

export default LocationPicker;
