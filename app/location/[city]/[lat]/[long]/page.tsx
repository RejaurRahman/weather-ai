type Props = {
  params: {
    city: string
    lat: string
    long: string
  }
}

export default function WeatherPage({
  params: {
    city,
    lat,
    long
  }
}: Props) {
  return (
    <p>Welcome to the weather page: {city} {lat} {long}</p>
  )
}
