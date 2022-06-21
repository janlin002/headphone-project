import sanityClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = sanityClient({
  projectId: 'fnph6t85',
  dataset: 'production',
  apiVersion: '2022-06-01',
  useCdn: true,
  token: 'sk5xGBmm4z9Lt1DI3WF3xgU5hLwWkDG1X3HMbV1SewfAiem1BgjnRMgYXgVAMjoFVpD6SGj5ULCMHqXoi2PiITn6oES4l09EZorKMf2vfjzEBgQcOYUzyY9ksCO3n1v0M2bwakWKJVi4BA59fpExn552lAJ07mdXJAP6rtxPFMaM6AJFXinS',
})

const builder = imageUrlBuilder(client)

export const urlFor = (source) => builder.image(source)

// 路徑確認:
// start ->
// manage ->
