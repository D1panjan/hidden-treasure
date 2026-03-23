import Link from "next/link";
import Image from "next/image";
import { Mountain, Coffee, Trees, Flame, Map, Footprints, Star, ArrowRight } from "lucide-react";
import WeatherStrip from "@/components/WeatherStrip";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col justify-center items-center text-center px-4 bg-forest text-cream overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <Image 
            src="/images/THT_Photos/Apple_Cottage/SUM04131.jpg"
            alt="The Hidden Treasure - Apple Cottage Exterior"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/80 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <h1 className="font-heading text-6xl md:text-8xl mb-6 text-cream shadow-sm tracking-tight">
            The Hidden Treasure
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-cream/90 font-light tracking-wide">
            Kalga &middot; Parvati Valley &middot; Himachal Pradesh
          </p>
          <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
            <Link 
              href="/booking"
              className="px-8 py-4 bg-gold hover:bg-gold-light text-forest font-semibold rounded-sm transition-all transform hover:-translate-y-1 shadow-lg text-center tracking-wide"
            >
              Book a Stay
            </Link>
            <Link 
              href="/experiences"
              className="px-8 py-4 bg-transparent border border-cream/50 hover:bg-cream/10 text-cream font-semibold rounded-sm transition-all text-center tracking-wide backdrop-blur-sm"
            >
              Explore
            </Link>
          </div>
        </div>
      </section>

      {/* Weather Strip */}
      <WeatherStrip />

      {/* Features Strip */}
      <section className="py-20 bg-cream text-forest">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center">
            
            <div className="flex flex-col items-center">
              <Mountain size={40} className="text-gold mb-4" />
              <h3 className="font-heading text-xl font-medium">Mountain Views</h3>
            </div>
            <div className="flex flex-col items-center">
              <Coffee size={40} className="text-gold mb-4" />
              <h3 className="font-heading text-xl font-medium">Home Meals</h3>
            </div>
            <div className="flex flex-col items-center">
              <Trees size={40} className="text-gold mb-4" />
              <h3 className="font-heading text-xl font-medium">Forest Walks</h3>
            </div>
            <div className="flex flex-col items-center">
              <Flame size={40} className="text-gold mb-4" />
              <h3 className="font-heading text-xl font-medium">Bonfire Evenings</h3>
            </div>
            <div className="flex flex-col items-center">
              <Map size={40} className="text-gold mb-4" />
              <h3 className="font-heading text-xl font-medium">Complete Quiet</h3>
            </div>
            <div className="flex flex-col items-center">
              <Footprints size={40} className="text-gold mb-4" />
              <h3 className="font-heading text-xl font-medium">Trek Basecamp</h3>
            </div>

          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-forest-light text-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-heading text-4xl md:text-5xl text-gold mb-8">Quiet in the Apple Orchards</h2>
              <div className="space-y-6 text-lg text-cream/90 font-light leading-relaxed">
                <p>
                  Perched at an altitude of 2300m, The Hidden Treasure is a premium boutique stay tucked away in Kalga village. Far from the bustling streets of Kasol, the only sound you'll hear here is the wind moving through the Deodar trees and the distant roar of the Parvati river.
                </p>
                <p>
                  Whether you are preparing for the Kheerganga trek or simply seeking a digital detox in the mountains, our wooden rooms, warm hospitality, and pure mountain air offer an unparalleled retreat into nature.
                </p>
                <p>
                  Built by local artisans mimicking authentic Himachali architecture, every corner is designed to bring you peace. Let the mountains heal you.
                </p>
              </div>
            </div>
            <div className="h-[400px] bg-forest rounded-sm overflow-hidden shadow-xl border border-gold/20 relative">
              <iframe 
                src="https://maps.google.com/maps?q=31.9975,77.4568&z=14&output=embed"
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="The Hidden Treasure Location"
                className="absolute inset-0 grayscale contrast-125 opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-24 bg-cream text-text-main">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl text-forest mb-4">Guest Experiences</h2>
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="font-bold text-2xl">4.6</span>
              <div className="flex text-gold">
                {[1,2,3,4,5].map(i => <Star key={i} size={20} fill="currentColor" />)}
              </div>
            </div>
            <p className="text-text-muted">Based on 544 Google reviews</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-sm shadow-sm border border-gold/10 flex flex-col h-full">
              <div className="flex text-gold mb-4">
                {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="italic text-text-muted mb-6 flex-grow">
                "An incredible experience! The property is beautifully located among the apple orchards. The food felt just like home and the bonfire in the evening under the stars made our trip."
              </p>
              <h4 className="font-heading font-semibold text-lg">— Rahul M.</h4>
            </div>

            <div className="bg-white p-8 rounded-sm shadow-sm border border-gold/10 flex flex-col h-full">
              <div className="flex text-gold mb-4">
                {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="italic text-text-muted mb-6 flex-grow">
                "The perfect basecamp before our Kheerganga trek. The host guided us perfectly and even helped us arrange a guide. The wooden rooms trap the heat beautifully."
              </p>
              <h4 className="font-heading font-semibold text-lg">— Sarah J.</h4>
            </div>

            <div className="bg-white p-8 rounded-sm shadow-sm border border-gold/10 flex flex-col h-full">
              <div className="flex text-gold mb-4">
                {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="italic text-text-muted mb-6 flex-grow">
                "If you want to escape the crazy crowd of Kasol, Kalga is the place. The Hidden Treasure truly lives up to its name. Clean bathrooms, amazing view, pure peace."
              </p>
              <h4 className="font-heading font-semibold text-lg">— Amit K.</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Getting Here Strip */}
      <section className="py-20 bg-forest text-cream border-t border-forest-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl md:text-4xl text-center text-gold mb-16">The Journey Up</h2>
          
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 relative">
            
            {/* Connecting line on desktop */}
            <div className="hidden md:block absolute top-8 left-10 right-10 h-0.5 bg-forest-light z-0"></div>

            <div className="flex flex-col items-center text-center z-10 w-full md:w-1/4">
              <div className="w-16 h-16 rounded-full bg-forest border-2 border-gold flex items-center justify-center text-gold font-bold text-xl mb-6 shadow-lg shadow-black/20">1</div>
              <h4 className="font-heading text-xl mb-2">Fly to Bhuntar</h4>
              <p className="text-sm text-cream/70 font-light px-4">Or take an overnight Volvo from Delhi to Bhuntar</p>
            </div>

            <div className="flex flex-col items-center text-center z-10 w-full md:w-1/4">
              <div className="w-16 h-16 rounded-full bg-forest border-2 border-gold flex items-center justify-center text-gold font-bold text-xl mb-6 shadow-lg shadow-black/20">2</div>
              <h4 className="font-heading text-xl mb-2">Bus to Kasol/Barshaini</h4>
              <p className="text-sm text-cream/70 font-light px-4">Local HRTC bus along the Parvati valley</p>
            </div>

            <div className="flex flex-col items-center text-center z-10 w-full md:w-1/4">
              <div className="w-16 h-16 rounded-full bg-forest border-2 border-gold flex items-center justify-center text-gold font-bold text-xl mb-6 shadow-lg shadow-black/20">3</div>
              <h4 className="font-heading text-xl mb-2">Taxi to Kalga base</h4>
              <p className="text-sm text-cream/70 font-light px-4">A short 30 min cab ride past Manikaran</p>
            </div>

            <div className="flex flex-col items-center text-center z-10 w-full md:w-1/4">
              <div className="w-16 h-16 rounded-full bg-forest border-2 border-gold flex items-center justify-center text-gold font-bold text-xl mb-6 shadow-lg shadow-black/20">4</div>
              <h4 className="font-heading text-xl mb-2">Walk to Hotel</h4>
              <p className="text-sm text-cream/70 font-light px-4">A gentle 20-minute hike through the apple orchards</p>
            </div>

          </div>
          
          <div className="text-center mt-12">
            <Link href="/getting-here" className="inline-flex items-center text-gold hover:text-white transition-colors">
              Read detailed route guide <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-forest-light text-center px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-5xl md:text-6xl text-cream mb-8">Ready to disappear into the mountains?</h2>
          <p className="text-xl text-cream/80 font-light mb-12">
            Check our availability and reserve your spot in Kalga.
          </p>
          <Link 
            href="/booking"
            className="inline-block px-10 py-5 bg-gold hover:bg-gold-light text-forest font-bold text-lg rounded-sm transition-all transform hover:-translate-y-1 shadow-xl"
          >
            Book Now
          </Link>
        </div>
      </section>

    </div>
  );
}