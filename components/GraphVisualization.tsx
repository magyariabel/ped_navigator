'use client'

import { useEffect, useState } from 'react'
import ForceGraph2D from 'react-force-graph-2d'

const GraphVisualization = ({ selectedItem }: { selectedItem: any }) => {
    const [graphData, setGraphData] = useState({ nodes: [], links: [] })

    useEffect(() => {
        if (selectedItem) {
            fetch(`/api/graph-data?itemType=${selectedItem.type}&itemId=${selectedItem.id}`)
                .then(response => response.json())
                .then(data => setGraphData(data))
                .catch(error => console.error('Error fetching graph data:', error))
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

export { GraphVisualization }