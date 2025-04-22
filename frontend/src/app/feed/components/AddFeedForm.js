"use client"

import { useState } from "react"

const AddFeedForm = ({ onFeedAdded }) => {
  const [feedType, setFeedType] = useState("")
  const [totalStock, setTotalStock] = useState("")
  const [id, setId] = useState("")

  const handleSubmit = (event) => {
    event.preventDefault()

    const newFeed = {
      id: id ? Number.parseInt(id) : null,
      feedType,
      totalStock: Number.parseFloat(totalStock),
    }

    fetch("http://localhost:8080/feed/inventory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFeed),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Server responded with an error")
        return res.json()
      })
      .then(() => {
        alert("Feed added successfully")
        setId("")
        setFeedType("")
        setTotalStock("")
        onFeedAdded()
      })
      .catch((err) => {
        console.error("Error adding feed:", err)
        alert("Failed to add feed.")
      })
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-4 mb-4 border">
      <h3 className="text-lg font-semibold mb-4">Add New Feed</h3>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Feed ID:</label>
        <input
          type="number"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
          placeholder="Enter a unique ID"
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Feed Type:</label>
        <input
          type="text"
          value={feedType}
          onChange={(e) => setFeedType(e.target.value)}
          required
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Total Stock (Kg):</label>
        <input
          type="number"
          value={totalStock}
          onChange={(e) => setTotalStock(e.target.value)}
          required
          step="0.01"
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <button
        type="submit"
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
      >
        Add Feed
      </button>
    </form>
  )
}

export default AddFeedForm
