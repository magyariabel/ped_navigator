import { NextResponse } from 'next/server';
import driver from '@/lib/neo4j';

export async function GET() {
    const session = driver.session();
    try {
        const result = await session.run('MATCH (i:Intervention_points) RETURN i');
        const interventionPoints = result.records.map(record => record.get('i').properties);
        return NextResponse.json(interventionPoints);
    } finally {
        await session.close();
    }
}