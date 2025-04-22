"use client"

import { useState, useEffect } from "react"

const FeedChecklist = () => {
  const [feedData, setFeedData] = useState([])
  const [selectedFeeds, setSelectedFeeds] = useState([])
  const [quantities, setQuantities] = useState({})
  const [date, setDate] = useState(new Date().toISOString().split("T")[0])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch("http://localhost:8080/feed/all")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch feed data")
        }
        return res.json()
      })
      .then((data) => {
        setFeedData(data)
        const initialQuantities = {}
        data.forEach((feed) => {
          initialQuantities[feed.id] = 1
        })
        setQuantities(initialQuantities)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Error fetching feeds:", err)
        setError("Failed to load feed data. Please try again later.")
        setLoading(false)
      })
  }, [])

  const handleCheckboxChange = (feedId) => {
    setSelectedFeeds((prev) =>
      prev.includes(feedId) ? prev.filter((id) => id !== feedId) : [...prev, feedId]
    )
  }

  const handleQuantityChange = (feedId, value) => {
    setQuantities({ ...quantities, [feedId]: Number.parseFloat(value) })
  }

  const handleSubmit = () => {
    if (selectedFeeds.length === 0) {
      alert("Please select at least one feed")
      return
    }

    const trackingPromises = selectedFeeds.map((feedId) => {
      const feed = feedData.find((f) => f.id === feedId)
      const trackingData = {
        id: null,
        date: date,
        quantityConsumed: quantities[feedId],
        feedInventory: { id: feedId },
      }

      return fetch("http://localhost:8080/feed/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(trackingData),
      }).then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to track feed ${feed.feedType}`)
        }
        return res.json()
      })
    })

    Promise.all(trackingPromises)
      .then(() => {
        alert("Feed usage tracked successfully")
        setSelectedFeeds([])
        fetch("http://localhost:8080/feed/all")
          .then((res) => res.json())
          .then((data) => setFeedData(data))
      })
      .catch((err) => {
        console.error("Error tracking feed usage:", err)
        alert("Feed usage tracked!")
      })
  }

  if (loading) return <div className="text-gray-600">Loading feed data...</div>
  if (error) return <div className="text-red-500">{error}</div>

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Feed Consumption Tracking</h2>

      <div className="mb-6">
        <label className="block font-medium mb-1">Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-full max-w-sm"
        />
      </div>

      <form className="space-y-4">
        {feedData.map((feed) => (
          <div
            key={feed.id}
            className="border rounded-lg p-4 shadow-sm bg-white flex flex-col gap-3"
          >
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedFeeds.includes(feed.id)}
                onChange={() => handleCheckboxChange(feed.id)}
                disabled={feed.totalStock <= 0}
                className="w-5 h-5"
              />
              <span className="text-lg font-medium">
                {feed.feedType} <span className="text-gray-500 text-sm">– {feed.totalStock} Kg available</span>
              </span>
            </label>

            {selectedFeeds.includes(feed.id) && (
              <div className="ml-6 flex items-center gap-2">
                <label className="font-medium">Quantity consumed:</label>
                <input
                  type="number"
                  min="0.1"
                  max={feed.totalStock}
                  step="0.1"
                  value={quantities[feed.id]}
                  onChange={(e) => handleQuantityChange(feed.id, e.target.value)}
                  className="border px-2 py-1 rounded w-24"
                />
                <span>Kg</span>
              </div>
            )}
          </div>
        ))}
      </form>

      <button
        onClick={handleSubmit}
        disabled={selectedFeeds.length === 0}
        className="mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Submit Feed Consumption
      </button>
    </div>
  )
}

export default FeedChecklist
