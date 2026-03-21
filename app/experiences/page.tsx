import Image from "next/image";
import { Clock, MapPin, AlertCircle, Mountain } from "lucide-react";

export const metadata = {
  title: "Experiences | The Hidden Treasure",
  description: "Discover what lies beyond. From the Kheerganga trek to hidden local trails, explore the magic of Parvati Valley.",
};

const experiences = [
  {
    title: "Kheerganga Trek (Basecamp)",
    description: "The most famous trek in the valley starts right near our property. Hike up through dense pine forests to reach the natural hot springs of Kheerganga, sacred to Lord Shiva. We provide packed lunches and can arrange reliable local guides.",
    difficulty: "Moderate",
    duration: "6-7 Hours (Round trip)",
    image: "https://images.unsplash.com/photo-1596707328670-4d437648fbc2?q=80&w=2072&auto=format&fit=crop"
  },
  {
    title: "Bunbuni Pass Trek",
    description: "A hidden gem that most tourists overlook. Experience completely untouched meadows, incredible views of the glacier, and absolute silence. This is a steeper, more challenging route without any cafes along the way. Guide strongly recommended.",
    difficulty: "Hard",
    duration: "8-9 Hours",
    image: "https://images.unsplash.com/photo-1614088921867-0c75ccacfa4f?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Kasol & Manikaran Day Trip",
    description: "Take a short hike down to Barshaini and hop on a local bus or cab to visit the bustling cafes of Kasol or the sacred hot springs and Gurudwara at Manikaran. A perfect recovery day activity.",
    difficulty: "Easy",
    duration: "Half Day",
    image: "https://images.unsplash.com/photo-1583094892415-0b0ad836cb1d?q=80&w=2070&auto=format&fit=crop"
  }
];

export default function ExperiencesPage() {
  return (
    <div className="bg-cream min-h-screen">
      
      {/* Hero */}
      <section className="bg-forest py-24 text-center px-4">
        <h1 className="font-heading text-5xl md:text-7xl text-gold mb-6">Experiences</h1>
        <p className="text-xl text-cream/80 max-w-2xl mx-auto font-light">
          Whether you want to conquer peaks or simply sit by the river, the Parvati Valley has a path for you.
        </p>
      </section>

      {/* Cards */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="space-y-16">
          {experiences.map((exp, idx) => (
            <div key={idx} className="flex flex-col lg:flex-row bg-white rounded-sm overflow-hidden shadow-lg border border-gold/10 group">
              <div className="lg:w-1/2 relative h-72 lg:h-auto">
                <Image 
                  src={exp.image}
                  alt={exp.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="lg:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <h2 className="font-heading text-4xl text-forest mb-4">{exp.title}</h2>
                <p className="text-lg text-text-muted mb-8 leading-relaxed">
                  {exp.description}
                </p>
                
                <div className="flex flex-wrap gap-6 mb-8 mt-auto">
                  <div className="flex items-center text-forest">
                    <Mountain size={20} className="text-gold mr-2" />
                    <span className="font-medium">Difficulty: </span>
                    <span className="ml-1 text-text-muted">{exp.difficulty}</span>
                  </div>
                  <div className="flex items-center text-forest">
                    <Clock size={20} className="text-gold mr-2" />
                    <span className="font-medium">Duration: </span>
                    <span className="ml-1 text-text-muted">{exp.duration}</span>
                  </div>
                </div>

                <button className="self-start text-gold hover:text-forest transition-colors font-semibold flex items-center border-b border-gold/30 hover:border-forest pb-1">
                  Ask our host to arrange <AlertCircle size={16} className="ml-2" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
