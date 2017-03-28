import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  ActivityIndicator, // import des composants
  TouchableOpacity,
  Text,
  View,
  ListView
} from 'react-native'

import { getAllPlaylists } from './playerapi'


var playlist = [];
export default class PlayerProject extends Component {
  constructor(props) {
    super(props)

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    // la state de notre composant est utilisé pour
    // stocker infos renvoyées par l'API
    this.state = {
      name: '', // nom de la bière
      dataSource: ds.cloneWithRows([playlist]),
      description: '', // sa description
      isLoading: false // la requête API est-elle en cours ?
    }
  }

  // nous externalisons cette fonction afin de
  // pouvoir l'appeler lorsqu'on le souhaite
  _getRandomBrewdogWithFeedback = () => {
    this.setState({ isLoading: true })

    getAllPlaylists()
      .then(responseData => this.setState({
        name: responseData[0].id,
        dataSource: this.state.dataSource.cloneWithRows(responseData),
        isLoading: false // la requête est terminée
      }))
      .catch(error => console.error(error))
  }

  componentWillMount() {
    this._getRandomBrewdogWithFeedback()
  }
  render() {
     console.log(this.state.dataSource);
    const content = this.state.isLoading
      ? <ActivityIndicator /> // si requête en cours, on affiche un spinner
      : <View style={styles.infosContainer}>
          <Text style={styles.name}>
            {this.state.name} // sinon on affiche le nom de la bière
          </Text>

          <Text style={styles.description}>
            {this.state.description} // sa description
          </Text>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderRow.bind(this)}
          />
        </View>

    return (
      <View style={styles.container}>
        {content}
      </View>
    )
  }
  renderRow(data) {
   return (
       <View>
         <View>
           <Text>{data.title}</Text>
         </View>
       </View>
     )
 }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#181535',
  },
  // ajout de styles divers
  infosContainer: {
    margin: 30,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },
  description: {
    marginBottom: 10,
  },
  button: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 3,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

AppRegistry.registerComponent('PlayerProject', () => PlayerProject);
