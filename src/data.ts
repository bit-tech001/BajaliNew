import { Property, Service, Project, GalleryItem, Blog, Testimonial, FAQ, TeamMember, AppSettings } from './types';

export const initialProperties: Property[] = [
  {
    id: 'prop-1',
    title: 'Balaji Business Hub',
    type: 'Commercial',
    price: '₹12.5 Cr',
    priceNumeric: 125000000,
    location: 'SG Highway, Ahmedabad',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800'
    ],
    specs: {
      area: '15,000 Sq.Ft.',
      furnishing: 'Warm Shell',
    },
    description: 'A premium, state-of-the-art grade-A corporate space located along the high-growth SG Highway corridor. Features high-speed elevators, double-height lobby, triple-level basement parking, and advanced HVAC systems. Perfect for global corporate headquarters or premium financial institutes.',
    amenities: ['24/7 Security', 'Valet Parking', 'Power Backup', 'Conference Room', 'Cafeteria', 'Centralized AC'],
    floorPlan: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'prop-2',
    title: 'Balaji Elite Residency',
    type: 'Luxury',
    price: '₹5.8 Cr',
    priceNumeric: 58000000,
    location: 'Sindhu Bhavan Road, Bodakdev, Ahmedabad',
    status: 'New Launch',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800'
    ],
    specs: {
      area: '5,500 Sq.Ft.',
      bedrooms: '4 BHK',
      bathrooms: '5 Baths',
      furnishing: 'Semi-Furnished',
    },
    description: 'Super-premium luxury apartments located in Ahmedabad’s most desirable residential street. Offers direct, private elevator access to your apartment, Italian marble flooring, pre-fitted modular kitchen with high-end appliances, and a massive wrap-around balcony with beautiful views of the city.',
    amenities: ['Private Lift', 'Infinity Pool', 'Gymnasium', 'Landscaped Garden', 'Concierge Desk', 'Automated Home Systems'],
    floorPlan: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'prop-3',
    title: 'Balaji Logistics Park',
    type: 'Industrial',
    price: '₹14.0 Cr',
    priceNumeric: 140000000,
    location: 'Changodar Industrial Zone, Ahmedabad',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800'
    ],
    specs: {
      area: '45,000 Sq.Ft.',
      furnishing: 'Industrial Grade',
    },
    description: 'A massive, highly optimized industrial warehouse and logistics hub in Changodar. Boasts clear ceiling heights of 12 meters, FM2 grade concrete flooring with high load-bearing capacity, dock-levelers for seamless container operations, and complete fire sprinkler and hydrant installations.',
    amenities: ['Container Entry', 'Fire Sprinklers', 'Dedicated Substation', 'Weigh Bridge Access', 'Office Block', '24/7 Security Patrol'],
    floorPlan: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'prop-4',
    title: 'Balaji Imperial Heights',
    type: 'Residential',
    price: '₹2.3 Cr',
    priceNumeric: 23000000,
    location: 'Shela, Ahmedabad',
    status: 'Under Construction',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80&w=800'
    ],
    specs: {
      area: '2,800 Sq.Ft.',
      bedrooms: '3 BHK',
      bathrooms: '3 Baths',
      furnishing: 'Unfurnished',
    },
    description: 'A modern residential project with high-quality architecture, open community green spaces, and fully loaded smart-living amenities. Situated in Shela, one of Ahmedabad’s fastest-growing premium neighborhoods with close proximity to premier international schools and medical hubs.',
    amenities: ['Jogging Track', 'Clubhouse', 'Children Play Area', 'Indoor Games Arena', 'Power Backup', 'Water Treatment Plant'],
    floorPlan: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'prop-5',
    title: 'Balaji Corporate Plaza',
    type: 'Investment',
    price: '₹4.5 Cr',
    priceNumeric: 45000000,
    location: 'Ashram Road, Ahmedabad',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=800'
    ],
    specs: {
      area: '4,200 Sq.Ft.',
      furnishing: 'Fully Furnished',
    },
    description: 'Pre-leased premium corporate office unit with an active 9-year lease to an A-grade multinational software company. Offering immediate, highly stable rental yields of 7.2% ROI per annum with standard 15% rent escalation every 3 years. Perfect portfolio diversifier for long-term secure wealth.',
    amenities: ['High Rental Yield', 'Pre-Leased', 'Corporate Fitouts', 'Fitted Cabins', '2 Dedicated Car Parks', 'A-grade Tenant'],
    floorPlan: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'prop-6',
    title: 'Balaji Highrise Suites',
    type: 'Rental',
    price: '₹1.2 Lakh/mo',
    priceNumeric: 120000,
    location: 'Satellite Area, Ahmedabad',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800'
    ],
    specs: {
      area: '2,200 Sq.Ft.',
      bedrooms: '3 BHK',
      bathrooms: '3 Baths',
      furnishing: 'Fully Furnished',
    },
    description: 'Beautiful, fully customized high-floor apartment available for long-term rental in Satellite. Fully fitted out by an award-winning interior designer. Highlights include solid teak wood custom furniture, branded modular kitchen, VRV central climate controls, and breathtaking views.',
    amenities: ['Housekeeping Available', 'CCTV Security', 'Gym Access', 'Intercom', 'Suburban Views', 'Gas Pipeline'],
    floorPlan: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=800'
  }
];

export const initialServices: Service[] = [
  {
    id: 'srv-1',
    title: 'Property Buying Services',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800',
    description: 'We provide strategic, data-driven buying services for both premium residential and high-yield commercial properties across Ahmedabad. Our experts guide you from primary shortlists to seamless final ownership.',
    benefits: [
      'Access to off-market premium inventory',
      'Thorough legal title and technical verification',
      'Competitive price negotiation and cost savings',
      'Complete physical and commercial due diligence'
    ],
    process: [
      'Requirement profiling & budget mapping',
      'Curated property shortlisting & physical site tours',
      'Price negotiations and financial structuring',
      'Title clearance check and legal sale-deed execution'
    ]
  },
  {
    id: 'srv-2',
    title: 'Property Selling Services',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800',
    description: 'Maximize your property asset value with our technology-led marketing engine and extensive local and corporate investor database in Ahmedabad.',
    benefits: [
      'Accurate data-driven valuation to maximize yield',
      'Premium visual listings and modern dynamic marketing',
      'Direct network access to high-net-worth buyers',
      'End-to-end tax advisory on capital gains'
    ],
    process: [
      'Comprehensive property inspection and valuation',
      'Marketing strategy design and high-quality photography',
      'Targeted buyer search and filtered negotiations',
      'Seamless token agreement & paperwork handling'
    ]
  },
  {
    id: 'srv-3',
    title: 'Investment Advisory & Wealth Creation',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800',
    description: 'Our core strength lies in analyzing Ahmedabad’s urban growth vectors to build highly profitable real estate investment portfolios with maximum rental yields and high long-term capital appreciations.',
    benefits: [
      'Strategic portfolio planning and asset allocation',
      'In-depth cashflow and high-precision IRR modeling',
      'Tax efficiency and structural advice',
      'Exclusive land and high-yield commercial co-investments'
    ],
    process: [
      'Investor risk-return profiling and capital allocation planning',
      'Urban trend mapping & high-potential asset identification',
      'Rigorous project feasibility analysis and ROI calculations',
      'Continuous portfolio monitoring and optimal exit structuring'
    ]
  },
  {
    id: 'srv-4',
    title: 'Commercial & Corporate Real Estate',
    image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800',
    description: 'Assisting corporate houses, multinationals, and retail groups in sourcing, leasing, and buying high-grade workspace and premium retail corridors in Ahmedabad.',
    benefits: [
      'Bespoke workplace shell/fitout solutioning',
      'Favorable lease tenure negotiations',
      'Strategic locations with superb corporate connectivity',
      'Comprehensive workspace technical due diligence'
    ],
    process: [
      'Operational capacity and location demand mapping',
      'Commercial space identification and infrastructure vetting',
      'Lease draft negotiation and corporate governance alignment',
      'Seamless handovers and fitout execution monitoring'
    ]
  }
];

export const initialProjects: Project[] = [
  {
    id: 'proj-1',
    title: 'Balaji Trade Center',
    category: 'Completed',
    location: 'Ashram Road, Ahmedabad',
    investmentValue: '₹75 Cr',
    status: '100% Sold & Occupied',
    timeline: 'Completed in Dec 2024',
    description: 'A benchmark commercial landmark designed for luxury retail on lower levels and state-of-the-art office spaces on upper levels. Completed ahead of schedule with 100% occupancy within 3 months of completion.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800'
    ]
  },
  {
    id: 'proj-2',
    title: 'Balaji One Residential Club',
    category: 'Ongoing',
    location: 'Bopal - Shela Link Road, Ahmedabad',
    investmentValue: '₹140 Cr',
    status: 'Structure Completed - Finishes In Progress',
    timeline: 'Expected handover: March 2027',
    description: 'Ahmedabad’s finest ultra-luxury gated residential community. Spreading across 3 acres with massive landscaped garden spaces, multi-sport arenas, and a premium 30,000 Sq.Ft. member clubhouse.',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80&w=800'
    ]
  },
  {
    id: 'proj-3',
    title: 'Balaji Industrial Nexus',
    category: 'Upcoming',
    location: 'Sanand Industrial GIDC, Ahmedabad',
    investmentValue: '₹220 Cr',
    status: 'Pre-launch bookings open',
    timeline: 'Launch date: November 2026',
    description: 'A revolutionary, high-spec industrial and warehousing development strategically adjacent to Ahmedabad’s manufacturing hotbeds. Highly tailored logistics pathways and automated handling centers.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800'
    ]
  }
];

export const initialGalleryItems: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Balaji HQ Reception Area',
    category: 'Office',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'gal-2',
    title: 'Site Visit at Shela Heights',
    category: 'Site Visit',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'gal-3',
    title: 'Foundation Slab - Balaji One',
    category: 'Construction',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'gal-4',
    title: 'Balaji Trade Center Exterior',
    category: 'Completed Projects',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'gal-5',
    title: 'Annual Real Estate Seminar 2025',
    category: 'Corporate Events',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800'
  }
];

export const initialBlogs: Blog[] = [
  {
    id: 'blog-1',
    title: 'Why Ahmedabad is the Ideal Real Estate Market in 2026',
    category: 'Ahmedabad Property News',
    excerpt: 'An in-depth analysis of Ahmedabad’s high-growth micro-markets and the infrastructure projects driving double-digit valuations.',
    content: `Ahmedabad is rapidly transitioning into one of India's most highly sought-after commercial and residential investment hubs. Guided by game-changing multi-modal infrastructure expansions, the city is observing record appreciations.

Key Drivers:
1. **The Gift City Synergy**: Located close to Ahmedabad, the International Financial Services Centre is creating high-income white-collar employment, sparking luxury housing demand.
2. **Sindhu Bhavan & Bodakdev Micro-markets**: These premier streets remain highly resilient, commanding premium rents and consistent double-digit capital appreciations.
3. **Metro connectivity expansion**: Phase 2 of Ahmedabad metro has connected formerly far-flung industrial and residential clusters directly to commercial corridors.

At Balaji Consultancy Services, we strongly recommend investors target commercial Grade-A assets along SG Highway or premium residential properties in Shela and Bopal before year-end to maximize early entry gains.`,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
    date: 'July 10, 2026',
    readTime: '5 min read'
  },
  {
    id: 'blog-2',
    title: 'Commercial vs. Residential: Where to Invest ₹2 Cr',
    category: 'Investment Advice',
    excerpt: 'Struggling to allocate your investment capital? Compare rental yields, tax structures, and capital appreciation rates between commercial properties and luxury housing.',
    content: `For investors holding a capital allocation of around ₹2 Crore, deciding between commercial offices and residential properties can be highly challenging. Let's break down the comparative metrics:

**1. Commercial Yields:**
Commercial units typically yield an attractive 6% to 8% annually. When combined with long-term 9-year corporate leases, they provide extremely high stability.

**2. Residential Appreciations:**
Residential properties in high-demand pockets like Bodakdev or Satellite yield lower rental income (typically 2% to 3%), but command significantly faster capital appreciation rates.

**Balaji Recommendation:**
If stable monthly cash flow is your ultimate financial target, pre-leased Grade-A corporate offices are superior. If long-term inheritance wealth creation is the priority, luxury apartments are a highly resilient asset class.`,
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800',
    date: 'June 28, 2026',
    readTime: '6 min read'
  },
  {
    id: 'blog-3',
    title: 'A First-Time Homebuyer’s Legal Checklist in Gujarat',
    category: 'Buying Guide',
    excerpt: 'Ensure your lifetime asset is 100% legally secure. Learn the absolute essential checks: RERA registration, NA certificate, and Title verification.',
    content: `Buying a home is highly rewarding, but requires cautious legal navigation. In Gujarat, several clear regulatory documents must be systematically verified:

**1. RERA Registration:**
Always ensure the residential project is fully registered with the Gujarat Real Estate Regulatory Authority (GUJRERA). This protects your capital and guarantees on-time delivery.

**2. Non-Agricultural (NA) Land Status:**
Verify that the underlying land block has a valid 'NA Certificate'. Agricultural land cannot be legally sold as residential properties.

**3. Title Search Report:**
Obtain a comprehensive 30-year 'Title Clearance Search Report' executed by an experienced property lawyer to ensure the seller has absolute ownership without active mortgages or court disputes.`,
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=800',
    date: 'May 15, 2026',
    readTime: '8 min read'
  }
];

export const initialFAQs: FAQ[] = [
  {
    id: 'faq-1',
    question: 'Why should I choose Balaji Consultancy over other brokers?',
    answer: 'Unlike standard transaction-focused brokers, Balaji Consultancy operates as a high-precision corporate advisory firm. We combine deeply researched micro-market analytics, rigorous legal and title verification protocols, and customized long-term wealth portfolio building. Our transparency, client-aligned fee structure, and end-to-end management guarantee peace of mind.',
    category: 'General'
  },
  {
    id: 'faq-2',
    question: 'How does the RERA registration system protect real estate buyers in Gujarat?',
    answer: 'Under the GUJRERA act, developers are legally mandated to deposit 70% of buyer capital into dedicated escrow accounts, ensuring funds are strictly utilized for active construction. It also mandates clear project progress disclosures, penalizes delays, and guarantees developers cannot make unapproved structural plan alterations.',
    category: 'Legal'
  },
  {
    id: 'faq-3',
    question: 'What is the average rental yield for commercial offices along SG Highway?',
    answer: 'Grade-A corporate office developments along SG Highway in Ahmedabad currently command stable rental yields ranging between 6.5% and 8.0% per annum, backed by solid 5 to 9-year corporate leases with standard 15% escalation clauses every three years.',
    category: 'Investment'
  },
  {
    id: 'faq-4',
    question: 'Can you assist me with bank loan applications and valuations?',
    answer: 'Yes, absolutely. We have dedicated partnerships with top-tier private and public financial institutions (including HDFC, ICICI, SBI, and Axis Bank). Our in-house valuation team prepares bank-ready appraisal documents, ensuring rapid home or commercial mortgage approvals at competitive interest rates.',
    category: 'Loan & Valuation'
  }
];

export const initialTeamMembers: TeamMember[] = [
  {
    id: 'team-1',
    name: 'Balraj Patel',
    role: 'Founder & Principal Advisor',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=500',
    bio: 'With over 24 years of deep real estate advisory experience across Gujarat, Balraj is a recognized pioneer in corporate land assemblies and high-yield commercial leasing. He established Balaji Consultancy with a core vision of bringing transparency, absolute legal integrity, and corporate-level structured advisory to individual and institutional property buyers.'
  },
  {
    id: 'team-2',
    name: 'Anjali Shah',
    role: 'Head of Commercial Investments',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=500',
    bio: 'Anjali is an MBA in Real Estate Finance and specializes in high-precision ROI modeling and portfolio diversifications. She has successfully advised and structured commercial lease transitions exceeding 15 Lakh Sq.Ft. for premier software corporations and industrial MNCs across Ahmedabad.'
  }
];

export const initialTestimonials: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Harshil Mehta',
    role: 'Managing Director, Mehta Logistics Ltd.',
    rating: 5,
    comment: 'Balaji Consultancy transformed our industrial expansion process. They sourced an outstanding 45,000 Sq.Ft. warehouse facility in Changodar within 2 weeks, handled all regulatory paperwork with absolute transparency, and negotiated highly favorable lease terms. Highly recommended!',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    type: 'review'
  },
  {
    id: 'test-2',
    name: 'Deepa Krishnan',
    role: 'NRI Investor, London',
    rating: 5,
    comment: 'As an NRI, remote real estate investing can feel highly vulnerable. Balraj and his expert advisory team provided highly detailed, analytical ROI sheets for corporate office listings along SG Highway. Their transparency and end-to-end legal support made the transition seamless and zero-stress.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    type: 'review'
  },
  {
    id: 'test-3',
    name: 'Rajesh Solanki',
    role: 'Premium Home Buyer, Bodakdev',
    rating: 5,
    comment: 'Our experience purchasing our luxury family villa in Bodakdev with Balaji was exceptional. Every title search check was shared proactively, and their professional bank tie-ups enabled a fast loan approval in 3 days.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    type: 'review'
  }
];

export const initialSettings: AppSettings = {
  phone: '+91 79 4890 2341',
  whatsapp: '+91 98250 12345',
  email: 'advisory@balajiconsultancy.co.in',
  address: '401-404, Balaji Corporate Avenue, Opp. Shalby Hospital, S.G. Highway, Bodakdev, Ahmedabad - 380054, Gujarat, India',
  hours: 'Mon - Sat: 10:00 AM - 7:00 PM (Sunday Closed)',
  facebook: 'https://facebook.com/balajiconsultancy',
  linkedin: 'https://linkedin.com/company/balajiconsultancy',
  twitter: 'https://twitter.com/balajiconsult'
};
