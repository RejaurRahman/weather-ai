import { getClient } from "@/apollo-client"

import CalloutCard from "@/components/CalloutCard/CalloutCard"
import HumidityChart from "@/components/HumidityChart/HumidityChart"
import InformationPanel from "@/components/InformationPanel/InformationPanel"
import RainChart from "@/components/RainChart/RainChart"
import StatCard from "@/components/StatCard/StatCard"
import TempChart from "@/components/TempChart/TempChart"

import fetchWeatherQuery from "@/graphql/queries/fetchWeatherQueries"

import cleanData from "@/lib/cleanData"
import getBasePath from "@/lib/getBasePath"

export const revalidate = 60

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

  const dataToSend = cleanData(results, city)

  const res = await fetch(`${getBasePath()}/api/getWeatherSummary`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      weatherData: dataToSend
    })
  })

  const GPTdata = await res.json()
  const { content } = GPTdata

  return (
    <div className="flex flex-col min-h-screen lg:flex-row">
      <InformationPanel 
        city={city}
        lat={lat}
        long={long}
        results={results}
      />
      <div className="flex-1 p-5 lg:p-10">
        <div className="pb-5">
          <div className="pb-5">
            <h2 className="text-xl font-bold">
              Today&apos;s Overview
            </h2>
            <p className="text-sm text-gray-400">
              Last Updated at: {" "}
              {new Date(results.current_weather.time).toLocaleString()}
              ({results.timezone})
            </p>
          </div>
          <div className="mb-10">
            <CalloutCard 
              message={content}
            />
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            <StatCard 
              color="yellow"
              metric={`${results.daily.temperature_2m_max[0].toFixed(1)}&deg;`}
              title="Maximum Temperature"
            />
            <StatCard 
              color="green"
              metric={`${results.daily.temperature_2m_min[0].toFixed(1)}&deg;`}
              title="Minimum Temperature"
            />
            <div className="flex flex-col">
              <StatCard 
                color="rose"
                metric={results.daily.uv_index_max[0].toFixed(1)}
                title="UV Index"
              />
              {Number(results.daily.uv_index_max[0].toFixed(1)) > 5 && (
                <CalloutCard 
                  message="The UV is high today, be sure to wear SPF!"
                  warning
                />
              )}
            </div>
            <div className="flex space-x-3">
              <StatCard 
                color="cyan"
                metric={`${results.current_weather.windspeed.toFixed(1)}m/s`}
                title="Wind Speed"
              />
              <StatCard 
                color="violet"
                metric={`${results.current_weather.winddirection.toFixed(1)}&deg;`}
                title="Wind Direction"
              />
            </div>
          </div>
        </div>
        <hr className="mb-5" />
        <div className="space-y-3">
          <TempChart
            results={results}
          />
          <RainChart
            results={results}
          />
          <HumidityChart
            results={results}
          />
        </div>
      </div>
    </div>
  )
}
