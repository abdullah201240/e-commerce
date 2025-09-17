'use client'
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, Users, Award, Truck, Shield, Star, Play, Pause } from 'lucide-react';
import MobileLayout from '@/components/layout/MobileLayout';

const FurniStoreAbout = () => {
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const videoRef = useRef<HTMLVideoElement>(null);

    const values = [
        {
            icon: <Heart className="h-8 w-8 text-black" />,
            title: "Crafted with Love",
            description: "Every piece of furniture is carefully selected and crafted with attention to detail and passion."
        },
        {
            icon: <Award className="h-8 w-8 text-black" />,
            title: "Premium Quality",
            description: "We source only the finest materials and work with skilled artisans to ensure lasting durability."
        },
        {
            icon: <Users className="h-8 w-8 text-black" />,
            title: "Family Focused",
            description: "Creating beautiful spaces where families gather, relax, and make memories together."
        },
        {
            icon: <Shield className="h-8 w-8 text-black" />,
            title: "Lifetime Support",
            description: "From delivery to maintenance, we're here to support you throughout your furniture's lifetime."
        }
    ];

    const stats = [
        { number: "25K+", label: "Happy Homes" },
        { number: "5K+", label: "Furniture Pieces" },
        { number: "99.8%", label: "Customer Satisfaction" },
        { number: "15+", label: "Years Experience" }
    ];

    const galleryImages = [
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop"
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const toggleVideo = () => {
        if (isVideoPlaying) {
            // Pause the video and hide it
            if (videoRef.current) {
                videoRef.current.pause();
            }
            setIsVideoPlaying(false);
        } else {
            // Show and play the video
            setIsVideoPlaying(true);
            // The video will auto-play when it renders with the autoPlay attribute
        }
    };

    return (
        <MobileLayout
            showBack={true}
        >
            <div className="min-h-screen bg-white overflow-hidden">
                {/* Hero Section with Background Image */}
                <section className="relative py-32 px-4 bg-gradient-to-br from-gray-100 via-white to-gray-200">
                    <div className="absolute inset-0 opacity-10">
                        <img
                            src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1920&h=1080&fit=crop"
                            alt="Furniture background"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="relative max-w-6xl mx-auto text-center">
                        <div className="animate-fade-in-up">
                            <h1 className="text-6xl font-bold text-gray-900 mb-6">
                                Welcome to <span className="text-black">FurniStore</span>
                            </h1>
                            <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8 leading-relaxed">
                                Transforming houses into homes with premium furniture that combines timeless design,
                                exceptional craftsmanship, and unmatched comfort for over 15 years.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4 mb-12">
                                <Badge className="px-6 py-3 text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 border border-gray-300">
                                    ✨ Premium Craftsmanship
                                </Badge>
                                <Badge className="px-6 py-3 text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 border border-gray-300">
                                    🚚 Free Delivery
                                </Badge>
                                <Badge className="px-6 py-3 text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 border border-gray-300">
                                    🛡️ Lifetime Warranty
                                </Badge>
                            </div>
                            <Button size="lg" className="bg-black text-white hover:bg-gray-800 transform hover:scale-105 transition-all duration-300 shadow-lg">
                                Explore Our Collection
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Stats Section with Animation */}
                <section className="py-16 px-4 bg-white border-y border-gray-100">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center group">
                                    <div className="text-4xl md:text-5xl font-bold text-black mb-2 transform group-hover:scale-110 transition-transform duration-300">
                                        {stat.number}
                                    </div>
                                    <div className="text-gray-600 font-medium">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

               

                {/* Our Story Section with Images */}
                <section className="py-20 px-4 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div className="space-y-8">
                                <div>
                                    <h2 className="text-4xl font-bold text-gray-900 mb-6">
                                        The FurniStore Journey
                                    </h2>
                                    <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                                        Founded in 2008 by passionate furniture enthusiasts, FurniStore began as a small
                                        workshop dedicated to creating exceptional furniture pieces. Our founders believed
                                        that every home deserves furniture that tells a story and brings families together.
                                    </p>
                                    <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                                        Today, we've grown into a trusted name in furniture retail, serving thousands of
                                        families across the country. From handcrafted dining tables to luxurious sofas,
                                        every piece reflects our commitment to quality, durability, and timeless design.
                                    </p>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg transform hover:translate-x-2 transition-transform duration-300 border border-gray-200">
                                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                                            <Star className="h-6 w-6 text-black" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">2008</h3>
                                            <p className="text-gray-600">FurniStore Founded with a Single Workshop</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg transform hover:translate-x-2 transition-transform duration-300 border border-gray-200">
                                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                                            <Truck className="h-6 w-6 text-black" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">2015</h3>
                                            <p className="text-gray-600">Launched Nationwide Delivery Service</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg transform hover:translate-x-2 transition-transform duration-300 border border-gray-200">
                                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                                            <Award className="h-6 w-6 text-black" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">2023</h3>
                                            <p className="text-gray-600">Best Furniture Store Award Winner</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="relative">
                                <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                                    <img
                                        src={galleryImages[currentImageIndex]}
                                        alt="FurniStore furniture showcase"
                                        className="w-full h-full object-cover transition-opacity duration-1000"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                                    <div className="absolute bottom-4 left-4 text-white">
                                        <p className="text-sm opacity-90">Premium Furniture Collection</p>
                                    </div>
                                </div>

                                {/* Image indicators */}
                                <div className="flex justify-center mt-4 space-x-2">
                                    {galleryImages.map((_, index) => (
                                        <button
                                            title='Image indicator'
                                            type="button"
                                            key={index}
                                            className={`w-3 h-3 rounded-full transition-colors duration-300 ${index === currentImageIndex ? 'bg-black' : 'bg-gray-300'
                                                }`}
                                            onClick={() => setCurrentImageIndex(index)}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                 {/* Video Section */}
                <section className="w-full bg-white">
                    <div className="w-full">
                        {!isVideoPlaying ? (
                            // Simple image display before video is played
                            <div className="w-full cursor-pointer" onClick={toggleVideo}>
                                <div className="relative w-full" style={{ paddingBottom: '25%' }}>
                                    <img 
                                        src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1920&h=1080&fit=crop" 
                                        alt="FurniStore Craftsmanship"
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Button
                                            size="lg"
                                            className="bg-black hover:bg-gray-800 rounded-full w-20 h-20 flex items-center justify-center"
                                        >
                                            <Play className="h-8 w-8 ml-1 text-white" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            // Full width video player when playing with minimal controls
                            <div className="w-full relative">
                                <video 
                                    ref={videoRef}
                                    className="w-full h-auto custom-video-player"
                                    controls={false}
                                    autoPlay
                                    onPlay={() => setIsVideoPlaying(true)}
                                    onPause={() => setIsVideoPlaying(false)}
                                    onEnded={() => setIsVideoPlaying(false)}
                                >
                                    <source src="/video.mp4" type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                                {/* Overlay play/pause button */}
                                <div className="absolute top-4 right-4">
                                    <Button
                                        onClick={toggleVideo}
                                        className="bg-black hover:bg-gray-800 rounded-full w-12 h-12 flex items-center justify-center"
                                    >
                                        <Pause className="h-6 w-6 text-white" />
                                    </Button>
                                </div>
                            </div>
                        )}
                        
                        
                    </div>
                </section>

                {/* Values Section with Enhanced Animation */}
                <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-gray-900 mb-6">
                                Why Choose FurniStore?
                            </h2>
                            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                                Our core values drive everything we do, ensuring you get the best furniture shopping experience.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {values.map((value, index) => (
                                <Card
                                    key={index}
                                    className="border border-gray-200 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 group bg-white/80 backdrop-blur-sm"
                                >
                                    <CardHeader className="text-center pb-4">
                                        <div className="mx-auto mb-4 p-4 bg-gray-50 rounded-full w-fit group-hover:bg-gray-100 transition-colors duration-300 transform group-hover:scale-110">
                                            {value.icon}
                                        </div>
                                        <CardTitle className="text-xl text-gray-900 group-hover:text-black transition-colors duration-300">
                                            {value.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription className="text-center text-gray-600 leading-relaxed">
                                            {value.description}
                                        </CardDescription>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Gallery Section */}
                <section className="py-20 px-4 bg-white">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-gray-900 mb-6">
                                Our Beautiful Creations
                            </h2>
                            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                                Explore some of our favorite furniture pieces that have transformed homes across the country.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="group cursor-pointer">
                                <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
                                    <img
                                        src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=400&fit=crop"
                                        alt="Modern Living Room"
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <h3 className="font-semibold">Modern Living Room</h3>
                                        <p className="text-sm">Contemporary Design</p>
                                    </div>
                                </div>
                            </div>

                            <div className="group cursor-pointer">
                                <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
                                    <img
                                        src="https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&h=400&fit=crop"
                                        alt="Elegant Bedroom"
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <h3 className="font-semibold">Elegant Bedroom</h3>
                                        <p className="text-sm">Luxury Comfort</p>
                                    </div>
                                </div>
                            </div>

                            <div className="group cursor-pointer">
                                <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
                                    <img
                                        src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop"
                                        alt="Dining Collection"
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <h3 className="font-semibold">Dining Collection</h3>
                                        <p className="text-sm">Family Gatherings</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 px-4 bg-gradient-to-r from-gray-800 to-black text-white">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-4xl font-bold mb-6">
                            Ready to Transform Your Home?
                        </h2>
                        <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
                            Discover our complete collection of premium furniture and start creating
                            the home of your dreams today.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <Button size="lg" className="bg-white text-black hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg">
                                Shop Our Collection
                            </Button>
                           
                        </div>
                    </div>
                </section>

                <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }
      `}</style>
            </div>
        </MobileLayout>
    );
};

export default FurniStoreAbout;