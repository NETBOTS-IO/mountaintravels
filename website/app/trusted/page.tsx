import { BASE_URL } from "@/app/Var"

async function getTips() {
  const res = await fetch(`${BASE_URL}/api/tips`, {
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error("Failed to fetch tips")
  }

  const data = await res.json()
  return data.data   // ✅ correct key
}

export default async function TrustedPage() {
  const tips = await getTips()

  return (
    <section className="py-12 md:py-20 container mx-auto px-4">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10">
      CULTURE & RESPONSIBLE TRAVEL
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {tips.map((tip: any) => (
          <div
            key={tip._id}   // ✅ only for React rendering
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold mb-3">
              {tip.title}
            </h3>

            <p className="text-gray-600 text-sm md:text-base">
              {tip.excerpt}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
