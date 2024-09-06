import dynamic from 'next/dynamic'

const GraphVisualization = dynamic(() => import('./GraphVisualization'), { ssr: false })

export default function ClientOnlyGraphVisualization({ selectedItem }) {
    return <GraphVisualization selectedItem={selectedItem} />
}