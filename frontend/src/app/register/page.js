"use client"

import { useState, useEffect } from "react"

const RegisterPage = () => {
  const [animals, setAnimals] = useState([])
  const [newAnimal, setNewAnimal] = useState({
    animalId: "",
    name: "",
    dob: "",
    breed: "",
    gender: "",
    notes: "",
  })
  const [editMode, setEditMode] = useState(false)
  const [currentAnimalId, setCurrentAnimalId] = useState(null)

  useEffect(() => {
    fetchAnimals()
  }, [])

  const fetchAnimals = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/animals")
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }
      const data = await res.json()
      setAnimals(data)
    } catch (err) {
      console.error("Error fetching animals:", err)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewAnimal({ ...newAnimal, [name]: value })
  }

  const resetForm = () => {
    setNewAnimal({
      animalId: "",
      name: "",
      dob: "",
      breed: "",
      gender: "",
      notes: "",
    })
    setEditMode(false)
    setCurrentAnimalId(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!newAnimal.animalId || !newAnimal.name) return

    try {
      const response = await fetch(
        editMode 
          ? `http://localhost:8080/api/animals/${currentAnimalId}`
          : "http://localhost:8080/api/animals",
        {
          method: editMode ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...newAnimal,
            dob: newAnimal.dob || null
          }),
        }
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      if (editMode) {
        setAnimals(animals.map(a => a.id === currentAnimalId ? result : a))
      } else {
        setAnimals([...animals, result])
      }
      resetForm()
    } catch (err) {
      console.error("Error saving animal:", err)
    }
  }

  const deleteAnimal = async (id) => {
    if (!window.confirm("Delete this animal?")) return
    try {
      const res = await fetch(`http://localhost:8080/api/animals/${id}`, {
        method: "DELETE",
      })
      if (res.ok) {
        setAnimals(animals.filter(a => a.id !== id))
      }
    } catch (err) {
      console.error("Error deleting animal:", err)
    }
  }

  const editAnimal = (animal) => {
    setNewAnimal({
      animalId: animal.animalId,
      name: animal.name,
      dob: animal.dob ? new Date(animal.dob).toISOString().split("T")[0] : "",
      breed: animal.breed,
      gender: animal.gender,
      notes: animal.notes,
    })
    setEditMode(true)
    setCurrentAnimalId(animal.id)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Animal Registration</h1>

      {/* Form */}
      <div className="bg-white shadow-md rounded-lg p-6 max-w-3xl mx-auto mb-10">
        <h2 className="text-xl font-semibold mb-4">{editMode ? "Edit Animal" : "Register New Animal"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            <input type="text" name="animalId" placeholder="Animal ID" value={newAnimal.animalId} onChange={handleInputChange} className="border p-2 rounded" required />
            <input type="text" name="name" placeholder="Name" value={newAnimal.name} onChange={handleInputChange} className="border p-2 rounded" required />
            <input type="date" name="dob" value={newAnimal.dob} onChange={handleInputChange} className="border p-2 rounded" />
            <input type="text" name="breed" placeholder="Breed" value={newAnimal.breed} onChange={handleInputChange} className="border p-2 rounded" />
            <select name="gender" value={newAnimal.gender} onChange={handleInputChange} className="border p-2 rounded">
              <option value="">Select Gender</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
            </select>
            <input type="text" name="notes" placeholder="Notes" value={newAnimal.notes} onChange={handleInputChange} className="border p-2 rounded" />
          </div>

          <div className="mt-4 flex gap-2">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              {editMode ? "Update" : "Register"}
            </button>
            <button type="button" onClick={resetForm} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
          </div>
        </form>
      </div>

      {/* List */}
      <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Registered Animals</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="border-b p-2">ID</th>
              <th className="border-b p-2">Name</th>
              <th className="border-b p-2">DOB</th>
              <th className="border-b p-2">Breed</th>
              <th className="border-b p-2">Gender</th>
              <th className="border-b p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {animals.map((animal) => (
              <tr key={animal.id}>
                <td className="border-b p-2">{animal.animalId}</td>
                <td className="border-b p-2">{animal.name}</td>
                <td className="border-b p-2">{animal.dob ? new Date(animal.dob).toLocaleDateString() : ''}</td>
                <td className="border-b p-2">{animal.breed}</td>
                <td className="border-b p-2">{animal.gender}</td>
                <td className="border-b p-2">
                  <button onClick={() => editAnimal(animal)} className="text-blue-600 mr-2">Edit</button>
                  <button onClick={() => deleteAnimal(animal.id)} className="text-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default RegisterPage