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
} from 'native-base';
import now from 'performance-now';
import PropTypes from 'prop-types';

class ContactItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contact: props.contact || {},
      isSelected: props.contact && props.contact.isSelected,
    };
  }

  onItemPress = isSelected => {
    this.setState({
      isSelected: !isSelected,
    });
    if (this.props.onItemPress) {
      this.props.onItemPress(this.state.contact.id, !isSelected);
    }
  };

  render() {
    return (
      <ListItem avatar onPress={() => this.onItemPress(this.state.isSelected)}>
        <Left>
          <Thumbnail source={{ uri: this.state.contact.thumbnail.uri }} />
        </Left>
        <Body>
          <Text
            style={{
              fontWeight: this.state.isSelected ? 'bold' : 'normal',
            }}
          >
            {this.state.contact.name}
          </Text>
          <Text />
        </Body>
      </ListItem>
    );
  }
}

ContactItem.propTypes = {
  onItemPress: PropTypes.func,
};

export default ContactItem;
