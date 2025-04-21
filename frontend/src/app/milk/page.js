'use client';

import { useState, useEffect } from 'react';

const MilkPage = () => {
    const [milkRecords, setMilkRecords] = useState([]);
    const [newRecord, setNewRecord] = useState({
        animalId: '',
        date: '',
        quantity: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    useEffect(() => {
        const fetchMilkRecords = async () => {
            setLoading(true);
            try {
                const response = await fetch('/api/milk-records');
                const data = await response.json();
                setMilkRecords(data);
            } catch (err) {
                setError('Failed to load milk records.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchMilkRecords();
    }, []);

    const addMilkRecord = async () => {
        setError('');
        setSuccessMsg('');

        if (!newRecord.animalId || !newRecord.date || !newRecord.quantity) {
            setError('All fields are required.');
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/api/milk-records", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newRecord),
            });

            if (response.ok) {
                const createdRecord = await response.json();
                setMilkRecords([...milkRecords, createdRecord]);
                setNewRecord({ animalId: '', date: '', quantity: '' });
                setSuccessMsg('Record added successfully.');
            } else {
                const errMsg = await response.text();
                throw new Error(errMsg);
            }
        } catch (err) {
            setError('Error adding milk record.');
            console.error(err);
        }
    };

    return (
        <main className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Milk Management</h1>

            <section className="bg-gray-50 p-4 rounded-md shadow mb-8">
                <h2 className="text-xl font-semibold mb-4">Add Milk Record</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                        type="text"
                        value={newRecord.animalId}
                        onChange={(e) => setNewRecord({ ...newRecord, animalId: e.target.value })}
                        placeholder="Animal ID"
                        className="border p-2 rounded"
                    />
                    <input
                        type="date"
                        value={newRecord.date}
                        onChange={(e) => setNewRecord({ ...newRecord, date: e.target.value })}
                        className="border p-2 rounded"
                    />
                    <input
                        type="number"
                        value={newRecord.quantity}
                        onChange={(e) => setNewRecord({ ...newRecord, quantity: e.target.value })}
                        placeholder="Quantity (Litres)"
                        className="border p-2 rounded"
                    />
                </div>
                <button
                    onClick={addMilkRecord}
                    className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
                >
                    Add Record
                </button>
                {error && <p className="text-red-600 mt-2">{error}</p>}
                {successMsg && <p className="text-green-600 mt-2">{successMsg}</p>}
            </section>

            <section>
                <h2 className="text-xl font-semibold mb-4">Milk Records</h2>
                {loading ? (
                    <p>Loading records...</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-300">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="p-2 border">Animal ID</th>
                                    <th className="p-2 border">Date</th>
                                    <th className="p-2 border">Quantity (Litres)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {milkRecords.map((record, idx) => (
                                    <tr key={idx} className="hover:bg-gray-50">
                                        <td className="p-2 border text-center">{record.animalId}</td>
                                        <td className="p-2 border text-center">{record.date}</td>
                                        <td className="p-2 border text-center">{record.quantity}</td>
                                    </tr>
                                ))}
                                {milkRecords.length === 0 && (
                                    <tr>
                                        <td colSpan="3" className="text-center p-4">
                                            No records available.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>
        </main>
    );
};

export default MilkPage;
