"use client"

import React, { useEffect, useState } from "react"
import { Button } from "../components/ui/button"
import { Play, Pause, Volume2, VolumeX, ChevronDown } from "lucide-react"
import ShinyText from './ShinyText/ShinyText';

export default function HomePage() {
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const togglePlay = () => {
    const video = document.getElementById("hero-video") as HTMLVideoElement
    if (video) {
      if (isPlaying) {
        video.pause()
      } else {
        video.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    const video = document.getElementById("hero-video") as HTMLVideoElement
    if (video) {
      video.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const scrollToContent = () => {
    const contentSection = document.getElementById("content-section")
    if (contentSection) {
      contentSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="bg-black text-white overflow-hidden">

      {/* Hero Section with Video */}
      <div id="home" className="relative h-screen flex items-center justify-center pt-16">
        {/* Background Video */}
        <video
          id="hero-video"
          className="absolute inset-0 w-full h-full object-cover z-0"
          autoPlay
          loop
          muted={isMuted}
          playsInline
        >
          <source src="/sv.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40 z-10" />

        {/* Content Overlay */}
        <div className="relative z-20 text-center max-w-4xl mx-auto px-6">
          <div className={`transition-all duration-1000 ${showContent ? "animate-fade-in-up opacity-100" : "opacity-0"}`}>
            <ShinyText text="SINGULARITY VOICES" disabled={false} speed={3} className='text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text SingularityVoices' />
            <p className="text-2xl md:text-2xl mb-12 text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Experience the future of voice technology where human expression meets artificial intelligence
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="border border-white bg-transparent text-white hover:bg-white hover:text-black transition-all duration-300"
              >
                Get Started
              </Button>
              <Button
                size="lg"
                className="border border-white bg-transparent text-white hover:bg-white hover:text-black transition-all duration-300"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>

        {/* Video Controls */}
        <div className="absolute bottom-8 left-8 z-20 flex gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="bg-black/50 hover:bg-black/70 text-white border border-white/20"
            onClick={togglePlay}
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="bg-black/50 hover:bg-black/70 text-white border border-white/20"
            onClick={toggleMute}
          >
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </Button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <Button
            variant="ghost"
            size="icon"
            className="animate-pulse-slow text-white/70 hover:bg-white hover:text-black transition-all duration-300"
            onClick={scrollToContent}
          >
            <ChevronDown className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Content Section */}
      <div id="content-section" className="min-h-screen bg-gradient-to-b from-black to-gray-900 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Revolutionary Voice Technology
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Discover how Singularity Voices is transforming the way we interact with technology through advanced voice synthesis and natural language processing.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800/50 p-8 rounded-lg backdrop-blur-sm border border-gray-700/50 transition-all duration-500 hover:scale-105">
              <h3 className="text-2xl font-semibold mb-4 text-white">Advanced AI</h3>
              <p className="text-gray-400">
                Cutting-edge artificial intelligence that understands context, emotion, and nuance in human speech.
              </p>
            </div>
            <div className="bg-gray-800/50 p-8 rounded-lg backdrop-blur-sm border border-gray-700/50 transition-all duration-500 hover:scale-105">
              <h3 className="text-2xl font-semibold mb-4 text-white">Natural Voices</h3>
              <p className="text-gray-400">
                Synthesized voices that are indistinguishable from human speech, with perfect intonation and expression.
              </p>
            </div>
            <div className="bg-gray-800/50 p-8 rounded-lg backdrop-blur-sm border border-gray-700/50 transition-all duration-500 hover:scale-105">
              <h3 className="text-2xl font-semibold mb-4 text-white">Real-time Processing</h3>
              <p className="text-gray-400">
                Lightning-fast processing that enables seamless, real-time voice interactions and responses.
              </p>
            </div>
          </div>

          <div className="text-center mt-16">
            <Button size="lg" className="bg-white text-black hover:bg-gray-200 transition-all duration-300">
              Experience the Future
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}