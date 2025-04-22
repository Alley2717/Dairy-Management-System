"use client"

import { useState, useEffect } from "react"

const MilkPage = () => {
  // State for milk records
  const [milkRecords, setMilkRecords] = useState([])
  const [newMilkRecord, setNewMilkRecord] = useState({
    animalId: "",
    date: "",
    quantity: "",
  })
  const [editMode, setEditMode] = useState(false)
  const [currentMilkRecordId, setCurrentMilkRecordId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // State for statistics
  const [stats, setStats] = useState({
    totalQuantity: 0,
    totalRecords: 0,
    averageQuantity: 0,
  })

  // State for filters
  const [filterAnimalId, setFilterAnimalId] = useState("")
  const [filterDate, setFilterDate] = useState("")
  const [filteredRecords, setFilteredRecords] = useState([])

  useEffect(() => {
    fetchMilkRecords()
    fetchMilkStats()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [milkRecords, filterAnimalId, filterDate])

  // Fetch milk records
  const fetchMilkRecords = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch("http://localhost:8080/api/milk-records")
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      const data = await response.json()
      setMilkRecords(data)
      setFilteredRecords(data)
    } catch (error) {
      console.error("Error fetching milk records:", error)
      setError("Failed to load milk records. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  // Fetch milk statistics
  const fetchMilkStats = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/milk-records/stats")
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      const data = await response.json()
      setStats(data)
    } catch (error) {
      console.error("Error fetching milk statistics:", error)
      // Don't set error state here to avoid overriding the main error message
    }
  }

  // Apply filters to milk records
  const applyFilters = () => {
    let filtered = [...milkRecords]

    if (filterAnimalId) {
      filtered = filtered.filter(
        (record) => record.animalId && record.animalId.toLowerCase().includes(filterAnimalId.toLowerCase()),
      )
    }

    if (filterDate) {
      filtered = filtered.filter((record) => record.date === filterDate)
    }

    setFilteredRecords(filtered)
  }

  // Reset filters
  const resetFilters = () => {
    setFilterAnimalId("")
    setFilterDate("")
    setFilteredRecords(milkRecords)
  }

  // Reset form
  const resetForm = () => {
    setNewMilkRecord({
      animalId: "",
      date: "",
      quantity: "",
    })
    setEditMode(false)
    setCurrentMilkRecordId(null)
    setError(null)
  }

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewMilkRecord({ ...newMilkRecord, [name]: value })
  }

  // Validate form
  const validateForm = () => {
    if (!newMilkRecord.animalId || newMilkRecord.animalId.trim() === "") {
      setError("Animal ID is required")
      return false
    }

    if (!newMilkRecord.date || newMilkRecord.date.trim() === "") {
      setError("Date is required")
      return false
    }

    if (!newMilkRecord.quantity || Number.parseFloat(newMilkRecord.quantity) <= 0) {
      setError("Quantity must be greater than 0")
      return false
    }

    setError(null)
    return true
  }

  // Add milk record
  const addMilkRecord = async () => {
    if (!validateForm()) return

    setLoading(true)
    setError(null)

    try {
      // Create the payload with proper data types
      const payload = {
        animalId: newMilkRecord.animalId.trim(),
        date: newMilkRecord.date,
        quantity: Number.parseFloat(newMilkRecord.quantity),
      }

      console.log("Sending payload:", payload)

      const response = await fetch("http://localhost:8080/api/milk-records", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Server error: ${errorText}`)
      }

      const createdMilkRecord = await response.json()
      setMilkRecords([...milkRecords, createdMilkRecord])
      resetForm()
      fetchMilkStats()
    } catch (error) {
      console.error("Error adding milk record:", error)
      setError(`Failed to add milk record: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  // Update milk record
  const updateMilkRecord = async () => {
    if (!validateForm() || !currentMilkRecordId) return

    setLoading(true)
    setError(null)

    try {
      // Create the payload with proper data types
      const payload = {
        animalId: newMilkRecord.animalId.trim(),
        date: newMilkRecord.date,
        quantity: Number.parseFloat(newMilkRecord.quantity),
      }

      const response = await fetch(`http://localhost:8080/api/milk-records/${currentMilkRecordId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Server error: ${errorText}`)
      }

      const updatedMilkRecord = await response.json()
      setMilkRecords(milkRecords.map((record) => (record.id === currentMilkRecordId ? updatedMilkRecord : record)))
      resetForm()
      fetchMilkStats()
    } catch (error) {
      console.error("Error updating milk record:", error)
      setError(`Failed to update milk record: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  // Delete milk record
  const deleteMilkRecord = async (id) => {
    if (!window.confirm("Are you sure you want to delete this milk record?")) return

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`http://localhost:8080/api/milk-records/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Server error: ${errorText}`)
      }

      setMilkRecords(milkRecords.filter((record) => record.id !== id))
      fetchMilkStats()
    } catch (error) {
      console.error("Error deleting milk record:", error)
      setError(`Failed to delete milk record: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  // Edit milk record
  const editMilkRecord = (record) => {
    setNewMilkRecord({
      animalId: record.animalId || "",
      date: record.date || "",
      quantity: record.quantity ? record.quantity.toString() : "",
    })
    setEditMode(true)
    setCurrentMilkRecordId(record.id)
    setError(null)
  }

  // Format quantity for display
  const formatQuantity = (quantity) => {
    if (quantity === null || quantity === undefined) return "0.00"
    return Number.parseFloat(quantity).toFixed(2)
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Milk Production Management</h1>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-medium text-gray-500">Total Milk Production</h3>
          <p className="text-3xl font-bold mt-2">{stats.totalQuantity.toFixed(2)} liters</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-medium text-gray-500">Total Records</h3>
          <p className="text-3xl font-bold mt-2">{stats.totalRecords}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-medium text-gray-500">Average Production</h3>
          <p className="text-3xl font-bold mt-2">{stats.averageQuantity.toFixed(2)} liters</p>
        </div>
      </div>

      {/* Milk Record Form */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8 max-w-2xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">{editMode ? "Edit Milk Record" : "Add New Milk Record"}</h2>

        {/* Error message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p>{error}</p>
          </div>
        )}

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Animal ID *</label>
            <input
              type="text"
              name="animalId"
              value={newMilkRecord.animalId}
              onChange={handleInputChange}
              className="mt-1 w-full border rounded-md p-2"
              placeholder="Enter Animal ID"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Date *</label>
            <input
              type="date"
              name="date"
              value={newMilkRecord.date}
              onChange={handleInputChange}
              className="mt-1 w-full border rounded-md p-2"
              required
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Quantity (liters) *</label>
            <input
              type="number"
              name="quantity"
              value={newMilkRecord.quantity}
              onChange={handleInputChange}
              step="0.01"
              min="0.01"
              className="mt-1 w-full border rounded-md p-2"
              placeholder="Enter milk quantity in liters"
              required
            />
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          {editMode ? (
            <>
              <button
                onClick={updateMilkRecord}
                disabled={loading}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition disabled:opacity-50"
              >
                {loading ? "Updating..." : "Update Record"}
              </button>
              <button
                onClick={resetForm}
                disabled={loading}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-md transition disabled:opacity-50"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={addMilkRecord}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition disabled:opacity-50"
            >
              {loading ? "Adding..." : "Add Record"}
            </button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8 max-w-5xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Filter Records</h2>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">Animal ID</label>
            <input
              type="text"
              value={filterAnimalId}
              onChange={(e) => setFilterAnimalId(e.target.value)}
              className="mt-1 w-full border rounded-md p-2"
              placeholder="Filter by Animal ID"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="mt-1 w-full border rounded-md p-2"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={resetFilters}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-md transition"
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      {/* Milk Records Table */}
      <div className="bg-white rounded-xl shadow-md p-6 max-w-5xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Milk Production Records</h2>
        {loading && !error ? (
          <p className="text-gray-500 text-center">Loading records...</p>
        ) : error && milkRecords.length === 0 ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : filteredRecords.length === 0 ? (
          <p className="text-gray-500 text-center">No milk records available.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 rounded-md">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left px-4 py-2 border">Animal ID</th>
                  <th className="text-left px-4 py-2 border">Date</th>
                  <th className="text-left px-4 py-2 border">Quantity (liters)</th>
                  <th className="text-left px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border">{record.animalId || "N/A"}</td>
                    <td className="px-4 py-2 border">{record.date || "N/A"}</td>
                    <td className="px-4 py-2 border">{formatQuantity(record.quantity)}</td>
                    <td className="px-4 py-2 border">
                      <div className="flex gap-2">
                        <button
                          onClick={() => editMilkRecord(record)}
                          className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded-md text-xs"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteMilkRecord(record.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md text-xs"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default MilkPage
