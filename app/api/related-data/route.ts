import { NextResponse } from 'next/server';
import driver from '@/lib/neo4j';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const id = searchParams.get('id');

    if (!type || !id) {
        return NextResponse.json({ error: 'Missing type or id' }, { status: 400 });
    }

    const session = driver.session();
    try {
        const query = `
        MATCH (n:${type} {id: $id})
        OPTIONAL MATCH (n)-[:RELATED_TO]->(k:KPI)
        OPTIONAL MATCH (n)-[:RELATED_TO]->(t:Tools)
        OPTIONAL MATCH (n)-[:RELATED_TO]->(i:Intervention_points)
        RETURN 
            collect(distinct k {.id, .name}) as kpis,
            collect(distinct t {.id, .name}) as tools,
            collect(distinct i {.id, .name}) as interventionPoints
        `;
        const result = await session.run(query, { id });

        const data = result.records[0].toObject();

        return NextResponse.json(data);
    } finally {
        await session.close();
    }
}