import { StackNavigator } from "react-navigation"
import MovieListing from "./src/components/MovieListing"
import MovieDetails from "./src/components/MovieDetails"

const App = StackNavigator({
  MovieListing: { screen: MovieListing },
  MovieDetails: { screen: MovieDetails },
})

export default App