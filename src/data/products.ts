import type { ProductCategory } from '@/types/product';

export const productCategories: ProductCategory[] = [
  {
    id: 'gloves',
    iconSlug: 'gloves',
    title: 'Gloves',
    slug: 'gloves',
    description:
      'Examination and surgical gloves in latex, nitrile, and vinyl.',
    longDescription:
      'Full range of medical gloves including latex, nitrile, and vinyl options. Available in examination and sterile surgical grades, powdered or powder-free, for all clinical settings.',
    color: 'bg-accent/10 text-accent',
    products: [
      {
        id: 'latex-exam-gloves-powdered',
        name: 'Powdered Latex Exam Gloves',
        description:
          'Ambidextrous latex gloves with cornstarch powder for easy donning.',
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
        name: 'Powder Free Latex Exam Gloves',
        description:
          'Powder-free latex gloves for users with powder sensitivity.',
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
        id: 'surgical-gloves-latex-powder-free',
        name: 'Powder Free Latex Surgical Gloves Sterile',
        description:
          'Powder-free sterile latex surgical gloves with low protein content.',
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
        id: 'nitrile-exam-gloves-powder-free',
        name: 'Powder-Free Nitrile Exam Gloves',
        description:
          'Latex-free nitrile gloves offering superior chemical and puncture resistance.',
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
        id: 'nitrile-exam-gloves-powdered',
        name: 'Powdered Nitrile Exam Gloves',
        description:
          'Nitrile exam gloves with light powder coating for easy donning. Latex-free alternative.',
        specifications: [
          'Synthetic nitrile rubber (latex-free)',
          'Lightly powdered for easy donning',
          'Ambidextrous design',
          'Textured fingertips',
          'Good puncture and chemical resistance',
          'Single-use, non-sterile',
        ],
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
      },
      {
        id: 'vinyl-exam-gloves-powder-free',
        name: 'Powder-Free Vinyl Exam Gloves',
        description:
          'Economical vinyl gloves for low-risk, short-duration tasks. Latex-free.',
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
        id: 'surgical-gloves-nitrile-powder-free',
        name: 'Powder-Free Nitrile Surgical Gloves',
        description:
          'Latex-free nitrile surgical gloves with excellent chemical resistance.',
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
        id: 'high-risk-examination-gloves',
        name: 'High Risk Examination Gloves',
        description:
          'Extra-thick examination gloves designed for high-risk environments. Enhanced protection against chemicals and pathogens.',
        specifications: [
          'Latex or nitrile material',
          'Extra thickness (≥0.2mm)',
          'Extended cuff for forearm protection',
          'Powder-free',
          'Textured surface for secure grip',
          'Single-use, non-sterile',
        ],
        sizes: ['S', 'M', 'L', 'XL'],
      },
    ],
  },
  {
    id: 'infection-prevention-ppe',
    iconSlug: 'infection-prevention-ppe',
    title: 'Infection Prevention & PPE',
    slug: 'infection-prevention-ppe',
    description:
      'Gowns, caps, masks, and protective equipment for infection control.',
    longDescription:
      'Comprehensive personal protective equipment for healthcare workers. Includes surgical gowns, isolation gowns, caps, masks, face shields, and shoe covers to maintain sterile environments and prevent cross-contamination.',
    color: 'bg-primary/10 text-primary',
    products: [
      {
        id: 'bouffant-cap',
        name: 'Bouffant Cap',
        description:
          'Non-woven disposable bouffant cap for hair coverage in clinical settings.',
        specifications: [
          'Non-woven polypropylene',
          'Elastic band for secure fit',
          'Latex-free',
          'Lightweight and breathable',
          'Single-use, non-sterile',
        ],
      },
      {
        id: 'cpe-examination-gown',
        name: 'CPE Examination Gown',
        description:
          'Disposable CPE gown providing fluid-resistant barrier protection during examinations.',
        specifications: [
          'Cast polyethylene (CPE) material',
          'Fluid-resistant',
          'Thumb loops for secure fit',
          'Open back design',
          'Lightweight and comfortable',
          'Single-use, non-sterile',
        ],
        sizes: ['One size fits all'],
      },
      {
        id: 'surgical-gown',
        name: 'Surgical Gown',
        description:
          'Protective surgical gown with reinforced zones for maximum protection during procedures.',
        specifications: [
          'SMS or spunlace non-woven material',
          'Fluid-resistant',
          'Reinforced sleeves and chest area',
          'Tie closures at neck and waist',
          'Sterile, single-use',
        ],
        sizes: ['M', 'L', 'XL', 'XXL'],
      },
      {
        id: 'isolation-gown',
        name: 'Isolation Gown',
        description:
          'Disposable isolation gown for protection during patient care and contact precautions.',
        specifications: [
          'Non-woven polypropylene or SMS material',
          'Fluid-resistant',
          'Full coverage with knitted cuffs',
          'Tie-back closure',
          'AAMI Level 1-3 protection',
          'Single-use, non-sterile',
        ],
        sizes: ['M', 'L', 'XL', 'XXL'],
      },
      {
        id: 'scrubs',
        name: 'Scrubs',
        description:
          'Disposable or reusable scrub sets for healthcare staff. Comfortable V-neck top and drawstring pants.',
        specifications: [
          'Non-woven SMS or woven cotton blend',
          'V-neck top with chest pocket',
          'Drawstring waist pants',
          'Breathable and comfortable',
          'Available in disposable or reusable options',
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      },
      {
        id: 'face-shield',
        name: 'Face Shield',
        description:
          'Full-face protective shield with anti-fog coating. Adjustable headband, reusable.',
        specifications: [
          'Clear PET or polycarbonate visor',
          'Full-face coverage (chin to forehead)',
          'Anti-fog coating',
          'Adjustable foam headband',
          'Reusable (cleanable and disinfectable)',
          'Lightweight and comfortable',
        ],
      },
      {
        id: 'shoe-cover',
        name: 'Shoe Cover',
        description:
          'Disposable shoe covers for contamination control in clinical areas.',
        specifications: [
          'Non-woven polypropylene or CPE',
          'Elastic ankle band',
          'Non-slip sole (optional)',
          'Universal size',
          'Single-use',
        ],
      },
      {
        id: 'surgical-cap',
        name: 'Surgical Cap',
        description:
          'Disposable surgical cap with tie-back design for secure fit during procedures.',
        specifications: [
          'Non-woven polypropylene',
          'Tie-back closure for adjustable fit',
          'Sweat-absorbent inner band',
          'Lightweight and breathable',
          'Single-use, non-sterile',
        ],
      },
      {
        id: 'disposable-mask-3ply',
        name: '3 Ply Disposable Mask',
        description:
          'Disposable 3-layer face mask with ear loops for general protection.',
        specifications: [
          '3-ply construction: spunbond, meltblown filter, soft inner layer',
          'Bacterial Filtration Efficiency (BFE) ≥ 95%',
          'Breathable and comfortable',
          'Nose clip for secure fit',
          'Ear loop design',
          'Single-use, non-sterile',
        ],
      },
      {
        id: 'surgical-mask',
        name: 'Surgical Mask',
        description:
          'Medical-grade surgical mask with high bacterial filtration efficiency for use in surgical and clinical settings.',
        specifications: [
          '3-ply construction: outer spunbond, middle meltblown filter, inner soft layer',
          'Bacterial Filtration Efficiency (BFE) ≥ 98%',
          'Fluid resistance (ASTM F1862)',
          'Breathability (Delta P) < 5 mmH2O/cm²',
          'Nose clip for secure fit',
          'Ear loops or tie-on straps',
        ],
      },
    ],
  },
  {
    id: 'bodily-waste-management',
    iconSlug: 'bodily-waste-management',
    title: 'Bodily Waste & Excreta Management',
    slug: 'bodily-waste-management',
    description:
      'Liners, bedpans, absorbent pads, and drainage systems for patient care.',
    longDescription:
      'Hygienic waste management solutions for patient care, including absorbent liners for commodes and bedpans, super absorbent pads, disposable and reusable bedpans, and urine drainage systems.',
    color: 'bg-accent/10 text-accent',
    products: [
      {
        id: 'commode-liner',
        name: 'Commode Liner with Absorbent Pad',
        description:
          'Disposable commode liner with integrated absorbent pad for hygienic waste containment.',
        specifications: [
          'Leak-proof polyethylene liner',
          'Integrated super absorbent pad',
          'Fits standard commodes',
          'Easy tie closure for disposal',
          'Single-use, non-sterile',
        ],
      },
      {
        id: 'bedpan-liner',
        name: 'Bedpan Liner with Absorbent Pad',
        description:
          'Disposable bedpan liner with absorbent core to solidify liquids and reduce odor.',
        specifications: [
          'Leak-proof polyethylene material',
          'Built-in absorbent pad',
          'Fits standard bedpans',
          'Tie closure for safe disposal',
          'Reduces odor and splash',
          'Single-use',
        ],
      },
      {
        id: 'urinal-bag-absorbent',
        name: 'Urinal Bag with Absorbent Pad',
        description:
          'Disposable urinal bag with integrated absorbent pad for spill-free use.',
        specifications: [
          'Leak-proof construction',
          'Integrated absorbent pad',
          'Wide opening for easy use',
          'Compact and portable',
          'Tie closure for disposal',
          'Single-use',
        ],
      },
      {
        id: 'vomit-bag-absorbent',
        name: 'Vomit Bag with Absorbent Pad',
        description:
          'Disposable vomit bag with absorbent lining for nausea management.',
        specifications: [
          'Leak-proof seal',
          'Integrated absorbent pad',
          'Wide mouth opening',
          'Twist-and-seal closure',
          'Compact and portable',
          'Single-use',
        ],
      },
      {
        id: 'super-absorbent-pad',
        name: 'Super Absorbent Pad',
        description:
          'High-capacity absorbent pad for fluid management in clinical settings.',
        specifications: [
          'Super absorbent polymer core',
          'Non-woven surface layer',
          'Waterproof backing',
          'High fluid retention capacity',
          'Multiple sizes available',
        ],
        sizes: ['60x90cm', '60x120cm', '80x140cm'],
      },
      {
        id: 'pp-bedpan',
        name: 'PP Bedpan',
        description:
          'Durable polypropylene bedpan for bedridden patients. Autoclavable and reusable.',
        specifications: [
          'Polypropylene (PP) material',
          'Smooth, easy-to-clean surface',
          'Contoured design for patient comfort',
          'Autoclavable',
          'Lightweight and durable',
        ],
      },
      {
        id: 'urine-drainage-bag',
        name: 'Urine Drainage Bag',
        description:
          'Sterile closed drainage bag with anti-reflux valve for catheterized patients.',
        specifications: [
          'Sterile, single-use',
          'Anti-reflux valve to prevent backflow',
          'Graduation markings for accurate measurement',
          'Drainage tap or valve',
          'Hanger for bedside attachment',
        ],
        sizes: ['2000ml (standard)', '500ml (leg bag)'],
      },
      {
        id: 'disposable-pulp-bedpan',
        name: 'Disposable Pulp Bedpan',
        description:
          'Single-use biodegradable pulp bedpan for hygienic and eco-friendly patient care.',
        specifications: [
          'Moulded pulp material (biodegradable)',
          'Single-use for maximum hygiene',
          'Lightweight and ergonomic',
          'Suitable for maceration or incineration',
          'Reduces cross-contamination risk',
        ],
      },
    ],
  },
  {
    id: 'surgical',
    iconSlug: 'surgical',
    title: 'Surgical & Procedure Packs',
    slug: 'surgical',
    description:
      'Pre-assembled sterile packs and drapes for surgical procedures.',
    longDescription:
      'Complete range of sterile surgical packs including procedure-specific kits, drapes, and warming blankets. Available in standard and custom configurations to match your facility protocols.',
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
        id: 'ophthalmology-pack',
        name: 'Ophthalmology Pack',
        description:
          'Specialized sterile pack for ophthalmic surgical procedures with eye drape and fenestration.',
        specifications: [
          '1PC Eye drape with pouch 75x75cm',
          '1PC Instrument table cover 150x200cm',
          '1PC Mayo stand cover 80x145cm',
          '2PCS Hand towel 30x40cm',
          '1PC Surgical gown L',
          '2PCS OP-tape 10x50cm',
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
        id: 'surgical-drapes',
        name: 'Surgical Drapes',
        description:
          'Individual sterile surgical drapes in various sizes for use in a wide range of procedures.',
        specifications: [
          'SMS or spunlace non-woven material',
          'Fluid-resistant barrier',
          'Adhesive or non-adhesive options',
          'Fenestrated and non-fenestrated types',
          'Sterile, single-use',
        ],
        sizes: ['75x90cm', '100x150cm', '150x200cm', '200x300cm'],
      },
      {
        id: 'skin-traction-kit',
        name: 'Skin Traction Kit',
        description:
          'Complete kit for applying skin traction to lower extremities.',
        specifications: [
          'Foam-backed traction strips',
          'Spreader bar',
          'Rope and pulley system',
          'Weight bag',
          'Instructions for use',
        ],
      },
      {
        id: 'warming-blanket',
        name: 'Warming Blanket',
        description:
          'Disposable warming blanket compatible with warm air units. For full body temperature management in clinical settings.',
        specifications: [
          'Compatible with standard warm air units',
          'Multiple air distribution ports',
          'Non-woven breathable material',
          'Sterile, single-use',
          'Full body coverage (125x227cm)',
        ],
      },
    ],
  },
  {
    id: 'wound-care',
    iconSlug: 'wound-care',
    title: 'Wound Care & Dressing',
    slug: 'wound-care',
    description:
      'Dressings, swabs, drainage systems, and wound closure products.',
    longDescription:
      'Comprehensive wound care solutions including hydrocolloid and foam dressings, gauze swabs, wound drainage systems, and adhesive bandages. Designed for optimal healing and infection prevention.',
    color: 'bg-accent/10 text-accent',
    products: [
      {
        id: 'hydrocolloid-dressing',
        name: 'Hydrocolloid Dressing',
        description:
          'Advanced wound dressing promoting moist wound healing and autolytic debridement.',
        specifications: [
          'Sterile, self-adhesive',
          'Maintains moist wound environment',
          'Waterproof outer layer',
          'Promotes autolytic debridement',
          'Reduces pain and trauma during dressing changes',
        ],
        sizes: ['5x5cm', '10x10cm', '15x15cm', '20x20cm'],
      },
      {
        id: 'foam-dressing',
        name: 'Foam Dressing',
        description:
          'Absorbent polyurethane foam dressing for moderate exudate wounds.',
        specifications: [
          'Soft polyurethane foam',
          'Absorbs and retains exudate',
          'Maintains moist wound environment',
          'Non-adherent wound contact layer',
        ],
        sizes: ['10x10cm', '15x15cm', '20x20cm'],
      },
      {
        id: 'gauze-swabs',
        name: 'Gauze Swabs',
        description:
          'Traditional cotton gauze swabs for wound care and cleaning.',
        specifications: [
          '100% cotton gauze',
          '12-ply or 16-ply',
          'X-ray detectable thread option',
          'Sterile or non-sterile',
        ],
        sizes: ['7.5x7.5cm', '10x10cm'],
      },
      {
        id: 'closed-wound-drainage-system',
        name: 'Closed Wound Drainage System (Spring)',
        description:
          'Spring-powered closed wound drainage system for post-surgical fluid collection. Maintains constant negative pressure.',
        specifications: [
          'Spring-activated vacuum mechanism',
          'Graduated collection chamber',
          'Anti-reflux valve',
          'Silicone drain tubing',
          'Sterile, single-use',
        ],
        sizes: ['100ml', '200ml', '400ml'],
      },
      {
        id: 'adhesive-bandage',
        name: 'Adhesive Bandage',
        description:
          'Elastic adhesive bandage for wound support, compression, and dressing fixation.',
        specifications: [
          'Elastic cotton/polyester blend',
          'Zinc oxide or acrylic adhesive',
          'Provides compression and support',
          'Conforms to body contours',
          'Hand-tearable',
        ],
        sizes: ['5cm x 4.5m', '7.5cm x 4.5m', '10cm x 4.5m'],
      },
      {
        id: 'adhesive-wound-plaster',
        name: 'Adhesive Wound Plaster',
        description:
          'Ready-to-use adhesive plasters for minor cuts and abrasions.',
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
    ],
  },
  {
    id: 'clinical-consumables',
    iconSlug: 'clinical-consumables',
    title: 'Clinical Consumables',
    slug: 'clinical-consumables',
    description:
      'Syringes, specimen containers, and everyday clinical supplies.',
    longDescription:
      'Essential clinical consumables for daily healthcare operations, including syringes of all types, specimen containers, blood collection needles, ECG accessories, and disposable instruments.',
    color: 'bg-primary/10 text-primary',
    products: [
      {
        id: 'insulin-syringe',
        name: 'Insulin Syringe',
        description:
          'Precision insulin syringe with ultra-fine needle for subcutaneous injection. Low dead-space design.',
        specifications: [
          'Graduated in insulin units (U-40 or U-100)',
          'Ultra-fine needle (29G-31G)',
          'Low dead-space design',
          'Clear barrel for easy reading',
          'Sterile, single-use',
        ],
        sizes: ['0.3ml', '0.5ml', '1.0ml'],
      },
      {
        id: 'o-ring-syringe',
        name: 'O-ring Syringe',
        description:
          'Luer-lock syringe with O-ring plunger for smooth operation and leak-proof seal.',
        specifications: [
          'Polypropylene barrel and plunger',
          'O-ring seal for smooth, leak-free operation',
          'Luer-lock or Luer-slip tip',
          'Clear graduated markings',
          'Sterile, single-use',
        ],
        sizes: ['1ml', '2ml', '3ml', '5ml', '10ml', '20ml', '50ml'],
      },
      {
        id: 'three-parts-syringe',
        name: 'Three Parts Syringe',
        description:
          'Standard three-part syringe (barrel, plunger, rubber gasket) for general injection and aspiration.',
        specifications: [
          'Three-component design (barrel, plunger, rubber gasket)',
          'Polypropylene barrel',
          'Natural rubber or synthetic gasket',
          'Luer-lock or Luer-slip tip',
          'Clear graduated markings',
          'Sterile, single-use',
        ],
        sizes: ['1ml', '2ml', '3ml', '5ml', '10ml', '20ml', '50ml'],
      },
      {
        id: 'two-parts-syringe',
        name: 'Two Parts Syringe',
        description:
          'Economical two-part syringe (barrel and plunger) for general-purpose use.',
        specifications: [
          'Two-component design (barrel and plunger)',
          'Polypropylene construction',
          'Luer-slip tip',
          'Clear graduated markings',
          'Lightweight and economical',
          'Sterile, single-use',
        ],
        sizes: ['2ml', '5ml', '10ml', '20ml'],
      },
      {
        id: 'specimen-container',
        name: 'Specimen Container',
        description:
          'Leak-proof specimen collection container with screw cap for urine, stool, and general samples.',
        specifications: [
          'Transparent polypropylene',
          'Screw-cap lid with leak-proof seal',
          'Graduated markings',
          'Wide mouth for easy collection',
          'Label area for patient information',
          'Sterile or non-sterile options',
        ],
        sizes: ['30ml', '60ml', '100ml', '120ml'],
      },
      {
        id: 'medicine-cup',
        name: 'Medicine Cup',
        description:
          'Graduated disposable medicine cup for accurate oral medication dosing.',
        specifications: [
          'Transparent polypropylene',
          'Graduated markings (ml and oz)',
          'Stable base design',
          'Disposable, single-use',
        ],
        sizes: ['30ml', '60ml'],
      },
      {
        id: 'tongue-depressor',
        name: 'Tongue Depressor',
        description:
          'Smooth wooden tongue depressor for oral examination. Individually wrapped.',
        specifications: [
          'Smooth birch wood',
          'Rounded edges for patient comfort',
          'Standard size: 150x18mm',
          'Non-sterile or individually wrapped sterile',
          'Single-use, disposable',
        ],
      },
      {
        id: 'safety-blood-collection-needle',
        name: 'Safety Blood Collection Needle',
        description:
          'Single-use safety needle with shield mechanism to prevent needlestick injuries.',
        specifications: [
          'Safety shield mechanism to prevent needlestick injuries',
          'Ultra-thin wall for patient comfort',
          'Compatible with standard vacuum tube holders',
          'Color-coded hub',
        ],
        sizes: ['21G', '22G', '23G'],
      },
      {
        id: 'disposable-ecg-accessories',
        name: 'Disposable ECG Accessories Adult/Child',
        description:
          'Pre-gelled disposable electrodes for ECG monitoring. Available in adult and pediatric sizes.',
        specifications: [
          'Pre-gelled for immediate use',
          'Excellent signal quality',
          'Low impedance',
          'Hypoallergenic adhesive',
          'Available in adult and pediatric sizes',
          'Round and tab configurations',
        ],
        sizes: ['Adult', 'Child'],
      },
      {
        id: 'sterile-urine-container',
        name: 'Sterile Urine Container',
        description:
          'Leak-proof sterile container with screw cap and graduated markings for urine collection.',
        specifications: [
          'Sterile, single-use',
          'Screw-cap lid with leak-proof seal',
          'Graduated markings',
          'Label area for patient information',
        ],
        sizes: ['30ml', '60ml', '100ml', '120ml'],
      },
    ],
  },
  {
    id: 'vascular-access-catheters',
    iconSlug: 'vascular-access-catheters',
    title: 'Vascular Access & Catheters',
    slug: 'vascular-access-catheters',
    description:
      'Central venous catheters, hemodialysis catheters, and Foley catheters.',
    longDescription:
      'Advanced vascular access products including central venous catheters with anti-infection coating, hemodialysis catheters, and Foley urinary catheters. Designed for patient safety and reduced infection risk.',
    color: 'bg-accent/20 text-accent-foreground',
    products: [
      {
        id: 'central-venous-catheter',
        name: 'Central Venous Catheter',
        description:
          'High-quality TPU central venous catheter with excellent radiopacity. Latex-free with soft tip for reduced vessel trauma.',
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
        name: 'Anti-Infection CVC',
        description:
          'Antimicrobial-coated catheter with rifampicin and minocycline. Reduces infection and prolongs indwelling time.',
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
        name: 'Hemodialysis Catheter',
        description:
          'High-quality TPU and silicone hemodialysis catheter. Precurved and straight options with antimicrobial customization.',
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
        id: 'foley-catheter',
        name: 'Foley Catheter',
        description:
          'Indwelling urinary catheter with inflatable balloon for bladder drainage. Available in latex and silicone.',
        specifications: [
          'Latex or 100% silicone material',
          'Inflatable retention balloon (5ml, 10ml, 30ml)',
          'Smooth, rounded tip',
          '2-way or 3-way configuration',
          'Sterile, single-use',
          'Color-coded funnel end',
        ],
        sizes: ['8Fr', '10Fr', '12Fr', '14Fr', '16Fr', '18Fr', '20Fr', '22Fr', '24Fr'],
      },
    ],
  },
  {
    id: 'airway-respiratory',
    iconSlug: 'airway-respiratory',
    title: 'Airway & Respiratory',
    slug: 'airway-respiratory',
    description:
      'Endotracheal tubes, breathing circuits, masks, and respiratory equipment.',
    longDescription:
      'Full selection of airway management and respiratory products including endotracheal tubes, suction catheters, breathing circuits, nebulizer masks, stethoscopes, and oxygen masks. Multiple sizes for pediatric to adult patients.',
    color: 'bg-secondary/10 text-secondary',
    products: [
      {
        id: 'endotracheal-tube',
        name: 'Endotracheal Tube',
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
        id: 'suction-catheter',
        name: 'Suction Catheter',
        description:
          'Disposable suction catheter with lateral eyes for effective airway secretion removal.',
        specifications: [
          'Medical-grade PVC material',
          'Smooth, rounded tip',
          'Lateral eyes for continuous suction flow',
          'Color-coded connector for size identification',
          'Sterile, single-use',
        ],
        sizes: ['6F', '8F', '10F', '12F', '14F', '16F', '18F'],
      },
      {
        id: 'breathing-circuit',
        name: 'Breathing Circuit',
        description:
          'Anesthesia breathing circuits in corrugated and smoothbore types for various clinical needs.',
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
        id: 'nebulizer-mask',
        name: 'Nebulizer Mask',
        description:
          'Disposable nebulizer mask with medication chamber for aerosolized drug delivery.',
        specifications: [
          'Transparent PVC mask',
          'Integrated nebulizer chamber (6ml capacity)',
          'Adjustable nose clip',
          'Elastic head strap',
          'Standard 22mm connector',
          'Available for adult and pediatric use',
        ],
        sizes: ['Pediatric', 'Adult'],
      },
      {
        id: 'dual-head-stethoscope',
        name: 'Dual Head Stethoscope',
        description:
          'Classic acoustic stethoscope with dual-head chest piece for clinical assessment.',
        specifications: [
          'Dual-head chest piece (diaphragm and bell)',
          'Stainless steel chest piece',
          'Latex-free tubing',
          'Comfortable ear tips',
          'Length: 27-28 inches',
        ],
      },
      {
        id: 'oxygen-mask',
        name: 'Oxygen Mask',
        description:
          'Flexible oxygen delivery mask with elastic head strap. Delivers 60-80% oxygen concentration.',
        specifications: [
          'Flexible plastic construction',
          'Elastic head strap',
          'Oxygen concentration: 60%-80%',
          'Customizable options available',
          'Available in multiple sizes',
        ],
        sizes: ['Infant', 'Child', 'Adult'],
      },
    ],
  },
  {
    id: 'surgical-instruments-sutures',
    iconSlug: 'surgical-instruments-sutures',
    title: 'Surgical Instruments & Sutures',
    slug: 'surgical-instruments-sutures',
    description:
      'Surgical blades, sutures, and electrosurgical instruments.',
    longDescription:
      'Precision surgical instruments and sutures for operative procedures. Includes disposable surgical blades, absorbable and non-absorbable sutures, and electrosurgical pencils.',
    color: 'bg-primary/10 text-primary',
    products: [
      {
        id: 'surgical-blade',
        name: 'Surgical Blade',
        description:
          'Precision stainless steel or carbon steel surgical blade. Individually foil-wrapped and sterile.',
        specifications: [
          'Stainless steel or carbon steel',
          'Ultra-sharp cutting edge',
          'Fits standard scalpel handles (#3, #4, #7)',
          'Individually foil-wrapped',
          'Sterile, single-use',
        ],
        sizes: ['#10', '#11', '#15', '#20', '#21', '#22', '#23', '#24'],
      },
      {
        id: 'absorbable-sutures',
        name: 'Absorbable Sutures',
        description:
          'Sterile absorbable surgical sutures with attached needle. Various materials and absorption profiles available.',
        specifications: [
          'Materials: Polyglycolic acid (PGA), Polyglactin 910 (Vicryl-type), Poliglecaprone (Monocryl-type)',
          'Braided or monofilament construction',
          'Absorption period: 56-180 days depending on material',
          'Pre-attached surgical needle (various profiles)',
          'Sterile, single-use',
        ],
        sizes: ['USP 2-0', 'USP 3-0', 'USP 4-0', 'USP 5-0'],
      },
      {
        id: 'disposable-electrosurgical-pencil',
        name: 'Disposable Electrosurgical Pencil',
        description:
          'Single-use electrosurgical pencil (ESU) for cutting and coagulation during surgical procedures.',
        specifications: [
          'Single-use, sterile',
          'Standard 3-pin connector (Valleylab-type)',
          'Push-button or rocker switch activation',
          'Blade or needle electrode',
          'Built-in smoke evacuation (optional)',
          'Holster included',
        ],
      },
      {
        id: 'non-absorbable-sutures',
        name: 'Non-Absorbable Sutures',
        description:
          'Sterile non-absorbable surgical sutures for permanent wound closure and tissue approximation.',
        specifications: [
          'Materials: Nylon (Polyamide), Polypropylene, Silk',
          'Monofilament or braided construction',
          'Permanent (non-absorbable)',
          'Pre-attached surgical needle (various profiles)',
          'Sterile, single-use',
        ],
        sizes: ['USP 2-0', 'USP 3-0', 'USP 4-0', 'USP 5-0', 'USP 6-0'],
      },
    ],
  },
  {
    id: 'patient-care-equipment',
    iconSlug: 'patient-care-equipment',
    title: 'Patient Care & Basic Equipment',
    slug: 'patient-care-equipment',
    description:
      'Thermometers, blood pressure monitors, wheelchairs, and mobility aids.',
    longDescription:
      'Essential patient care and basic medical equipment including diagnostic devices, monitoring instruments, wheelchairs, and mobility aids for healthcare facilities.',
    color: 'bg-accent/10 text-accent',
    products: [
      {
        id: 'digital-thermometer',
        name: 'Digital Thermometer',
        description:
          'Fast, accurate digital thermometer for oral, axillary, or rectal use.',
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
        id: 'blood-pressure-monitor',
        name: 'Blood Pressure Monitor',
        description:
          'Automatic upper arm blood pressure monitor with irregular heartbeat detection.',
        specifications: [
          'Oscillometric measurement method',
          'LCD display (SYS, DIA, Pulse)',
          'Irregular heartbeat detection',
          'Memory storage (30-90 readings)',
          'Cuff size: 22-42cm (standard adult)',
        ],
      },
      {
        id: 'aluminium-wheelchairs',
        name: 'Aluminium Wheelchairs',
        description:
          'Lightweight aluminium wheelchair with folding frame for easy transport and storage.',
        specifications: [
          'Aluminium alloy frame',
          'Foldable design for transport',
          'Padded seat and backrest',
          'Swing-away footrests',
          'Rear wheel brakes',
          'Weight capacity: 100-120kg',
        ],
        sizes: ['16 inch seat', '18 inch seat', '20 inch seat'],
      },
      {
        id: 'crutches',
        name: 'Crutches',
        description:
          'Adjustable aluminium crutches for temporary or long-term mobility support.',
        specifications: [
          'Lightweight aluminium construction',
          'Height adjustable',
          'Comfortable underarm padding',
          'Ergonomic hand grip',
          'Non-slip rubber tips',
          'Sold in pairs',
        ],
        sizes: ['Youth (4\'6"-5\'2")', 'Adult (5\'2"-5\'10")', 'Tall (5\'10"-6\'6")'],
      },
      {
        id: 'walking-aids',
        name: 'Walking Aids',
        description:
          'Adjustable walking frames and rollators for patient mobility support and rehabilitation.',
        specifications: [
          'Lightweight aluminium frame',
          'Height adjustable legs',
          'Foldable for storage',
          'Non-slip rubber ferrules',
          'Optional wheels (2-wheel or 4-wheel rollator)',
          'Weight capacity: 100-150kg',
        ],
      },
    ],
  },
];
