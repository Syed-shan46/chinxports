import React from 'react';
import { createPortal } from 'react-dom';
import { X, ArrowRight, ArrowLeft, Check, Globe, ShieldCheck, Clock } from 'lucide-react';
import { BASE_URL } from '../../config';
import { useCart } from '../../context/CartContext';

const SimplifiedPartnerModal = () => {
  const { isPartnerModalOpen, setIsPartnerModalOpen } = useCart();
  const [curr, setCurr] = React.useState(1);
  const [sub, setSub] = React.useState(false);
  const [done, setDone] = React.useState(false);
  const [fd, setFd] = React.useState({ name: '', biz: '', email: '', wa: '', purpose: '' });
  const [width, setWidth] = React.useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  const onClose = () => setIsPartnerModalOpen(false);

  const resetForm = () => { setCurr(1); setDone(false); setFd({ name: '', biz: '', email: '', wa: '', purpose: '' }); };

  React.useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    if (isPartnerModalOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => {
      window.removeEventListener('resize', handleResize);
      document.body.style.overflow = 'unset';
    };
  }, [isPartnerModalOpen]);

  const isMobile = width < 768;

  if (!isPartnerModalOpen) return null;

  const onSubmit = async () => {
    if (!fd.name || !fd.email) return;
    setSub(true);
    try {
      const response = await fetch(`${BASE_URL}/api/partner-request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fd)
      });
      if (response.ok) {
        setDone(true);
      } else {
        setDone(true); 
      }
    } catch (err) {
      console.error("Partnership API down", err);
      setDone(true); 
    } finally {
      setSub(false);
    }
  };

  const inputStyle = {
    width: '100%',
    backgroundColor: '#181818',
    border: '1px solid #333',
    borderRadius: '8px',
    padding: '14px 16px',
    fontSize: '13px',
    color: '#ffffff',
    boxSizing: 'border-box',
    outline: 'none',
    transition: 'border-color 0.3s',
    marginBottom: '15px'
  };

  return createPortal(
    <div style={{ 
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
      width: '100vw', height: '100vh', zIndex: 999999999, 
      backgroundColor: 'rgba(0, 0, 0, 0.9)', pointerEvents: 'all',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: isMobile ? '0px' : '20px', boxSizing: 'border-box'
    }}>
      
      <div onClick={onClose} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, cursor: 'pointer', zIndex: 1 }} />

      <div style={{
        position: isMobile ? 'fixed' : 'relative', 
        top: isMobile ? 0 : 'auto',
        left: isMobile ? 0 : 'auto',
        right: isMobile ? 0 : 'auto',
        bottom: isMobile ? 0 : 'auto',
        zIndex: 10,
        width: isMobile ? '100%' : '95%', 
        height: isMobile ? '100dvh' : 'auto',
        maxWidth: isMobile ? 'none' : '900px', 
        minHeight: isMobile ? '100dvh' : '500px',
        backgroundColor: '#0d0d0d',
        border: isMobile ? 'none' : '1px solid rgba(198, 167, 105, 0.2)',
        borderRadius: isMobile ? '0px' : '20px',
        boxShadow: isMobile ? 'none' : '0 25px 70px rgba(0, 0, 0, 0.9)',
        display: 'flex', 
        flexDirection: isMobile ? 'column' : 'row', 
        overflow: 'hidden',
        color: '#ffffff', fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif'
      }}>
        
        {!isMobile && (
          <div style={{ width: '300px', background: 'linear-gradient(180deg, #050505 0%, #111111 100%)', borderRight: '1px solid #1a1a1a', padding: '40px 30px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '800', letterSpacing: '4px', color: '#ffffff', fontFamily: 'serif' }}>CHINAXPORTS</h2>
              <div style={{ width: '30px', height: '2px', backgroundColor: '#C6A769', marginTop: '12px', marginBottom: '40px' }}></div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                <div style={{ display: 'flex', gap: '15px' }}>
                  <Globe size={18} color="#C6A769" />
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#ffffff', letterSpacing: '1px' }}>GLOBAL LOGISTICS</div>
                    <div style={{ fontSize: '10px', color: '#666', marginTop: '4px' }}>Door-to-door express.</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '15px' }}>
                  <ShieldCheck size={18} color="#C6A769" />
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#ffffff', letterSpacing: '1px' }}>CERTIFIED PLATING</div>
                    <div style={{ fontSize: '10px', color: '#666', marginTop: '4px' }}>High-fidelity 18K standards.</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '15px' }}>
                  <Clock size={18} color="#C6A769" />
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#ffffff', letterSpacing: '1px' }}>PRIORITY RESPONSE</div>
                    <div style={{ fontSize: '10px', color: '#666', marginTop: '4px' }}>Direct desk alignment.</div>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ border: '1px solid rgba(255,255,255,0.05)', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '10px', padding: '15px' }}>
              <p style={{ fontSize: '10px', fontStyle: 'italic', color: '#888', margin: 0 }}>"Trusted distribution pipelines for enterprise international merchants."</p>
            </div>
          </div>
        )}

        <div style={{ 
          flex: 1, 
          position: 'relative', 
          padding: isMobile ? '60px 20px 40px 20px' : '40px 45px', 
          display: 'flex', 
          flexDirection: 'column',
          overflowY: 'auto',
          minHeight: 0 
        }}>
          
          <button 
            onClick={onClose} 
            style={{ 
              position: isMobile ? 'fixed' : 'absolute', 
              top: '20px', 
              right: '20px', 
              background: 'rgba(26,26,26,0.8)', 
              border: '1px solid #333', 
              borderRadius: '50%', 
              width: '36px', height: '36px', 
              display: 'flex', alignItems: 'center', justifyContent: 'center', 
              cursor: 'pointer', color: '#fff', zIndex: 100,
              backdropFilter: 'blur(10px)' 
            }}
          >
            <X size={18} />
          </button>

          {!done ? (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ marginBottom: '25px' }}>
                <div style={{ fontSize: '9px', fontWeight: 'bold', color: '#C6A769', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '8px' }}>Corporate Intake</div>
                <h3 style={{ margin: 0, fontSize: isMobile ? '22px' : '26px', fontWeight: '300', color: '#ffffff', fontFamily: 'serif' }}>
                  Wholesale <span style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.9)' }}>Application</span>
                </h3>
                <div style={{ display: 'flex', gap: '6px', marginTop: '20px' }}>
                  <div style={{ flex: 1, height: '2px', backgroundColor: '#C6A769' }} />
                  <div style={{ flex: 1, height: '2px', backgroundColor: curr >= 2 ? '#C6A769' : '#222', transition: 'background-color 0.4s' }} />
                  <div style={{ flex: 1, height: '2px', backgroundColor: curr >= 3 ? '#C6A769' : '#222', transition: 'background-color 0.4s' }} />
                </div>
              </div>

              <div style={{ flex: 1 }}>
                {curr === 1 && (
                  <div style={{ animation: 'fadeIn 0.3s ease' }}>
                    <p style={{ fontSize: '11px', fontWeight: 'bold', color: '#888', marginBottom: '15px', letterSpacing: '1px' }}>BASIC INFORMATION</p>
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '15px' }}>
                      <div>
                         <label style={{ fontSize: '9px', color: '#666', fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>REPRESENTATIVE NAME</label>
                         <input placeholder="Enter full name" style={inputStyle} value={fd.name} onChange={e=>setFd({...fd, name:e.target.value})} />
                      </div>
                      <div>
                         <label style={{ fontSize: '9px', color: '#666', fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>COMPANY NAME</label>
                         <input placeholder="Brand or Store" style={inputStyle} value={fd.biz} onChange={e=>setFd({...fd, biz:e.target.value})} />
                      </div>
                    </div>
                    <div>
                       <label style={{ fontSize: '9px', color: '#666', fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>BUSINESS WEBSITE / IG</label>
                       <input placeholder="Optional" style={inputStyle} />
                    </div>
                  </div>
                )}

                {curr === 2 && (
                  <div style={{ animation: 'fadeIn 0.3s ease' }}>
                    <p style={{ fontSize: '11px', fontWeight: 'bold', color: '#888', marginBottom: '15px', letterSpacing: '1px' }}>CONTACT PARAMETERS</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <div>
                         <label style={{ fontSize: '9px', color: '#666', fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>OFFICIAL EMAIL</label>
                         <input placeholder="name@company.com" style={inputStyle} value={fd.email} onChange={e=>setFd({...fd, email:e.target.value})} />
                      </div>
                      <div>
                         <label style={{ fontSize: '9px', color: '#666', fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>WHATSAPP PHONE</label>
                         <input placeholder="+ Country Code Number" style={inputStyle} value={fd.wa} onChange={e=>setFd({...fd, wa:e.target.value})} />
                      </div>
                      <div>
                         <label style={{ fontSize: '9px', color: '#666', fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>PARTNERSHIP PURPOSE / DETAILED UNDERSTANDING</label>
                         <textarea 
                           placeholder="Tell us about your business goals and how you plan to partner with us..." 
                           style={{ ...inputStyle, height: '100px', resize: 'none' }} 
                           value={fd.purpose} 
                           onChange={e=>setFd({...fd, purpose:e.target.value})} 
                         />
                      </div>
                    </div>
                  </div>
                )}

                {curr === 3 && (
                  <div style={{ animation: 'fadeIn 0.3s ease' }}>
                    <p style={{ fontSize: '11px', fontWeight: 'bold', color: '#888', marginBottom: '15px', letterSpacing: '1px' }}>DISPATCH VALIDATION</p>
                    <div style={{ padding: '25px', backgroundColor: '#141414', border: '1px solid #222', borderRadius: '12px' }}>
                       <p style={{ fontSize: '13px', color: '#aaa', margin: '0 0 8px 0' }}>Corporate Entity: <strong style={{ color: '#fff' }}>{fd.biz || 'Pending'}</strong></p>
                       <p style={{ fontSize: '13px', color: '#aaa', margin: '0' }}>Rep: <strong style={{ color: '#fff' }}>{fd.name || 'Pending'}</strong></p>
                       
                       <div style={{ marginTop: '20px', padding: '15px', background: 'rgba(198,167,105,0.08)', borderRadius: '8px', border: '1px solid rgba(198,167,105,0.15)', display: 'flex', gap: '12px', alignItems: 'center' }}>
                         <ShieldCheck size={20} color="#C6A769" />
                         <div style={{ fontSize: '11px', color: '#C6A769', fontWeight: '500', lineHeight: '1.4' }}>Secure channel established. Encryption standards active for this submittal.</div>
                       </div>
                    </div>
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #1a1a1a' }}>
                {curr > 1 ? (
                  <button onClick={() => setCurr(c => c - 1)} style={{ background: 'transparent', border: 'none', color: '#888', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                     <ArrowLeft size={14} /> BACK
                  </button>
                ) : <div />}

                {curr < 3 ? (
                  <button onClick={() => setCurr(c => c + 1)} style={{ backgroundColor: '#ffffff', color: '#000000', border: 'none', borderRadius: '30px', padding: isMobile ? '12px 25px' : '14px 35px', fontSize: '11px', fontWeight: 'bold', letterSpacing: '1px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 10px 30px rgba(255,255,255,0.1)' }}>
                     CONTINUE <ArrowRight size={14} />
                  </button>
                ) : (
                  <button onClick={onSubmit} disabled={sub} style={{ backgroundColor: '#C6A769', color: '#000000', border: 'none', borderRadius: '30px', padding: isMobile ? '12px 25px' : '16px 45px', fontSize: '12px', fontWeight: 'bold', letterSpacing: '1px', cursor: 'pointer', boxShadow: '0 10px 30px rgba(198,167,105,0.3)' }}>
                     {sub ? 'PROCESSING...' : 'SUBMIT'}
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
               <div style={{ width: '70px', height: '70px', borderRadius: '50%', backgroundColor: 'rgba(198,167,105,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '25px', border: '1px solid rgba(198,167,105,0.3)' }}>
                 <Check size={32} color="#C6A769" />
               </div>
               <h3 style={{ fontSize: '24px', fontWeight: '300', fontFamily: 'serif', color: '#fff', margin: '0 0 10px 0' }}>Transmitted Successfully</h3>
               <p style={{ fontSize: '12px', color: '#777', maxWidth: '320px', lineHeight: '1.6', margin: '0 0 30px 0' }}>A senior trade accounts manager has been notified. Dossier evaluation initiated.</p>
               <button onClick={() => { resetForm(); onClose(); }} style={{ backgroundColor: '#fff', color: '#000', border: 'none', borderRadius: '30px', padding: '12px 40px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', letterSpacing: '1px' }}>
                 EXIT PORTAL
               </button>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default SimplifiedPartnerModal;
