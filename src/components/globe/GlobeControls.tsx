'use client'

import { useState } from 'react'

interface GlobeControlsProps {
  onReset: () => void
  onToggleAutoRotate: () => void
  isAutoRotating: boolean
}

export default function GlobeControls({
  onReset,
  onToggleAutoRotate,
  isAutoRotating,
}: GlobeControlsProps) {
  return (
    <div className="absolute bottom-4 left-4 flex flex-col gap-2 z-10">
      <button
        onClick={onReset}
        className="px-4 py-2 bg-bg-tertiary border border-accent-primary/30 text-text-primary font-mono text-sm hover:border-accent-primary hover:text-accent-primary transition-all"
      >
        Reset View
      </button>
      <button
        onClick={onToggleAutoRotate}
        className={`px-4 py-2 border font-mono text-sm transition-all ${
          isAutoRotating
            ? 'bg-accent-primary/20 border-accent-primary text-accent-primary'
            : 'bg-bg-tertiary border-accent-primary/30 text-text-primary hover:border-accent-primary hover:text-accent-primary'
        }`}
      >
        {isAutoRotating ? 'Stop Rotation' : 'Auto Rotate'}
      </button>
    </div>
  )
}
