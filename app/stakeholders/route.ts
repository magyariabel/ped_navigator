import { NextResponse } from 'next/server';
import driver from '@/lib/neo4j';

export async function GET() {
    const session = driver.session();
    try {
        const result = await session.run('MATCH (s:Stakeholder_roles) RETURN s');
        const stakeholders = result.records.map(record => record.get('s').properties);
        return NextResponse.json(stakeholders);
    } finally {
        await session.close();
    }
}
