import React from 'react';
import {StyleSheet, Text, View, Button, Image, StatusBar,
		FlatList, ActivityIndicator} from 'react-native';
import { List, ListItem, SearchBar} from 'react-native-elements';

export default class Tasks extends React.Component {
	static navigationOptions = ({ navigation }) => ({
    title: `Tasks`,
		tabBarLabel: 'Tasks',
		tabBarIcon: ({tintColor}) => (
			<Image 
				source={require('../../images/tasks_icon.png')}
				style={{width: 30, height: 30, tintColor: tintColor}}
			/>
		)
	});

	constructor(props) {
		super(props);

		this.state = {
			loading: false,
			data: [],
			page: 1,
			seed: 1,
			error: null,
			refreshing: false,
      latitude: null,
      longitude: null,
		};
	}

	componentDidMount() {
		this.makeRemoteRequest();
    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        console.log(position.coords.latitude),
        console.log(position.coords.longitude),
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 },
    );
	}

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

	onLearnMore = (item) => {
    console.log(item);
		this.props.navigation.navigate('TaskDetail', item);
	}

	makeRemoteRequest = () => {
    const { page, seed } = this.state;
    // console.log(this.state);
    // headers to include "Authorisation: Token (token)"
    const url = `http://db-gateway-siacabindefects.b9ad.pro-us-east-1.openshiftapps.com/techdefects?id=4`;
    // const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;
    this.setState({ loading: true });

    fetch(url)
      .then(res => res.json())
      .then(res => {
        console.log(res);
        this.setState({
          data: res,
          // data: page === 1 ? res.results : [...this.state.data, ...res.results],
          error: res.error || null,
          loading: false,
          refreshing: false
        });
        // console.log(this.state.data);
        console.log(res.results);
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

   handleRefresh = () => {
    this.setState(
      {
        page: 1,
        seed: this.state.seed + 1,
        refreshing: true
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };

  // handleLoadMore = () => {
  //   this.setState(
  //     {
  //       page: this.state.page + 1
  //     },
  //     () => {
  //       this.makeRemoteRequest();
  //     }
  //   );
  // };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "95%",
          backgroundColor: "#CED0CE",
          marginLeft: "5%"
        }}
      />
    );
  };

  renderHeader = () => {
    return <SearchBar placeholder="Type Here..." lightTheme round />;
  };

  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  colorStyle = (number) => {
    if (number === 1) {
      return {
        color: 'orange'
      }
    } else if (number === 2) {
      return {
        color: 'red'
      }
    } else {
      return {
        color: 'green'
      }
    }
  };

render() {
    // const {header, description, closed, img, priority} = data;
    // const {regn, acType, ETA, ETD, bay, ... others} = data.plane;
    
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content"/>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            date = `${item.plane.ETD}`.slice(5,10),
            month = date.slice(0, 2),
            day = date.slice(3, 5),
            formatted_date = day.concat("/", month),
            time = `${item.plane.ETD}`.slice(-9,-4),
            <ListItem
              title={time.concat("  ", formatted_date)}
              titleStyle={{ fontWeight: '700', fontSize: 20 }}
              rightTitle={(item.priority === 1) ? `High` : (item.priority === 2) ? `Critical` : `Normal` }
              rightTitleStyle={this.colorStyle(item.priority)}
              containerStyle={{ backgroundColor: '#FFF', borderBottomWidth: 0 }}
              onPress={() => this.onLearnMore(item)}
            />
          )}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
          onRefresh={this.handleRefresh}
          refreshing={this.state.refreshing}
          // onEndReached={this.handleLoadMore}
          onEndReachedThreshold={20}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});