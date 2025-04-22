"use client"

import { useState, useEffect } from "react"

const BreedPage = () => {
  // State for breeding analytics
  const [breedingAnalytics, setBreedingAnalytics] = useState([])
  const [newBreedingAnalytics, setNewBreedingAnalytics] = useState({
    animalId: "",
    breedName: "",
    breedingDate: "",
    outcome: "",
    notes: "",
    successful: false,
  })
  const [editBreedingAnalyticsMode, setEditBreedingAnalyticsMode] = useState(false)
  const [currentBreedingAnalyticsId, setCurrentBreedingAnalyticsId] = useState(null)

  // State for breeds
  const [breeds, setBreeds] = useState([])
  const [newBreed, setNewBreed] = useState({
    breedName: "",
    origin: "",
    characteristics: "",
    milkProduction: "",
    temperament: "",
  })
  const [editBreedMode, setEditBreedMode] = useState(false)
  const [currentBreedId, setCurrentBreedId] = useState(null)

  // Loading states
  const [loadingBreedingAnalytics, setLoadingBreedingAnalytics] = useState(false)
  const [loadingBreeds, setLoadingBreeds] = useState(false)

  // Active tab state
  const [activeTab, setActiveTab] = useState("breedingAnalytics")

  useEffect(() => {
    fetchBreedingAnalytics()
    fetchBreeds()
  }, [])

  // Fetch breeding analytics
  const fetchBreedingAnalytics = async () => {
    setLoadingBreedingAnalytics(true)
    try {
      const response = await fetch("http://localhost:8080/api/breeding-analytics")
      const data = await response.json()
      setBreedingAnalytics(data)
    } catch (error) {
      console.error("Error fetching breeding analytics:", error)
    } finally {
      setLoadingBreedingAnalytics(false)
    }
  }

  // Fetch breeds
  const fetchBreeds = async () => {
    setLoadingBreeds(true)
    try {
      const response = await fetch("http://localhost:8080/api/breeds")
      const data = await response.json()
      setBreeds(data)
    } catch (error) {
      console.error("Error fetching breed records:", error)
    } finally {
      setLoadingBreeds(false)
    }
  }

  // Reset breeding analytics form
  const resetBreedingAnalyticsForm = () => {
    setNewBreedingAnalytics({
      animalId: "",
      breedName: "",
      breedingDate: "",
      outcome: "",
      notes: "",
      successful: false,
    })
    setEditBreedingAnalyticsMode(false)
    setCurrentBreedingAnalyticsId(null)
  }

  // Reset breed form
  const resetBreedForm = () => {
    setNewBreed({
      breedName: "",
      origin: "",
      characteristics: "",
      milkProduction: "",
      temperament: "",
    })
    setEditBreedMode(false)
    setCurrentBreedId(null)
  }

  // Handle breeding analytics input change
  const handleBreedingAnalyticsInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setNewBreedingAnalytics({
      ...newBreedingAnalytics,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  // Handle breed input change
  const handleBreedInputChange = (e) => {
    const { name, value } = e.target
    setNewBreed({ ...newBreed, [name]: value })
  }

  // Add breeding analytics
  const addBreedingAnalytics = async () => {
    if (!newBreedingAnalytics.animalId || !newBreedingAnalytics.breedName) return

    try {
      const response = await fetch("http://localhost:8080/api/breeding-analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBreedingAnalytics),
      })

      if (response.ok) {
        const createdBreedingAnalytics = await response.json()
        setBreedingAnalytics([...breedingAnalytics, createdBreedingAnalytics])
        resetBreedingAnalyticsForm()
      }
    } catch (error) {
      console.error("Error adding breeding analytics:", error)
    }
  }

  // Update breeding analytics
  const updateBreedingAnalytics = async () => {
    if (!newBreedingAnalytics.animalId || !currentBreedingAnalyticsId) return

    try {
      const response = await fetch(`http://localhost:8080/api/breeding-analytics/${currentBreedingAnalyticsId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBreedingAnalytics),
      })

      if (response.ok) {
        const updatedBreedingAnalytics = await response.json()
        setBreedingAnalytics(
          breedingAnalytics.map((item) => (item.id === currentBreedingAnalyticsId ? updatedBreedingAnalytics : item)),
        )
        resetBreedingAnalyticsForm()
      }
    } catch (error) {
      console.error("Error updating breeding analytics:", error)
    }
  }

  // Delete breeding analytics
  const deleteBreedingAnalytics = async (id) => {
    if (!window.confirm("Are you sure you want to delete this breeding analytics record?")) return

    try {
      const response = await fetch(`http://localhost:8080/api/breeding-analytics/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setBreedingAnalytics(breedingAnalytics.filter((item) => item.id !== id))
      }
    } catch (error) {
      console.error("Error deleting breeding analytics:", error)
    }
  }

  // Edit breeding analytics
  const editBreedingAnalyticsRecord = (record) => {
    setNewBreedingAnalytics({
      animalId: record.animalId,
      breedName: record.breedName,
      breedingDate: record.breedingDate ? new Date(record.breedingDate).toISOString().split("T")[0] : "",
      outcome: record.outcome,
      notes: record.notes,
      successful: record.successful,
    })
    setEditBreedingAnalyticsMode(true)
    setCurrentBreedingAnalyticsId(record.id)
  }

  // Add breed
  const addBreed = async () => {
    if (!newBreed.breedName) return

    try {
      const response = await fetch("http://localhost:8080/api/breeds", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBreed),
      })

      if (response.ok) {
        const createdBreed = await response.json()
        setBreeds([...breeds, createdBreed])
        resetBreedForm()
      }
    } catch (error) {
      console.error("Error adding breed record:", error)
    }
  }

  // Update breed
  const updateBreed = async () => {
    if (!newBreed.breedName || !currentBreedId) return

    try {
      const response = await fetch(`http://localhost:8080/api/breeds/${currentBreedId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBreed),
      })

      if (response.ok) {
        const updatedBreed = await response.json()
        setBreeds(breeds.map((breed) => (breed.id === currentBreedId ? updatedBreed : breed)))
        resetBreedForm()
      }
    } catch (error) {
      console.error("Error updating breed record:", error)
    }
  }

  // Delete breed
  const deleteBreed = async (id) => {
    if (!window.confirm("Are you sure you want to delete this breed?")) return

    try {
      const response = await fetch(`http://localhost:8080/api/breeds/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setBreeds(breeds.filter((breed) => breed.id !== id))
      }
    } catch (error) {
      console.error("Error deleting breed record:", error)
    }
  }

  // Edit breed
  const editBreed = (breed) => {
    setNewBreed({
      breedName: breed.breedName,
      origin: breed.origin,
      characteristics: breed.characteristics,
      milkProduction: breed.milkProduction,
      temperament: breed.temperament,
    })
    setEditBreedMode(true)
    setCurrentBreedId(breed.id)
  }

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Cow Breeding Management</h1>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === "breedingAnalytics" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("breedingAnalytics")}
        >
          Breeding Analytics
        </button>
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === "breeds" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("breeds")}
        >
          Breeds
        </button>
      </div>

      {/* Breeding Analytics Section */}
      <div className={activeTab === "breedingAnalytics" ? "block" : "hidden"}>
        {/* Breeding Analytics Form */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">
            {editBreedingAnalyticsMode ? "Edit Breeding Record" : "Add New Breeding Record"}
          </h2>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Animal ID</label>
              <input
                type="text"
                name="animalId"
                value={newBreedingAnalytics.animalId}
                onChange={handleBreedingAnalyticsInputChange}
                className="mt-1 w-full border rounded-md p-2"
                placeholder="Enter Animal ID"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Breed Name</label>
              <input
                type="text"
                name="breedName"
                value={newBreedingAnalytics.breedName}
                onChange={handleBreedingAnalyticsInputChange}
                className="mt-1 w-full border rounded-md p-2"
                placeholder="Enter Breed Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Breeding Date</label>
              <input
                type="date"
                name="breedingDate"
                value={newBreedingAnalytics.breedingDate}
                onChange={handleBreedingAnalyticsInputChange}
                className="mt-1 w-full border rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Outcome</label>
              <input
                type="text"
                name="outcome"
                value={newBreedingAnalytics.outcome}
                onChange={handleBreedingAnalyticsInputChange}
                className="mt-1 w-full border rounded-md p-2"
                placeholder="Enter outcome"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Notes</label>
              <textarea
                name="notes"
                value={newBreedingAnalytics.notes}
                onChange={handleBreedingAnalyticsInputChange}
                className="mt-1 w-full border rounded-md p-2"
                placeholder="Additional notes"
                rows={2}
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <input
                  type="checkbox"
                  name="successful"
                  checked={newBreedingAnalytics.successful}
                  onChange={handleBreedingAnalyticsInputChange}
                  className="rounded"
                />
                Successful
              </label>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            {editBreedingAnalyticsMode ? (
              <>
                <button
                  onClick={updateBreedingAnalytics}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition"
                >
                  Update Record
                </button>
                <button
                  onClick={resetBreedingAnalyticsForm}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-md transition"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={addBreedingAnalytics}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition"
              >
                Add Record
              </button>
            )}
          </div>
        </div>

        {/* Breeding Analytics Table */}
        <div className="bg-white rounded-xl shadow-md p-6 max-w-5xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">Breeding Analytics Records</h2>
          {loadingBreedingAnalytics ? (
            <p className="text-gray-500 text-center">Loading records...</p>
          ) : breedingAnalytics.length === 0 ? (
            <p className="text-gray-500 text-center">No breeding analytics records available.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300 rounded-md">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="text-left px-4 py-2 border">Animal ID</th>
                    <th className="text-left px-4 py-2 border">Breed Name</th>
                    <th className="text-left px-4 py-2 border">Breeding Date</th>
                    <th className="text-left px-4 py-2 border">Outcome</th>
                    <th className="text-left px-4 py-2 border">Notes</th>
                    <th className="text-left px-4 py-2 border">Successful</th>
                    <th className="text-left px-4 py-2 border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {breedingAnalytics.map((record) => (
                    <tr key={record.id} className="hover:bg-gray-50">
                      <td className="px-4 py-2 border">{record.animalId}</td>
                      <td className="px-4 py-2 border">{record.breedName}</td>
                      <td className="px-4 py-2 border">{formatDate(record.breedingDate)}</td>
                      <td className="px-4 py-2 border">{record.outcome}</td>
                      <td className="px-4 py-2 border">{record.notes}</td>
                      <td className="px-4 py-2 border">
                        {record.successful ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Yes
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            No
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-2 border">
                        <div className="flex gap-2">
                          <button
                            onClick={() => editBreedingAnalyticsRecord(record)}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded-md text-xs"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteBreedingAnalytics(record.id)}
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

      {/* Breeds Section */}
      <div className={activeTab === "breeds" ? "block" : "hidden"}>
        {/* Breed Form */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">{editBreedMode ? "Edit Breed" : "Add New Breed"}</h2>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Breed Name</label>
              <input
                type="text"
                name="breedName"
                value={newBreed.breedName}
                onChange={handleBreedInputChange}
                className="mt-1 w-full border rounded-md p-2"
                placeholder="Enter Breed Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Origin</label>
              <input
                type="text"
                name="origin"
                value={newBreed.origin}
                onChange={handleBreedInputChange}
                className="mt-1 w-full border rounded-md p-2"
                placeholder="Enter Origin Country/Region"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Characteristics</label>
              <textarea
                name="characteristics"
                value={newBreed.characteristics}
                onChange={handleBreedInputChange}
                className="mt-1 w-full border rounded-md p-2"
                placeholder="Physical characteristics of the breed"
                rows={2}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Milk Production</label>
              <input
                type="text"
                name="milkProduction"
                value={newBreed.milkProduction}
                onChange={handleBreedInputChange}
                className="mt-1 w-full border rounded-md p-2"
                placeholder="Average milk production"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Temperament</label>
              <input
                type="text"
                name="temperament"
                value={newBreed.temperament}
                onChange={handleBreedInputChange}
                className="mt-1 w-full border rounded-md p-2"
                placeholder="Breed temperament"
              />
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            {editBreedMode ? (
              <>
                <button
                  onClick={updateBreed}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition"
                >
                  Update Breed
                </button>
                <button
                  onClick={resetBreedForm}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-md transition"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={addBreed}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition"
              >
                Add Breed
              </button>
            )}
          </div>
        </div>

        {/* Breeds Table */}
        <div className="bg-white rounded-xl shadow-md p-6 max-w-5xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">Breed Records</h2>
          {loadingBreeds ? (
            <p className="text-gray-500 text-center">Loading records...</p>
          ) : breeds.length === 0 ? (
            <p className="text-gray-500 text-center">No breed records available.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300 rounded-md">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="text-left px-4 py-2 border">Breed Name</th>
                    <th className="text-left px-4 py-2 border">Origin</th>
                    <th className="text-left px-4 py-2 border">Characteristics</th>
                    <th className="text-left px-4 py-2 border">Milk Production</th>
                    <th className="text-left px-4 py-2 border">Temperament</th>
                    <th className="text-left px-4 py-2 border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {breeds.map((breed) => (
                    <tr key={breed.id} className="hover:bg-gray-50">
                      <td className="px-4 py-2 border">{breed.breedName}</td>
                      <td className="px-4 py-2 border">{breed.origin}</td>
                      <td className="px-4 py-2 border">{breed.characteristics}</td>
                      <td className="px-4 py-2 border">{breed.milkProduction}</td>
                      <td className="px-4 py-2 border">{breed.temperament}</td>
                      <td className="px-4 py-2 border">
                        <div className="flex gap-2">
                          <button
                            onClick={() => editBreed(breed)}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded-md text-xs"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteBreed(breed.id)}
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
    </div>
  )
}

export default BreedPage
