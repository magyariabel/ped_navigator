import { NextResponse } from 'next/server';
import driver from '@/lib/neo4j';

export async function GET() {
    const session = driver.session();
    try {
        const result = await session.run('MATCH (i:Intervention_points) RETURN i.id as id, i.name as name, i.image as image');
        const interventionPoints = result.records.map(record => ({
            id: record.get('id'),
            name: record.get('name'),
            image: record.get('image')
        }));
        return NextResponse.json(interventionPoints);
    } finally {
        await session.close();
    }
}
