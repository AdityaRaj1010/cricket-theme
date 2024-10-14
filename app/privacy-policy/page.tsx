import { Button } from "@/components/ui/button"
import Link from 'next/link'
import AnimatedLayout from '@/components/AnimatedLayout'

export default function PrivacyPolicyPage() {
  return (
    <AnimatedLayout>
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4">
        At CricketZone, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you use our website.
      </p>
      <h2 className="text-2xl font-semibold mt-6 mb-4">Information We Collect</h2>
      <p className="mb-4">
        We collect information you provide directly to us, such as when you create an account, subscribe to our newsletter, or contact us for support.
      </p>
      <h2 className="text-2xl font-semibold mt-6 mb-4">How We Use Your Information</h2>
      <p className="mb-4">
        We use the information we collect to provide, maintain, and improve our services, to communicate with you, and to personalize your experience on CricketZone.
      </p>
      <h2 className="text-2xl font-semibold mt-6 mb-4">Data Security</h2>
      <p className="mb-4">
        We implement appropriate technical and organizational measures to protect your personal information against unauthorized or unlawful processing, accidental loss, destruction, or damage.
      </p>
      <h2 className="text-2xl font-semibold mt-6 mb-4">Your Rights</h2>
      <p className="mb-6">
        You have the right to access, correct, or delete your personal information. If you have any questions or concerns about our Privacy Policy, please contact us.
      </p>
      <Link href="/">
        <Button className="match-card">Back to Home</Button>
      </Link>
    </div>
    </AnimatedLayout>
  )
}
