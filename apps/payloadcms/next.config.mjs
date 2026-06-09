import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['ffmpeg-static'],
  allowedDevOrigins: ['example.test'],
}

export default withPayload(nextConfig)
