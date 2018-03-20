import React, {Component} from "react"
import {
  FlatList,
  Text,
  View,
  Image,
  TouchableWithoutFeedback } from "react-native"
import axios from "axios"

const API_KEY = "08d02e50f177c47452bade3210abd446"

export default class MovieListing extends React.Component {

  state = {
    movies: [],
    isLoading: false,
    fetching_Status: false,
  }

  constructor(props) {
    super(props)

    this.handleMoviePress = this.handleMoviePress.bind(this)
    this.fetchData = this.fetchData.bind(this)

    this.page = 1
  }

  static navigationOptions = {
    title: 'MovieDB',
  };

  componentDidMount() {
    this.fetchData()
  }

  fetchData() {
    if (this.state.isLoading) {
      return
    }
    this.setState({
      isLoading: true
    })
    axios.get("https://api.themoviedb.org/3/discover/movie",{
      params: {
        api_key: API_KEY,
        page: this.page
      }
    }).then(response => {
      console.log(response.data.results)
      if (this.page == 1) {
        this.setState({
          movies: response.data.results,
          isLoading: false
        })
      }
      else {
        this.setState({
          movies: [ ...this.state.movies, ...response.data.results ],
          isLoading: false
        })
      }
    })
  }

  handleMoviePress(movie) {
    const { navigate } = this.props.navigation;
    navigate("MovieDetails", { movie })
  }

  render() {
    return (
      <FlatList numColumns="2"
        refreshing={false}
        onRefresh={()=>{
          this.page = 1
          this.fetchData()
        }}
        onEndReached={() => {
          this.page = this.page + 1
          this.fetchData()
        }}
        data={this.state.movies}
        renderItem={({item}) =>
          <TouchableWithoutFeedback
            onPress={()=>this.handleMoviePress(item)}
            >
            <Image
              source={{uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`}}
              resizeMode="stretch"
              style={{width:"50%", aspectRatio: 2/3}}
            />
          </TouchableWithoutFeedback>
        }
      />
    );
  }
}