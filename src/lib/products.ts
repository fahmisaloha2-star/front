export type Review = {
  id: number;
  author: string;
  date: string;
  rating: number;
  title: string;
  comment: string;
  verified: boolean;
};

export type Product = {
  id: number;
  name: string;
  category: string;
  brand: string;
  sku: string;
  price: number;
  image: string;
  gallery: string[];
  rating: number;
  reviewCount: number;
  reviews: Review[];
  inStock: boolean;
  stockQuantity: number;
  deliveryTime: string;
  weight: string;
  packageDimensions: string;
  description: string;
  longDescription: string;
  features: string[];
  specifications: Record<string, string>;
};

export const categories = [
  "Industrial Buildings",
  "Steel Structures",
  "Warehouses",
  "Roofing Systems",
  "Staircases & Railings",
  "Custom Metal Work",
  "Welding Services",
  "Installation & Maintenance",
];

export const brands = [
  "MIS Steel",
  "ArcelorMittal",
  "Tata Steel",
  "Nucor",
  "Bosch",
  "Hilti",
  "Lincoln Electric",
  "Miller",
];

const galleryPool = [
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900",
  "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=900",
  "https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=900",
  "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=900",
  "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=900",
  "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=900",
  "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=900",
  "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=900",
];

const buildGallery = (mainImage: string, indices: number[]): string[] => [
  mainImage.replace("w=600", "w=900"),
  ...indices.map((i) => galleryPool[i]),
];

const reviewTemplates: Omit<Review, "id">[] = [
  {
    author: "Ahmed Ben Salah",
    date: "2025-09-12",
    rating: 5,
    title: "Excellent quality",
    comment:
      "Top quality material, exactly as described. Delivery was fast and the team helped me unload on site. Will order again.",
    verified: true,
  },
  {
    author: "Sonia Karoui",
    date: "2025-08-28",
    rating: 5,
    title: "Very professional team",
    comment:
      "The MIS team handled everything from quote to installation. The finish is impeccable and the timeline was respected.",
    verified: true,
  },
  {
    author: "Mehdi Trabelsi",
    date: "2025-07-15",
    rating: 4,
    title: "Good value for money",
    comment:
      "Solid product overall. Took a little longer than expected to arrive but the quality justifies the wait. Recommended.",
    verified: true,
  },
  {
    author: "Fatma Jebali",
    date: "2025-06-03",
    rating: 5,
    title: "Highly recommended",
    comment:
      "We ordered for our factory expansion project. Everything matched the engineering drawings perfectly. Five stars.",
    verified: true,
  },
  {
    author: "Karim Lahmar",
    date: "2025-05-19",
    rating: 4,
    title: "Reliable supplier",
    comment:
      "Been working with MIS for two years now. Consistent quality, fair pricing and responsive support team.",
    verified: false,
  },
  {
    author: "Nadia Belaid",
    date: "2025-04-22",
    rating: 5,
    title: "Perfect installation",
    comment:
      "Crew arrived on time, worked clean and finished one day ahead of schedule. The result exceeded our expectations.",
    verified: true,
  },
  {
    author: "Youssef Hammami",
    date: "2025-03-11",
    rating: 5,
    title: "Exactly what we needed",
    comment:
      "Spec sheet matches reality 100%. Welding quality is top tier and the dimensions are bang on. Great experience.",
    verified: true,
  },
  {
    author: "Leila Mansouri",
    date: "2025-02-08",
    rating: 4,
    title: "Solid product",
    comment:
      "Sturdy construction and good finish. Minor scratches on delivery but customer service handled it immediately.",
    verified: true,
  },
];

const pickReviews = (indices: number[], idOffset: number): Review[] =>
  indices.map((i, idx) => ({ id: idOffset * 100 + idx, ...reviewTemplates[i] }));

export const products: Product[] = [
  {
    id: 1,
    name: "Structural Steel I-Beam",
    category: "Steel Structures",
    brand: "ArcelorMittal",
    sku: "MIS-IBM-S275-001",
    price: 450,
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600",
    gallery: buildGallery(
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600",
      [1, 2, 5],
    ),
    rating: 4.8,
    reviewCount: 124,
    reviews: pickReviews([0, 3, 6, 1], 1),
    inStock: true,
    stockQuantity: 48,
    deliveryTime: "3 – 5 business days",
    weight: "26.2 kg / m",
    packageDimensions: "12 m × 0.10 m × 0.20 m",
    description: "Heavy-duty structural steel I-beam for industrial frames",
    longDescription:
      "Premium hot-rolled structural steel I-beam engineered for high-load industrial frames, warehouses, and commercial buildings. Manufactured to EN 10025 standards with consistent dimensional tolerances and excellent weldability.",
    features: [
      "Hot-rolled from S275JR / S355JR structural steel",
      "Compliant with EN 10025-2 European standards",
      "Pre-treated against corrosion (optional galvanizing)",
      "Cut to length on request (up to 12 m)",
      "Suitable for welded or bolted assemblies",
    ],
    specifications: {
      Material: "Structural steel S275JR",
      Standard: "EN 10025-2",
      "Length (max)": "12 m",
      "Web height": "200 mm",
      "Flange width": "100 mm",
      "Weight per meter": "26.2 kg",
      Finish: "Mill / Galvanized (option)",
    },
  },
  {
    id: 2,
    name: "Galvanized Roofing Sheet",
    category: "Roofing Systems",
    brand: "Tata Steel",
    sku: "MIS-RFS-Z275-002",
    price: 85,
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600",
    gallery: buildGallery(
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600",
      [3, 7, 0],
    ),
    rating: 4.6,
    reviewCount: 89,
    reviews: pickReviews([2, 4, 7], 2),
    inStock: true,
    stockQuantity: 320,
    deliveryTime: "2 – 4 business days",
    weight: "4.8 kg / m²",
    packageDimensions: "6 m × 1.10 m × 0.04 m (bundle of 10)",
    description: "Corrosion-resistant metal roofing sheets",
    longDescription:
      "Hot-dip galvanized steel roofing sheets offering long-term corrosion protection for industrial and agricultural buildings. Available in trapezoidal and sinusoidal profiles.",
    features: [
      "Z275 zinc coating (275 g/m²)",
      "Trapezoidal profile for maximum rigidity",
      "Pre-painted finish available",
      "Easy overlapping installation",
      "Lifespan > 25 years in industrial environments",
    ],
    specifications: {
      Material: "Galvanized steel",
      Coating: "Z275 (275 g/m²)",
      Thickness: "0.5 mm – 1.0 mm",
      Width: "1100 mm (useful 1050 mm)",
      "Length (max)": "12 m",
      Profile: "Trapezoidal 40/250",
    },
  },
  {
    id: 3,
    name: "Industrial Welding Service",
    category: "Welding Services",
    brand: "Lincoln Electric",
    sku: "MIS-SRV-WLD-003",
    price: 320,
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600",
    gallery: buildGallery(
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600",
      [5, 2, 4],
    ),
    rating: 4.9,
    reviewCount: 56,
    reviews: pickReviews([5, 1, 6, 0], 3),
    inStock: true,
    stockQuantity: 12,
    deliveryTime: "Scheduling within 7 days",
    weight: "Service (N/A)",
    packageDimensions: "On-site service",
    description: "On-site industrial welding and assembly",
    longDescription:
      "Certified industrial welding service performed on-site by qualified welders. MIG/MAG, TIG, and stick processes for steel, stainless steel and aluminum structures.",
    features: [
      "Certified welders (EN ISO 9606-1)",
      "MIG/MAG, TIG, SMAW processes",
      "On-site mobile welding units",
      "WPS / PQR documentation provided",
      "NDT inspection on request",
    ],
    specifications: {
      Processes: "MIG/MAG, TIG, SMAW",
      Standards: "EN ISO 9606-1",
      "Materials handled": "Carbon steel, stainless, aluminum",
      "Service area": "Nationwide",
      "Daily rate basis": "Per welder / day",
    },
  },
  {
    id: 4,
    name: "Custom Steel Staircase",
    category: "Staircases & Railings",
    brand: "MIS Steel",
    sku: "MIS-STC-CUS-004",
    price: 1850,
    image: "https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=600",
    gallery: buildGallery(
      "https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=600",
      [2, 6, 4],
    ),
    rating: 4.7,
    reviewCount: 42,
    reviews: pickReviews([1, 5, 3], 4),
    inStock: true,
    stockQuantity: 6,
    deliveryTime: "3 – 4 weeks (made to order)",
    weight: "180 – 320 kg (depending on height)",
    packageDimensions: "Custom — palletized",
    description: "Custom-fabricated steel staircase with handrails",
    longDescription:
      "Fully custom-fabricated steel staircase including stringers, treads and integrated handrail system. Designed to match your floor heights and openings.",
    features: [
      "Custom design from your drawings or measurements",
      "Integrated steel handrail",
      "Anti-slip treads (checker plate or grating)",
      "Powder-coated or galvanized finish",
      "Bolted or welded assembly on site",
    ],
    specifications: {
      Material: "Steel S235 / S275",
      Finish: "Powder coat or hot-dip galvanizing",
      Treads: "Checker plate 5 mm",
      "Max floor height": "4.5 m (standard)",
      Installation: "Included on quote",
    },
  },
  {
    id: 5,
    name: "Steel Handrail System",
    category: "Staircases & Railings",
    brand: "MIS Steel",
    sku: "MIS-HRL-MOD-005",
    price: 240,
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600",
    gallery: buildGallery(
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600",
      [6, 2, 3],
    ),
    rating: 4.5,
    reviewCount: 31,
    reviews: pickReviews([2, 4, 7], 5),
    inStock: true,
    stockQuantity: 85,
    deliveryTime: "5 – 7 business days",
    weight: "6.2 kg / m",
    packageDimensions: "3 m × 0.15 m × 0.15 m",
    description: "Modular steel handrail system for balconies",
    longDescription:
      "Modular handrail system for balconies, mezzanines and staircases. Compliant with workplace safety regulations.",
    features: [
      "Modular sections (1–3 m)",
      "Compliant with EN ISO 14122",
      "Two-bar or three-bar configuration",
      "Hot-dip galvanized finish",
      "Quick on-site assembly",
    ],
    specifications: {
      Standard: "EN ISO 14122-3",
      Height: "1100 mm",
      Material: "Steel tube Ø 42 mm",
      Finish: "Hot-dip galvanized",
      "Section length": "1 m / 2 m / 3 m",
    },
  },
  {
    id: 6,
    name: "Industrial Hangar Frame",
    category: "Warehouses",
    brand: "Nucor",
    sku: "MIS-HGR-PEB-006",
    price: 2199,
    image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=600",
    gallery: buildGallery(
      "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=600",
      [0, 7, 2],
    ),
    rating: 4.8,
    reviewCount: 18,
    reviews: pickReviews([3, 6, 5], 6),
    inStock: true,
    stockQuantity: 3,
    deliveryTime: "6 – 8 weeks (engineered to order)",
    weight: "12 – 28 tons (depending on span)",
    packageDimensions: "Multi-truck delivery — staged on site",
    description: "Pre-engineered steel hangar frame kit",
    longDescription:
      "Pre-engineered steel hangar frame supplied as a complete kit with columns, rafters, bracing and connection plates. Ideal for warehouses, logistics centers, and aircraft hangars.",
    features: [
      "Pre-engineered design — fast on-site assembly",
      "Clear spans up to 30 m",
      "Bolted connections only — no on-site welding",
      "Optional crane runway integration",
      "Hot-dip galvanized columns available",
    ],
    specifications: {
      "Clear span": "15 – 30 m",
      "Eave height": "6 – 12 m",
      "Roof pitch": "5 – 10°",
      "Wind load": "Up to 130 km/h",
      Connections: "Bolted (HV 10.9)",
    },
  },
  {
    id: 7,
    name: "Factory Building Package",
    category: "Industrial Buildings",
    brand: "MIS Steel",
    sku: "MIS-FAC-TKY-007",
    price: 2299,
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600",
    gallery: buildGallery(
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600",
      [0, 5, 2],
    ),
    rating: 4.6,
    reviewCount: 12,
    reviews: pickReviews([3, 1, 6], 7),
    inStock: false,
    stockQuantity: 0,
    deliveryTime: "Lead time 12 – 16 weeks",
    weight: "Project-based",
    packageDimensions: "Project-based",
    description: "Turn-key industrial factory building",
    longDescription:
      "Complete turn-key factory building including structural steel frame, roofing, cladding and installation. Engineered and erected by our team.",
    features: [
      "Turn-key delivery (engineering → erection)",
      "Steel frame + sandwich panel cladding",
      "Insulated roofing system",
      "Custom layout, doors and windows",
      "Full installation included",
    ],
    specifications: {
      Scope: "Engineering, fabrication, erection",
      "Surface area": "From 500 m²",
      Cladding: "Sandwich panel 60 mm",
      Roofing: "Insulated trapezoidal",
      Warranty: "10 years structural",
    },
  },
  {
    id: 8,
    name: "Metal Canopy Cover",
    category: "Roofing Systems",
    brand: "Tata Steel",
    sku: "MIS-CNP-FRE-008",
    price: 680,
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600",
    gallery: buildGallery(
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600",
      [3, 1, 7],
    ),
    rating: 4.9,
    reviewCount: 27,
    reviews: pickReviews([5, 0, 6], 8),
    inStock: true,
    stockQuantity: 14,
    deliveryTime: "2 – 3 weeks",
    weight: "450 – 800 kg",
    packageDimensions: "12 m × 1.20 m × 1.20 m",
    description: "Industrial metal canopy for outdoor coverage",
    longDescription:
      "Free-standing or wall-mounted metal canopy for outdoor loading bays, parking areas and entrances.",
    features: [
      "Free-standing or wall-mounted",
      "Galvanized steel structure",
      "Translucent or metal roofing options",
      "Custom span up to 12 m",
      "Anchor plates included",
    ],
    specifications: {
      Structure: "Galvanized steel",
      "Max span": "12 m",
      Height: "3 – 6 m",
      Roofing: "Galvanized sheet or polycarbonate",
      Anchoring: "Chemical anchors",
    },
  },
  {
    id: 9,
    name: "Decorative Metal Panel",
    category: "Custom Metal Work",
    brand: "MIS Steel",
    sku: "MIS-PNL-DEC-009",
    price: 340,
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600",
    gallery: buildGallery(
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600",
      [6, 0, 4],
    ),
    rating: 4.7,
    reviewCount: 38,
    reviews: pickReviews([7, 5, 2, 4], 9),
    inStock: true,
    stockQuantity: 22,
    deliveryTime: "2 – 3 weeks (custom cut)",
    weight: "14 – 60 kg / panel",
    packageDimensions: "3 m × 1.50 m × 0.10 m",
    description: "Custom decorative metal panels and special fabrication",
    longDescription:
      "Custom-cut decorative metal panels for facades, partitions and architectural feature walls. Laser-cut from your drawings or our pattern library.",
    features: [
      "Laser-cut from your design",
      "Steel, stainless or Corten",
      "Powder coat in any RAL color",
      "Indoor or outdoor use",
      "Custom dimensions",
    ],
    specifications: {
      Material: "Steel / Stainless / Corten",
      Thickness: "1.5 – 5 mm",
      "Max sheet size": "3000 × 1500 mm",
      Finish: "Powder coat / Raw / Patinated",
      "Lead time": "2 – 3 weeks",
    },
  },
  {
    id: 10,
    name: "On-Site Installation Service",
    category: "Installation & Maintenance",
    brand: "MIS Steel",
    sku: "MIS-SRV-INS-010",
    price: 520,
    image: "https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=600",
    gallery: buildGallery(
      "https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=600",
      [5, 2, 0],
    ),
    rating: 4.8,
    reviewCount: 64,
    reviews: pickReviews([5, 1, 6, 3], 10),
    inStock: true,
    stockQuantity: 8,
    deliveryTime: "Scheduling within 10 days",
    weight: "Service (N/A)",
    packageDimensions: "On-site service",
    description: "Professional on-site installation and assembly",
    longDescription:
      "On-site installation and assembly service by our qualified team. Mobile crane, lifting equipment and safety supervision included.",
    features: [
      "Qualified installation team",
      "Mobile crane and lifting equipment",
      "Safety supervisor on site",
      "Method statement provided",
      "Daily progress reporting",
    ],
    specifications: {
      Crew: "3 – 6 technicians",
      Equipment: "Mobile crane up to 50 t",
      Coverage: "Nationwide",
      Insurance: "Full civil liability",
      Hours: "Mon – Sat, 7am – 6pm",
    },
  },
  {
    id: 11,
    name: "Maintenance Contract",
    category: "Installation & Maintenance",
    brand: "MIS Steel",
    sku: "MIS-SRV-MNT-011",
    price: 1200,
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600",
    gallery: buildGallery(
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600",
      [4, 6, 2],
    ),
    rating: 4.7,
    reviewCount: 21,
    reviews: pickReviews([4, 0, 7], 11),
    inStock: true,
    stockQuantity: 999,
    deliveryTime: "Contract activation in 5 days",
    weight: "Service (N/A)",
    packageDimensions: "Service contract — digital",
    description: "Annual maintenance contract with equipment support",
    longDescription:
      "Annual maintenance contract covering inspection, preventive maintenance and emergency support for your metal structures and welded equipment.",
    features: [
      "Two scheduled inspections per year",
      "Preventive maintenance report",
      "Emergency response < 48 h",
      "Spare parts at preferential rates",
      "Anti-corrosion touch-up included",
    ],
    specifications: {
      Duration: "12 months (renewable)",
      "Scheduled visits": "2 per year",
      "Emergency response": "< 48 h",
      Coverage: "Structure + welding",
      Reporting: "Digital PDF report",
    },
  },
  {
    id: 12,
    name: "Industrial Workshop Kit",
    category: "Industrial Buildings",
    brand: "Nucor",
    sku: "MIS-WSP-MOD-012",
    price: 1750,
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600",
    gallery: buildGallery(
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600",
      [0, 7, 3],
    ),
    rating: 4.6,
    reviewCount: 9,
    reviews: pickReviews([3, 6, 1], 12),
    inStock: true,
    stockQuantity: 4,
    deliveryTime: "4 – 6 weeks",
    weight: "6 – 12 tons",
    packageDimensions: "Multi-truck delivery",
    description: "Modular workshop and industrial hall kit",
    longDescription:
      "Modular industrial workshop kit ideal for fabrication shops, repair facilities and small production halls. Designed for fast erection on prepared slab.",
    features: [
      "Modular bolted design",
      "Optional overhead crane runway",
      "Sandwich panel cladding",
      "Pedestrian door + sectional door",
      "Engineering documents included",
    ],
    specifications: {
      "Standard size": "15 × 30 m",
      "Eave height": "6 m",
      Cladding: "Sandwich panel 40 mm",
      "Crane capacity (option)": "Up to 10 t",
      "Erection time": "4 – 6 weeks",
    },
  },
];

export function getProductById(id: number): Product | undefined {
  return products.find((p) => p.id === id);
}
