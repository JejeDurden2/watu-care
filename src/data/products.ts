import type { ProductCategory } from '@/types/product';

export const productCategories: ProductCategory[] = [
  {
    id: 'surgical',
    iconSlug: 'surgical',
    title: 'Procedure Packs & Drapes',
    slug: 'surgical',
    description:
      'Surgical drape packs, gowns, warming blankets, and procedure-specific kits.',
    longDescription:
      'Our comprehensive surgical line includes high-quality drape packs, surgical gowns, warming blankets, and customized procedure kits. Designed by Nanyang Major Medical, we specialize in disposable medical consumables with full customization options.',
    color: 'bg-primary/10 text-primary',
    products: [
      {
        id: 'basic-universal-pack',
        name: 'Basic Universal Pack',
        description:
          'Complete universal surgical pack with instrument table cover, mayo stand cover, head drape, foot drape, side drapes, hand towels, and OP-tape.',
        specifications: [
          '1PC Instrument table cover 150x200cm',
          '1PC Mayo stand cover 80x145cm',
          '1PC Head drape 150x240cm',
          '1PC Foot drape 150x180cm',
          '2PCS Side drape 75x90cm',
          '4PCS Hand towel 30x40cm',
          '1PC OP-tape 10x50cm',
        ],
      },
      {
        id: 'reinforced-universal-pack',
        name: 'Reinforced Universal Pack',
        description:
          'Universal pack with reinforced surgical gowns for enhanced protection during general surgical procedures.',
        specifications: [
          '1PC Instrument table cover 150x200cm',
          '1PC Mayo stand cover 80x145cm',
          '1PC Head drape 150x240cm',
          '1PC Foot drape 150x180cm',
          '2PCS Side drape 75x90cm',
          '4PCS Hand towel 30x40cm',
          '1PC OP-tape 10x50cm',
          '2PCS Reinforced surgical gown XL',
        ],
      },
      {
        id: 'craniotomy-pack',
        name: 'Craniotomy Pack',
        description:
          'Specialized pack for craniotomy procedures with dedicated craniotomy drape and reinforced gowns.',
        specifications: [
          '1PC Instrument table cover 150x200cm',
          '1PC Craniotomy Drape 200x300cm',
          '2PCS Side drape 100x140cm',
          '4PCS Hand towel 30x40cm',
          '1PC Mayo stand cover 80x145cm',
          '2PCS Reinforced surgical gown XL',
        ],
      },
      {
        id: 'dental-pack',
        name: 'Dental Pack',
        description:
          'Complete dental procedure pack with dental drape, tube covers, and surgical gowns.',
        specifications: [
          '1PC Dental drape 120x200cm',
          '2PCS Surgical gown L',
          '2PCS Tube cover 7x150cm',
          '2PCS Simple drape 50x75cm',
          '4PCS Hand towel 30x40cm',
          '1PC Wrapper 100x100cm',
        ],
      },
      {
        id: 'shoulder-pack',
        name: 'Shoulder Pack',
        description:
          'Dedicated shoulder surgery pack with specialized shoulder drape and suture bag.',
        specifications: [
          '1PC Shoulder drape 200x260cm',
          '1PC Mayo stand cover 80x145cm',
          '1PC Instrument table cover 150x200cm',
          '2PCS Hand towel 30x40cm',
          '1PC Suture Bag 16x30cm',
        ],
      },
      {
        id: 'laparoscopy-pack',
        name: 'Laparoscopy Pack',
        description:
          'Complete laparoscopic surgery pack with specialized drape, yankauer suction set, and lap sponges.',
        specifications: [
          '1PC Instrument table cover 150x200cm',
          '1PC Mayo stand cover 80x145cm',
          '1PC Laparoscopy drape 200x300cm',
          '2PCS Reinforced surgical gown XL',
          '4PCS Hand towel 30x40cm',
          '1SET Yankauer suction set',
          '2PCS OP-tape 10x50cm',
          '5PCS Lap sponge 30x40cm',
        ],
      },
      {
        id: 'caesarean-section-pack',
        name: 'Caesarean Section Pack',
        description:
          'Complete C-section pack with baby wrapper, bulb syringe, and umbilical cord clamp.',
        specifications: [
          '1PC Instrument table cover 150x200cm',
          '1PC Mayo stand cover 80x145cm',
          '1PC Caesarean drape 200x300cm',
          '1PC Baby wrapper 75x90cm',
          '1SET Yankauer suction set',
          '4PCS Hand towel 30x40cm',
          '2PCS Reinforced surgical gown XL',
          '1PC Bulb syringe',
          '1PC OP-tape 10x50cm',
          '1PC Umbilical cord clamp',
        ],
      },
      {
        id: 'delivery-pack',
        name: 'Delivery Pack',
        description:
          'Standard delivery pack with underbuttock drape, leggings, and essential delivery supplies.',
        specifications: [
          '1PC Instrument table cover 150x200cm',
          '1PC Underbuttock drape 86x110cm',
          '1PC Baby wrapper 75x90cm',
          '4PCS Hand towel 30x40cm',
          '2PCS Leggings 75x120cm',
          '1PC Umbilical cord clamp',
          '10PCS Gauze swabs 30x40cm',
        ],
      },
      {
        id: 'extremity-pack',
        name: 'Extremity Pack',
        description:
          'Specialized pack for extremity surgeries with extremity drape and leggings.',
        specifications: [
          '1PC Mayo stand cover 80x145cm',
          '1PC Extremity drape 200x300cm',
          '1PC Simple drape 100x150cm',
          '1PC Leggings 22x75cm',
          '1PC Suture bag 16x30cm',
          '2PCS OP-tape 10x50cm',
          '1PC Instrument table cover 150x200cm',
        ],
      },
      {
        id: 'knee-arthroscopy-pack',
        name: 'Knee Arthroscopy Pack',
        description:
          'Complete knee arthroscopy pack with dedicated drape and U split drapes for optimal access.',
        specifications: [
          '1PC Instrument table cover 150x200cm',
          '1PC Mayo stand cover 80x145cm',
          '1PC Leggings 22x75cm',
          '2PCS Reinforced surgical gown XL',
          '1PC Knee arthroscopy drape 200x300cm',
          '4PCS Hand towel 30x40cm',
          '2PCS OP-tape 10x50cm',
          '1PC Suture bag 16x30cm',
          '2PCS U split drape 150x260cm',
        ],
      },
      {
        id: 'tur-pack',
        name: 'TUR Pack',
        description:
          'Transurethral resection pack with specialized TUR drape for urological procedures.',
        specifications: [
          '1PC TUR drape 170/240x180cm',
          '2PCS Reinforced surgical gown XL',
          '4PCS Hand towel 30x40cm',
          '2PCS OP-tape 10x50cm',
          '1PC Instrument table cover 150x200cm',
        ],
      },
      {
        id: 'ent-pack',
        name: 'ENT Pack',
        description:
          'Ear, nose, and throat procedure pack with U split drape and head drape.',
        specifications: [
          '1PC Mayo stand cover 80x145cm',
          '1PC Instrument table cover 150x200cm',
          '2PCS Side drape 38x66cm',
          '2PCS Surgical gown L',
          '4PCS Hand towel 30x40cm',
          '1PC Suture bag 16x30cm',
          '1PC U split drape 200x300cm',
          '1PC Head drape 70x100cm',
          '1PC Leggings 30x120cm',
          '2PCS OP tape 10x50cm',
        ],
      },
      {
        id: 'hip-pack',
        name: 'Hip Pack',
        description:
          'Hip surgery pack with U split drape, elastic bandage, and skin marker pen.',
        specifications: [
          '1PC Instrument table cover 150x200cm',
          '1PC Mayo stand cover 80x145cm',
          '1PC Side drape 150x240cm',
          '2PCS Reinforced surgical gown XL',
          '1PC U split drape 200x260cm',
          '4PCS Hand towel 30x40cm',
          '1PC Leggings 75x120cm',
          '1PC Side drape 75x90cm',
          '2PCS OP tape 10x50cm',
          '1PC Elastic bandage 10x450cm',
          '1PC Skin marker pen',
        ],
      },
      {
        id: 'cardiovascular-pack',
        name: 'Cardiovascular Pack',
        description:
          'Cardiovascular surgery pack with large cardiovascular drape and tube cover.',
        specifications: [
          '1PC Cardiovascular drape 240x350cm',
          '1PC Tube cover 75x90cm',
          '2PCS Reinforced surgical gown XL',
          '4PCS Hand towel 30x40cm',
          '10PCS Gauze swabs 10x10cm',
          '1PC Instrument table cover 150x200cm',
        ],
      },
      {
        id: 'gynecology-pack',
        name: 'Gynecology Pack',
        description:
          'Complete gynecological procedure pack with specialized drape and gauze swabs.',
        specifications: [
          '1PC Gynecology drape 180/260x240cm',
          '1PC Side drape 75x90cm',
          '1PC Surgical gown L',
          '2PCS Hand towel 30x40cm',
          '10PCS Gauze swabs 10x10cm',
          '1PC Instrument table cover 150x200cm',
          '1PC Mayo stand cover 80x145cm',
          '1PC Side drape 150x200cm',
        ],
      },
      {
        id: 'cystoscopy-pack',
        name: 'Cystoscopy Pack',
        description:
          'Cystoscopy procedure pack with specialized drape and leggings.',
        specifications: [
          '1PC Cystoscopy drape 143/79x240cm',
          '1PC Mayo stand cover 80x145cm',
          '2PCS Leggings 75x120cm',
          '1PC Simple drape 80x120cm',
          '2PCS Hand towel 30x40cm',
          '1PC Instrument table cover 150x200cm',
        ],
      },
      {
        id: 'orthopedic-pack',
        name: 'Orthopedic Pack',
        description:
          'Complete orthopedic surgery pack with multiple U split drapes, yankauer suction, and skin marker.',
        specifications: [
          '1PC Instrument table cover 150x200cm',
          '1PC Mayo stand cover 80x145cm',
          '1PC Simple drape 135x196cm',
          '2PCS Reinforced surgical gown L',
          '1PC U split drape 38x66cm',
          '8PCS Hand towel 40x40cm',
          '1PC U split drape 137x193cm',
          '1PC U split drape 196x274cm',
          '1SET Yankauer suction set',
          '2PCS OP tape 10x50cm',
          '1PC Elastic bandage 10x450cm',
          '1PC Wrapping cloth 100x100cm',
          '1PC Skin marker pen',
          '1PC Liquid collection pouch 50x72cm',
          '1PC Leggings 22x75cm',
          '1PC Suture bag 16x30cm',
        ],
      },
      {
        id: 'care-kit',
        name: 'Care Kit',
        description:
          'Patient care kit with spunlace drape and arm holder accessories.',
        specifications: [
          '1PC Instrument table cover 100x220cm',
          '1PC Spunlace drape 90x160cm',
          '2PCS Arm holder cover 33x77cm',
          '2PCS Arm holder strap 5x82cm',
          '1PC Cap 34x38cm',
        ],
      },
      {
        id: 'welcome-pack',
        name: 'Welcome Pack',
        description:
          'Patient welcome pack with bed cover, quilt cover, pillow, patient gown, and disposable slippers.',
        specifications: [
          '1PC Bed cover with rubber bands 160x240cm',
          '1PC Quilt cover 160x200cm',
          '1PC Pillow 50x70cm',
          '1PC Patient gown 110x135cm',
          '1PC Cap',
          '1PAIR Disposable slipper',
        ],
      },
      {
        id: 'warm-air-unit',
        name: 'Warm Air Unit',
        description:
          'Medical warming unit with double CPU design, 8-speed fan, LCD display, and plasma air purification. Suitable for ICU, emergency room, operating room, and wards.',
        specifications: [
          'Color: Medical White + Gray',
          'Weight: 6KG',
          'Size: 26x32.5x32.5cm',
          'Double CPU design for heating safety',
          '8 wind speed adjustable',
          'Color LCD screen display',
          'Temperature error ≤ ±1°C',
          '5-step temperature shortcut keys',
          '8 kinds of insulation blanket compatibility',
          'High-temperature strong cut-off function',
          'G4 (EN779) grade filter cotton',
          'Plasma air purification function',
        ],
      },
      {
        id: 'full-body-blanket',
        name: 'Full Body Blanket',
        description:
          'Warming blanket suitable for ICU, emergency room, operating room, ophthalmology department, and wards.',
        specifications: [
          'Size: 125x227cm',
          'Package: 100pcs/45x40x48cm',
          'Material: 40g PP+PE, 45um PE Film, 35g SMS',
          'Suitable for full body warming',
          'Compatible with Warm Air Unit',
        ],
      },
    ],
  },
  {
    id: 'tube',
    iconSlug: 'tube',
    title: 'Tube',
    slug: 'tube',
    description:
      'Endotracheal tubes, oxygen masks, breathing circuits and respiratory equipment.',
    longDescription:
      'Our respiratory and airway management products include endotracheal tubes, oxygen masks, suction equipment, and anesthesia circuits. Designed for patient safety and ease of use in critical care settings.',
    color: 'bg-secondary/10 text-secondary',
    products: [
      {
        id: 'endotracheal-tube',
        name: 'Standard Endotracheal Tubes',
        description:
          'High-volume, low-pressure cuffed tubes with clearly marked developer line for accurate placement.',
        specifications: [
          'Medical polyurethane material',
          'Good biocompatibility',
          'Clearly marked developer line',
          'X-ray visible',
          'Normal side holes design',
        ],
        sizes: ['6.0mm', '6.5mm', '7.0mm', '7.5mm', '8.0mm', '8.5mm'],
      },
      {
        id: 'adaptive-cuff-ett',
        name: 'Adaptive-Cuff Endotracheal Tube',
        description:
          'Advanced cuff that expands and tightens with respiratory frequency, preventing ischemia of airway mucosa.',
        specifications: [
          'Adaptive cuff technology',
          'Eliminates pressure-related complications',
          'Prevents ischemia damage',
          'Proper pressure maintenance',
          'Solves leakage problems',
        ],
        sizes: ['6.0mm', '6.5mm', '7.0mm', '7.5mm'],
      },
      {
        id: 'reinforced-ett',
        name: 'Reinforced Endotracheal Tubes',
        description:
          'Wire-reinforced tubes that resist kinking while maintaining flexibility for difficult airways.',
        specifications: [
          'Wire reinforced construction',
          'Kink-resistant design',
          'Maintains flexibility',
          'Ideal for difficult airways',
          'Available with stylet',
        ],
        sizes: ['6.0mm', '6.5mm', '7.0mm', '7.5mm'],
      },
      {
        id: 'oxygen-mask',
        name: 'Oxygen Masks',
        description:
          'Flexible plastic masks with elastic head strap for oxygen delivery up to 60%-80% concentration.',
        specifications: [
          'Flexible plastic construction',
          'Elastic head strap',
          'Oxygen concentration: 60%-80%',
          'Customizable options available',
          'Available in multiple sizes',
        ],
        sizes: ['Infant', 'Child', 'Adult'],
      },
      {
        id: 'venturi-mask',
        name: 'Venturi Oxygen Masks',
        description:
          'Precision oxygen delivery using Venturi principle. Seven color connectors for accurate oxygen concentration settings.',
        specifications: [
          'Venturi principle operation',
          'Seven color-coded connectors',
          'Oxygen concentrations: 24%, 26%, 28%, 30%, 35%, 40%, 50%',
          'Accurate delivery control',
          'Available for all ages',
        ],
        sizes: ['Infant', 'Child', 'Adult'],
      },
      {
        id: 'suction-catheter',
        name: 'Suction Catheters',
        description:
          'Yankauer handle with K resin material for durability. Open end with lateral eyes for continuous suction flow.',
        specifications: [
          'K resin material construction',
          'Durable and unbreakable',
          'Open end with 4 lateral eyes',
          'Continuous suction flow',
          'Pre-operative secretion removal',
        ],
        sizes: ['6F', '8F', '10F', '12F', '14F', '16F', '18F'],
      },
      {
        id: 'laryngeal-mask',
        name: 'Silicone Laryngeal Mask Airway',
        description:
          'Medical-grade silicone LMA with colored pilot balloon. MRI compatible with silicone check valve.',
        specifications: [
          'Medical-grade silicone',
          'MRI compatible',
          'Silicone check valve',
          'Colored pilot balloon',
          'Multiple cuff colors available',
        ],
        sizes: [
          'Size 1 (0-5kg)',
          'Size 1.5 (5-10kg)',
          'Size 2 (10-20kg)',
          'Size 2.5 (20-30kg)',
          'Size 3 (30-50kg)',
          'Size 4 (50-70kg)',
          'Size 5 (70-100kg)',
        ],
      },
      {
        id: 'breathing-circuits',
        name: 'Anesthesia Breathing Circuits',
        description:
          'Wide range of circuits including corrugated, smoothbore, and extendable types for various clinical needs.',
        specifications: [
          'ISO standard interface',
          'Good elasticity and flexibility',
          'Excellent air tightness',
          'Available as complete kits',
          'Adult 22mm and Pediatric 15mm sizes',
        ],
        sizes: ['Pediatric 15mm', 'Adult 22mm'],
      },
      {
        id: 'hme-filters',
        name: 'HME & Bacterial Viral Filters',
        description:
          'Disposable filters protecting patients and staff from cross-infection. Filtration efficiency >99.99%.',
        specifications: [
          'Filtration efficiency >99.99%',
          'Prevents cross-infection',
          'Luer port available',
          'Low resistance design',
          'Reduces nosocomial infection',
        ],
      },
    ],
  },
  {
    id: 'central-venous-catheter',
    iconSlug: 'central-venous-catheter',
    title: 'Anti-Infection Central Venous Catheter',
    slug: 'central-venous-catheter',
    description:
      'Central venous catheters and hemodialysis catheters with anti-infection coating.',
    longDescription:
      'Our anti-infection central venous catheter line features advanced antimicrobial coatings that reduce infection during placement and prolong catheter indwelling time. Available in single, double, triple, and quad lumen configurations.',
    color: 'bg-accent/20 text-accent-foreground',
    products: [
      {
        id: 'disposable-cvc',
        name: 'Disposable Central Venous Catheter',
        description:
          'High-quality TPU catheters with excellent radiopacity. Latex-free with soft blue tip for reduced vessel trauma.',
        specifications: [
          'Latex-free TPU material',
          'Excellent radiopacity',
          'Soft blue tip design',
          'Transparent extension tubes',
          'Detachable clamps',
        ],
        sizes: [
          'Single-lumen (14G-20G)',
          'Double-lumen (4F-8F)',
          'Triple-lumen (5.5F-8.5F)',
          'Quad-lumen (8.5F)',
        ],
      },
      {
        id: 'anti-infection-cvc',
        name: 'Anti-Infection Central Venous Catheter Kit',
        description:
          'Antimicrobial-coated catheters with rifampicin and minocycline. Reduces infection and prolongs indwelling time.',
        specifications: [
          'Antimicrobial drug coating',
          'Rifampicin and Minocycline',
          'Internal and external surface coating',
          'Reduces infection risk',
          'Prolongs catheter indwelling time',
        ],
        sizes: [
          'Single-lumen (14G-20G)',
          'Double-lumen (4F-8F)',
          'Triple-lumen (5.5F-8.5F)',
          'Quad-lumen (8.5F)',
        ],
      },
      {
        id: 'hemodialysis-catheter',
        name: 'Disposable Hemodialysis Catheter',
        description:
          'High-quality TPU and silicone extension catheters. Precurved and straight options with antimicrobial customization available.',
        specifications: [
          'Latex-free TPU material',
          'Transparent silicone extension tube',
          'Nitinol or stainless steel guidewire',
          'Precurved and straight options',
          'Antimicrobial coating customizable',
        ],
        sizes: [
          'Single Lumen (8F)',
          'Double Lumen (6.5F-12F)',
          'Triple Lumen (11.5F-12F)',
        ],
      },
      {
        id: 'cvc-complete-kit',
        name: 'Complete CVC Kit',
        description:
          'Comprehensive kit including catheter, guidewire, tissue dilator, scalpel, syringes, drapes, and all accessories.',
        specifications: [
          'Central Venous Catheter',
          'Nitinol or Stainless Steel Guidewire',
          'Tissue Dilator & Scalpel',
          'Introducer Needle & Syringes',
          'Dressings, Drapes & Gloves',
        ],
      },
    ],
  },
  {
    id: 'dressing',
    iconSlug: 'dressing',
    title: 'Dressing & Kits',
    slug: 'dressing',
    description: 'Medical dressings, wound care kits, and adhesive solutions',
    longDescription:
      'Our comprehensive dressing and kits range includes advanced wound care solutions, from hydrocolloid and alginate dressings to complete procedure kits. Designed for optimal healing and infection prevention.',
    color: 'bg-accent/10 text-accent',
    products: [
      {
        id: 'hydrocolloid-dressing',
        name: 'Hydrocolloid Dressing',
        description:
          'Advanced wound dressing for moist wound healing environment',
        specifications: [
          'Sterile, self-adhesive',
          'Waterproof outer layer',
          'Promotes autolytic debridement',
          'Reduces pain and trauma during dressing changes',
        ],
        sizes: ['5x5cm', '10x10cm', '15x15cm', '20x20cm'],
      },
      {
        id: 'alginate-dressing',
        name: 'Alginate Dressing',
        description: 'Highly absorbent dressing for moderate to heavy exudate',
        specifications: [
          'Derived from seaweed (calcium alginate)',
          'High absorbency capacity',
          'Forms gel on contact with wound exudate',
          'Hemostatic properties',
        ],
        sizes: ['5x5cm', '10x10cm', '10x20cm'],
      },
      {
        id: 'transparent-film-dressing',
        name: 'Transparent Film Dressing',
        description:
          'Breathable, waterproof film for IV sites and minor wounds',
        specifications: [
          'Semi-permeable polyurethane film',
          'Waterproof and bacteria-proof',
          'Allows oxygen and moisture vapor transmission',
          'Transparent for wound observation',
        ],
        sizes: ['6x7cm', '10x12cm', '15x20cm'],
      },
      {
        id: 'foam-dressing',
        name: 'Foam Dressing',
        description: 'Absorbent polyurethane foam for moderate exudate wounds',
        specifications: [
          'Soft polyurethane foam',
          'Absorbs and retains exudate',
          'Maintains moist wound environment',
          'Non-adherent wound contact layer',
        ],
        sizes: ['10x10cm', '15x15cm', '20x20cm'],
      },
      {
        id: 'island-dressing',
        name: 'Island Dressing',
        description:
          'Sterile adhesive dressing with central absorbent pad',
        specifications: [
          'Central non-adherent pad',
          'Adhesive border for secure fixation',
          'Breathable backing',
          'Individually wrapped and sterile',
        ],
        sizes: ['6x7cm', '9x10cm', '9x15cm', '9x25cm', '9x35cm'],
      },
      {
        id: 'non-woven-swabs',
        name: 'Non-Woven Swabs',
        description: 'Soft, absorbent swabs for wound cleaning and dressing',
        specifications: [
          'Non-woven fabric (viscose/polyester blend)',
          'High absorbency',
          'Low linting',
          'Sterile or non-sterile options',
        ],
        sizes: ['5x5cm', '7.5x7.5cm', '10x10cm'],
      },
      {
        id: 'gauze-swabs',
        name: 'Gauze Swabs',
        description: 'Traditional cotton gauze for wound care',
        specifications: [
          '100% cotton gauze',
          '12-ply or 16-ply',
          'X-ray detectable thread option',
          'Sterile or non-sterile',
        ],
        sizes: ['7.5x7.5cm', '10x10cm'],
      },
      {
        id: 'adhesive-wound-plaster',
        name: 'Adhesive Wound Plaster',
        description:
          'Ready-to-use adhesive plasters for minor cuts and abrasions',
        specifications: [
          'Hypoallergenic adhesive',
          'Non-adherent wound pad',
          'Breathable fabric or plastic backing',
          'Various shapes (strips, knuckle, fingertip)',
        ],
        sizes: [
          '72x19mm strips',
          '72x25mm strips',
          'Knuckle plasters',
          'Fingertip plasters',
        ],
      },
      {
        id: 'skin-closure-strips',
        name: 'Skin Closure Strips (Steri-Strips)',
        description:
          'Non-invasive wound closure strips for superficial lacerations',
        specifications: [
          'Reinforced adhesive strips',
          'Hypoallergenic',
          'Provides secure wound closure',
          'Reduces scarring',
        ],
        sizes: ['6x75mm', '12x100mm'],
      },
      {
        id: 'surgical-tape-paper',
        name: 'Surgical Tape - Paper',
        description:
          'Hypoallergenic paper tape for sensitive skin and general use',
        specifications: [
          'Microporous paper backing',
          'Hypoallergenic acrylic adhesive',
          'Easy to tear by hand',
          'Breathable',
        ],
        sizes: ['1.25cm x 9.1m', '2.5cm x 9.1m', '5cm x 9.1m'],
      },
      {
        id: 'surgical-tape-silk',
        name: 'Surgical Tape - Silk',
        description:
          'Strong, flexible silk tape for secure dressing fixation',
        specifications: [
          'Silk-like fabric backing',
          'High tensile strength',
          'Conformable and flexible',
          'Hand-tearable',
        ],
        sizes: ['1.25cm x 9.1m', '2.5cm x 9.1m', '5cm x 9.1m'],
      },
      {
        id: 'elastic-adhesive-bandage',
        name: 'Elastic Adhesive Bandage',
        description: 'Elastic tape for compression and support',
        specifications: [
          'Elastic cotton/polyester blend',
          'Zinc oxide adhesive',
          'Provides compression and support',
          'Conforms to body contours',
        ],
        sizes: ['5cm x 4.5m', '7.5cm x 4.5m', '10cm x 4.5m'],
      },
      {
        id: 'dressing-retention-tape',
        name: 'Dressing Retention Tape (Hypafix)',
        description: 'Wide, self-adhesive tape for securing large dressings',
        specifications: [
          'Non-woven polyester backing',
          'Hypoallergenic adhesive',
          'High wearing comfort',
          'Radiolucent',
        ],
        sizes: ['5cm x 10m', '10cm x 10m', '15cm x 10m'],
      },
      {
        id: 'tracheostomy-dressing',
        name: 'Tracheostomy Dressing',
        description: 'Pre-cut dressing for tracheostomy sites',
        specifications: [
          'Keyhole design for tube placement',
          'Non-woven, absorbent material',
          'Non-fraying edges',
          'Sterile, single-use',
        ],
        sizes: ['8x8cm'],
      },
      {
        id: 'dressing-pack-sterile',
        name: 'Sterile Dressing Pack',
        description: 'Complete sterile kit for wound dressing procedures',
        specifications: [
          'Contents: Gloves, gauze swabs, non-woven swabs, disposal bag',
          'Optional: Sterile drape, forceps, gallipot',
          'Individually wrapped and sterile',
          'Ready-to-use',
        ],
      },
    ],
  },
  {
    id: 'laboratory-supplies',
    iconSlug: 'laboratory-supplies',
    title: 'Laboratory Supplies',
    slug: 'laboratory-supplies',
    description: 'Specimen collection and laboratory testing supplies',
    longDescription:
      'Our laboratory supplies range covers all essential specimen collection and testing needs, from blood collection systems to urine containers and culture swabs. Ensuring accuracy and safety in diagnostic procedures.',
    color: 'bg-primary/10 text-primary',
    products: [
      {
        id: 'blood-collection-tube-edta',
        name: 'Blood Collection Tube - EDTA (Purple Cap)',
        description:
          'Vacuum tube with EDTA anticoagulant for hematology testing',
        specifications: [
          'K2EDTA or K3EDTA anticoagulant',
          'Sterile, evacuated tube',
          'Purple cap for identification',
          'ISO 13485 certified',
        ],
        sizes: ['2ml', '3ml', '4ml', '5ml', '6ml'],
      },
      {
        id: 'blood-collection-tube-serum',
        name: 'Blood Collection Tube - Plain/Serum (Red Cap)',
        description:
          'Vacuum tube for serum collection (chemistry, serology)',
        specifications: [
          'No additives (plain) or clot activator',
          'Sterile, evacuated tube',
          'Red cap for identification',
          'Clear or gel separator options',
        ],
        sizes: ['2ml', '3ml', '4ml', '5ml', '6ml', '10ml'],
      },
      {
        id: 'blood-collection-tube-sodium-citrate',
        name: 'Blood Collection Tube - Sodium Citrate (Blue Cap)',
        description: 'Vacuum tube for coagulation testing (PT, APTT)',
        specifications: [
          '3.2% or 3.8% sodium citrate',
          'Sterile, evacuated tube',
          'Blue cap for identification',
          'Precise blood-to-anticoagulant ratio (9:1)',
        ],
        sizes: ['1.8ml', '2.7ml', '4.5ml'],
      },
      {
        id: 'blood-collection-tube-fluoride',
        name: 'Blood Collection Tube - Sodium Fluoride (Gray Cap)',
        description:
          'Vacuum tube with glycolysis inhibitor for glucose testing',
        specifications: [
          'Sodium fluoride + potassium oxalate',
          'Prevents glycolysis',
          'Sterile, evacuated tube',
          'Gray cap for identification',
        ],
        sizes: ['2ml', '3ml', '4ml', '5ml'],
      },
      {
        id: 'safety-blood-collection-needle',
        name: 'Safety Blood Collection Needle',
        description:
          'Single-use safety needle for vacuum tube blood collection',
        specifications: [
          'Safety shield mechanism to prevent needlestick injuries',
          'Ultra-thin wall for patient comfort',
          'Compatible with standard vacuum tube holders',
          'Color-coded hub',
        ],
        sizes: ['21G', '22G', '23G'],
      },
      {
        id: 'urine-container-sterile',
        name: 'Sterile Urine Container',
        description:
          'Leak-proof container for urine specimen collection',
        specifications: [
          'Sterile, single-use',
          'Screw-cap lid with leak-proof seal',
          'Graduated markings',
          'Label area for patient information',
        ],
        sizes: ['30ml', '60ml', '100ml', '120ml'],
      },
      {
        id: 'stool-container',
        name: 'Stool Specimen Container',
        description:
          'Container with integrated spoon for fecal specimen collection',
        specifications: [
          'Screw-cap lid with attached spoon',
          'Leak-proof design',
          'Wide mouth for easy collection',
          'Label area',
        ],
        sizes: ['30ml', '60ml'],
      },
      {
        id: 'transport-swab-viral',
        name: 'Viral Transport Swab (VTM)',
        description:
          'Flocked swab with viral transport medium for virus detection',
        specifications: [
          'Nylon flocked swab tip',
          'Viral transport medium (VTM) preserves viral integrity',
          'Breakpoint shaft for secure closure',
          'Sterile, individually wrapped',
        ],
      },
      {
        id: 'culture-swab-bacterial',
        name: 'Bacterial Culture Swab (Amies or Stuart Medium)',
        description:
          'Swab with transport medium for bacterial culture',
        specifications: [
          'Rayon or cotton swab tip',
          'Amies or Stuart transport medium',
          'Maintains bacterial viability during transport',
          'Sterile, individually wrapped',
        ],
      },
    ],
  },
  {
    id: 'veterinary-products',
    iconSlug: 'veterinary-products',
    title: 'Veterinary Products',
    slug: 'veterinary-products',
    description:
      'Specialized medical supplies for veterinary care and animal health',
    longDescription:
      'Our veterinary product line provides high-quality medical supplies specifically designed for animal healthcare, from surgical drapes to endotracheal tubes and IV catheters. Trusted by veterinary professionals across the region.',
    color: 'bg-accent/10 text-accent',
    products: [
      {
        id: 'vet-surgical-drape-pack',
        name: 'Veterinary Surgical Drape Pack',
        description:
          'Sterile drape pack for veterinary surgical procedures',
        specifications: [
          'Includes: Table cover, instrument cover, surgical drapes',
          'SMS or spunlace non-woven material',
          'Fluid-resistant',
          'Sterile, single-use',
        ],
      },
      {
        id: 'vet-endotracheal-tube',
        name: 'Veterinary Endotracheal Tube',
        description:
          'Cuffed or uncuffed tubes for animal airway management',
        specifications: [
          'Medical-grade PVC',
          'Clear tube for visual confirmation',
          'Murphy eye for ventilation safety',
          'Inflatable cuff with pilot balloon (cuffed versions)',
        ],
        sizes: [
          '2.0mm',
          '2.5mm',
          '3.0mm',
          '4.0mm',
          '5.0mm',
          '6.0mm',
          '7.0mm',
          '8.0mm',
          '10.0mm',
          '12.0mm',
        ],
      },
      {
        id: 'vet-iv-catheter',
        name: 'Veterinary IV Catheter',
        description:
          'Peripheral IV catheter designed for animal use',
        specifications: [
          'PTFE or FEP catheter material',
          'Color-coded hub for size identification',
          'Ultra-sharp needle for easy insertion',
          'Injection port',
        ],
        sizes: ['18G', '20G', '22G', '24G'],
      },
      {
        id: 'vet-feeding-tube',
        name: 'Veterinary Feeding Tube',
        description:
          'Nasogastric or orogastric feeding tube for animals',
        specifications: [
          'Medical-grade PVC or silicone',
          'Smooth, atraumatic tip',
          'Radiopaque line for X-ray visibility',
          'Graduated markings',
        ],
        sizes: ['5Fr', '8Fr', '10Fr', '12Fr', '14Fr', '16Fr'],
      },
      {
        id: 'vet-urinary-catheter',
        name: 'Veterinary Urinary Catheter',
        description:
          'Sterile catheter for urinary drainage in animals',
        specifications: [
          'Medical-grade PVC or silicone',
          'Smooth, rounded tip',
          'Dual drainage eyes',
          'Sterile, single-use',
        ],
        sizes: ['3.5Fr', '5Fr', '6Fr', '8Fr', '10Fr'],
      },
      {
        id: 'vet-surgical-gloves',
        name: 'Veterinary Surgical Gloves',
        description:
          'Sterile latex or nitrile gloves for veterinary surgery',
        specifications: [
          'Latex or powder-free nitrile',
          'Fully textured or smooth',
          'Sterile, single-pair packaging',
          'Ambidextrous or anatomical shape',
        ],
        sizes: ['6.0', '6.5', '7.0', '7.5', '8.0', '8.5', '9.0'],
      },
      {
        id: 'vet-wound-dressing',
        name: 'Veterinary Wound Dressing',
        description:
          'Absorbent dressings for animal wound care',
        specifications: [
          'Non-adherent wound pad',
          'Highly absorbent',
          'Breathable backing',
          'Sterile or non-sterile options',
        ],
        sizes: ['5x5cm', '10x10cm', '10x20cm'],
      },
      {
        id: 'vet-bandage-cohesive',
        name: 'Veterinary Cohesive Bandage',
        description:
          'Self-adherent elastic bandage for animal use (does not stick to fur)',
        specifications: [
          'Non-woven elastic material',
          'Self-adherent (sticks to itself, not fur)',
          'Provides compression and support',
          'Available in various colors',
        ],
        sizes: ['5cm x 4.5m', '7.5cm x 4.5m', '10cm x 4.5m'],
      },
    ],
  },
  {
    id: 'medical-equipment',
    iconSlug: 'medical-equipment',
    title: 'Medical Equipment',
    slug: 'medical-equipment',
    description:
      'Patient monitoring, diagnostic tools, and hospital equipment',
    longDescription:
      'Our medical equipment range includes essential diagnostic and monitoring devices for healthcare facilities. From thermometers and blood pressure monitors to patient care beds and examination lights.',
    color: 'bg-primary/10 text-primary',
    products: [
      {
        id: 'digital-thermometer',
        name: 'Digital Thermometer',
        description:
          'Fast, accurate digital thermometer for oral, axillary, or rectal use',
        specifications: [
          'LCD display',
          'Measurement range: 32°C - 42°C',
          'Accuracy: ±0.1°C',
          'Audible fever alarm',
          'Memory recall of last reading',
          'Waterproof (some models)',
        ],
      },
      {
        id: 'infrared-forehead-thermometer',
        name: 'Infrared Forehead Thermometer',
        description:
          'Non-contact infrared thermometer for quick temperature screening',
        specifications: [
          'Infrared technology (non-contact)',
          'Measurement time: 1 second',
          'Measurement range: 32°C - 42.9°C',
          'LCD backlight display',
          'Fever alarm',
          'Memory storage (10-30 readings)',
        ],
      },
      {
        id: 'blood-pressure-monitor-digital',
        name: 'Digital Blood Pressure Monitor (Automatic)',
        description:
          'Automatic upper arm blood pressure monitor for home or clinical use',
        specifications: [
          'Oscillometric measurement method',
          'LCD display (SYS, DIA, Pulse)',
          'Irregular heartbeat detection',
          'Memory storage (30-90 readings)',
          'Cuff size: 22-42cm (standard adult)',
        ],
      },
      {
        id: 'pulse-oximeter-fingertip',
        name: 'Fingertip Pulse Oximeter',
        description:
          'Portable pulse oximeter for SpO2 and pulse rate monitoring',
        specifications: [
          'Measures SpO2 (oxygen saturation) and pulse rate',
          'OLED or LED display',
          'Measurement range: SpO2 70%-100%, Pulse 30-250 bpm',
          'Low battery indicator',
          'Auto power-off',
        ],
      },
      {
        id: 'stethoscope-dual-head',
        name: 'Dual Head Stethoscope',
        description:
          'Classic acoustic stethoscope with dual-head chest piece',
        specifications: [
          'Dual-head chest piece (diaphragm and bell)',
          'Stainless steel chest piece',
          'Latex-free tubing',
          'Comfortable ear tips',
          'Length: 27-28 inches',
        ],
      },
      {
        id: 'nebulizer-compressor',
        name: 'Compressor Nebulizer',
        description:
          'Electric compressor nebulizer for respiratory medication delivery',
        specifications: [
          'Compressor technology',
          'Nebulization rate: 0.2-0.5 ml/min',
          'Particle size: 0.5-10 μm MMAD',
          'Includes adult and pediatric masks, mouthpiece',
          'Quiet operation',
        ],
      },
      {
        id: 'oxygen-concentrator',
        name: 'Oxygen Concentrator (Portable or Stationary)',
        description:
          'Medical-grade oxygen concentrator for oxygen therapy',
        specifications: [
          'Oxygen concentration: 90-96%',
          'Flow rate: 1-5 LPM or 1-10 LPM',
          'Alarm for low oxygen, power failure',
          'Stationary or portable models',
          'Noise level: <45 dB',
        ],
      },
      {
        id: 'examination-light-led',
        name: 'LED Examination Light',
        description:
          'Mobile or wall-mounted LED light for medical examinations',
        specifications: [
          'LED light source (cool white, 4000-5000K)',
          'Adjustable arm and head',
          'Intensity control',
          'Shadow-free illumination',
          'Mobile base or wall-mounted',
        ],
      },
      {
        id: 'hospital-bed-manual',
        name: 'Manual Hospital Bed (2-Crank or 3-Crank)',
        description:
          'Adjustable hospital bed with manual crank system',
        specifications: [
          'Steel frame with powder-coated finish',
          '2-crank (head and foot adjustment) or 3-crank (+ height)',
          'Side rails (collapsible)',
          'Castor wheels with brakes',
          'Maximum load capacity: 180-250 kg',
          'Mattress size: 190x90cm or 200x90cm',
        ],
      },
    ],
  },
  {
    id: 'gloves',
    iconSlug: 'gloves',
    title: 'Gloves',
    slug: 'gloves',
    description:
      'Examination and surgical gloves for healthcare professionals',
    longDescription:
      'Our comprehensive gloves range includes latex, nitrile, and vinyl options for examination and surgical use. Providing optimal protection, comfort, and dexterity for healthcare workers across all clinical settings.',
    color: 'bg-accent/10 text-accent',
    products: [
      {
        id: 'latex-exam-gloves-powdered',
        name: 'Latex Examination Gloves - Powdered',
        description:
          'Ambidextrous latex gloves with cornstarch powder for easy donning',
        specifications: [
          'Natural rubber latex',
          'Lightly powdered with cornstarch',
          'Ambidextrous design',
          'Beaded cuff for added strength',
          'Textured fingertips for grip',
          'Single-use, non-sterile',
        ],
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
      },
      {
        id: 'latex-exam-gloves-powder-free',
        name: 'Latex Examination Gloves - Powder-Free',
        description:
          'Powder-free latex gloves for users with powder sensitivity',
        specifications: [
          'Natural rubber latex',
          'Powder-free (chlorinated or polymer coated)',
          'Ambidextrous design',
          'Beaded cuff',
          'Textured surface',
          'Single-use, non-sterile',
        ],
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
      },
      {
        id: 'nitrile-exam-gloves-powder-free',
        name: 'Nitrile Examination Gloves - Powder-Free',
        description:
          'Latex-free nitrile gloves offering superior chemical resistance',
        specifications: [
          'Synthetic nitrile rubber (latex-free)',
          'Powder-free',
          'Ambidextrous design',
          'Textured fingertips for excellent grip',
          'High resistance to punctures and chemicals',
          'Single-use, non-sterile',
        ],
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
      },
      {
        id: 'nitrile-exam-gloves-extended-cuff',
        name: 'Nitrile Examination Gloves - Extended Cuff',
        description:
          'Extended length nitrile gloves for added forearm protection',
        specifications: [
          'Synthetic nitrile rubber (latex-free)',
          'Powder-free',
          'Extended cuff length (30cm)',
          'Ambidextrous',
          'Textured grip',
          'Ideal for obstetrics, veterinary, and laboratory use',
        ],
        sizes: ['S', 'M', 'L', 'XL'],
      },
      {
        id: 'vinyl-exam-gloves-powder-free',
        name: 'Vinyl Examination Gloves - Powder-Free',
        description:
          'Economical vinyl gloves for low-risk, short-duration tasks',
        specifications: [
          'Polyvinyl chloride (PVC)',
          'Powder-free',
          'Latex-free (suitable for latex allergies)',
          'Ambidextrous',
          'Smooth finish',
          'Single-use, non-sterile',
        ],
        sizes: ['S', 'M', 'L', 'XL'],
      },
      {
        id: 'surgical-gloves-latex-powdered',
        name: 'Surgical Gloves - Latex, Powdered, Sterile',
        description:
          'Sterile latex surgical gloves with anatomical design',
        specifications: [
          'Natural rubber latex',
          'Lightly powdered',
          'Anatomical (left/right hand specific)',
          'Sterile, single-pair packaging',
          'Textured surface for instrument grip',
          'Micro-roughened or fully textured',
        ],
        sizes: ['5.5', '6.0', '6.5', '7.0', '7.5', '8.0', '8.5', '9.0'],
      },
      {
        id: 'surgical-gloves-latex-powder-free',
        name: 'Surgical Gloves - Latex, Powder-Free, Sterile',
        description:
          'Powder-free sterile latex surgical gloves',
        specifications: [
          'Natural rubber latex',
          'Powder-free (polymer coated)',
          'Anatomical design',
          'Sterile, single-pair packaging',
          'Textured for secure grip',
          'Low protein content for reduced allergy risk',
        ],
        sizes: ['5.5', '6.0', '6.5', '7.0', '7.5', '8.0', '8.5', '9.0'],
      },
      {
        id: 'surgical-gloves-nitrile-powder-free',
        name: 'Surgical Gloves - Nitrile, Powder-Free, Sterile',
        description:
          'Latex-free nitrile surgical gloves for sensitive users',
        specifications: [
          'Synthetic nitrile (latex-free)',
          'Powder-free',
          'Anatomical design',
          'Sterile, single-pair packaging',
          'Excellent chemical resistance',
          'Textured surface',
        ],
        sizes: ['5.5', '6.0', '6.5', '7.0', '7.5', '8.0', '8.5', '9.0'],
      },
      {
        id: 'surgical-gloves-double-gloving',
        name: 'Surgical Gloves - Double Gloving System',
        description:
          'Color-coded double gloving system for high-risk procedures',
        specifications: [
          'Outer glove: Natural or colored',
          'Inner glove: Contrasting color (e.g., green)',
          'Latex or nitrile options',
          'Sterile, paired packaging',
          'Indicator system for glove perforation detection',
        ],
        sizes: ['6.0', '6.5', '7.0', '7.5', '8.0', '8.5'],
      },
      {
        id: 'orthopedic-surgical-gloves',
        name: 'Orthopedic Surgical Gloves (Neoprene or Polyisoprene)',
        description:
          'Heavy-duty gloves for orthopedic and high-stress procedures',
        specifications: [
          'Neoprene or synthetic polyisoprene',
          'Extra thickness for puncture resistance',
          'Latex-free options available',
          'Sterile, anatomical design',
          'Enhanced durability',
        ],
        sizes: ['6.5', '7.0', '7.5', '8.0', '8.5', '9.0'],
      },
      {
        id: 'heavy-duty-utility-gloves',
        name: 'Heavy-Duty Utility Gloves (Reusable)',
        description:
          'Reusable rubber gloves for cleaning and disinfection tasks',
        specifications: [
          'Natural rubber or nitrile',
          'Textured palm and fingers for grip',
          'Extended cuff (flock-lined or unlined)',
          'Chemical-resistant',
          'Reusable (after proper cleaning)',
        ],
        sizes: ['S', 'M', 'L', 'XL'],
      },
      {
        id: 'cpe-gloves',
        name: 'CPE (Cast Polyethylene) Gloves',
        description:
          'Disposable plastic gloves for food handling and light tasks',
        specifications: [
          'Cast polyethylene (CPE)',
          'Ambidextrous',
          'Loose fit',
          'Economical',
          'Single-use, non-sterile',
        ],
        sizes: ['One size (universal)'],
      },
      {
        id: 'glove-liners-cotton',
        name: 'Glove Liners - Cotton',
        description:
          'Absorbent cotton liners to wear under gloves for comfort',
        specifications: [
          '100% cotton',
          'Absorbs moisture and perspiration',
          'Improves comfort during prolonged glove use',
          'Reusable (washable)',
        ],
        sizes: ['S', 'M', 'L'],
      },
      {
        id: 'radiation-protection-gloves',
        name: 'Radiation Protection Gloves (Lead-Free or Lead)',
        description:
          'Protective gloves for use during fluoroscopy and radiology',
        specifications: [
          'Lead-free (composite materials) or lead-lined',
          'Attenuation: 0.5mm Pb equivalent or higher',
          'Sterile or non-sterile options',
          'Flexible for dexterity',
        ],
        sizes: ['6.5', '7.0', '7.5', '8.0', '8.5'],
      },
    ],
  },
  {
    id: 'face-protection',
    iconSlug: 'face-protection',
    title: 'Face Protection',
    slug: 'face-protection',
    description: 'Surgical masks and face shields for infection control',
    longDescription:
      'Our face protection range provides essential barrier protection for healthcare workers and patients. Including surgical masks with high bacterial filtration efficiency and reusable face shields for comprehensive facial protection.',
    color: 'bg-primary/10 text-primary',
    products: [
      {
        id: 'surgical-mask-3ply',
        name: 'Surgical Face Mask - 3-Ply',
        description:
          'Disposable 3-layer surgical mask with ear loops',
        specifications: [
          '3-ply construction: outer spunbond, middle meltblown filter, inner soft layer',
          'Bacterial Filtration Efficiency (BFE) ≥ 95% or ≥ 98%',
          'Breathability (Delta P) < 5 mmH2O/cm²',
          'Fluid resistance (optional, for surgical use)',
          'Nose clip for secure fit',
          'Ear loops or tie-on straps',
        ],
        materials: [
          'Non-woven polypropylene',
          'Meltblown filter layer',
        ],
      },
      {
        id: 'face-shield-reusable',
        name: 'Face Shield - Reusable',
        description:
          'Full-face protective shield with adjustable headband',
        specifications: [
          'Clear PET or polycarbonate visor',
          'Full-face coverage (chin to forehead)',
          'Anti-fog coating',
          'Adjustable foam headband',
          'Reusable (cleanable and disinfectable)',
          'Lightweight and comfortable',
        ],
      },
    ],
  },
  {
    id: 'bodily-waste-management',
    iconSlug: 'bodily-waste-management',
    title: 'Bodily Waste Management',
    slug: 'bodily-waste-management',
    description:
      'Vomit bags, bedpans, and waste management solutions',
    longDescription:
      'Our bodily waste management products ensure hygienic and dignified patient care. From disposable emesis bags to reusable bedpans and urinals, designed for comfort and ease of use in clinical settings.',
    color: 'bg-accent/10 text-accent',
    products: [
      {
        id: 'emesis-bag-vomit-bag',
        name: 'Emesis Bag (Vomit Bag)',
        description:
          'Disposable leak-proof bag for nausea and motion sickness',
        specifications: [
          'Graduated volume markings',
          'Leak-proof seal',
          'Wide mouth opening',
          'Compact and portable',
          'Disposable, single-use',
        ],
        sizes: ['500ml', '1000ml'],
      },
      {
        id: 'bedpan-reusable',
        name: 'Bedpan - Reusable (Stainless Steel or Plastic)',
        description:
          'Durable bedpan for bedridden patients',
        specifications: [
          'Stainless steel or high-density polyethylene',
          'Smooth, easy-to-clean surface',
          'Contoured design for patient comfort',
          'Autoclavable (stainless steel) or chemical disinfectable (plastic)',
        ],
        materials: ['Stainless steel', 'High-density polyethylene (HDPE)'],
      },
      {
        id: 'urinal-bottle-reusable',
        name: 'Urinal Bottle - Reusable (Male)',
        description:
          'Graduated urinal for male patients',
        specifications: [
          'Clear or translucent plastic for volume monitoring',
          'Graduated markings',
          'Ergonomic handle',
          'Leak-proof cap',
          'Reusable (autoclavable or chemical disinfectable)',
        ],
        sizes: ['1000ml', '2000ml'],
      },
      {
        id: 'urine-bag-drainage',
        name: 'Urine Drainage Bag',
        description:
          'Sterile closed drainage bag for catheterized patients',
        specifications: [
          'Sterile, single-use',
          'Anti-reflux valve to prevent backflow',
          'Graduation markings for accurate measurement',
          'Drainage tap or valve',
          'Hanger for bedside attachment',
        ],
        sizes: ['2000ml (standard)', '500ml (leg bag)'],
      },
    ],
  },
];
