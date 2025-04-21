"use client"

import { useState, useEffect } from "react"

const BreedPage = () => {
  const [breeds, setBreeds] = useState([])
  const [newBreed, setNewBreed] = useState({
    breedName: "",
    origin: "",
    characteristics: "",
    milkProduction: "",
    temperament: "",
  })
  const [loading, setLoading] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [currentBreedId, setCurrentBreedId] = useState(null)

  useEffect(() => {
    fetchBreeds()
  }, [])

  const fetchBreeds = async () => {
    setLoading(true)
    try {
      const response = await fetch("http://localhost:8080/api/breeds")
      const data = await response.json()
      setBreeds(data)
    } catch (error) {
      console.error("Error fetching breed records:", error)
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setNewBreed({
      breedName: "",
      origin: "",
      characteristics: "",
      milkProduction: "",
      temperament: "",
    })
    setEditMode(false)
    setCurrentBreedId(null)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewBreed({ ...newBreed, [name]: value })
  }

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
        resetForm()
      }
    } catch (error) {
      console.error("Error adding breed record:", error)
    }
  }

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
        resetForm()
      }
    } catch (error) {
      console.error("Error updating breed record:", error)
    }
  }

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

  const editBreed = (breed) => {
    setNewBreed({
      breedName: breed.breedName,
      origin: breed.origin,
      characteristics: breed.characteristics,
      milkProduction: breed.milkProduction,
      temperament: breed.temperament,
    })
    setEditMode(true)
    setCurrentBreedId(breed.id)
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Cow Breed Management</h1>

      {/* Form Card */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8 max-w-2xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">{editMode ? "Edit Breed" : "Add New Breed"}</h2>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Breed Name</label>
            <input
              type="text"
              name="breedName"
              value={newBreed.breedName}
              onChange={handleInputChange}
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
              onChange={handleInputChange}
              className="mt-1 w-full border rounded-md p-2"
              placeholder="Enter Origin Country/Region"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Characteristics</label>
            <textarea
              name="characteristics"
              value={newBreed.characteristics}
              onChange={handleInputChange}
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
              onChange={handleInputChange}
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
              onChange={handleInputChange}
              className="mt-1 w-full border rounded-md p-2"
              placeholder="Breed temperament"
            />
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          {editMode ? (
            <>
              <button
                onClick={updateBreed}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition"
              >
                Update Breed
              </button>
              <button
                onClick={resetForm}
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

      {/* Records Table */}
      <div className="bg-white rounded-xl shadow-md p-6 max-w-5xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Breed Records</h2>
        {loading ? (
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
  )
}

export default BreedPage
