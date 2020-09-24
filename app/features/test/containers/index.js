import React from 'react';
import {View, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

export default class TestScreen extends React.Component {
  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <ScrollView style={{flex: 1}}>
          <View style={{height: 60}} />
        </ScrollView>
      </SafeAreaView>
    );
  }
}
