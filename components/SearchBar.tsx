'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function SearchBar({ categories, onSearch }) {
    const [searchTerm, setSearchTerm] = useState('')

    const handleSearch = async () => {
        try {
            const response = await fetch(`/api/search?term=${searchTerm}`);
            if (!response.ok) {
                throw new Error('Failed to search');
            }
            const result = await response.json();
            onSearch(result);
        } catch (error) {
            console.error('Error searching:', error);
        }
    }

    return (
        <div className="flex space-x-2">
            <Input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button onClick={handleSearch}>Search</Button>
        </div>
    )
}