'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import Image from 'next/image'
import driver from '@/lib/neo4j'

type Item = {
    id: string
    name: string
    image: string
}

type CategoryData = {
    [key: string]: Item[]
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

export default function LandingPage() {
    const [categoryData, setCategoryData] = useState<CategoryData>({
        stakeholders: [],
        interventionPoints: [],
        kpis: [],
        tools: []
    })

    useEffect(() => {
        const fetchData = async () => {
            const session = driver.session()
            try {
                const queries = {
                    stakeholders: 'MATCH (s:Stakeholder_roles) RETURN s.id as id, s.name as name, s.image as image',
                    interventionPoints: 'MATCH (i:Intervention_points) RETURN i.id as id, i.name as name, i.image as image',
                    kpis: 'MATCH (k:KPI) RETURN k.id as id, k.name as name, k.image as image',
                    tools: 'MATCH (t:Tools) RETURN t.id as id, t.name as name, t.image as image'
                }

                const results = await Promise.all(
                    Object.entries(queries).map(async ([category, query]) => {
                        const result = await session.run(query)
                        return [category, result.records.map(record => ({
                            id: record.get('id'),
                            name: record.get('name'),
                            image: record.get('image') || '/placeholder.svg?height=200&width=200'
                        }))]
                    })
                )

                setCategoryData(Object.fromEntries(results))
            } finally {
                await session.close()
            }
        }

        fetchData()
    }, [])

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

                {Object.entries(categoryData).map(([category, items]) => (
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