import * as Expo from 'expo';
import React, { Component } from 'react';
import { Container } from 'native-base';

import SelectContacts from '../../components/selectContacts';

export default class Setup extends Component {
  constructor() {
    super();
    this.state = {
      isReady: false,
    };
  }
  async componentWillMount() {
    await this.loadFonts();
  }

  async loadFonts() {
    return Expo.Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      Ionicons: require('@expo/vector-icons/fonts/Ionicons.ttf'),
    }).then(resp => this.setState({ isReady: true }));
  }

  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }
    return (
      <Container>
        <SelectContacts />
      </Container>
    );
  }
}
