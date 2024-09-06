import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import Image from 'next/image'
import driver from '@/lib/neo4j'

// Mock data - replace this with your actual data from Neo4j
const mockData = {
  stakeholders: [
    { id: 1, name: 'City Planner', image: '/placeholder.svg?height=200&width=200' },
    { id: 2, name: 'Architect', image: '/placeholder.svg?height=200&width=200' },
    { id: 3, name: 'Energy Consultant', image: '/placeholder.svg?height=200&width=200' },
  ],
  interventionPoints: [
    { id: 1, name: 'Building Design', image: '/placeholder.svg?height=200&width=200' },
    { id: 2, name: 'Energy Systems', image: '/placeholder.svg?height=200&width=200' },
    { id: 3, name: 'Urban Planning', image: '/placeholder.svg?height=200&width=200' },
  ],
  kpis: [
    { id: 1, name: 'Energy Efficiency', image: '/placeholder.svg?height=200&width=200' },
    { id: 2, name: 'Carbon Footprint', image: '/placeholder.svg?height=200&width=200' },
    { id: 3, name: 'Renewable Energy Usage', image: '/placeholder.svg?height=200&width=200' },
  ],
  tools: [
    { id: 1, name: 'Energy Simulation Software', image: '/placeholder.svg?height=200&width=200' },
    { id: 2, name: 'Carbon Calculator', image: '/placeholder.svg?height=200&width=200' },
    { id: 3, name: 'Urban Planning GIS', image: '/placeholder.svg?height=200&width=200' },
  ],
}

type Item = {
  id: number
  name: string
  image: string
}

function ItemCard({ item }: { item: Item }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card
      className="w-full h-48 flex items-center justify-center cursor-pointer transition-all duration-300 transform hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-4 text-center">
        {isHovered ? (
          <Image src={item.image} alt={item.name} width={200} height={200} className="rounded-md" />
        ) : (
          <h3 className="text-xl font-semibold">{item.name}</h3>
        )}
      </CardContent>
    </Card>
  )
}

export default function PositiveEnergyDesignNavigator() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Positive Energy Design Navigator</h1>

      <Tabs defaultValue="stakeholders" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="stakeholders">Stakeholders</TabsTrigger>
          <TabsTrigger value="interventionPoints">Intervention Points</TabsTrigger>
          <TabsTrigger value="kpis">KPIs</TabsTrigger>
          <TabsTrigger value="tools">Tools</TabsTrigger>
        </TabsList>

        {Object.entries(mockData).map(([category, items]) => (
          <TabsContent key={category} value={category} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item: Item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}