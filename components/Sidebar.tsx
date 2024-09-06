'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from "./ui/card"
import { Item } from '@/components/DetailModal';

export function Sidebar({ selectedItem }: { selectedItem: Item | null }) {
    const [relatedKPIs, setRelatedKPIs] = useState([])
    const [relatedTools, setRelatedTools] = useState([])
    const [relatedInterventionPoints, setRelatedInterventionPoints] = useState([])

    useEffect(() => {
        if (selectedItem) {
            const fetchRelatedData = async () => {
                try {
                    const response = await fetch(`/api/related-data?type=${selectedItem.type}&id=${selectedItem.id}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch related data');
                    }
                    const data = await response.json();
                    setRelatedKPIs(data.kpis);
                    setRelatedTools(data.tools);
                    setRelatedInterventionPoints(data.interventionPoints);
                } catch (error) {
                    console.error('Error fetching related data:', error);
                }
            };
            fetchRelatedData();
        }
    }, [selectedItem]);

    return (
        <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Related Items</h3>
            {/* Render lists of related items */}
        </div>
    )
}