import { NextResponse } from 'next/server';
import driver from '@/lib/neo4j';

export async function GET() {
    const session = driver.session();
    try {
        const result = await session.run('MATCH (t:Tools) RETURN t');
        const tools = result.records.map(record => record.get('t').properties);
        return NextResponse.json(tools);
    } finally {
        await session.close();
    }
}
