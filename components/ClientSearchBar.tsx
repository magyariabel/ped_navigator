'use client'

import { SearchBar } from '@/components/SearchBar'

export function ClientSearchBar({ categories, onSearch }) {
    return <SearchBar categories={categories} onSearch={onSearch} />
}
