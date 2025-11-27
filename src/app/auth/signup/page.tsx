"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    apartmentNumber: "",
    tower: "A",
    phoneNumber: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          apartmentNumber: formData.apartmentNumber,
          tower: formData.tower,
          phoneNumber: formData.phoneNumber,
        }),
      });

      if (response.ok) {
        router.push("/auth/signin?message=Registration successful! Please sign in.");
      } else {
        const data = await response.json();
        setError(data.error || "Registration failed");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatApartmentNumber = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    
    // Format as NN.NNN
    if (digits.length >= 3) {
      return digits.slice(0, 2) + '.' + digits.slice(2, 5);
    } else if (digits.length >= 2) {
      return digits.slice(0, 2) + '.';
    }
    return digits;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    let value = e.target.value;
    
    // Format apartment number input
    if (e.target.name === 'apartmentNumber') {
      value = formatApartmentNumber(value);
    }
    
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8 w-full max-w-2xl shadow-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-stone-800 dark:text-stone-200 mb-2">Join Vulcano Towers</h1>
          <p className="text-stone-600 dark:text-stone-400">Register for the community portal</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-stone-800 dark:text-stone-200 mb-2">
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-stone-800 dark:text-stone-200 placeholder-stone-400 dark:placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="John"
              />
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-stone-800 dark:text-stone-200 mb-2">
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-stone-800 dark:text-stone-200 placeholder-stone-400 dark:placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="Doe"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-stone-800 dark:text-stone-200 mb-2">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-stone-800 dark:text-stone-200 placeholder-stone-400 dark:placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              placeholder="john.doe@example.com"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="apartmentNumber" className="block text-sm font-medium text-stone-800 dark:text-stone-200 mb-2">
                Apartment Number (Floor.Flat)
              </label>
              <input
                id="apartmentNumber"
                name="apartmentNumber"
                type="text"
                value={formData.apartmentNumber}
                onChange={handleInputChange}
                required
                pattern="^\d{2}\.\d{3}$"
                placeholder="12.345"
                maxLength={6}
                className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-stone-800 dark:text-stone-200 placeholder-stone-400 dark:placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="tower" className="block text-sm font-medium text-stone-800 dark:text-stone-200 mb-2">
                Tower
              </label>
              <select
                id="tower"
                name="tower"
                value={formData.tower}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              >
                <option value="A">Tower A</option>
                <option value="B">Tower B</option>
                <option value="C">Tower C</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-stone-800 dark:text-stone-200 mb-2">
              Phone Number (Optional)
            </label>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-stone-800 dark:text-stone-200 placeholder-stone-400 dark:placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              placeholder="+41 78 123 45 67"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-stone-800 dark:text-stone-200 mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-stone-800 dark:text-stone-200 placeholder-stone-400 dark:placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="Create a secure password"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-stone-800 dark:text-stone-200 mb-2">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-stone-800 dark:text-stone-200 placeholder-stone-400 dark:placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="Confirm your password"
              />
            </div>
          </div>

          {error && (
            <div className="text-red-400 text-sm text-center">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-600 hover:bg-yellow-700 dark:bg-yellow-500 dark:hover:bg-yellow-600 disabled:bg-yellow-800 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-stone-600 dark:text-stone-400">
            Already have an account?{" "}
            <Link href="/auth/signin" className="text-yellow-600 dark:text-yellow-500 hover:text-yellow-700 dark:hover:text-yellow-400">
              Sign in here
            </Link>
          </p>
          <Link href="/" className="text-stone-500 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-400 text-sm">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}