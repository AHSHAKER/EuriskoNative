import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

type DoneScreenProps = {
  route: {
    params: {
      from?: string;
    };
  };
};

const DoneScreen = ({route}: DoneScreenProps) => {
  const {from} = route.params || {};

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {from ? `${from} is working ✅` : 'Success ✅'}
      </Text>
    </View>
  );
};

export default DoneScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
