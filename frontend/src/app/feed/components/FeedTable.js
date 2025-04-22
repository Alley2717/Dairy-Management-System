"use client"

import { useState, useEffect } from "react"
import AddFeedForm from "./AddFeedForm"

const FeedTable = () => {
  const [feedData, setFeedData] = useState([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchFeedData = () => {
    setLoading(true)
    fetch("http://localhost:8080/feed/all")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch feed data")
        }
        return res.json()
      })
      .then((data) => {
        setFeedData(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Error fetching feeds:", err)
        setError("Failed to load feed data. Please try again later.")
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchFeedData()
  }, [])

  const handleFeedAdded = () => {
    fetchFeedData()
    setShowAddForm(false)
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Feed Inventory</h2>
      <button
        onClick={() => setShowAddForm(!showAddForm)}
        className="mb-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        {showAddForm ? "Cancel" : "Add New Feed"}
      </button>

      {showAddForm && <AddFeedForm onFeedAdded={handleFeedAdded} />}

      {loading ? (
        <p className="text-gray-500">Loading feed inventory...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : feedData.length === 0 ? (
        <p>No feed inventory found. Add some feed to get started.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 shadow-md rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Feed Type</th>
                <th className="py-2 px-4 border-b">Total Stock (Kg)</th>
              </tr>
            </thead>
            <tbody>
              {feedData.map((feed) => (
                <tr key={feed.id} className="text-center">
                  <td className="py-2 px-4 border-b">{feed.id}</td>
                  <td className="py-2 px-4 border-b">{feed.feedType}</td>
                  <td className="py-2 px-4 border-b">{feed.totalStock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <button
        onClick={fetchFeedData}
        className="mt-4 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
      >
        Refresh Data
      </button>
    </div>
  )
}

export default FeedTable
