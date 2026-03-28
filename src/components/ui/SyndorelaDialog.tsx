"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { X, ExternalLink, Rocket, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SyndorelaDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const lastShown = localStorage.getItem("syndorela-modal-last-shown");
    const now = Date.now();
    const fourteenDays = 14 * 24 * 60 * 60 * 1000;

    if (!lastShown || now - parseInt(lastShown) > fourteenDays) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        localStorage.setItem("syndorela-modal-last-shown", now.toString());
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleManualOpen = () => {
    setHasInteracted(true);
    setIsOpen(true);
    localStorage.setItem("syndorela-modal-last-shown", Date.now().toString());
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => console.warn("Failed to play audio on manual open:", e));
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    // Reset interaction state for next time
    setTimeout(() => {
      setHasInteracted(false);
    }, 500);
  };

  const handleWelcomeClick = () => {
    setHasInteracted(true);
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.error("Failed to play audio on click:", e));
    }
  };

  useEffect(() => {
    // Pre-create the audio instance
    const audio = new Audio("/artwork/zelda.mp3");
    audio.loop = true;
    audio.muted = false;
    audio.volume = 1.0;
    audio.load();
    audioRef.current = audio;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (isOpen && hasInteracted && audioRef.current) {
      const audio = audioRef.current;
      if (audio.paused) {
        audio.play().catch((err) => {
          console.warn("Audio play blocked even after interaction:", err);
        });
      }

      return () => {
        audio.pause();
      };
    } else if (audioRef.current) {
      audioRef.current.pause();
    }
  }, [isOpen, hasInteracted]);

  return (
    <>
      <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative max-w-4xl w-full bg-[#fffafa] rounded-3xl shadow-2xl overflow-hidden border-[12px] border-pink-200"
            style={{
              boxShadow: "0 0 0 4px #fbcfe8, 0 20px 25px -5px rgb(0 0 0 / 0.1)",
            }}
          >
            {/* The blurred content container */}
            <div className={`flex flex-col md:flex-row w-full transition-all duration-1000 ${!hasInteracted ? 'blur-2xl opacity-40 scale-[0.98] pointer-events-none select-none' : 'blur-0 opacity-100 scale-100'}`}>
              {/* Laced Border Effect */}
              <div className="absolute inset-0 pointer-events-none border-[6px] border-white/50 rounded-[18px] z-10" />
              
              {/* Close Button */}
              <button 
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-pink-100 text-pink-400 transition-colors z-20"
              >
                <X size={24} />
              </button>
  
              {/* Left Side: Image */}
              <div className="md:w-2/5 relative min-h-[300px] bg-pink-50 flex items-center justify-center p-6">
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden border-4 border-white shadow-lg">
                  <Image 
                    src="/artwork/syndorela-toon.png" 
                    alt="Syndorela" 
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
  
              {/* Right Side: Note */}
              <div className="md:w-3/5 p-8 md:p-12 flex flex-col justify-between">
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-pink-600 mb-2" style={{ fontFamily: "'Dancing Script', cursive" }}>
                    A Royal Proclamation...
                  </h2>
                  
                  <div 
                    className="text-xl leading-relaxed text-purple-900" 
                    style={{ fontFamily: "'Dancing Script', cursive" }}
                  >
                    <p className="mb-4">My Dearest Guest,</p>
                    
                    <p className="mb-4">
                      Pardon my current appearance; a princess's work is never done, and as you can see, I am presently knee-deep in the ashes of legacy code. But don't let these rags fool you—this tiara isn't just for show! I am Syndorela, and I am here to transform your soot-covered systems into something truly royal.
                    </p>
                    
                    <p className="mb-4">
                      This site is but a humble prototype in our laboratory, a mere showplace for the magic we are brewing. Soon, I shall arrive in full glory to rescue your old code and help it blossom into a beautiful, new architecture. My home may be sparse for now, but it is filled with love and grand ambitions.
                    </p>
                    
                    <p className="mb-4">
                      Feel free to wander my empty halls, and do return on the morrow to see what new enchantments have appeared.
                    </p>
                    
                    <p className="mb-2 italic">Until we meet at the ball,</p>
                    <p className="font-bold text-2xl text-pink-600">Syndorela</p>
                  </div>
                </div>
  
                {/* Ornate Buttons */}
                <div className="mt-10">
                  <p className="text-xs font-bold tracking-widest uppercase text-pink-400 mb-4 text-center">
                    ✧ Choose Your Path Wisely ✧
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <Button 
                      variant="outline" 
                      className="border-pink-200 text-pink-700 hover:bg-pink-50 hover:text-pink-800 rounded-xl py-6 h-auto transition-all"
                      asChild
                    >
                      <Link href="#features" onClick={handleClose}>
                        <div className="flex flex-col items-center gap-1">
                          <Globe size={18} />
                          <span className="text-xs font-bold uppercase tracking-tighter">Visit This Site</span>
                        </div>
                      </Link>
                    </Button>
                    
                    <Button 
                      className="bg-pink-600 hover:bg-pink-700 text-white shadow-lg shadow-pink-200 rounded-xl py-6 h-auto transition-all"
                      asChild
                    >
                      <Link href="/app" onClick={handleClose}>
                        <div className="flex flex-col items-center gap-1">
                          <Rocket size={18} />
                          <span className="text-xs font-bold uppercase tracking-tighter">Launch Workspace</span>
                        </div>
                      </Link>
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="border-purple-200 text-purple-700 hover:bg-purple-50 hover:text-purple-800 rounded-xl py-6 h-auto transition-all"
                      asChild
                    >
                      <Link href="https://github.com/blackrushllc" target="_blank">
                        <div className="flex flex-col items-center gap-1">
                          <ExternalLink size={18} />
                          <span className="text-[10px] font-bold uppercase tracking-tighter text-center leading-tight">BlackrushLLC<br/>on Github</span>
                        </div>
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
  
              {/* Pink Ornate Corner Accents */}
              <div className="absolute top-0 left-0 w-16 h-16 border-t-8 border-l-8 border-pink-300/30 rounded-tl-3xl pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b-8 border-r-8 border-pink-300/30 rounded-br-3xl pointer-events-none" />
            </div>

            {/* Welcome Overlay */}
            {!hasInteracted && (
              <div className="absolute inset-0 z-[50] flex items-center justify-center p-8">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white/90 backdrop-blur-md p-10 rounded-[2.5rem] shadow-[0_0_50px_rgba(251,207,232,0.8)] border-4 border-pink-200 flex flex-col items-center gap-8 max-w-sm w-full text-center"
                >
                  <div className="space-y-2">
                    <h3 className="text-3xl font-bold text-pink-600" style={{ fontFamily: "'Dancing Script', cursive" }}>
                      A Royal Welcome
                    </h3>
                    <p className="text-purple-800 text-sm italic">
                      Please announce your presence to the Princess
                    </p>
                  </div>

                  <Button 
                    onClick={handleWelcomeClick}
                    className="bg-gradient-to-br from-pink-400 to-purple-600 hover:from-pink-500 hover:to-purple-700 text-white shadow-xl shadow-pink-200 rounded-2xl py-10 px-16 h-auto transition-all group hover:scale-105 active:scale-95 border-b-4 border-purple-800/30"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-4xl font-bold uppercase tracking-widest" style={{ fontFamily: "'Dancing Script', cursive" }}>Enter</span>
                      <span className="text-[10px] opacity-80 uppercase tracking-widest font-bold">The Royal Laboratory</span>
                    </div>
                  </Button>
                </motion.div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
    
    {/* Manual Trigger Button */}
    {!isOpen && (
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1, rotate: 10 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleManualOpen}
        className="fixed bottom-6 right-6 z-[90] w-14 h-14 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border-2 border-pink-200 flex items-center justify-center group overflow-hidden"
        title="A Royal Proclamation"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-pink-100 to-purple-100 opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="relative w-10 h-10">
          <Image 
            src="/artwork/diamond.png" 
            alt="Royal Proclamation" 
            fill
            className="object-contain p-1"
          />
        </div>
      </motion.button>
    )}
    </>
  );
}
