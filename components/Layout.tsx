import React from 'react'
import { Breadcrumbs } from './Breadcrumbs'
import { SearchBar } from './SearchBar'

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-center">Positive Energy Design Navigator</h1>
            <SearchBar />
            <Breadcrumbs />
            {children}
        </div>
    )
}