import { AdminApi, Configuration } from '@oryd/hydra-client'

const baseOptions = {}

//singleton hydra admin interface
const hydraAdmin = new AdminApi(
  new Configuration({
    basePath: process.env.HYDRA_ADMIN_URL,
    baseOptions
  })
)

export default hydraAdmin