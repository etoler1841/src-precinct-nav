import React from 'react';
import { Stylesheet, View, FlatList, Linking } from 'react-native';
import { Header, List, ListItem } from 'react-native-elements';

const precincts = require("./assets/precincts.json");

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      precincts
    }
  }

  createNavURL = ({addr}) => {
    let url = `https://www.google.com/maps/dir/?api=1&destination=${addr.replace(" ", "+").replace(",", "%2C")}`;
    return url;
  }

  renderListItem = ({item}) => (
    <ListItem
      roundAvatar
      title={`Precinct ${item.num}${item.evid ? " [EViD]" : "" }`}
      subtitle={item.name}
      onPress={() => Linking.openURL(createNavURL(item.address))}
      style={
        item.special ?
          item.general ?
            styles.split :
            styles.special :
          styles.general
      }
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
              text: "SRC Election Precincts",
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
              marginBottom: 0,
              height: "100%"
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

const styles = StyleSheet.create({
  split: {
    backgroundColor: "hsl(280, 50, 70)"
  },
  special: {
    backgroundColor: "hsl(250, 50, 70)"
  },
  general: {
    backgroundColor: "hsl(0, 50, 70)"
  }
})