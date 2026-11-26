import { Hero, Welcome, Stats, Timeline } from '@/components/sections';
import {
  GolfFeature,
  MembershipPromo,
  EventsPreview,
  TestimonialsSection,
  FacilitiesGrid,
} from '@/components/home-sections';
import { SectionHeading } from '@/components/Shared';

export default function Home() {
  return (
    <>
      <Hero />
      <Welcome />
      <Stats />
      <section className="bg-white py-24">
        <div className="container-x">
          <SectionHeading label="Sports & Facilities" title="Something for Every Sportsman" />
          <p className="mx-auto mt-6 max-w-2xl text-center text-charcoal/70">
            From the golf course to the pool, the club offers eight sporting and
            social facilities for members and visitors.
          </p>
          <div className="mt-14">
            <FacilitiesGrid />
          </div>
        </div>
      </section>
      <GolfFeature />
      <Timeline />
      <MembershipPromo />
      <EventsPreview />
      <TestimonialsSection />
    </>
  );
}
