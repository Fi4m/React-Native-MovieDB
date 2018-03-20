import React, {Component} from "react"
import { ImageBackground,
    Image, View, ScrollView,
    Text } from "react-native"

export default class MovieDetails extends Component {

    state = {
        movie: {}
    }

    static navigationOptions = {
        title: 'MovieDetails',
      };

    constructor(props) {
        super(props)
        this.state = {
            movie: props.navigation.state.params.movie
        }
        console.log(this.state.movie)
    }

    render() {
        return (
            <View style={{flex:1}}>
                <Image style={{resizeMode: "stretch",flex:1,opacity:0.2}}
                    source={{uri: `https://image.tmdb.org/t/p/w500${this.state.movie.poster_path}`}}
                />
                <ScrollView style={{flex:0,backgroundColor:"rgba(0,0,0,0)",position:"absolute",width:"100%",height:"100%"}}>
                    <Image style={{width:375, aspectRatio:16/9}}
                        source={{uri: `https://image.tmdb.org/t/p/w500${this.state.movie.backdrop_path}`}}
                    />

                    <Text style={{paddingHorizontal:20,paddingTop:10,fontWeight:"bold",fontSize:16}}>{this.state.movie.title}</Text>
                    <Text style={{paddingHorizontal:20,paddingTop:10}}>{this.state.movie.overview}</Text>
                </ScrollView>
            </View>
        )
    }
}
