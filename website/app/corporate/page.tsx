export const metadata = {
  title: "Corporate Social Responsibility | Mountain Travels Pakistan",
  description:
    "Corporate Social Responsibility at Mountain Travels Pakistan — responsible travel, community empowerment, sustainability and charity initiatives.",
}

export default function CorporatePage() {
  return (
    <section className="py-16 md:py-24 bg-trusted">
      <div className="container mx-auto px-4">
        {/* Big CSR Card */}
        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-8 md:p-14">
          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">
            Corporate Social Responsibility
          </h1>

          <p className="text-lg text-muted-foreground text-center mb-10">
            At Mountain Travels Pakistan (MTP), responsible travel is not a policy – it is how
            we have always traveled.
          </p>

          {/* Content */}
          <div className="space-y-7 text-gray-700 leading-relaxed">
            <p>
              Ghulam Ahmad, Founder of Mountain Travels Pakistan, established the company with
              a simple belief: when we travel through the mountains, we are guests in someone
              else’s home. The landscapes may be dramatic, but it is the people who give these
              regions their soul. Our responsibility is to travel thoughtfully and to leave
              every place and community better than we found it.
            </p>

            <h2 className="text-2xl font-semibold">
              Working With Local Communities
            </h2>
            <p>
              From the very beginning, MTP has worked hand in hand with local guides, porters,
              drivers and hosts — many of whom started their journeys with us decades ago.
              Over the years, several guides and porters have gone on to establish their own
              tour companies. We see this not as competition, but as a sign of shared growth
              and empowerment.
            </p>
            <p>
              By employing locally and partnering with community-run hotels and services, we
              ensure that tourism directly supports families and livelihoods. Fair wages,
              respect, safety and long-term relationships remain central to how we operate.
            </p>

            <h2 className="text-2xl font-semibold">
              Skills Development & Professional Growth
            </h2>
            <p>
              We believe in building people, not just itineraries. MTP has long invested in
              skills development, particularly for our kitchen teams. Many of our cooks have
              been professionally trained by sending them to leading hotels.
            </p>
            <p>
              Today, some of the cooks who began their careers with Mountain Travels Pakistan
              are earning their livelihoods in Europe and North America — a source of pride
              for us and their communities.
            </p>

            <h2 className="text-2xl font-semibold">
              Partnering With Our Travelers to Give Back
            </h2>
            <p>
              Together with our valued clients from Norway, including Mr. Trym Atle Sealand
              and his family, Mountain Travels Pakistan has supported and continues to help
              run a school in Marzigon, a remote and flood-affected village in the Masherbrum
              Valley.
            </p>
            <p>
              We also extend ongoing support to the SOS Village Orphanage in Rawalpindi. For
              travelers wishing to engage more deeply, we are happy to include respectful
              opportunities to contribute as part of their journey.
            </p>

            <h2 className="text-2xl font-semibold">
              Supporting Displaced Communities & Sustainable Development
            </h2>
            <p>
              Mountain Travels Pakistan has supported communities displaced during the 1971
              Pakistan–India war, now settled in Sarfaranga. With contributions from valued
              clients in the USA, MTP helped install solar-powered water pumps to encourage
              sustainable livelihoods in this challenging environment.
            </p>
            <p>
              These initiatives are not charity projects — they are long-term commitments
              rooted in dignity, sustainability and partnership.
            </p>

            <h2 className="text-2xl font-semibold">
              Caring for the Mountains
            </h2>
            <p>
              The mountains have shaped our story and protecting them is a responsibility we
              take seriously. On every journey, we follow a “leave no trace” approach,
              discourage single-use plastics and promote responsible trekking practices.
            </p>

            <h2 className="text-2xl font-semibold">
              Respecting Culture and Everyday Life
            </h2>
            <p>
              Our tours are designed to honor local traditions, cultural heritage and
              religious values while encouraging genuine interaction and cultural
              preservation.
            </p>

            <h2 className="text-2xl font-semibold">
              Traveling Responsibly and Honestly
            </h2>
            <p>
              Safety, transparency and ethical conduct guide every decision we make. Our
              long-standing presence in Pakistan’s mountain regions is built on trust earned
              over time.
            </p>

            {/* Quote */}
            <div className="border-l-4 border-orange-500 pl-6 mt-10">
              <p className="italic text-lg">
                “At Mountain Travels Pakistan, responsible travel is about connection —
                between people, cultures and nature. If our guests return home knowing their
                journey made a positive difference, we know we have traveled the right way.”
              </p>

              <p className="font-semibold mt-4">
                — Ghulam Ahmad
                <br />
                Founder, Mountain Travels Pakistan
              </p>

              <p className="text-sm text-muted-foreground">
                Traveling responsibly in Pakistan’s mountains since the 1980s
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
