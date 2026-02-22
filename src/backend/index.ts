// Clients
export { attendmeClient, attendmeDeviceClient } from './attendme/client'

// Attendme API
import type { paths as AttendmePaths, components as AttendmeComponents } from './attendme/schema'
type AttendmeSchemas = AttendmeComponents['schemas']
export type { AttendmePaths, AttendmeComponents, AttendmeSchemas }
