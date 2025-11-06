import { NextResponse } from 'next/server';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const dropshippingKnowledge = {
  trending: [
    'Wireless earbuds', 'Fitness resistance bands', 'LED strip lights',
    'Phone accessories', 'Pet grooming tools', 'Smart home devices',
    'Portable blenders', 'Yoga mats', 'Gaming accessories', 'Skincare tools'
  ],
  suppliers: [
    'AliExpress - Global marketplace with no minimum orders',
    'DHgate - Wholesale platform for bulk orders',
    'CJDropshipping - US warehouses for fast shipping',
    'Spocket - US/EU suppliers with faster delivery',
    'Wholesale2B - Automated dropshipping platform',
    'Modalyst - Curated high-quality suppliers'
  ],
  niches: [
    'Health & Fitness - High demand, repeat customers',
    'Tech Accessories - Low shipping cost, high margins',
    'Home & Garden - Growing market, diverse products',
    'Pet Products - Loyal customer base, emotional purchases',
    'Beauty & Personal Care - Trending, social media friendly',
    'Eco-Friendly Products - Rising trend, premium pricing'
  ]
};

function generateResponse(messages: Message[]): string {
  const lastMessage = messages[messages.length - 1].content.toLowerCase();

  if (lastMessage.includes('trend') || lastMessage.includes('hot') || lastMessage.includes('popular')) {
    return `🔥 **Trending Products Right Now:**

${dropshippingKnowledge.trending.slice(0, 5).map((p, i) => `${i + 1}. ${p}`).join('\n')}

**Why these products work:**
- High demand on social media platforms
- Good profit margins (40-70%)
- Compact and easy to ship
- Proven sales history
- Low return rates

Would you like detailed analysis on any specific product?`;
  }

  if (lastMessage.includes('supplier') || lastMessage.includes('vendor') || lastMessage.includes('source')) {
    return `🏭 **Reliable Supplier Recommendations:**

${dropshippingKnowledge.suppliers.slice(0, 4).map((s, i) => `${i + 1}. ${s}`).join('\n')}

**Supplier Selection Tips:**
- Check seller ratings (aim for 95%+)
- Review shipping times and costs
- Verify product quality through samples
- Ensure good communication and support
- Compare pricing across multiple suppliers

Need help connecting with a specific supplier?`;
  }

  if (lastMessage.includes('market') || lastMessage.includes('strategy') || lastMessage.includes('advertis') || lastMessage.includes('promot')) {
    return `📈 **Effective Marketing Strategies:**

**1. Social Media Marketing**
- TikTok/Instagram Reels for product demos
- Influencer partnerships for credibility
- User-generated content campaigns

**2. Paid Advertising**
- Facebook Ads targeting specific interests
- Google Shopping for search intent
- Retargeting campaigns for cart abandonment

**3. Content Marketing**
- SEO-optimized blog posts
- YouTube product reviews
- Email marketing sequences

**4. Conversion Optimization**
- A/B test product pages
- Offer time-limited discounts
- Build trust with reviews and testimonials

**Budget Tip:** Start with $20-50/day on Facebook Ads, test and scale what works!`;
  }

  if (lastMessage.includes('profit') || lastMessage.includes('margin') || lastMessage.includes('price') || lastMessage.includes('cost')) {
    return `💰 **Profit Margin Analysis:**

**Ideal Margins by Category:**
- Electronics: 40-60%
- Fashion: 50-80%
- Home Decor: 45-70%
- Beauty: 60-100%
- Fitness: 50-75%

**Pricing Formula:**
Product Cost + Shipping + (Desired Margin) = Selling Price

**Example Calculation:**
- Product cost: $10
- Shipping: $5
- Total cost: $15
- Desired 60% margin: $15 / 0.4 = $37.50 selling price
- Profit per sale: $22.50

**Pro Tips:**
- Factor in advertising costs (20-30% of revenue)
- Account for returns and refunds (5-10%)
- Offer bundles to increase average order value
- Use psychological pricing ($29.97 vs $30)`;
  }

  if (lastMessage.includes('start') || lastMessage.includes('begin') || lastMessage.includes('first') || lastMessage.includes('beginner')) {
    return `🚀 **Getting Started with Dropshipping:**

**Step 1: Choose Your Niche**
Pick a focused market (fitness, tech, beauty, etc.)

**Step 2: Find Suppliers**
Research on AliExpress, CJDropshipping, or Spocket

**Step 3: Set Up Store**
Use Shopify, WooCommerce, or BigCommerce

**Step 4: Add Products**
Select 10-20 winning products to start

**Step 5: Market Your Store**
Start with social media and paid ads

**Step 6: Process Orders**
Automate with Oberlo or DSers

**Initial Investment:** $200-500 for:
- Store setup ($29-50/month)
- Domain name ($10-15/year)
- Initial ads ($100-300)
- Product samples ($50-100)

Ready to dive deeper into any step?`;
  }

  if (lastMessage.includes('niche') || lastMessage.includes('category') || lastMessage.includes('product type')) {
    return `🎯 **Profitable Niches for 2024:**

${dropshippingKnowledge.niches.map((n, i) => `${i + 1}. ${n}`).join('\n')}

**How to Validate a Niche:**
✓ Search volume on Google Trends
✓ Active Facebook groups/communities
✓ Existing successful competitors
✓ Products solving specific problems
✓ Passionate customer base

**Red Flags to Avoid:**
✗ Highly seasonal products only
✗ Oversaturated markets (fidget spinners)
✗ Heavy/fragile items (high shipping costs)
✗ Restricted items (weapons, medical)

Want to explore a specific niche in detail?`;
  }

  if (lastMessage.includes('ship') || lastMessage.includes('deliver') || lastMessage.includes('fulfill')) {
    return `📦 **Shipping & Fulfillment Guide:**

**Shipping Options:**
- **ePacket:** 10-20 days, affordable
- **Express:** 3-7 days, premium price
- **Local Warehouses:** 2-5 days, best experience

**Strategies to Handle Long Shipping:**
1. Set clear expectations (15-25 business days)
2. Offer expedited shipping option
3. Send tracking immediately
4. Use suppliers with US/EU warehouses
5. Provide order status updates

**Shipping Costs:**
- Build into product price, or
- Offer free shipping over $X, or
- Charge transparent shipping fee

**Pro Tip:** Test products yourself first to verify quality and shipping times!`;
  }

  if (lastMessage.includes('legal') || lastMessage.includes('tax') || lastMessage.includes('license') || lastMessage.includes('business')) {
    return `⚖️ **Legal & Business Setup:**

**Business Structure:**
- Sole Proprietorship (simplest)
- LLC (liability protection recommended)
- Corporation (for scaling)

**Required Registrations:**
1. Business license (local)
2. Sales tax permit (state)
3. EIN from IRS (federal)
4. Terms of service & privacy policy

**Tax Considerations:**
- Collect sales tax where required
- Track all expenses for deductions
- File quarterly estimated taxes
- Consider hiring a CPA

**Legal Protection:**
- Product liability insurance
- Clear refund/return policies
- Copyright-free images only
- Comply with FTC advertising rules

**Disclaimer:** Consult with a local attorney and accountant for your specific situation!`;
  }

  return `🤖 **I'm your Dropshipping AI Assistant!**

I can help you with:

📦 **Product Research** - Find trending products and niches
🏭 **Supplier Sourcing** - Connect with reliable vendors
📈 **Marketing Strategies** - Grow your sales
💰 **Profit Analysis** - Calculate margins and pricing
🚀 **Getting Started** - Complete beginner guides
📊 **Business Analytics** - Track performance

**What would you like to know?** Ask me anything specific about:
- Trending products
- Supplier recommendations
- Marketing tactics
- Profit margins
- Shipping strategies
- Legal requirements
- Niche selection

Try asking: "What are trending products right now?" or "How do I find reliable suppliers?"`;
}

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Invalid messages format' },
        { status: 400 }
      );
    }

    const response = generateResponse(messages);

    return NextResponse.json({ message: response });
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
