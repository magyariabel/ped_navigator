'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Sidebar } from '@/components/Sidebar'
import ClientOnlyGraphVisualization from '@/components/ClientOnlyGraphVisualization'
import { Stakeholder } from '@/lib/types'

export default function StakeholdersPage() {
    const [stakeholders, setStakeholders] = useState<Stakeholder[]>([])
    const [selectedStakeholder, setSelectedStakeholder] = useState<Stakeholder | null>(null)

    useEffect(() => {
        const fetchStakeholders = async () => {
            try {
                const response = await fetch('/api/stakeholders');
                if (!response.ok) {
                    throw new Error('Failed to fetch stakeholders');
                }
                const fetchedStakeholders = await response.json();
                setStakeholders(fetchedStakeholders);
            } catch (error) {
                console.error('Error fetching stakeholders:', error);
            }
        }
        fetchStakeholders();
    }, [])

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
                <h2 className="text-2xl font-semibold mb-4">Stakeholders</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {stakeholders.map(stakeholder => (
                        <Card
                            key={stakeholder.id}
                            className="cursor-pointer hover:shadow-lg transition-shadow"
                            onClick={() => setSelectedStakeholder(stakeholder)}
                        >
                            <CardContent className="p-4">
                                <h3 className="text-lg font-semibold">{stakeholder.name}</h3>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                {selectedStakeholder && (
                    <div className="mt-8">
                        <h3 className="text-xl font-semibold mb-2">{selectedStakeholder.name}</h3>
                        <p>{selectedStakeholder.description}</p>
                    </div>
                )}
            </div>
            <Sidebar selectedItem={selectedStakeholder} />
            <div className="md:col-span-3 mt-8">
                <ClientOnlyGraphVisualization
                    selectedItem={selectedStakeholder ?
                        { ...selectedStakeholder, type: 'Stakeholders', image: selectedStakeholder.image || '' } :
                        null
                    }
                />
            </div>
        </div>
    )
}