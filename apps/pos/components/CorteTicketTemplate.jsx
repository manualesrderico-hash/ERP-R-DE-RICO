import React, { forwardRef } from 'react';

/**
 * Plantilla de Ticket de Corte de Caja (X-Report / Z-Report)
 * Optimizada para ahorrar papel (espacios reducidos, fuente pequeña)
 */
export const CorteTicketTemplate = forwardRef(({ resumen, sesion, capturado }, ref) => {
    if (!resumen || !sesion) return <div ref={ref} className="hidden">No hay datos de corte</div>;

    const fechaCierre = new Date().toLocaleString();
    const diferenciaEfectivo = (parseFloat(capturado?.cash) || 0) - (resumen.efectivo_esperado || 0);

    return (
        <div ref={ref} className="print-ticket-corte bg-white text-black w-[80mm] font-mono text-[9px] leading-[1.1]">
            <style>
                {`
                    @media print {
                        @page { margin: 0; size: 80mm auto; }
                        body { margin: 0; padding: 0; }
                        .print-ticket-corte { 
                            width: 80mm; 
                            background: white; 
                            color: black;
                            padding: 1mm 2mm; 
                            margin: 0;
                        }
                    }
                    .dotted-line { border-top: 1px dotted #000; margin: 1px 0; }
                    .row { display: flex; justify-content: space-between; }
                    .bold { font-weight: bold; }
                    .center { text-align: center; }
                    .title { font-size: 11px; margin-bottom: 1px; }
                `}
            </style>
            
            <div className="center bold title uppercase">R DE RICO - CORTE DE CAJA</div>
            <div className="center uppercase mb-1">*** RESUMEN DE TURNO ***</div>
            
            <div className="row"><span>TERMINAL:</span> <span>{sesion.terminal_id}</span></div>
            <div className="row"><span>CAJERO:</span> <span>{sesion.employee_name}</span></div>
            <div className="row"><span>APERTURA:</span> <span>{new Date(sesion.opened_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span></div>
            <div className="row"><span>CIERRE:</span> <span>{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span></div>
            <div className="center text-[8px]">{fechaCierre}</div>

            <div className="dotted-line"></div>

            {/* INGRESOS / EGRESOS */}
            <div className="row"><span>(+) FONDO INICIAL:</span> <span className="bold">${(resumen.fondo_inicial || 0).toFixed(2)}</span></div>
            <div className="row"><span>(+) VENTAS (TOT):</span> <span className="bold">${(resumen.total_ventas || 0).toFixed(2)}</span></div>
            <div className="row"><span>(+) ENTRADAS:</span> <span className="bold">${(resumen.total_entradas || 0).toFixed(2)}</span></div>
            <div className="row"><span>(-) SALIDAS:</span> <span className="bold">${(resumen.total_salidas || 0).toFixed(2)}</span></div>
            
            <div className="dotted-line"></div>
            
            {/* BALANCE POR METODO */}
            <div className="row bold"><span>EFECTIVO ESPERADO:</span> <span>${(resumen.efectivo_esperado || 0).toFixed(2)}</span></div>
            <div className="row"><span>CREDITO SISTEMA:</span> <span>${(resumen.total_credito || 0).toFixed(2)}</span></div>
            <div className="row"><span>DEBITO SISTEMA:</span> <span>${(resumen.total_debito || 0).toFixed(2)}</span></div>

            <div className="dotted-line"></div>

            {/* CONTEO FISICO Y DIFERENCIAS */}
            <div className="center bold uppercase">Conteo Físico</div>
            <div className="row"><span>EFECTIVO REAL:</span> <span className="bold">${(parseFloat(capturado?.cash) || 0).toFixed(2)}</span></div>
            <div className="row"><span>TARJ. CREDITO:</span> <span className="bold">${(parseFloat(capturado?.credit) || 0).toFixed(2)}</span></div>
            <div className="row"><span>TARJ. DEBITO:</span> <span className="bold">${(parseFloat(capturado?.debit) || 0).toFixed(2)}</span></div>
            
            <div className="row bold mt-1" style={{ fontSize: '10px' }}>
                <span>DIFERENCIA EFECT:</span> 
                <span className={diferenciaEfectivo < 0 ? 'text-black' : ''}>
                    {diferenciaEfectivo >= 0 ? '+' : ''}{diferenciaEfectivo.toFixed(2)}
                </span>
            </div>

            <div className="dotted-line"></div>
            
            <div className="center mt-2">
                __________________________<br/>
                FIRMA RESPONSABLE
            </div>
            
            <div className="center text-[7px] mt-2 italic">
                Corte generado exitosamente.<br/>
                --- Fin del Reporte ---
            </div>
        </div>
    );
});
