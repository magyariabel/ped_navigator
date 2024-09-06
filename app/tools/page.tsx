'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Sidebar } from '@/components/Sidebar'
import ClientOnlyGraphVisualization from '@/components/ClientOnlyGraphVisualization'
import driver from '@/lib/neo4j'
import { Tool } from '@/lib/types'

export default function ToolsPage() {
    const [tools, setTools] = useState<Tool[]>([])
    const [selectedTool, setSelectedTool] = useState<Tool | null>(null)

    useEffect(() => {
        const fetchTools = async () => {
            try {
                const response = await fetch('/api/tools');
                if (!response.ok) {
                    throw new Error('Failed to fetch tools');
                }
                const fetchedTools = await response.json();
                setTools(fetchedTools);
            } catch (error) {
                console.error('Error fetching tools:', error);
            }
        }
        fetchTools();
    }, [])

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
                <h2 className="text-2xl font-semibold mb-4">Tools</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {tools.map(tool => (
                        <Card
                            key={tool.id}
                            className="cursor-pointer hover:shadow-lg transition-shadow"
                            onClick={() => setSelectedTool(tool)}
                        >
                            <CardContent className="p-4">
                                <h3 className="text-lg font-semibold">{tool.name}</h3>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                {selectedTool && (
                    <div className="mt-8">
                        <h3 className="text-xl font-semibold mb-2">{selectedTool.name}</h3>
                        <p>{selectedTool.description}</p>
                        <h4 className="text-lg font-semibold mt-4 mb-2">Usage</h4>
                        <p>{selectedTool.usage}</p>
                    </div>
                )}
            </div>
            <Sidebar selectedItem={selectedTool} />
            <div className="md:col-span-3 mt-8">
                <ClientOnlyGraphVisualization selectedItem={selectedTool ? { ...selectedTool, type: 'Tools' } : null} />
            </div>
        </div>
    )
}