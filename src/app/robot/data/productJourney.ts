export type JourneyStep = {
  id: string
  title: string
  type: "RAW_MATERIAL" | "MANUFACTURING" | "DYEING" | "ASSEMBLY" | "DELIVERY"
  location: {
    name: string
    country: string
    lat: number
    lng: number
  }
  dateRange: string
  transport?: {
    method: string
    distanceKm: number
  }
  story: string
  sustainability: {
    materialsUsed?: string[]
    energyType?: string
    waterUsedLiters?: number
    co2EmissionsKg: number
    certifications?: string[]
  }
}

export type ProductJourney = {
  product: {
    id: string
    name: string
    category: string
    description: string
    totalCO2: number
    totalDistanceKm: number
  }
  steps: JourneyStep[]
}

export const productJourney: ProductJourney = {
  product: {
    id: "tshirt-001",
    name: "Organic Cotton T-Shirt",
    category: "Tops",
    description: "A sustainably produced cotton t-shirt with full supply chain transparency.",
    totalCO2: 4.8,
    totalDistanceKm: 9800
  },

  steps: [
    {
      id: "step-1",
      title: "Organic Cotton Farming",
      type: "RAW_MATERIAL",
      location: {
        name: "Gujarat",
        country: "India",
        lat: 22.2587,
        lng: 71.1924
      },
      dateRange: "March – May 2025",
      story:
        "The cotton is grown by small local farms using organic methods without synthetic pesticides. Irrigation relies mostly on rainwater, significantly reducing water consumption.",
      sustainability: {
        materialsUsed: ["Organic cotton"],
        energyType: "Manual + low-energy machinery",
        waterUsedLiters: 450,
        co2EmissionsKg: 1.2,
        certifications: ["GOTS"]
      }
    },

    {
      id: "step-2",
      title: "Spinning & Weaving",
      type: "MANUFACTURING",
      location: {
        name: "Izmir",
        country: "Turkey",
        lat: 38.4237,
        lng: 27.1428
      },
      dateRange: "June 2025",
      transport: {
        method: "Ship",
        distanceKm: 4200
      },
      story:
        "The raw cotton is spun and woven in a family-owned factory powered partly by solar energy. Workers are employed under long-term contracts.",
      sustainability: {
        energyType: "Solar + grid",
        co2EmissionsKg: 1.5,
        certifications: ["OEKO-TEX"]
      }
    },

    {
      id: "step-3",
      title: "Low-Impact Dyeing",
      type: "DYEING",
      location: {
        name: "Prato",
        country: "Italy",
        lat: 43.8777,
        lng: 11.1022
      },
      dateRange: "July 2025",
      transport: {
        method: "Train",
        distanceKm: 1800
      },
      story:
        "The fabric is dyed using low-impact dyes in a closed-loop system that recycles most of the water used during the process.",
      sustainability: {
        waterUsedLiters: 120,
        co2EmissionsKg: 0.8,
        certifications: ["Bluesign"]
      }
    },

    {
      id: "step-4",
      title: "Garment Assembly",
      type: "ASSEMBLY",
      location: {
        name: "Porto",
        country: "Portugal",
        lat: 41.1579,
        lng: -8.6291
      },
      dateRange: "August 2025",
      transport: {
        method: "Truck",
        distanceKm: 1500
      },
      story:
        "The t-shirt is cut and sewn in a small factory where workers are paid fair wages and work under EU labor regulations.",
      sustainability: {
        co2EmissionsKg: 0.9,
        certifications: ["Fair Wear Foundation"]
      }
    },

    {
      id: "step-5",
      title: "Warehouse & Distribution",
      type: "DELIVERY",
      location: {
        name: "Milan",
        country: "Italy",
        lat: 45.4642,
        lng: 9.19
      },
      dateRange: "September 2025",
      transport: {
        method: "Truck",
        distanceKm: 300
      },
      story:
        "Final quality checks are completed before the product is shipped directly to customers across Europe.",
      sustainability: {
        co2EmissionsKg: 0.4
      }
    }
  ]
}
