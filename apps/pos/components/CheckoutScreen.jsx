import React, { useState, useEffect } from 'react';

export const CheckoutScreen = ({ total, onConfirm, onCancel }) => {
    const [receivedAmount, setReceivedAmount] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('EFECTIVO');
    const [change, setChange] = useState(0);

    useEffect(() => {
        const numReceived = parseFloat(receivedAmount) || 0;
        setChange(Math.max(0, numReceived - total));
    }, [receivedAmount, total]);

    const handleNumberClick = (num) => {
        if (receivedAmount.includes('.') && num === '.') return;
        setReceivedAmount(prev => prev + num);
    };

    const handleClear = () => setReceivedAmount('');

    const handleConfirm = () => {
        if (paymentMethod === 'EFECTIVO' && (parseFloat(receivedAmount) || 0) < total) {
            alert('El monto recibido es insuficiente.');
            return;
        }
        onConfirm(paymentMethod, parseFloat(receivedAmount) || total);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-xl animate-in fade-in duration-300">
            <div className="bg-[#1a1a1a] w-[500px] rounded-[50px] border border-white/10 shadow-[0_0_100px_rgba(193,215,46,0.1)] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="p-8 border-b border-white/5 flex justify-between items-center">
                    <div>
                        <h2 className="text-3xl font-black uppercase italic tracking-tighter text-white">Procesar <span className="text-[#c1d72e]">Pago</span></h2>
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.4em] mt-1">Terminal de Cobro R-DE-RICO</p>
                    </div>
                    <button onClick={onCancel} className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-2xl hover:bg-red-500/20 hover:text-red-500 transition-all">✕</button>
                </div>

                <div className="p-10 space-y-8 flex-1">
                    {/* Total Display */}
                    <div className="flex justify-between items-end bg-black/40 p-6 rounded-3xl border border-white/5">
                        <span className="text-[10px] font-black uppercase text-gray-500 mb-2">Total a Pagar</span>
                        <span className="text-5xl font-black text-[#c1d72e] font-mono">${total.toFixed(2)}</span>
                    </div>

                    {/* Payment Method Selector */}
                    <div className="grid grid-cols-2 gap-4">
                        <button 
                            onClick={() => setPaymentMethod('EFECTIVO')}
                            className={`p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-2 ${paymentMethod === 'EFECTIVO' ? 'border-[#c1d72e] bg-[#c1d72e]/10 text-[#c1d72e]' : 'border-white/5 bg-white/5 text-gray-500'}`}
                        >
                            <span className="text-3xl">💵</span>
                            <span className="text-[10px] font-black uppercase tracking-widest">Efectivo</span>
                        </button>
                        <button 
                            onClick={() => setPaymentMethod('TARJETA')}
                            className={`p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-2 ${paymentMethod === 'TARJETA' ? 'border-orange-500 bg-orange-500/10 text-orange-500' : 'border-white/5 bg-white/5 text-gray-500'}`}
                        >
                            <span className="text-3xl">💳</span>
                            <span className="text-[10px] font-black uppercase tracking-widest">Tarjeta / QR</span>
                        </button>
                    </div>

                    {paymentMethod === 'EFECTIVO' && (
                        <div className="animate-in slide-in-from-top-4 duration-500 space-y-8">
                            {/* Input Display */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[9px] font-black uppercase text-gray-500 tracking-widest block ml-2">Recibido</label>
                                    <div className="bg-white text-black p-4 rounded-2xl text-3xl font-black text-right shadow-inner min-h-[60px]">
                                        {receivedAmount ? `$${receivedAmount}` : '$0.00'}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[9px] font-black uppercase text-gray-500 tracking-widest block ml-2">Cambio</label>
                                    <div className="bg-[#c1d72e] text-black p-4 rounded-2xl text-3xl font-black text-right shadow-inner min-h-[60px]">
                                        ${change.toFixed(2)}
                                    </div>
                                </div>
                            </div>

                            {/* Numpad */}
                            <div className="grid grid-cols-3 gap-3">
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0].map((num) => (
                                    <button 
                                        key={num}
                                        onClick={() => handleNumberClick(num.toString())}
                                        className="h-16 rounded-2xl bg-white/5 border border-white/10 text-xl font-black hover:bg-white/20 active:scale-95 transition-all"
                                    >
                                        {num}
                                    </button>
                                ))}
                                <button 
                                    onClick={handleClear}
                                    className="h-16 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-black uppercase hover:bg-red-500/20 transition-all"
                                >
                                    Borrar
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer Action */}
                <div className="p-8 bg-black/40 border-t border-white/5">
                    <button 
                        onClick={handleConfirm}
                        className="w-full bg-[#c1d72e] text-black font-black py-6 rounded-[30px] text-xl uppercase italic tracking-tighter hover:scale-[1.02] active:scale-95 transition-all shadow-[0_10px_30px_rgba(193,215,46,0.3)]"
                    >
                        Finalizar Venta
                    </button>
                </div>
            </div>
        </div>
    );
};
