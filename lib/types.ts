import { Item } from '@/components/DetailModal';

export type Stakeholder = Omit<Item, 'type'> & { type: 'Stakeholders' };
export type InterventionPoint = Omit<Item, 'type'> & { type: 'Intervention_points' };
export type KPI = Omit<Item, 'type'> & { type: 'KPI' };
export type Tool = Omit<Item, 'type'> & { type: 'Tools'; usage: string };