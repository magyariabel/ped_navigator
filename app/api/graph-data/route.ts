import { NextResponse } from 'next/server';
import driver from '@/lib/neo4j';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const itemType = searchParams.get('itemType');
    const itemId = searchParams.get('itemId');

    if (!itemType || !itemId) {
        return NextResponse.json({ error: 'Missing itemType or itemId' }, { status: 400 });
    }

    const session = driver.session();
    try {
        const query = `
      MATCH (n:${itemType} {id: $itemId})-[r]-(related)
      RETURN n, r, related
    `;
        const result = await session.run(query, { itemId });

        const nodes = new Set();
        const links = [];

        result.records.forEach(record => {
            const node = record.get('n');
            const related = record.get('related');
            const relationship = record.get('r');

            nodes.add({ id: node.properties.id, name: node.properties.name, group: node.labels[0] });
            nodes.add({ id: related.properties.id, name: related.properties.name, group: related.labels[0] });

            links.push({
                source: node.properties.id,
                target: related.properties.id,
                type: relationship.type
            });
        });

        return NextResponse.json({ nodes: Array.from(nodes), links });
    } finally {
        await session.close();
    }
}