const getBasePath = () => {
  let base_url = process.env.NODE_ENV === "development" ? "http://localhost:3000" : process.env.PRODUCTION_URL

  return base_url
}

export default getBasePath
