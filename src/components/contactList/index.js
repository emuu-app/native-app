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
} from 'native-base';

class ListThumbnailExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contacts: [],
    };
  }

  componentDidMount = () => {
    this.getContacts();
  };

  getContacts() {
    return Expo.Contacts.getContactsAsync()
      .then(contacts => {
        this.setState({ contacts: contacts.data });
        console.log(this.state.contacts.length);
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
      });
  }

  render() {
    const rows = [];
    console.log(this.state.contacts);
    this.state.contacts.forEach(contact => {
      console.log(contact.id);
      rows.push(
        <ListItem key={contact.id}>
          <Thumbnail square size={80} source={{ uri: 'Image URL' }} />
          <Body>
            <Text>{contact.name}</Text>
            <Text note>Last saw each other never.</Text>
          </Body>
        </ListItem>
      );
    });

    return (
      <Container>
        <Header />
        <Content>
          <List>{rows}</List>
        </Content>
      </Container>
    );
  }
}
rp

export default ListThumbnailExample;
