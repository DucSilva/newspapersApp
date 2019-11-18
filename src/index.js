import React, {Component} from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';

var {height, width} = Dimensions.get('window');
const baseUrl = 'http://192.168.1.12/newspapers/public/';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataNews: [],
      message: 'Hello',
    };
  }

  componentDidMount() {
    this.setState({
      message: 'Hi',
    });
    return fetch(baseUrl + 'api/news')
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          dataNews: responseJson,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#f8f8f8'}}>
        <View style={styles}>

        </View>
        <FlatList
          data={this.state.dataNews.news}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </View>
    );
  }

  _renderItem = ({item}) => {
    <View style={[styles.divnews, styles.shadow]}>
      <Image
        style={styles.imagenew}
        source={{uri: baseUrl + 'storage/' + item.image}}
      />
      <View>
        <Text style={styles.titleNews}>{item.title}</Text>
        <Text style={styles.themeNews}>{item.name}</Text>
        <Text>{item.created_at}</Text>
      </View>
    </View>;
  };
}

const styles = StyleSheet.create({
  divnews: {
    width: width - 10,
    backgroundColor: 'white',
    margin: 5,
    flexDirection: 'row',
    borderRadius: 5,
  },
  shadow: {
    elevation: 4,
    shadowOpacity: 0.3,
    shadowRadius: 50,
    shadowColor: 'gray',
    shadowOffset: {height: 0, width: 0},
  },
  imagenew: {
    width: width / 3,
    height: width / 3,
    resizeMode: 'cover',
    borderRadius: 5,
  },
  titleNews: {
    width: (width / 3) * 2 - 20,
    fontSize: 22,
  },
  themeNews: {
    color: '#c2191c',
    fontSize: 20,
  },
});
