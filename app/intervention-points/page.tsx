'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Sidebar } from '@/components/Sidebar'
import ClientOnlyGraphVisualization from '@/components/ClientOnlyGraphVisualization'
import driver from '@/lib/neo4j'
import { InterventionPoint } from '@/lib/types'

export default function InterventionPointsPage() {
    const [interventionPoints, setInterventionPoints] = useState<InterventionPoint[]>([])
    const [selectedInterventionPoint, setSelectedInterventionPoint] = useState<InterventionPoint | null>(null)

    useEffect(() => {
        const fetchInterventionPoints = async () => {
            const session = driver.session()
            try {
                const result = await session.run('MATCH (i:Intervention_points) RETURN i')
                const fetchedInterventionPoints = result.records.map(record => record.get('i').properties as InterventionPoint)
                setInterventionPoints(fetchedInterventionPoints)
            } finally {
                await session.close()
            }
        }
        fetchInterventionPoints()
    }, [])

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
                <h2 className="text-2xl font-semibold mb-4">Intervention Points</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {interventionPoints.map(interventionPoint => (
                        <Card
                            key={interventionPoint.id}
                            className="cursor-pointer hover:shadow-lg transition-shadow"
                            onClick={() => setSelectedInterventionPoint(interventionPoint)}
                        >
                            <CardContent className="p-4">
                                <h3 className="text-lg font-semibold">{interventionPoint.name}</h3>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                {selectedInterventionPoint && (
                    <div className="mt-8">
                        <h3 className="text-xl font-semibold mb-2">{selectedInterventionPoint.name}</h3>
                        <p>{selectedInterventionPoint.description}</p>
                    </div>
                )}
            </div>
            <Sidebar selectedItem={selectedInterventionPoint} />
            <div className="md:col-span-3 mt-8">
                <ClientOnlyGraphVisualization selectedItem={selectedInterventionPoint ? { ...selectedInterventionPoint, type: 'Intervention_points' } : null} />
            </div>
        </div>
    )
}