import { Button } from "@/components/ui/button"
import Link from 'next/link'
import AnimatedLayout from '@/components/AnimatedLayout'

export default function TermsOfServicePage() {
  return (
    <AnimatedLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
        <p className="mb-4">
          Welcome to CricketZone. By accessing or using our website, you agree to be bound by these Terms of Service.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-4">Use of Our Services</h2>
        <p className="mb-4">
          You agree to use CricketZone only for lawful purposes and in accordance with these Terms. You are prohibited from using our website in any way that could damage, disable, overburden, or impair our servers or networks.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-4">User Accounts</h2>
        <p className="mb-4">
          When you create an account with us, you must provide accurate and complete information. You are solely responsible for the activity that occurs on your account.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-4">Intellectual Property</h2>
        <p className="mb-4">
          The content, features, and functionality of CricketZone are owned by us and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-4">Termination</h2>
        <p className="mb-6">
          We reserve the right to terminate or suspend your account and access to our services at our sole discretion, without notice, for conduct that we believe violates these Terms of Service or is harmful to other users, us, or third parties, or for any other reason.
        </p>
        <Link href="/">
          <Button className="match-card">Back to Home</Button>
        </Link>
      </div>
    </AnimatedLayout>
  )
}
