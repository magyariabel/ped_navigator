export interface Stakeholder {
    id: string
    name: string
    description: string
}

export interface KPI {
    id: string
    name: string
    description: string
    calculationMethod: string
}

export interface Tool {
    id: string
    name: string
    description: string
    usage: string
}

export interface InterventionPoint {
    id: string
    name: string
    description: string
}