import React, { useState } from "react"

function getTrackingStatus() {
  if (typeof window !== "undefined") {
    return window.localStorage.getItem("plausible_ignore") !== "true"
  }
  else return true
}

export default function TrackingSettings() {
  const [isTrackingEnabled, setIsTrackingEnabled] = useState(getTrackingStatus())

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setIsTrackingEnabled(!isTrackingEnabled)
    window.localStorage.setItem("plausible_ignore", String(!event.target.checked))
  }

  return (
    <div className="max-w-5xl px-5 md:px-1 mt-8 mx-auto">
      <h1 className="font-extrabold font-mono text-3xl mb-4">Tracking Settings</h1>
      <div className="flex items-center">
        <input onChange={handleChange} checked={isTrackingEnabled} className="ml-1 mr-2" type="checkbox" id="tracking_enabled" />
        <label htmlFor="tracking_enabled">Tracking aktiviert</label>
      </div>
    </div>
  )
}