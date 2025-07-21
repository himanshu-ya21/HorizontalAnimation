import React from 'react';
import { SafeAreaView } from 'react-native';
import PostListWithAnimation from './src/animation/ListWithAnimation';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
      <PostListWithAnimation />
    </SafeAreaView>
  );
};
export default App;
