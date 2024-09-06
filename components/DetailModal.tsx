'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Image from 'next/image'
import { GraphVisualization } from '@/components/GraphVisualization'

interface Item {
    id: string;
    name: string;
    image: string;
    description: string;
}

interface DetailModalProps {
    item: Item;
    isOpen: boolean;
    onClose: () => void;
}

export function DetailModal({ item, isOpen, onClose }: DetailModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{item.name}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <Image src={item.image} alt={item.name} width={300} height={300} className="rounded-md" />
                    <p>{item.description}</p>
                    <GraphVisualization selectedItem={item} />
                </div>
            </DialogContent>
        </Dialog>
    )
}
