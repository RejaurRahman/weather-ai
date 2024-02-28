import { getClient } from "@/apollo-client"

import fetchWeatherQuery from "@/graphql/queries/fetchWeatherQueries"

type Props = {
  params: {
    city: string
    lat: string
    long: string
  }
}

export default async function WeatherPage({
  params: {
    city,
    lat,
    long
  }
}: Props) {
  const client = getClient()

  const { data } = await client.query({
    query: fetchWeatherQuery,
    variables: {
      current_weather: "true",
      longitude: long,
      latitude: lat,
      timezone: "GMT"
    }
  })

  const results: Root = data.myQuery

  return (
    <p>Welcome to the weather page: {city} {lat} {long}</p>
  )
}
