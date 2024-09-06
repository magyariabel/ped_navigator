'use client'

import { useEffect, useState } from 'react'
import ForceGraph2D from 'react-force-graph-2d'
import driver from '@/lib/neo4j'

export const GraphVisualization = ({ selectedItem }: { selectedItem: any }) => {
    const [graphData, setGraphData] = useState({ nodes: [], links: [] })

    useEffect(() => {
        if (selectedItem) {
            // Fetch graph data from Neo4j based on the selectedItem
            // Update graphData state
        }
    }, [selectedItem])

    return (
        <ForceGraph2D
            graphData={graphData}
            nodeLabel="name"
            nodeAutoColorBy="group"
            linkDirectionalParticles={2}
        />
    )
}