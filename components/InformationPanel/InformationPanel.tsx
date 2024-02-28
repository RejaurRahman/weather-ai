import Image from "next/image"

import CityPicker from "@/components/CityPicker/CityPicker"

import { 
  MoonIcon,
  SunIcon
} from "@heroicons/react/24/solid"
import weatherCodeToString from "@/lib/weatherCodeToString"

type Props = {
  city: string
  lat: string
  long: string
  results: Root
}

export default function InformationPanel({
  city,
  lat,
  long,
  results
}: Props) {
  return (
    <div className="bg-gradient-to-br from-[#be185d] to-[#9d174d] text-white p-10">
      <div className="pb-5">
        <h1 className="text-6xl font-bold">
          {decodeURI(city)}
        </h1>
        <p className="text-xs text-gray-400">
          Long/Lat: {long}, {lat}
        </p>
      </div>
      <CityPicker />
      <hr className="my-10" />
      <div className="mt-5 flex items-center justify-between space-x-10 mb-5">
        <div>
          <p className="text-xl">
            {
              new Date().toLocaleDateString("en-GB", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
              })
            }
          </p>
          <p className="font-extralight">
            Timezone: {Intl.DateTimeFormat().resolvedOptions().timeZone}
          </p>
        </div>
        <p className="text-xl font-bold uppercase">
          {
            new Date().toLocaleDateString("en-GB", {
              hour: "numeric",
              minute: "numeric",
              hour12: true
            })
          }
        </p>
      </div>
      <hr className="mt-10 mb-5" />
      <div>
        <div>
          <div>
            <p>
              {results.current_weather.temperature.toFixed(1)}&deg;C
            </p>
            <p>
              {weatherCodeToString[results.current_weather.weathercode].label}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
