'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Sidebar } from '@/components/Sidebar'
import { GraphVisualization } from '@/components/GraphVisualization'
import driver from '@/lib/neo4j'
import { KPI } from '@/lib/types'

export default function KPIsPage() {
    const [kpis, setKPIs] = useState<KPI[]>([])
    const [selectedKPI, setSelectedKPI] = useState<KPI | null>(null)

    useEffect(() => {
        const fetchKPIs = async () => {
            const session = driver.session()
            try {
                const result = await session.run('MATCH (k:KPI) RETURN k')
                const fetchedKPIs = result.records.map(record => record.get('k').properties as KPI)
                setKPIs(fetchedKPIs)
            } finally {
                await session.close()
            }
        }
        fetchKPIs()
    }, [])

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
                <h2 className="text-2xl font-semibold mb-4">Key Performance Indicators</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {kpis.map(kpi => (
                        <Card
                            key={kpi.id}
                            className="cursor-pointer hover:shadow-lg transition-shadow"
                            onClick={() => setSelectedKPI(kpi)}
                        >
                            <CardContent className="p-4">
                                <h3 className="text-lg font-semibold">{kpi.name}</h3>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                {selectedKPI && (
                    <div className="mt-8">
                        <h3 className="text-xl font-semibold mb-2">{selectedKPI.name}</h3>
                        <p>{selectedKPI.description}</p>
                        <h4 className="text-lg font-semibold mt-4 mb-2">Calculation Method</h4>
                        <p>{selectedKPI.calculationMethod}</p>
                    </div>
                )}
            </div>
            <Sidebar selectedItem={selectedKPI} />
            <div className="md:col-span-3 mt-8">
                <GraphVisualization selectedItem={selectedKPI} />
            </div>
        </div>
    )
}