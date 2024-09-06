'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import Image from 'next/image'
import { ClientSearchBar } from '@/components/ClientSearchBar'
import { DetailModal } from '@/components/DetailModal'

type Item = {
    id: string
    name: string
    image: string
    description: string
    type: 'Stakeholders' | 'Intervention_points' | 'KPI' | 'Tools'
}

type CategoryData = {
    [key: string]: Item[]
}

function ItemCard({ item, onClick }: { item: Item; onClick: () => void }) {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <Card
            className="w-full h-48 flex items-center justify-center cursor-pointer transition-all duration-300 transform hover:scale-105"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onClick}
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
    const [selectedItem, setSelectedItem] = useState<Item | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categories = ['stakeholders', 'interventionPoints', 'kpis', 'tools'];
                const results = await Promise.all(
                    categories.map(async (category) => {
                        const response = await fetch(`/api/${category}`);
                        if (!response.ok) {
                            throw new Error(`Failed to fetch ${category}`);
                        }
                        const data = await response.json();
                        return [category, data.map(item => ({
                            id: item.id,
                            name: item.name,
                            image: item.image || '/placeholder.svg?height=200&width=200',
                            description: item.description,
                            type: category
                        }))];
                    })
                );

                setCategoryData(Object.fromEntries(results));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, [])

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-center">Positive Energy Design Navigator</h1>
            <ClientSearchBar categories={Object.keys(categoryData)} onSearch={setSelectedItem} />

            <Tabs defaultValue="stakeholders" className="w-full mt-8">
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
                                <ItemCard
                                    key={item.id}
                                    item={item}
                                    onClick={() => {
                                        setSelectedItem(item)
                                        setIsModalOpen(true)
                                    }}
                                />
                            ))}
                        </div>
                    </TabsContent>
                ))}
            </Tabs>

            {selectedItem && (
                <DetailModal
                    item={selectedItem}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    )
}