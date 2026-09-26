import React, { useState } from 'react';
import axios from 'axios';

export default function TrackingScreen({ token, onBack }) {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [shipment, setShipment] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTrack = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setShipment(null);

    try {
      const response = await axios.get(`http://localhost:8000/api/shipments/track/${trackingNumber}`);
      setShipment(response.data);
    } catch (err) {
      setError('لم يتم العثور على شحنة بهذا الرقم. تأكد من صحة رقم التتبع.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ color: '#fff', padding: '20px', direction: 'rtl' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', background: '#131b2e', padding: '30px', borderRadius: '8px', border: '1px solid #1e293b' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ color: '#3b82f6', margin: 0 }}>🔍 تتبع مسار وحالة الشحنة</h3>
          {onBack && <button onClick={onBack} style={{ background: '#2a3a5e', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer' }}>رجوع</button>}
        </div>

        <form onSubmit={handleTrack} style={{ display: 'grid', gap: '15px' }}>
          <div>
            <label style={{ fontSize: '12px', color: '#aaa', display: 'block', marginBottom: '6px' }}>رقم التتبع:</label>
            <input 
              type="text" 
              value={trackingNumber} 
              onChange={(e) => setTrackingNumber(e.target.value)} 
              required 
              placeholder="مثال: AIR-123456" 
              style={{ width: '100%', padding: '10px', background: '#0b0f19', color: '#fff', border: '1px solid #2a3a5e', borderRadius: '6px', boxSizing: 'border-box' }} 
            />
          </div>
          <button type="submit" disabled={loading} style={{ width: '100%', background: '#ea580c', color: '#fff', border: 'none', padding: '12px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
            {loading ? 'جاري البحث...' : 'بحث عن الشحنة'}
          </button>
        </form>

        {error && <p style={{ color: '#ef4444', marginTop: '15px', textAlign: 'center' }}>{error}</p>}

        {shipment && (
          <div style={{ marginTop: '20px', background: '#0b0f19', padding: '15px', borderRadius: '6px', borderLeft: '4px solid #10b981' }}>
            <h4 style={{ color: '#10b981', marginTop: 0, marginBottom: '10px' }}>📦 معلومات الشحنة</h4>
            <p style={{ margin: '6px 0' }}><strong>رقم التتبع:</strong> {shipment.tracking_number}</p>
            <p style={{ margin: '6px 0' }}><strong>الوجهة (المسار):</strong> {shipment.destination}</p>
            <p style={{ margin: '6px 0' }}><strong>الوزن:</strong> {shipment.weight} كغ</p>
            <p style={{ margin: '6px 0' }}><strong>الحالة:</strong> <span style={{ color: '#fbbf24', fontWeight: 'bold' }}>{shipment.status}</span></p>
            <p style={{ margin: '6px 0', color: '#aaa' }}><strong>التفاصيل:</strong> {shipment.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}