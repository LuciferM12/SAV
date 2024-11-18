'use client'
import React, { useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Minus, Plus, Trash2 } from 'lucide-react'
import ButtonRender from '@/components/buttons/Button'

interface Invoice {
    invoice: string;
    paymentStatus: string;
    totalAmount: string;
    paymentMethod: string;
    quantity: number;
}

const initialInvoices: Invoice[] = [
    {
        invoice: "INV001",
        paymentStatus: "Paid",
        totalAmount: "$250.00",
        paymentMethod: "Credit Card",
        quantity: 1,
    },
    {
        invoice: "INV002",
        paymentStatus: "Pending",
        totalAmount: "$150.00",
        paymentMethod: "PayPal",
        quantity: 1,
    },
    {
        invoice: "INV003",
        paymentStatus: "Unpaid",
        totalAmount: "$350.00",
        paymentMethod: "Bank Transfer",
        quantity: 1,
    },
    {
        invoice: "INV004",
        paymentStatus: "Paid",
        totalAmount: "$450.00",
        paymentMethod: "Credit Card",
        quantity: 1,
    },
    {
        invoice: "INV005",
        paymentStatus: "Paid",
        totalAmount: "$550.00",
        paymentMethod: "PayPal",
        quantity: 1,
    },
    {
        invoice: "INV006",
        paymentStatus: "Pending",
        totalAmount: "$200.00",
        paymentMethod: "Bank Transfer",
        quantity: 1,
    },
    {
        invoice: "INV007",
        paymentStatus: "Unpaid",
        totalAmount: "$300.00",
        paymentMethod: "Credit Card",
        quantity: 1,
    },
]

const Carrito = () => {
    const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);

    const handleQuantityChange = (index: number, change: number) => {
        const newInvoices = [...invoices];
        newInvoices[index].quantity = Math.max(1, newInvoices[index].quantity + change);
        setInvoices(newInvoices);
    };

    const handleRemoveItem = (index: number) => {
        const newInvoices = invoices.filter((_, i) => i !== index);
        setInvoices(newInvoices);
    };

    const calculateTotal = () => {
        return invoices.reduce((total, invoice) => {
            return total + parseFloat(invoice.totalAmount.replace('$', '')) * invoice.quantity;
        }, 0).toFixed(2);
    };

    return (
        <div className='p-24 md:pt-24 md:p-6'>
            <h1 className='font-extrabold text-3xl text-center mb-6'>Carrito</h1>
            <div className='w-full flex justify-between items-center md:flex-col gap-4'>
                <div className='dark:bg-zinc-900 shadow-lg rounded-xl overflow-hidden w-[70%] md:w-[90%]'>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Invoice</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Method</TableHead>
                                <TableHead>Quantity</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {invoices.map((invoice, index) => (
                                <TableRow key={invoice.invoice}>
                                    <TableCell className="font-medium">{invoice.invoice}</TableCell>
                                    <TableCell>{invoice.paymentStatus}</TableCell>
                                    <TableCell>{invoice.paymentMethod}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center space-x-2">
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={() => handleQuantityChange(index, -1)}
                                                disabled={invoice.quantity <= 1}
                                            >
                                                <Minus className="h-4 w-4" />
                                            </Button>
                                            <span>{invoice.quantity}</span>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={() => handleQuantityChange(index, 1)}
                                            >
                                                <Plus className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">{invoice.totalAmount}</TableCell>
                                    <TableCell className="text-right">
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => handleRemoveItem(index)}
                                        >
                                            <Trash2 className="h-4 w-4 mr-2" />
                                            Remove
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <div className='w-[25%] md:w-[90%] rounded-xl bg-[#fafafa] text-black h-56 flex items-center justify-center flex-col gap-2 shadow-md'>
                    <span className='font-bold text-xl'>Total: ${calculateTotal()}</span>
                    <ButtonRender variant={"default"} text='Proceder a compra' className='bg-[#08080a] text-white rounded-2xl hover:bg-slate-900' />
                </div>
            </div>
        </div>
    )
}

export default Carrito