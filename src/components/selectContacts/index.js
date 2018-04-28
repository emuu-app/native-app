import React, { Component } from 'react';
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Thumbnail,
  Text,
  Body,
  Title,
  Left,
  Fab,
  Icon,
  Button,
} from 'native-base';
import now from 'performance-now';
import ContactItem from './contactItem';
import update from 'immutability-helper';
import { ContactsContext } from '../ContactsContext';

class SelectContacts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contacts: [],
      selectedContacts: {},
    };
  }

  componentDidMount = () => {
    this.getContacts();
  };

  getContacts = () => {
    var start = now();
    console.log('query contacts');
    return Expo.Contacts.getContactsAsync({
      pageSize: 10,
      fields: [
        Expo.Contacts.PHONE_NUMBERS,
        Expo.Contacts.EMAILS,
        //Expo.Contacts.THUMBNAIL,
      ],
    })
      .then(contacts => {
        this.setState({ contacts: contacts.data });
      })
      .catch(async err => {
        console.log(JSON.stringify(err));
        if (err.code !== 'E_MISSING_PERMISSION') throw err;

        const { Location, Permissions } = Expo;
        const { status } = await Permissions.askAsync(Permissions.CONTACTS);
        if (status === 'granted') {
          return this.getContacts();
        } else {
          throw new Error('Location permission not granted');
        }
      })
      .finally(() => {
        var end = now();
        console.log((start - end).toFixed(3));
      });
  };

  onItemPress = (contactId, isSelected) => {
    console.log(`${contactId}: ${isSelected}`);
    if (contactId) {
      if (isSelected) {
        this.state.selectedContacts[contactId] = true;
      } else {
        delete this.state.selectedContacts[contactId];
      }

      this.setState({
        selectedContacts: this.state.selectedContacts,
      });
    }
  };

  _renderFab() {
    if (this.state.selectedContacts.length) {
      return (
        <Fab
          active={false}
          containerStyle={{}}
          style={{ backgroundColor: '#5067FF' }}
          position="bottomRight"
        >
          <Icon name="arrow-forward" />
        </Fab>
      );
    } else {
      return null;
    }
  }

  render() {
    const rows = [];
    //console.log(this.state.contacts);
    this.state.contacts.forEach(contact => {
      rows.push(
        <ContactItem
          contact={contact}
          key={contact.id}
          onItemPress={this.onItemPress}
        />
      );
    });

    return (
      <Container>
        <Header>
          <Body>
            <Title>Umee</Title>
          </Body>
        </Header>
        <Content>
          <Button onClick={this.getContacts}>
            <Text>Refresh</Text>
          </Button>
          <Text>{JSON.stringify(this.state.selectedContacts)}</Text>
          <Text>Who would you like to keep in touch with?</Text>
          <List>{rows}</List>
        </Content>
        {this._renderFab()}
      </Container>
    );
  }
}

export default SelectContacts;
