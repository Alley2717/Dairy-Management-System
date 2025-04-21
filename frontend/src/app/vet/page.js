'use client';

import { useState, useEffect } from 'react';

const VetPage = () => {
    const [records, setRecords] = useState([]);
    const [newRecord, setNewRecord] = useState({
        animalId: '',
        vetName: '',
        visitDate: '',
        diagnosis: '',
        treatment: ''
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchRecords = async () => {
            setLoading(true);
            try {
                const response = await fetch('http://localhost:8080/api/vet-visits');

                const data = await response.json();
                setRecords(data);
            } catch (error) {
                console.error('Error fetching vet visit records:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchRecords();
    }, []);

    const addRecord = async () => {
        console.log(newRecord)
        if (!newRecord.animalId || !newRecord.vetName || !newRecord.visitDate) return;

        try {
            const response = await fetch('http://localhost:8080/api/vet-visits', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newRecord),
              });
              
            if (response.ok) {
                const createdRecord = await response.json();
                setRecords([...records, createdRecord]);
                setNewRecord({ animalId: '', vetName: '', visitDate: '', diagnosis: '', treatment: '' });
            }
        } catch (error) {
            console.error('Error adding vet visit record:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Vet Visit Management</h1>

            {/* Form Card */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8 max-w-2xl mx-auto">
                <h2 className="text-xl font-semibold mb-4">Add New Vet Visit</h2>
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Animal ID</label>
                        <input
                            type="text"
                            value={newRecord.animalId}
                            onChange={(e) => setNewRecord({ ...newRecord, animalId: e.target.value })}
                            className="mt-1 w-full border rounded-md p-2"
                            placeholder="Enter Animal ID"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Vet's Name</label>
                        <input
                            type="text"
                            value={newRecord.vetName}
                            onChange={(e) => setNewRecord({ ...newRecord, vetName: e.target.value })}
                            className="mt-1 w-full border rounded-md p-2"
                            placeholder="Enter Vet's Name"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Date of Visit</label>
                        <input
                            type="date"
                            value={newRecord.visitDate}
                            onChange={(e) => setNewRecord({ ...newRecord, visitDate: e.target.value })}
                            className="mt-1 w-full border rounded-md p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Diagnosis</label>
                        <textarea
                            value={newRecord.diagnosis}
                            onChange={(e) => setNewRecord({ ...newRecord, diagnosis: e.target.value })}
                            className="mt-1 w-full border rounded-md p-2"
                            placeholder="Enter diagnosis or notes"
                            rows={3}
                        />
                    </div>
                    <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Treatment</label>
                        <textarea
                            value={newRecord.treatment}
                            onChange={(e) => setNewRecord({ ...newRecord, treatment: e.target.value })}
                            className="mt-1 w-full border rounded-md p-2"
                            placeholder="Prescribed treatment"
                            rows={3}
                        />
                    </div>
                </div>
                <button
                    onClick={addRecord}
                    className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition"
                >
                    Add Record
                </button>
            </div>

            {/* Records Table */}
            <div className="bg-white rounded-xl shadow-md p-6 max-w-5xl mx-auto">
                <h2 className="text-xl font-semibold mb-4">Vet Visit Records</h2>
                {loading ? (
                    <p className="text-gray-500 text-center">Loading records...</p>
                ) : records.length === 0 ? (
                    <p className="text-gray-500 text-center">No records available.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-300 rounded-md">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="text-left px-4 py-2 border">Animal ID</th>
                                    <th className="text-left px-4 py-2 border">Vet's Name</th>
                                    <th className="text-left px-4 py-2 border">Date of Visit</th>
                                    <th className="text-left px-4 py-2 border">Diagnosis</th>
                                    <th className="text-left px-4 py-2 border">Treatment</th>
                                </tr>
                            </thead>
                            <tbody>
                                {records.map((record, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-4 py-2 border">{record.animalId}</td>
                                        <td className="px-4 py-2 border">{record.vetName}</td>
                                        <td className="px-4 py-2 border">{record.visitDate}</td>
                                        <td className="px-4 py-2 border">{record.diagnosis}</td>
                                        <td className="px-4 py-2 border">{record.treatment}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VetPage;