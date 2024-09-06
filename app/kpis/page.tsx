'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Sidebar } from '@/components/Sidebar'
import ClientOnlyGraphVisualization from '@/components/ClientOnlyGraphVisualization'
import { KPI } from '@/lib/types'

export default function KPIsPage() {
    const [kpis, setKPIs] = useState<KPI[]>([])
    const [selectedKPI, setSelectedKPI] = useState<KPI | null>(null)

    useEffect(() => {
        const fetchKPIs = async () => {
            try {
                const response = await fetch('/api/kpis');
                if (!response.ok) {
                    throw new Error('Failed to fetch KPIs');
                }
                const fetchedKPIs = await response.json();
                setKPIs(fetchedKPIs as KPI[]);
            } catch (error) {
                console.error('Error fetching KPIs:', error);
            }
        }
        fetchKPIs();
    }, [])

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
                <h2 className="text-2xl font-semibold mb-4">KPIs</h2>
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
                    </div>
                )}
            </div>
            <Sidebar selectedItem={selectedKPI} />
            <div className="md:col-span-3 mt-8">
                <ClientOnlyGraphVisualization
                    selectedItem={selectedKPI ?
                        { ...selectedKPI, type: 'KPI', image: selectedKPI.image || '/placeholder.svg?height=200&width=200' } :
                        null
                    }
                />
            </div>
        </div>
    )
}