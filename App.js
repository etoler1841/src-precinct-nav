import React from 'react';
import { View, FlatList, Linking } from 'react-native';
import { Header, List, ListItem } from 'react-native-elements';

const precincts = require("./assets/precincts.json");

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      precincts
    }
  }

  renderListItem = ({item}) => (
    <ListItem
      roundAvatar
      title={`Precinct ${item.num}`}
      subtitle={item.name}
      onPress={() => Linking.openURL(item.url)}
    />
  )

  render() {
    return (
      <View>
        <View
          style={{ height: "9%" }}
        >
          <Header
            centerComponent={{
              text: "SRC Voting Locations",
              style: {
                color: "#fff",
                fontSize: 25,
                fontWeight: "500"
              }
            }}
            backgroundColor="#333"
            innerContainerStyles={{
              paddingTop: 50
            }}
            outerContainerStyles={{
              paddingBottom: 60,
              marginBottom: 0
            }}
            id="header"
          />
        </View>
        <View
          style={{ height: "91%" }}
        >
          <List containerStyle={{
            marginTop: 0
          }}>
            <FlatList
              keyExtractor={item => item.num}
              data={ this.state.precincts }
              renderItem={this.renderListItem}
            />
          </List>
        </View>
      </View>
    );
  }
}
