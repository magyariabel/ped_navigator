'use client'

import { useState, useEffect } from 'react'
import driver from '@/lib/neo4j'

export function Sidebar({ selectedItem }: { selectedItem: any }) {
    const [relatedKPIs, setRelatedKPIs] = useState([])
    const [relatedTools, setRelatedTools] = useState([])
    const [relatedInterventionPoints, setRelatedInterventionPoints] = useState([])

    useEffect(() => {
        if (selectedItem) {
            // Fetch related data from Neo4j based on the selectedItem
            // Update state with the fetched data
        }
    }, [selectedItem])

    return (
        <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Related Items</h3>
            {/* Render lists of related items */}
        </div>
    )
}