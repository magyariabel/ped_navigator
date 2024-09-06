import { NextResponse } from 'next/server';
import driver from '@/lib/neo4j';

export async function GET() {
    const session = driver.session();
    try {
        const result = await session.run('MATCH (k:KPI) RETURN k');
        const kpis = result.records.map(record => record.get('k').properties);
        return NextResponse.json(kpis);
    } finally {
        await session.close();
    }
}