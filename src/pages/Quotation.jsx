import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, FileText, CheckCircle2, Plus, Trash2, Printer, Edit3 } from 'lucide-react';
import html2pdf from 'html2pdf.js';

// Utility to convert number to Indian currency words
const numberToWords = (num) => {
    const a = ['', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ', 'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '];
    const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

    const inWords = (n) => {
        if ((n = n.toString()).length > 9) return 'Overflow';
        let n_array = ('000000000' + n).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
        if (!n_array) return '';
        let str = '';
        str += (Number(n_array[1]) !== 0) ? (a[Number(n_array[1])] || b[n_array[1][0]] + ' ' + a[n_array[1][1]]) + 'Crore ' : '';
        str += (Number(n_array[2]) !== 0) ? (a[Number(n_array[2])] || b[n_array[2][0]] + ' ' + a[n_array[2][1]]) + 'Lakh ' : '';
        str += (Number(n_array[3]) !== 0) ? (a[Number(n_array[3])] || b[n_array[3][0]] + ' ' + a[n_array[3][1]]) + 'Thousand ' : '';
        str += (Number(n_array[4]) !== 0) ? (a[Number(n_array[4])] || b[n_array[4][0]] + ' ' + a[n_array[4][1]]) + 'Hundred ' : '';
        str += (Number(n_array[5]) !== 0) ? ((str !== '') ? 'and ' : '') + (a[Number(n_array[5])] || b[n_array[5][0]] + ' ' + a[n_array[5][1]]) + 'Rupees Only' : 'Rupees Only';
        return str;
    };

    return inWords(Math.floor(num));
};

const EditableField = ({ value, onChange, className, type = "text", placeholder = "Edit..." }) => {
    const [isEditing, setIsEditing] = useState(false);
    const inputRef = useRef(null);

    const handleBlur = () => setIsEditing(false);

    return (
        <div
            className={`group relative cursor-pointer transition-all ${className}`}
            onClick={() => setIsEditing(true)}
            style={{ display: 'inline-block' }}
        >
            {isEditing ? (
                type === "textarea" ? (
                    <textarea
                        ref={inputRef}
                        autoFocus
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        onBlur={handleBlur}
                        className="w-full rounded p-1 outline-none font-sans"
                        rows={3}
                        style={{ backgroundColor: '#ffffff', color: '#000000', border: '1px solid #facc15', fontSize: 'inherit' }}
                    />
                ) : (
                    <input
                        ref={inputRef}
                        autoFocus
                        type={type}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        onBlur={handleBlur}
                        className="w-full rounded p-1 outline-none font-sans"
                        style={{ backgroundColor: '#ffffff', color: '#000000', border: '1px solid #facc15', fontSize: 'inherit' }}
                    />
                )
            ) : (
                <div className="flex items-center">
                    <span className={!value ? 'italic opacity-50' : ''}>
                        {value || placeholder}
                    </span>
                    <Edit3 size={10} className="ml-1.5 opacity-0 group-hover:opacity-100 transition-opacity edit-icon shrink-0" style={{ color: '#eab308' }} />
                </div>
            )}
        </div>
    );
};

const Quotation = () => {
    const [quoteData, setQuoteData] = useState({
        quoteNo: '100117',
        date: '23/02/2026',
        expiryDate: '25/03/2026',
        company: {
            name: 'SAI SOLAREDGE SOLUTIONS',
            address: '2ND FLOOR, H.NO 8-6-1074/67, Road Number 9, Sri Venkataramana Colony, Karmanghat, K.V.Rangareddy, Telangana, 500070',
            mobile: '6302973009',
            gstin: '36AFVFS0700F1ZZ',
            pan: 'AFVFS0700F',
            email: 'connectwithus@saisolaredgesolutions.in',
            website: 'www.saisolaredgesolutions.in'
        },
        billTo: {
            name: 'Ashok Kumar',
            address: 'Plot No: 72, Hema Nagar, Uppal, Hyderabad, Telangana, 500092',
            mobile: '8106998543',
            placeOfSupply: 'Telangana'
        },
        shipTo: {
            name: 'Ashok Kumar',
            address: 'Plot No: 72, Hema Nagar, Uppal, Hyderabad, Telangana, 500092',
        },
        items: [
            {
                description: '10KW GRID CONNECTED SOLAR PV (NDCR) AS PER SCOPE DESIGNING, ENGINEERING, INSTALLATION & COMMISSIONING (EPC)',
                qty: '1 PCS',
                tax: '56,181.36 (18%)',
                amount: '368300'
            }
        ],
        summary: {
            taxableAmount: '3,12,118.64',
            cgstLabel: 'CGST @9%',
            cgst: '28,090.68',
            sgstLabel: 'SGST @9%',
            sgst: '28,090.68',
            amountInWords: 'Three Lakh Sixty Eight Thousand Three Hundred Rupees Only',
            total: '3,68,300'
        },
        bank: {
            name: 'Sai SolarEdge Solutions',
            ifsc: 'TGRB0000183',
            accountNo: '79104527499',
            bankName: 'TELANGANA GRAMEENA BANK, HASTINAPURAM, Hyderabad, Telangana'
        },
        terms: [
            "Goods once sold will not be taken back or exchanged",
            "All disputes are subject to Hyderabad jurisdiction only",
            "Initial 10% Documentation charges for site visit as well as Customer registration",
            "60% Payment to be made against invoice once agreed. Remaining 30% to be made after completion of Solar installation",
            "Payment received before 2 pm into our account will be considered for dispatch on same day",
            "Warranty - Standard warranty policies of the Manufacturer are applicable."
        ]
    });

    const [isDownloading, setIsDownloading] = useState(false);

    useEffect(() => {
        // Calculate taxable amount from sum of items
        const sumOfItems = quoteData.items.reduce((sum, item) => {
            const amt = parseFloat(item.amount.toString().replace(/,/g, '')) || 0;
            return sum + amt;
        }, 0);

        // We'll update the taxableAmount in the summary if it differs from the sum
        const currentTaxable = parseFloat(quoteData.summary.taxableAmount.replace(/,/g, '')) || 0;

        let taxable = sumOfItems > 0 ? sumOfItems : currentTaxable;

        // Common calculation logic
        const cgstMatch = quoteData.summary.cgstLabel.match(/(\d+(\.\d+)?)/);
        const sgstMatch = quoteData.summary.sgstLabel.match(/(\d+(\.\d+)?)/);
        const cgstRate = cgstMatch ? parseFloat(cgstMatch[1]) : 0;
        const sgstRate = sgstMatch ? parseFloat(sgstMatch[1]) : 0;

        const totalTaxRate = cgstRate + sgstRate;

        // If taxable amount is inclusive of tax, we need to strip it out
        // Based on the user's data: 3,68,300 total, 3,12,118.64 taxable. 
        // 368300 / 1.18 = 312118.64. So it's tax inclusive.
        const baseAmount = taxable / (1 + (totalTaxRate / 100));

        const cgstVal = (baseAmount * cgstRate) / 100;
        const sgstVal = (baseAmount * sgstRate) / 100;
        const totalVal = baseAmount + cgstVal + sgstVal;

        const formatNum = (n) => n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        const newTaxable = formatNum(baseAmount);
        const newCgst = formatNum(cgstVal);
        const newSgst = formatNum(sgstVal);
        const newTotalFormatted = Math.round(totalVal).toLocaleString('en-IN');
        const newWords = numberToWords(totalVal);

        if (quoteData.summary.taxableAmount !== newTaxable ||
            quoteData.summary.cgst !== newCgst ||
            quoteData.summary.sgst !== newSgst ||
            quoteData.summary.amountInWords !== newWords) {
            setQuoteData(prev => ({
                ...prev,
                summary: {
                    ...prev.summary,
                    taxableAmount: newTaxable,
                    cgst: newCgst,
                    sgst: newSgst,
                    total: newTotalFormatted,
                    amountInWords: newWords
                }
            }));
        }
    }, [quoteData.items, quoteData.summary.cgstLabel, quoteData.summary.sgstLabel]);

    const handleDownload = () => {
        const element = document.getElementById('quotation-document');
        if (!element) return;

        // Temporarily hide elements that shouldn't be in PDF
        const icons = element.querySelectorAll('.edit-icon');
        const addBtn = element.querySelector('.add-item-btn');
        icons.forEach(icon => icon.style.display = 'none');
        if (addBtn) addBtn.style.display = 'none';

        const opt = {
            margin: 0.2,
            filename: `Quotation_${quoteData.quoteNo || 'Document'}.pdf`,
            image: { type: 'jpeg', quality: 0.95 },
            html2canvas: {
                scale: 2,
                useCORS: true,
                logging: false,
                letterRendering: true
            },
            jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
        };

        // Trigger direct download and restore visibility
        html2pdf().from(element).set(opt).save().then(() => {
            icons.forEach(icon => icon.style.display = '');
            if (addBtn) addBtn.style.display = '';
        }).catch(err => {
            console.error('Download failed:', err);
            icons.forEach(icon => icon.style.display = '');
            if (addBtn) addBtn.style.display = '';
        });
    };

    const addItem = () => {
        setQuoteData({
            ...quoteData,
            items: [...quoteData.items, { description: '', qty: '1', tax: '18', amount: '0' }]
        });
    };

    const removeItem = (index) => {
        const newItems = quoteData.items.filter((_, i) => i !== index);
        setQuoteData({ ...quoteData, items: newItems });
    };

    const updateField = (category, field, val) => {
        setQuoteData({
            ...quoteData,
            [category]: { ...quoteData[category], [field]: val }
        });
    };

    const updateItem = (index, field, val) => {
        const newItems = [...quoteData.items];
        newItems[index][field] = val;
        setQuoteData({ ...quoteData, items: newItems });
    };

    return (
        <div className="pt-32 pb-20" style={{ backgroundColor: '#050a08', minHeight: '100vh' }}>
            <div className="container-custom max-w-5xl">
                <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-6 print:hidden">
                    <div>
                        <span className="font-black uppercase tracking-widest text-sm inline-block mb-3 italic" style={{ color: '#facc15' }}>Quotation Builder</span>
                        <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
                            Interactive <span style={{ color: '#facc15' }}>Document</span>
                        </h2>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => window.print()}
                            className="bg-white/5 text-white px-5 py-3 rounded-xl font-bold flex items-center gap-2 border border-white/10 transition-all hover:bg-white/10"
                        >
                            <Printer size={18} /> Print
                        </button>
                        <button
                            onClick={handleDownload}
                            className="px-6 py-3 font-black uppercase tracking-widest rounded-full flex items-center gap-3 transition-opacity bg-brand-yellow hover:opacity-90 active:scale-95"
                            style={{ backgroundColor: '#facc15', color: '#000000' }}
                        >
                            <Download size={18} /> Download PDF
                        </button>
                    </div>
                </div>

                <div
                    className="p-6 md:p-10 shadow-2xl font-sans"
                    id="quotation-document"
                    style={{ backgroundColor: '#ffffff', color: '#000000', borderRadius: '0' }}
                >
                    {/* Header */}
                    <div className="flex justify-between items-start pb-6 mb-6" style={{ borderBottom: '3px solid #000000' }}>
                        <div className="flex items-start gap-4">
                            <img src="/logo.png" alt="Logo" className="h-16 w-auto object-contain mt-1" />
                            <div className="flex flex-col">
                                <h1 className="text-3xl font-black uppercase leading-none mb-1" style={{ color: '#000000', letterSpacing: '-0.02em' }}>
                                    <EditableField value={quoteData.company.name} onChange={(val) => updateField('company', 'name', val)} />
                                </h1>
                                <div className="text-[10px] max-w-xs font-bold uppercase leading-tight" style={{ color: '#9ca3af' }}>
                                    <EditableField value={quoteData.company.address} type="textarea" onChange={(val) => updateField('company', 'address', val)} />
                                </div>
                            </div>
                        </div>
                        <div className="text-[9px] uppercase space-y-1 mt-1 font-bold text-right" style={{ color: '#000000' }}>
                            <div className="flex items-center justify-end gap-2">
                                <span style={{ color: '#d1d5db' }}>MOBILE</span>
                                <div className="min-w-[120px]"><EditableField value={quoteData.company.mobile} onChange={(val) => updateField('company', 'mobile', val)} /></div>
                            </div>
                            <div className="flex items-center justify-end gap-2">
                                <span style={{ color: '#d1d5db' }}>GSTIN</span>
                                <div className="min-w-[120px]"><EditableField value={quoteData.company.gstin} onChange={(val) => updateField('company', 'gstin', val)} /></div>
                            </div>
                            <div className="flex items-center justify-end gap-2">
                                <span style={{ color: '#d1d5db' }}>PAN</span>
                                <div className="min-w-[120px]"><EditableField value={quoteData.company.pan} onChange={(val) => updateField('company', 'pan', val)} /></div>
                            </div>
                            <div className="flex items-center justify-end gap-2">
                                <span style={{ color: '#d1d5db' }}>EMAIL</span>
                                <div className="min-w-[120px] lowercase"><EditableField value={quoteData.company.email} onChange={(val) => updateField('company', 'email', val)} /></div>
                            </div>
                            <div className="flex items-center justify-end gap-2">
                                <span style={{ color: '#d1d5db' }}>WEBSITE</span>
                                <div className="min-w-[120px] lowercase"><EditableField value={quoteData.company.website} onChange={(val) => updateField('company', 'website', val)} /></div>
                            </div>
                        </div>
                    </div>

                    {/* Metadata Header Bar */}
                    <div className="grid grid-cols-3 py-2.5 px-6 mb-6 text-[10px] font-black uppercase tracking-widest" style={{ backgroundColor: '#f9fafb', borderTop: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb' }}>
                        <div className="flex gap-2" style={{ color: '#9ca3af' }}>QUOTATION NO. <EditableField value={quoteData.quoteNo} onChange={(val) => setQuoteData({ ...quoteData, quoteNo: val })} className="text-black" /></div>
                        <div className="flex gap-2 justify-center" style={{ color: '#9ca3af' }}>DATE <EditableField value={quoteData.date} onChange={(val) => setQuoteData({ ...quoteData, date: val })} className="text-black" /></div>
                        <div className="flex gap-2 justify-end" style={{ color: '#9ca3af' }}>EXPIRY <EditableField value={quoteData.expiryDate} onChange={(val) => setQuoteData({ ...quoteData, expiryDate: val })} className="text-black" /></div>
                    </div>

                    {/* Bill To */}
                    <div className="grid grid-cols-2 gap-8 mb-6 text-[10px]">
                        <div>
                            <h4 className="font-black pb-0.5 mb-2 uppercase tracking-widest" style={{ borderBottom: '1px solid #000000', color: '#9ca3af' }}>Bill To</h4>
                            <div className="space-y-0.5">
                                <EditableField value={quoteData.billTo.name} onChange={(val) => updateField('billTo', 'name', val)} className="font-black text-xs uppercase" />
                                <EditableField value={quoteData.billTo.address} type="textarea" onChange={(val) => updateField('billTo', 'address', val)} className="leading-tight uppercase" style={{ color: '#6b7280' }} />
                                <div className="flex gap-1 font-bold">Mobile: <EditableField value={quoteData.billTo.mobile} onChange={(val) => updateField('billTo', 'mobile', val)} /></div>
                                <div className="flex gap-1 font-bold">Supply: <EditableField value={quoteData.billTo.placeOfSupply} onChange={(val) => updateField('billTo', 'placeOfSupply', val)} /></div>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-black pb-0.5 mb-2 uppercase tracking-widest" style={{ borderBottom: '1px solid #000000', color: '#9ca3af' }}>Ship To</h4>
                            <div className="space-y-0.5">
                                <EditableField value={quoteData.shipTo.name} onChange={(val) => updateField('shipTo', 'name', val)} className="font-black text-xs uppercase" />
                                <EditableField value={quoteData.shipTo.address} type="textarea" onChange={(val) => updateField('shipTo', 'address', val)} className="leading-tight uppercase" style={{ color: '#6b7280' }} />
                            </div>
                        </div>
                    </div>

                    {/* Items Table */}
                    <div className="mb-6">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="text-[10px] font-black uppercase tracking-widest" style={{ borderTop: '2px solid #000000', borderBottom: '2px solid #000000', backgroundColor: '#f9fafb' }}>
                                    <th className="text-left py-2 px-4 w-2/3">Items & Description</th>
                                    <th className="text-center py-2 px-2 whitespace-nowrap">Qty.</th>
                                    <th className="text-center py-2 px-2 whitespace-nowrap">Tax %</th>
                                    <th className="text-right py-2 px-4 whitespace-nowrap">Amount</th>
                                    <th className="w-6 print-hidden"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {quoteData.items.map((item, i) => (
                                    <tr key={i} className="text-[10px] align-top transition-colors group" style={{ borderBottom: '1px solid #f3f4f6' }}>
                                        <td className="py-2 px-4 font-bold uppercase leading-tight text-black">
                                            <EditableField value={item.description} type="textarea" onChange={(val) => updateItem(i, 'description', val)} style={{ color: '#000000' }} />
                                        </td>
                                        <td className="py-2 px-2 text-center font-bold text-black">
                                            <EditableField value={item.qty} onChange={(val) => updateItem(i, 'qty', val)} style={{ color: '#000000' }} />
                                        </td>
                                        <td className="py-2 px-2 text-center font-bold" style={{ color: '#6b7280' }}>
                                            <EditableField value={item.tax} onChange={(val) => updateItem(i, 'tax', val)} style={{ color: '#000000' }} />
                                        </td>
                                        <td className="py-2 px-4 text-right font-black text-black">
                                            <div className="flex items-center justify-end gap-0.5">
                                                ₹ <EditableField value={item.amount} type="number" onChange={(val) => updateItem(i, 'amount', val)} style={{ color: '#000000' }} />
                                            </div>
                                        </td>
                                        <td className="py-2 text-center print-hidden">
                                            <button onClick={() => removeItem(i)} className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#f87171' }}>
                                                <Trash2 size={12} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button
                            onClick={addItem}
                            className="mt-3 flex items-center gap-2 text-[9px] font-black uppercase w-full justify-center py-2 rounded-lg transition-all print-hidden add-item-btn"
                            style={{ border: '2px dashed #e5e7eb', color: '#022c22' }}
                        >
                            <Plus size={14} /> Add Line Item
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-10 pt-4" style={{ borderTop: '2px solid #000000' }}>
                        <div className="space-y-4">
                            <div>
                                <h4 className="text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: '#9ca3af' }}>Bank Details</h4>
                                <div className="text-[9px] space-y-1 font-medium">
                                    <div className="flex gap-2 uppercase"><span className="w-20 font-bold" style={{ color: '#9ca3af' }}>Account:</span> <EditableField value={quoteData.bank.name} onChange={(val) => updateField('bank', 'name', val)} className="font-bold uppercase" /></div>
                                    <div className="flex gap-2 uppercase"><span className="w-20 font-bold" style={{ color: '#9ca3af' }}>IFSC:</span> <EditableField value={quoteData.bank.ifsc} onChange={(val) => updateField('bank', 'ifsc', val)} className="font-bold" /></div>
                                    <div className="flex gap-2 uppercase"><span className="w-20 font-bold" style={{ color: '#9ca3af' }}>A/C No:</span> <EditableField value={quoteData.bank.accountNo} onChange={(val) => updateField('bank', 'accountNo', val)} className="font-bold" /></div>
                                    <div className="flex gap-2 uppercase"><span className="w-20 font-bold" style={{ color: '#9ca3af' }}>Bank:</span> <EditableField value={quoteData.bank.bankName} type="textarea" onChange={(val) => updateField('bank', 'bankName', val)} className="flex-1 italic leading-tight" /></div>
                                </div>
                            </div>
                            <div>
                                <h4 className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: '#9ca3af' }}>Terms & Conditions</h4>
                                <ul className="text-[8px] font-medium space-y-0.5 list-decimal pl-4" style={{ color: '#6b7280' }}>
                                    {quoteData.terms.map((term, i) => (
                                        <li key={i}>
                                            <EditableField
                                                value={term}
                                                onChange={(val) => {
                                                    const newTerms = [...quoteData.terms];
                                                    newTerms[i] = val;
                                                    setQuoteData({ ...quoteData, terms: newTerms });
                                                }}
                                            />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="text-right space-y-2 p-4 rounded-xl" style={{ backgroundColor: '#f9fafb' }}>
                            <div className="flex justify-between items-center text-[9px] font-bold uppercase">
                                <span style={{ color: '#9ca3af', letterSpacing: '0.05em' }}>Taxable Amt.</span>
                                <span className="font-black italic underline underline-offset-2" style={{ color: '#000000', textDecorationColor: '#000000' }}>₹ <EditableField value={quoteData.summary.taxableAmount} onChange={(val) => updateField('summary', 'taxableAmount', val)} /></span>
                            </div>
                            <div className="flex justify-between items-center text-[9px] font-bold uppercase">
                                <span className="flex items-center justify-end" style={{ color: '#9ca3af' }}>
                                    <EditableField value={quoteData.summary.cgstLabel} onChange={(val) => updateField('summary', 'cgstLabel', val)} />
                                </span>
                                <span className="font-black" style={{ color: '#4b5563' }}>₹ {quoteData.summary.cgst}</span>
                            </div>
                            <div className="flex justify-between items-center text-[9px] font-bold uppercase">
                                <span className="flex items-center justify-end" style={{ color: '#9ca3af' }}>
                                    <EditableField value={quoteData.summary.sgstLabel} onChange={(val) => updateField('summary', 'sgstLabel', val)} />
                                </span>
                                <span className="font-black" style={{ color: '#4b5563' }}>₹ {quoteData.summary.sgst}</span>
                            </div>
                            <div className="flex justify-between items-center text-lg font-black uppercase pt-3" style={{ borderTop: '1px solid #e5e7eb', color: '#000000' }}>
                                <span className="text-xs" style={{ letterSpacing: '-0.02em' }}>TOTAL</span>
                                <span className="text-2xl" style={{ letterSpacing: '-0.02em' }}>₹ {quoteData.summary.total}</span>
                            </div>
                            <div className="text-[9px] font-black uppercase italic pt-1 leading-tight" style={{ color: '#9ca3af' }}>
                                ({quoteData.summary.amountInWords})
                            </div>

                            <div className="pt-8 flex justify-end">
                                <div className="w-40 pt-2 text-[9px] font-black uppercase text-center" style={{ borderTop: '1px solid #000000', color: '#000000' }}>
                                    Authorized Signatory
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @page {
                    size: A4;
                    margin: 5mm; /* Small margin to avoid cutting but keep headers off */
                }
                @media print {
                    html, body {
                        margin: 0 !important;
                        padding: 0 !important;
                        height: auto !important;
                        background: white !important;
                        -webkit-print-color-adjust: exact;
                    }
                    nav, footer, .print-hidden, .edit-icon {
                        display: none !important;
                    }
                    .pt-32, .pb-20, .container-custom {
                        padding: 0 !important;
                        margin: 0 !important;
                        max-width: none !important;
                        width: 100% !important;
                    }
                    #quotation-document {
                        box-shadow: none !important;
                        padding: 5mm !important;
                        margin: 0 !important;
                        width: 100% !important;
                        height: auto !important;
                        border: none !important;
                        position: absolute;
                        top: 0;
                        left: 0;
                    }
                    /* Prevent extra pages */
                    * {
                        page-break-inside: avoid !important;
                        break-inside: avoid !important;
                    }
                }
            `}} />
        </div>
    );
};

export default Quotation;

