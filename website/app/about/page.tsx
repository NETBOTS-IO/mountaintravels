import Image from "next/image"
import { Shield, Leaf, Heart, Award } from "lucide-react"
import { aboutHero, aboutContent } from "@/data/aboutContent"

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-primary text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent)]" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">{aboutHero.title}</h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto font-light">{aboutHero.subtitle}</p>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="p-8 rounded-2xl bg-muted/30 border border-muted-foreground/10 hover:shadow-lg transition-all duration-300">
              <h2 className="text-3xl font-bold mb-4 text-foreground flex items-center gap-2">
                <Heart className="w-8 h-8 text-primary" /> {aboutContent.mission.title}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">{aboutContent.mission.description}</p>
            </div>
            <div className="p-8 rounded-2xl bg-muted/30 border border-muted-foreground/10 hover:shadow-lg transition-all duration-300">
              <h2 className="text-3xl font-bold mb-4 text-foreground flex items-center gap-2">
                <Award className="w-8 h-8 text-primary" /> {aboutContent.vision.title}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">{aboutContent.vision.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-20 bg-muted/50 border-y border-muted-foreground/10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-foreground">Meet Our Founder</h2>
          <div className="grid md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-5 flex justify-center">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-background w-full max-w-[400px] h-[300px]">
                <Image
                  src="/assets/about/team/ghulam.jpg"
                  alt="Ghulam Ahmad"
                  fill
                  className="object-cover"
                  fallback-src="/placeholder.svg"
                />
              </div>
            </div>
            <div className="md:col-span-7 space-y-6">
              <h3 className="text-2xl font-bold text-foreground">{aboutContent.team[0].name}</h3>
              <p className="text-primary font-medium">{aboutContent.team[0].position}</p>
              <p className="text-muted-foreground text-lg leading-relaxed">{aboutContent.team[0].bio}</p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                A strong advocate of tourism as a force for international understanding, Ghulam Ahmad believes that travel has the power to transcend social, economic, and cultural boundaries and bring people closer together. His courageous leadership in 1991 during an Indus River kayaking expedition earned him formal appreciation from the Japanese Embassy after ensuring the safety of all participants.
              </p>
              <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground text-lg">
                "Travel is one of humanity's most powerful tools for building understanding, friendship, and peace across cultures and borders."
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Narrative Story (Chapters) */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold mb-12 text-center text-foreground">{aboutContent.history.title}</h2>
          <div className="space-y-12">
            {aboutContent.history.story.map((ch, idx) => (
              <div key={idx} className="space-y-4">
                <h3 className="text-2xl font-bold text-foreground border-b border-primary/20 pb-2">{ch.chapter}</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">{ch.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="py-20 bg-muted/30 border-t border-muted-foreground/10">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold mb-12 text-center text-foreground">Timeline of Our Journey</h2>
          <div className="relative border-l-2 border-primary/30 ml-4 md:ml-32 space-y-12">
            {aboutContent.history.timeline.map((event, index) => (
              <div key={index} className="relative pl-8 md:pl-12">
                <div className="absolute w-4 h-4 bg-primary rounded-full -left-[9px] top-1.5 ring-4 ring-background" />
                <div className="absolute -left-4 md:-left-32 top-0 text-lg font-bold text-primary hidden md:block w-24 text-right">
                  {event.year}
                </div>
                <div className="text-lg font-bold text-primary md:hidden mb-1">{event.year}</div>
                <p className="text-lg text-muted-foreground">{event.event}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-foreground">Our Specialists & Team</h2>
          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {aboutContent.team.map((member, index) => (
              <div key={index} className="text-center bg-muted/20 p-6 rounded-2xl border border-muted-foreground/10 hover:shadow-md transition-all duration-300">
                <div className="relative w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden border-4 border-background shadow-lg">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-foreground">{member.name}</h3>
                <p className="text-primary font-medium mb-4">{member.position}</p>
                <p className="text-muted-foreground leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-muted/30 border-t border-muted-foreground/10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-foreground">Our Core Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {aboutContent.values.map((value, index) => (
              <div key={index} className="text-center p-6 bg-background rounded-2xl border border-muted-foreground/10 hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                  {value.icon === "shield" && <Shield className="w-8 h-8 text-primary" />}
                  {value.icon === "leaf" && <Leaf className="w-8 h-8 text-primary" />}
                  {value.icon === "heart" && <Heart className="w-8 h-8 text-primary" />}
                  {value.icon === "award" && <Award className="w-8 h-8 text-primary" />}
                </div>
                <h3 className="text-xl font-bold mb-2 text-foreground">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
