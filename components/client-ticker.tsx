'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const clients = [
  { name: 'Aisa Fiber', logo: '/images/aisa-remov.webp' },
  { name: 'Aisha Steel', logo: '/images/Aisha_Steels.webp' },
  { name: 'Allied Rental', logo: '/images/alled.webp' },
  { name: 'Bhaira Town', logo: '/images/bahria-tow.webp' },
  { name: 'Dalda Food', logo: '/images/dalda.webp' },
  { name: 'Descon', logo: '/images/Descon_logo.webp' },
  { name: 'Faizan Steel', logo: '/images/faizan_steel.webp' },
  { name: 'Pakistan Air Force', logo: '/images/Pakistan_Air_Forc.webp' },
  { name: 'Pakistan Steel Mill', logo: '/images/Pakistan_Steel_Mill.webp' },
  { name: 'Pak Navy.webp', logo: '/images/paknavy.webp' },
  { name: 'People Steel Mill', logo: '/images/PSMlogo1-1.webp' },
]

export function ClientTicker() {
  return (
    <section className="py-16 bg-secondary/30 border-y border-border/50 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 mb-8">
        <motion.p
          className="text-center text-sm uppercase tracking-widest text-muted-foreground"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Trusted by Industry Leaders
        </motion.p>
      </div>

      <div className="relative">
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-secondary/30 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-secondary/30 to-transparent z-10" />

        {/* Ticker */}
        <motion.div
          className="flex gap-16 items-center"
          animate={{ x: [0, -1920] }}
          transition={{
            x: {
              duration: 30,
              repeat: Infinity,
              ease: 'linear',
            },
          }}
        >
          {[...clients, ...clients, ...clients].map((client, index) => (
            <motion.div
              key={`${client.name}-${index}`}
              className="flex-shrink-0 group cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              <div className="px-8 py-4 bg-secondary/50 rounded-lg border border-border/50 group-hover:border-primary/50 transition-all flex items-center justify-center">
                <Image
                  src={client.logo}
                  alt={client.name}
                  width={120}
                  height={48}
                  className="object-fill h-20 w-auto opacity-100 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// Old code

// 'use client'

// import { motion } from 'framer-motion'

// const clients = [
//   { name: 'Siemens', logo: '/images/siemens.png' },
//   { name: 'ABB', logo: '/images/abb.png' },
//   { name: 'Schneider Electric', logo: '/images/schneider.png' },
//   { name: 'Rockwell', logo: '/images/rockwell.png' },
//   { name: 'Honeywell', logo: '/images/honeywell.png' },
//   { name: 'Emerson', logo: '/images/emerson.png' },
//   { name: 'Mitsubishi', logo: '/images/mitsubishi.png' },
//   { name: 'Bosch', logo: '/images/bosch.png' },
//   { name: 'Delta', logo: '/images/delta.png' },
//   { name: 'Omron', logo: '/images/omron.png' },
//   { name: 'General Electric', logo: '/images/ge.png' },
//   { name: 'Fanuc', logo: '/images/fanuc.png' },
// ]


// // const clients = [
// //   'Siemens', 'ABB', 'Schneider Electric', 'Rockwell', 'Honeywell',
// //   'Emerson', 'Mitsubishi', 'Bosch', 'Delta', 'Omron',
// //   'General Electric', 'Fanuc'
// // ]

// export function ClientTicker() {
//   return (
//     <section className="py-16 bg-secondary/30 border-y border-border/50 overflow-hidden">
//       <div className="container mx-auto px-4 md:px-6 mb-8">
//         <motion.p
//           className="text-center text-sm uppercase tracking-widest text-muted-foreground"
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           viewport={{ once: true }}
//         >
//           Trusted by Industry Leaders
//         </motion.p>
//       </div>

//       <div className="relative">
//         {/* Gradient Overlays */}
//         <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-secondary/30 to-transparent z-10" />
//         <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-secondary/30 to-transparent z-10" />

//         {/* Ticker */}
//         <motion.div
//           className="flex gap-16"
//           animate={{ x: [0, -1920] }}
//           transition={{
//             x: {
//               duration: 30,
//               repeat: Infinity,
//               ease: 'linear',
//             },
//           }}
//         >
//           {[...clients, ...clients, ...clients].map((client, index) => (
//             <motion.div
//             key={`${client.name}-${index}`}
//               // key={`${client}-${index}`}
//               className="flex-shrink-0 group cursor-pointer"
//               whileHover={{ scale: 1.05 }}
//             >
//               <div className="px-8 py-4 bg-secondary/50 rounded-lg border border-border/50 group-hover:border-primary/50 transition-all">
//                  <Image
//                   src={client.logo}
//                   alt={client.name}
//                   width={120}
//                   height={48}
//                   className="object-contain h-10 w-auto opacity-60 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0"
//                   />

//                 {/* <p className="text-lg font-semibold text-muted-foreground group-hover:text-foreground transition-colors whitespace-nowrap">
//                   {client}
//                 </p> */}
//               </div>
//             </motion.div>
//           ))}
//         </motion.div>
//       </div>
//     </section>
//   )
// }
