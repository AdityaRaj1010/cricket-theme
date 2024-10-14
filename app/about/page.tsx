import { Button } from "@/components/ui/button"
import Link from 'next/link'
import AnimatedLayout from '@/components/AnimatedLayout'

export default function AboutPage() {
  return (
    <AnimatedLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">About CricketZone</h1>
        <p className="mb-4">
          CricketZone is your ultimate destination for all things cricket. Founded in 2023, we are passionate about bringing the latest cricket news, live scores, and in-depth analysis to fans around the world.
        </p>
        <p className="mb-4">
          Our team of dedicated cricket enthusiasts works tirelessly to ensure that you have access to the most up-to-date information on matches, players, and tournaments across all formats of the game.
        </p>
        <p className="mb-6">
          Whether you are a casual fan or a die-hard cricket aficionado, CricketZone is your go-to source for everything cricket-related. Join our community and stay connected with the sport you love!
        </p>
        <Link href="/">
          <Button className="match-card">Back to Home</Button>
        </Link>
      </div>
    </AnimatedLayout>
  )
}
