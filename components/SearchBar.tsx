'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Item } from '@/components/DetailModal';

interface SearchBarProps {
    categories: string[];
    onSearch: (result: Item) => void;
}

export function SearchBar({ categories, onSearch }: SearchBarProps) {
    const [searchTerm, setSearchTerm] = useState('')

    const handleSearch = async () => {
        try {
            const response = await fetch(`/api/search?term=${searchTerm}`);
            if (!response.ok) {
                throw new Error('Search failed');
            }
            const result = await response.json();
            if (result.length > 0) {
                onSearch(result[0]); // Pass the first item found
            }
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