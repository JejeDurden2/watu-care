import {
  Package,
  Activity,
  Syringe,
  Bandage,
  TestTube,
  Dog,
  Bed,
  Hand,
  ShieldCheck,
  Recycle,
} from 'lucide-react';
import type { ProductCategory } from '@/types/product';

export const productCategories: ProductCategory[] = [
  {
    id: 'surgical',
    icon: Package,
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
    icon: Activity,
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
    icon: Syringe,
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
];
