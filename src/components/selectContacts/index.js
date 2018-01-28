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

class SelectContacts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contacts: [],
      selectedContacts: [],
    };
  }

  componentDidMount = () => {
    this.getContacts();
  };

  getContacts() {
    var start = now();
    return Expo.Contacts.getContactsAsync({
      pageSize: 50,
      fields: [
        Expo.Contacts.PHONE_NUMBERS,
        Expo.Contacts.EMAILS,
        Expo.Contacts.THUMBNAIL,
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
  }

  onItemPress = (contactId, isSelected) => {
    console.log(`${contactId}: ${isSelected}`);
    if (contactId) {
      this.setState(prevState => {
        if (prevState.selectedContacts) {
          var idx = prevState.selectedContacts.indexOf(contactId);
          if (!isSelected && idx >= 0) {
            return {
              selectedContacts: update(prevState.selectedContacts, {
                $splice: [[idx, 1]],
              }),
            };
          } else if (isSelected && idx < 0) {
            return {
              selectedContacts: update(prevState.selectedContacts, {
                $push: [contactId],
              }),
            };
          }
        }
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
