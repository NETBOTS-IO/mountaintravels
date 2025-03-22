import Image from "next/image"
import { Shield, Leaf, Heart, Award } from "lucide-react"
import { aboutHero, aboutContent } from "@/data/aboutContent"

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center">
        <Image
          src={aboutHero.image || "/placeholder.svg"}
          alt="About Mountain Travels Pakistan"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-white text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{aboutHero.title}</h1>
          <p className="text-xl md:text-2xl">{aboutHero.subtitle}</p>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">{aboutContent.mission.title}</h2>
              <p className="text-lg text-muted-foreground">{aboutContent.mission.description}</p>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4">{aboutContent.vision.title}</h2>
              <p className="text-lg text-muted-foreground">{aboutContent.vision.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">About Our Founder</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <Image
                src="/assets/about/team/image1.jpg"
                alt="Ghulam Ahmad"
                width={600}
                height={400}
                className="rounded-lg object-cover"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Ghulam Ahmad</h3>
              <p className="text-lg mb-4">
                Ghulam Ahmad, a beacon of resilience and passion, hails from the enchanting region of Baltistan. After
                completing his education at the esteemed Government College Rawalpindi, he embarked on a journey in
                civil services in 1975. It was during his tenure, engaging with foreign tourists, that he discovered his
                true calling for the noble profession of travel and tourism.
              </p>
              <p className="text-lg mb-4">
                In the early 1980s, Ghulam Ahmad fully committed himself to the travel and tourism sector, a decision he
                never regretted. His unyielding dedication and zeal to promote tourism led him to establish Mountain
                Travels Pakistan in 1990, a company that became synonymous with professionalism and excellence.
              </p>
              <p className="text-lg">
                With expertise spanning cultural tours, trekking, climbing expeditions, and other adventure and
                ecological tourism domains, Ghulam Ahmad continues to inspire and lead in the world of tourism.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* History */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">{aboutContent.history.title}</h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-3xl mx-auto text-center">
            {aboutContent.history.description}
          </p>
          <div className="max-w-4xl mx-auto">
            {aboutContent.history.timeline.map((event, index) => (
              <div key={index} className="flex mb-8">
                <div className="flex-shrink-0 w-24 text-right mr-8">
                  <span className="text-lg font-bold text-primary">{event.year}</span>
                </div>
                <div className="flex-grow pb-8 border-l-2 border-primary pl-8 relative">
                  <div className="absolute w-4 h-4 bg-primary rounded-full -left-[9px] top-1" />
                  <p className="text-lg">{event.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      {/* <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Team</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
            {aboutContent.team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <p className="text-primary mb-2">{member.position}</p>
                <p className="text-muted-foreground">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Values */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {aboutContent.values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  {value.icon === "shield" && <Shield className="w-8 h-8 text-primary" />}
                  {value.icon === "leaf" && <Leaf className="w-8 h-8 text-primary" />}
                  {value.icon === "heart" && <Heart className="w-8 h-8 text-primary" />}
                  {value.icon === "award" && <Award className="w-8 h-8 text-primary" />}
                </div>
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

