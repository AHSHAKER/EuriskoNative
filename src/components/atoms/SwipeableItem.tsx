import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Swipeable} from 'react-native-gesture-handler';

interface Props {
  onDelete: () => void;
  children: React.ReactNode;
}

const SwipeableItem: React.FC<Props> = ({onDelete, children}) => {
  const renderRightActions = () => (
    <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
      <Text style={styles.deleteText}>🗑️</Text>
    </TouchableOpacity>
  );

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <View style={styles.container}>{children}</View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2, // shadow for Android
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  deleteButton: {
    backgroundColor: '#ff4d4f',
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: '100%',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  deleteText: {
    color: '#fff',
    fontSize: 22,
  },
});

export default SwipeableItem;
