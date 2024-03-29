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
    <div className="bg-gradient-to-br from-[#be185d] to-[#9d174d] text-white p-10 lg:w-[450px]">
      <div className="pb-5">
        <h1 className="text-6xl font-bold">
          {decodeURI(city)}
        </h1>
        <p className="text-xs text-white">
          Long/Lat: {long}, {lat}
        </p>
      </div>
      <CityPicker />
      <hr className="my-10" />
      <div className="mt-5 flex flex-col md:flex-row lg:flex-col items-center justify-between mb-5">
        <p className="text-xl mb-2 sm:mb-0 lg:mb-2">
          {
            new Date().toLocaleDateString("en-GB", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric"
            })
          }
        </p>
        <p className="font-extralight ml-0 mb-2 sm:mb-0 lg:mb-2">
          Timezone: {Intl.DateTimeFormat().resolvedOptions().timeZone}
        </p>
        <p className="text-xl font-bold uppercase ml-0">
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
      <div className="flex flex-col sm:flex-row lg:flex-col items-center justify-between">
        <Image
          alt={weatherCodeToString[results.current_weather.weathercode].label}
          height={75}
          src={`https://www.weatherbit.io/static/img/icons/${weatherCodeToString[results.current_weather.weathercode].icon}.png`}
          width={75}
        />
        <div className="flex flex-col sm:flex-row lg:flex-col items-center justify-between sm:space-x-10 lg:space-x-0">
          <p className="text-6xl font-semibold mb-2 sm:mb-0">
            {results.current_weather.temperature.toFixed(1)}&deg;C
          </p>
          <p className="text-lg text-right font-extralight">
            {weatherCodeToString[results.current_weather.weathercode].label}
          </p>
        </div>
      </div>
      <div className="space-y-2 py-5">
        <div className="flex flex-col sm:flex-row lg:flex-col items-center space-x-2 px-4 py-3 border border-[#cb467d] rounded-md bg-[#d8749d]">
          <SunIcon
            className="h-10 w-10 text-white"
          />
          <div className="flex-1 flex flex-col sm:flex-row lg:flex-col justify-between items-center">
            <p className="font-extralight">Sunrise</p>
            <p className="uppercase text-2xl">
              {
                new Date(results.daily.sunrise[0]).toLocaleDateString("en-GB", {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true
                })
              }
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row lg:flex-col items-center space-x-2 px-4 py-3 border border-[#cb467d] rounded-md bg-[#d8749d]">
          <MoonIcon
            className="h-10 w-10 text-white"
          />
          <div className="flex-1 flex flex-col sm:flex-row lg:flex-col justify-between items-center">
            <p className="font-extralight">Sunset</p>
            <p className="uppercase text-2xl">
              {
                new Date(results.daily.sunset[0]).toLocaleDateString("en-GB", {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true
                })
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
