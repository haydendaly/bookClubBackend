/*#################################################
For: SSW 322
By: Bruno, Hayden, Madeline, Miriam, and Scott
#################################################*/

import React, { useState, useEffect } from "react";
import books from '../functions/books'
import users from '../functions/users'
import { Text, View, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Image, Dimensions } from "react-native";

export default class GetStarted extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      books: [],
      clubs: []
    };
    books.getHomescreen( (books) => {
      users.getClubs('temp', true, (clubs) => {
        this.setState({
          books: books,
          clubs: clubs
        })
      })
    });
  }


  render() {
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <Text style={styles.clubText}>Your Clubs</Text>
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={this.state.clubs}
              renderItem={({ item }) =>
                (
                  <View style={styles.clubHolder1}>
                    <View style={styles.clubHolder}>
                      <TouchableOpacity style={styles.clubImage}>
                        <Image source={{ uri: item.imgURL}} style={{width: '100%', height: '100%', borderRadius: 8}}>
                        </Image>
                      </TouchableOpacity>
                      <View style={styles.clubInfo}>
                        <Text style={styles.clubTitle}>{item.title}</Text>
                        <Text style={styles.clubAuthor}>By {item.author}</Text>
                      </View>
                    </View>
                  </View>
                )
              }
              keyExtractor={item => item.bookID}
            />
          </View>
          <FlatList
            data={this.state.books}
            renderItem={({ item }) => (
              <View>
                <Text style={styles.bookText}>{item.title}</Text>
                <FlatList
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  data={item.data}
                  renderItem={({ item }) =>
                    (
                      <View style={{paddingLeft: 10}}>
                        <TouchableOpacity style={styles.book}>
                          <Image source={{ uri: item.imgURL}} style={{width: '100%', height: '100%', borderRadius: 8}}>
                          </Image>
                        </TouchableOpacity>
                      </View>
                    )
                  }
                  keyExtractor={item => item.bookID}
                />
              </View>
            )}
            keyExtractor={item => item.title}
          />
        </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  clubText: {
    marginTop: '4%',
    fontSize: 24,
    paddingLeft: '4%',
    color: "#143e60",
    fontWeight: "500",
    marginBottom: '1%'
  },
  bookText: {
    fontSize: 24,
    paddingLeft: '4%',
    color: "#143e60",
    fontWeight: "500",
    marginTop: '4%',
    marginBottom: '1%'
  },
  clubHolder1: {
    paddingLeft: Dimensions.get('screen').width * .025,
  },
  clubHolder: {
    width: Dimensions.get('screen').width * .9,
    height: 185,
    backgroundColor: "#155149",
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  clubImage: {
    width: 113.33,
    height: 165,
    borderRadius: 2,
    paddingLeft: 10,
    marginTop: 10
  },
  book: {
    width: 100,
    height: 150,
    borderRadius: 7,
  },
  clubInfo: {
    width: Dimensions.get('screen').width*.9 - 120,
  },
  clubTitle: {
    fontSize: 24,
    color: "#fff",
    marginTop: 10
  },
  clubAuthor: {
    justifyContent: 'space-between',
    marginTop: 5,
    color: "#bbb"
  },
});