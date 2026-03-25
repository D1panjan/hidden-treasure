import { AlertTriangle, Battery, Banknote, Car, Map as MapIcon } from "lucide-react";

export const metadata = {
  title: "Getting Here | The Hidden Treasure",
  description: "Find your way to our mountain retreat in Kalga, Parvati Valley. Detailed directions from Bhuntar and Kasol.",
};

export default function GettingHerePage() {
  return (
    <div className="bg-cream min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        
        <div className="text-center mb-16">
          <h1 className="font-heading text-5xl md:text-6xl text-forest mb-4">Finding Your Way</h1>
          <p className="text-xl text-text-muted max-w-2xl mx-auto">
            The journey to Kalga is part of the experience. Here is everything you need to know to reach us safely.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          
          {/* Step by Step */}
          <div>
            <h2 className="font-heading text-3xl text-forest mb-8 border-b border-gold/20 pb-4">The Route</h2>
            
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-forest before:via-forest-light before:to-transparent before:z-0">
              
              <div className="relative flex items-start group">
                <div className="h-10 w-10 rounded-full bg-forest border-4 border-cream flex items-center justify-center text-gold font-bold shadow-lg z-10 shrink-0">
                  1
                </div>
                <div className="ml-6 bg-white p-6 rounded-sm shadow-sm border border-gold/10 flex-1 transition-transform group-hover:-translate-y-1">
                  <h3 className="font-heading text-2xl text-forest mb-2">Reach Bhuntar</h3>
                  <p className="text-text-muted">Take an overnight Volvo from Delhi/Chandigarh to Bhuntar, or fly directly to Kullu-Manali Airport (KUU).</p>
                </div>
              </div>

              <div className="relative flex items-start group">
                <div className="h-10 w-10 rounded-full bg-forest border-4 border-cream flex items-center justify-center text-gold font-bold shadow-lg z-10 shrink-0">
                  2
                </div>
                <div className="ml-6 bg-white p-6 rounded-sm shadow-sm border border-gold/10 flex-1 transition-transform group-hover:-translate-y-1">
                  <h3 className="font-heading text-2xl text-forest mb-2">Bus/Cab to Barshaini</h3>
                  <p className="text-text-muted">From Bhuntar, take a local HRTC bus or hire a taxi towards Kasol, Manikaran, and finally Barshaini (the last motorable point).</p>
                </div>
              </div>

              <div className="relative flex items-start group">
                <div className="h-10 w-10 rounded-full bg-forest border-4 border-cream flex items-center justify-center text-gold font-bold shadow-lg z-10 shrink-0">
                  3
                </div>
                <div className="ml-6 bg-white p-6 rounded-sm shadow-sm border border-gold/10 flex-1 transition-transform group-hover:-translate-y-1">
                  <h3 className="font-heading text-2xl text-forest mb-2">Walk to Kalga</h3>
                  <p className="text-text-muted">From Barshaini dam, cross the bridge and take the trail going up to the left. It's a 20-30 minute moderate hike through apple orchards.</p>
                </div>
              </div>

              <div className="relative flex items-start group pb-4">
                <div className="h-10 w-10 rounded-full bg-forest border-4 border-cream flex items-center justify-center text-gold font-bold shadow-lg z-10 shrink-0">
                  <MapIcon size={16} />
                </div>
                <div className="ml-6 bg-white p-6 rounded-sm shadow-sm border border-gold/10 flex-1 transition-transform group-hover:-translate-y-1">
                  <h3 className="font-heading text-2xl text-forest mb-2">Arrive at The Villster</h3>
                  <p className="text-text-muted">Ask any local for "The Villster" or "Hidden Treasure". We are located in the center of the village.</p>
                </div>
              </div>

            </div>
          </div>

          {/* Map and Tips */}
          <div className="space-y-10">
            <div className="h-[400px] bg-forest rounded-sm overflow-hidden shadow-xl border border-gold/20 relative">
              <iframe 
                src="https://maps.google.com/maps?q=31.9975,77.4568&z=15&output=embed"
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="The Hidden Treasure Map"
                className="absolute inset-0"
              />
            </div>

            <div className="bg-forest-light text-cream p-8 rounded-sm shadow-lg border border-gold/10">
              <h3 className="font-heading text-2xl text-gold mb-6 flex items-center">
                <AlertTriangle size={24} className="mr-3" /> Important Travel Tips
              </h3>
              
              <ul className="space-y-5">
                <li className="flex items-start">
                  <Banknote size={20} className="text-gold mt-1 mr-4 shrink-0" />
                  <div>
                    <h4 className="font-bold tracking-wide">Bring Cash</h4>
                    <p className="text-cream/80 text-sm mt-1">ATMs are only available up to Kasol. Network for UPI can be unreliable in the upper village.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Battery size={20} className="text-gold mt-1 mr-4 shrink-0" />
                  <div>
                    <h4 className="font-bold tracking-wide">Power Banks</h4>
                    <p className="text-cream/80 text-sm mt-1">Mountain weather can sometimes cause extended power cuts. Keep your devices charged.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Car size={20} className="text-gold mt-1 mr-4 shrink-0" />
                  <div>
                    <h4 className="font-bold tracking-wide">Taxi Tip</h4>
                    <p className="text-cream/80 text-sm mt-1">If taking a cab from Bhuntar, ask the driver clearly to drop you at the Barshaini Dam bridge, not just Kasol.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
