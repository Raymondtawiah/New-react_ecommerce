import React from 'react';

interface RiderPageProps {
  rider: any;
  onBack: () => void;
}

export const RiderPage: React.FC<RiderPageProps> = ({ rider, onBack }) => (
  <div className="max-w-2xl mx-auto p-8">
    <button onClick={onBack} className="mb-4 text-sm text-[#073c2c] font-bold">Back</button>
    <h2 className="text-2xl font-black mb-4">Rider Profile</h2>
    <p className="text-sm">Name: {rider?.name}</p>
    <p className="text-sm">Phone: {rider?.phone}</p>
    <p className="text-sm">Vehicle: {rider?.vehicleType}</p>
    <p className="text-sm">License: {rider?.licenseNumber}</p>
    <p className="text-sm">Ghana Card: {rider?.ghanaCardNumber}</p>
  </div>
);

export default RiderPage;
