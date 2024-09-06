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
      OPTIONAL MATCH (n)-[:IMPACTS]->(kpi:KPIs)
      OPTIONAL MATCH (n)-[:USES]->(tool:Tools)
      OPTIONAL MATCH (n)-[:ADDRESSES]->(ip:InterventionPoints)
      RETURN 
        collect(distinct kpi) as kpis,
        collect(distinct tool) as tools,
        collect(distinct ip) as interventionPoints
    `;
        const result = await session.run(query, { id });

        const data = result.records[0];
        return NextResponse.json({
            kpis: data.get('kpis').map(node => node.properties),
            tools: data.get('tools').map(node => node.properties),
            interventionPoints: data.get('interventionPoints').map(node => node.properties)
        });
    } finally {
        await session.close();
    }
}