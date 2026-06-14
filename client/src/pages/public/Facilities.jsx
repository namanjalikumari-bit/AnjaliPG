import PageTransition from '../../components/PageTransition.jsx';
import SmartImage from '../../components/SmartImage.jsx';
import { Reveal, Stagger, Item } from '../../components/Motion.jsx';
import { roomFacilities, commonArea, topServices } from '../../data/content.js';
import { IMAGES } from '../../data/galleryImages.js';

const Group = ({ title, items, cols = 'lg:grid-cols-5' }) => (
  <div className="mt-8">
    <Reveal><h2 className="mb-4 text-lg font-bold text-slate-900">{title}</h2></Reveal>
    <Stagger className={`grid grid-cols-2 gap-3 sm:grid-cols-3 ${cols}`}>
      {items.map(({ name, Icon }) => (
        <Item key={name} className="feature-tile">
          <span className="feature-icon"><Icon /></span>
          <span className="text-xs font-semibold text-slate-700">{name}</span>
        </Item>
      ))}
    </Stagger>
  </div>
);

const showcase = [IMAGES.facGym, IMAGES.facCommon, IMAGES.facLaundry, IMAGES.facSecurity, IMAGES.facKitchen, IMAGES.facHousekeeping, IMAGES.facWifi, IMAGES.facAmenities];

const Facilities = () => (
  <PageTransition>
    <section className="container-x py-14">
      <Reveal>
        <h1 className="section-title">Our Facilities</h1>
        <p className="mt-2 max-w-xl text-slate-500">Everything you need for a comfortable and convenient stay.</p>
      </Reveal>

      <Group title="Room Facilities" items={roomFacilities} cols="lg:grid-cols-5" />
      <Group title="Common Area" items={commonArea} cols="lg:grid-cols-4" />
      <Group title="Top Services" items={topServices} cols="lg:grid-cols-5" />

      <div className="mt-12">
        <Reveal><h2 className="mb-4 text-lg font-bold text-slate-900">Facilities in Pictures</h2></Reveal>
        <Stagger className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {showcase.map((img) => (
            <Item key={img.src} className="overflow-hidden rounded-2xl shadow-card">
              <SmartImage src={img.src} alt={img.alt} lightbox aspect="aspect-square" />
            </Item>
          ))}
        </Stagger>
      </div>
    </section>
  </PageTransition>
);

export default Facilities;
