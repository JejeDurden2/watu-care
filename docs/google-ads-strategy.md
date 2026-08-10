# Google Ads Strategy — Watu Care

**Date:** March 2026
**Objective:** Generate direct sales inquiries (quote requests) via Google Search Ads
**Budget:** $500–2,000/month
**Platform:** Google Ads (Search)

---

## 1. Technical Setup

### Google Ads Account

- Create a Google Ads account
- Link to existing GTM container (`GTM-NNHGQDH2`)
- Set currency, timezone (HKT), and billing

### Conversion Tracking (via GTM)

The site already fires a `quote_form_submit` dataLayer event when a visitor submits the quote request form. We wire this up to Google Ads:

1. **Create a Conversion Action** in Google Ads (Goals > Conversions)
   - Name: `Quote Request Submitted`
   - Category: Submit lead form
   - Value: $50–100 per lead (placeholder — adjust based on close rate)
   - Count: One per click

2. **Create two GTM tags:**
   - **Conversion Linker** — fires on all pages (required for cross-domain tracking)
   - **Google Ads Conversion Tracking** — fires on Custom Event `quote_form_submit`, using the Conversion ID + Label from Google Ads

3. **Test** using GTM Preview mode — submit a test quote and verify the conversion fires

### Retargeting Audiences (set up now, use later)

| Audience                        | Window  | Use               |
| ------------------------------- | ------- | ----------------- |
| All site visitors               | 30 days | Broad retargeting |
| Product page viewers            | 14 days | Warm prospects    |
| Quote modal openers (no submit) | 7 days  | Hot leads         |

---

## 2. Campaign Structure

Run **one focused Search campaign** to concentrate budget:

```
Campaign: GOOG_Search_HighIntent_QuoteRequest_Ongoing
│
├── Ad Group 1: Medical Supplies Wholesale Africa
│   ├── Keywords (phrase match)
│   └── 3 Responsive Search Ads
│
├── Ad Group 2: Medical Equipment Distributors
│   ├── Keywords (phrase match)
│   └── 3 Responsive Search Ads
│
└── Ad Group 3: PPE / Gloves Wholesale
    ├── Keywords (phrase match)
    └── 3 Responsive Search Ads
```

---

## 3. Keywords

All keywords use **phrase match** to balance intent with reach.

### Ad Group 1 — Medical Supplies Wholesale Africa

| Keyword                                |
| -------------------------------------- |
| medical supplies wholesale africa      |
| medical equipment supplier africa      |
| bulk medical supplies africa           |
| medical devices distributor africa     |
| hospital supplies wholesale africa     |
| medical supplies middle east wholesale |

### Ad Group 2 — Medical Equipment Distributors

| Keyword                        |
| ------------------------------ |
| medical equipment distributor  |
| wholesale medical devices      |
| medical supplies b2b           |
| healthcare equipment wholesale |
| medical procurement supplier   |

### Ad Group 3 — PPE / Gloves Wholesale

| Keyword                                 |
| --------------------------------------- |
| surgical gloves wholesale               |
| PPE wholesale africa                    |
| disposable gloves bulk order            |
| medical PPE supplier                    |
| infection prevention supplies wholesale |

### Negative Keywords (add from day 1)

`jobs` · `careers` · `salary` · `training` · `course` · `free` · `DIY` · `home use` · `consumer` · `retail` · `Amazon` · `pharmacy`

---

## 4. Targeting

### Geographic

Target users **located in or searching about** these markets:

**Africa:** Kenya, Nigeria, Ghana, South Africa, Tanzania, Uganda, Rwanda, Ethiopia, Senegal, Cote d'Ivoire

**Middle East:** UAE, Saudi Arabia, Qatar, Kuwait, Oman, Bahrain, Jordan, Egypt, Morocco

### Schedule

- **Weekdays:** Full day (business hours priority)
- **Weekends:** Reduced bids or paused (B2B buyers rarely convert on weekends)

### Bid Strategy

| Phase                     | Strategy                                        | Notes                    |
| ------------------------- | ----------------------------------------------- | ------------------------ |
| Launch (0–30 conversions) | Manual CPC or Maximize Conversions with CPA cap | Max CPC: $1.50–3.00      |
| Scale (30+ conversions)   | Target CPA                                      | Set based on actual data |

---

## 5. Ad Copy

### Responsive Search Ad — Example (Ad Group 1)

**Headlines** (max 30 characters each):
| # | Headline |
|---|----------|
| 1 | Medical Supplies for Africa |
| 2 | Wholesale Medical Devices |
| 3 | Premium PPE from Asia |
| 4 | ISO-Certified Products |
| 5 | Request a Quote Today |
| 6 | 25+ African Markets Served |
| 7 | Hospital-Grade Equipment |
| 8 | Bulk Medical Supplies |
| 9 | Asia to Africa Direct Supply |
| 10 | Quality Healthcare Products |
| 11 | Fast Quote in 48 Hours |
| 12 | Trusted Medical Supplier |
| 13 | Surgical & PPE Wholesale |
| 14 | Medical Devices B2B |
| 15 | Get Your Free Quote Now |

**Descriptions** (max 90 characters each):
| # | Description |
|---|-------------|
| 1 | We deliver premium medical devices & PPE from Asia's top manufacturers to Africa & Middle East. |
| 2 | ISO-certified gloves, PPE, surgical instruments & more. Request your free quote in minutes. |
| 3 | Serving hospitals, clinics & distributors in 25+ countries. Quality guaranteed, bulk pricing. |
| 4 | From surgical gloves to patient care equipment. Direct from certified Asian manufacturers. |

### Ad Extensions

**Sitelinks:**
| Link Text | URL |
|-----------|-----|
| Browse Products | /products |
| View Markets | /markets |
| About Watu Care | /about |
| Contact Us | /contact |

**Callouts:**

- ISO-Certified Products
- 25+ Countries Served
- Free Quote in 48h
- Direct from Manufacturers

**Structured Snippets:**

- Types: Gloves, PPE, Surgical Packs, Wound Care, Catheters

---

## 6. Landing Pages

| Ad Group                       | Landing Page                | Rationale                                |
| ------------------------------ | --------------------------- | ---------------------------------------- |
| Medical Supplies Wholesale     | Homepage (`/`)              | Broad overview, trust signals, quote CTA |
| Medical Equipment Distributors | Homepage (`/`)              | Full product range visible               |
| PPE / Gloves Wholesale         | Products page (`/products`) | Direct to relevant categories            |

The existing quote modal (add products > fill form > submit) is already well-optimized. No site changes needed.

---

## 7. Optimization Playbook

### Week 1–2: Launch & Learn

- [ ] Monitor search terms report **daily**
- [ ] Add negative keywords aggressively (filter out irrelevant queries)
- [ ] Verify conversions are tracking correctly
- [ ] Check geographic performance

### Week 3–4: First Optimization

- [ ] Pause keywords with $30+ spend and 0 conversions
- [ ] Increase bids on converting keywords
- [ ] Review RSA asset performance — pin top-performing headlines
- [ ] Check quality scores and improve where below 6

### Monthly Ongoing

- [ ] Refresh ad copy (quarterly minimum)
- [ ] Expand keywords based on search terms report
- [ ] Review geo performance — shift budget to converting regions
- [ ] Adjust CPA targets based on lead-to-deal close rate
- [ ] Check ad frequency and creative fatigue

---

## 8. Key Metrics to Track

| Metric               | Target | Notes                      |
| -------------------- | ------ | -------------------------- |
| CPA (Cost per Quote) | < $50  | Adjust based on deal value |
| CTR                  | > 3%   | B2B search benchmark       |
| Conversion Rate      | > 2%   | Landing page performance   |
| Quality Score        | > 6/10 | Per keyword                |
| Impression Share     | > 60%  | Budget sufficiency check   |

---

## 9. Pre-Launch Checklist

- [ ] Google Ads account created and billing set
- [ ] GTM Conversion Linker tag fires on all pages
- [ ] GTM Conversion Tracking tag fires on `quote_form_submit`
- [ ] Test conversion with GTM Preview mode
- [ ] UTM parameters configured and appearing in GA4
- [ ] Negative keyword list added
- [ ] Ad extensions (sitelinks, callouts, snippets) submitted
- [ ] Landing pages load < 3 seconds on mobile
- [ ] Geographic targeting set to correct countries
- [ ] Ad schedule configured (weekdays priority)

---

## What's Already in Place (No Changes Needed)

The Watu Care site is ready for Google Ads:

- **GTM** installed and firing (`GTM-NNHGQDH2`)
- **Quote funnel events** tracked in dataLayer (`quote_form_submit`)
- **CSP headers** already allow `googleadservices.com`
- **Mobile-responsive** landing pages
- **Fast load times** via Next.js + Vercel edge network
- **Quote request form** with validation, email typo detection, and success flow
