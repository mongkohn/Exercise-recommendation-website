"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DumbbellIcon as DumbellIcon, PlayCircle, TrendingUp, Users } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/60 z-10" />
        <div
          className="relative h-[600px] bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80")',
          }}
        >
          <div className="container mx-auto px-4 h-full flex items-center relative z-20">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Transform Your Life Through Exercise
              </h1>
              <p className="text-xl text-white/90 mb-8">
                Access thousands of professional workout videos, join a community of fitness enthusiasts, and achieve your health goals.
              </p>
              <div className="flex gap-4">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                  Get Started Free
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                  Browse Workouts
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 border-2">
              <PlayCircle className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Premium Content</h3>
              <p className="text-muted-foreground">
                Access high-quality workout videos from certified trainers across various fitness disciplines.
              </p>
            </Card>
            <Card className="p-6 border-2">
              <Users className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Community Support</h3>
              <p className="text-muted-foreground">
                Connect with like-minded individuals, share progress, and stay motivated together.
              </p>
            </Card>
            <Card className="p-6 border-2">
              <TrendingUp className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
              <p className="text-muted-foreground">
                Monitor your fitness journey with detailed analytics and milestone tracking.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={`/category/${category.slug}`}
                className="group relative overflow-hidden rounded-lg aspect-square"
              >
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all z-10" />
                <img
                  src={category.image}
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="relative z-20 h-full flex items-center justify-center">
                  <h3 className="text-white text-xl font-semibold">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <DumbellIcon className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Fitness Journey?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of people who have already transformed their lives through our platform.
          </p>
          <Button size="lg" className="bg-white text-primary hover:bg-white/90">
            Start Free Trial
          </Button>
        </div>
      </section>
    </div>
  );
}

const categories = [
  {
    name: "Strength Training",
    slug: "strength-training",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80",
  },
  {
    name: "Yoga",
    slug: "yoga",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80",
  },
  {
    name: "HIIT",
    slug: "hiit",
    image: "https://images.unsplash.com/photo-1434596922112-19c563067271?auto=format&fit=crop&q=80",
  },
  {
    name: "Cardio",
    slug: "cardio",
    image: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&q=80",
  },
];