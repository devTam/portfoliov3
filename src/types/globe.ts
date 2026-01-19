import { Company } from '@/lib/data/companies'

export interface GlobeMarker {
  company: Company
  position: [number, number, number]
  id: string
}

export interface GlobeState {
  selectedMarker: GlobeMarker | null
  isAutoRotating: boolean
  cameraPosition: [number, number, number]
}
