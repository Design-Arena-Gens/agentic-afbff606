'use client';

import { useState } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ProductSuggestion {
  name: string;
  niche: string;
  priceRange: string;
  profitMargin: string;
  reasoning: string;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'products' | 'suppliers' | 'analytics'>('chat');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.'
      }]);
    } finally {
      setLoading(false);
    }
  };

  const productSuggestions: ProductSuggestion[] = [
    {
      name: 'Wireless Earbuds',
      niche: 'Electronics',
      priceRange: '$20-$50',
      profitMargin: '40-60%',
      reasoning: 'High demand, compact shipping, repeat customers'
    },
    {
      name: 'Fitness Resistance Bands',
      niche: 'Health & Fitness',
      priceRange: '$15-$35',
      profitMargin: '50-70%',
      reasoning: 'Growing fitness trend, low shipping cost, high margins'
    },
    {
      name: 'LED Strip Lights',
      niche: 'Home Decor',
      priceRange: '$12-$40',
      profitMargin: '45-65%',
      reasoning: 'Popular for room aesthetics, social media viral potential'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="mb-8 text-center">
          <h1 className="text-5xl font-bold text-indigo-900 mb-2">🤖 Dropshipping AI Agent</h1>
          <p className="text-gray-600 text-lg">Your intelligent assistant for dropshipping success</p>
        </header>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex-1 py-4 px-6 font-semibold transition-colors ${
                activeTab === 'chat'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              💬 AI Chat
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`flex-1 py-4 px-6 font-semibold transition-colors ${
                activeTab === 'products'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              📦 Products
            </button>
            <button
              onClick={() => setActiveTab('suppliers')}
              className={`flex-1 py-4 px-6 font-semibold transition-colors ${
                activeTab === 'suppliers'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              🏭 Suppliers
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`flex-1 py-4 px-6 font-semibold transition-colors ${
                activeTab === 'analytics'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              📊 Analytics
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'chat' && (
              <div className="flex flex-col h-[600px]">
                <div className="flex-1 overflow-y-auto mb-4 space-y-4 p-4 bg-gray-50 rounded-lg">
                  {messages.length === 0 ? (
                    <div className="text-center text-gray-500 mt-20">
                      <p className="text-xl mb-4">👋 Welcome! Ask me anything about dropshipping:</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
                        <button
                          onClick={() => setInput('What are trending products right now?')}
                          className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow text-left"
                        >
                          <span className="font-semibold text-indigo-600">🔥 Trending Products</span>
                          <p className="text-sm text-gray-600 mt-1">Find hot selling items</p>
                        </button>
                        <button
                          onClick={() => setInput('How do I find reliable suppliers?')}
                          className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow text-left"
                        >
                          <span className="font-semibold text-indigo-600">🤝 Supplier Search</span>
                          <p className="text-sm text-gray-600 mt-1">Connect with vendors</p>
                        </button>
                        <button
                          onClick={() => setInput('Help me create a marketing strategy')}
                          className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow text-left"
                        >
                          <span className="font-semibold text-indigo-600">📈 Marketing Strategy</span>
                          <p className="text-sm text-gray-600 mt-1">Boost your sales</p>
                        </button>
                        <button
                          onClick={() => setInput('Analyze profit margins for electronics')}
                          className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow text-left"
                        >
                          <span className="font-semibold text-indigo-600">💰 Profit Analysis</span>
                          <p className="text-sm text-gray-600 mt-1">Calculate margins</p>
                        </button>
                      </div>
                    </div>
                  ) : (
                    messages.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[70%] p-4 rounded-2xl ${
                            msg.role === 'user'
                              ? 'bg-indigo-600 text-white'
                              : 'bg-white text-gray-800 shadow-md'
                          }`}
                        >
                          <p className="whitespace-pre-wrap">{msg.content}</p>
                        </div>
                      </div>
                    ))
                  )}
                  {loading && (
                    <div className="flex justify-start">
                      <div className="bg-white p-4 rounded-2xl shadow-md">
                        <div className="flex space-x-2">
                          <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <form onSubmit={handleSubmit} className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about products, suppliers, marketing strategies..."
                    className="flex-1 p-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-indigo-600 text-gray-800"
                    disabled={loading}
                  />
                  <button
                    type="submit"
                    disabled={loading || !input.trim()}
                    className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Send
                  </button>
                </form>
              </div>
            )}

            {activeTab === 'products' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">🔥 AI-Recommended Products</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {productSuggestions.map((product, idx) => (
                    <div key={idx} className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                      <h3 className="text-xl font-bold text-indigo-900 mb-2">{product.name}</h3>
                      <div className="space-y-2 mb-4">
                        <p className="text-sm"><span className="font-semibold">Niche:</span> {product.niche}</p>
                        <p className="text-sm"><span className="font-semibold">Price Range:</span> {product.priceRange}</p>
                        <p className="text-sm"><span className="font-semibold">Profit Margin:</span> <span className="text-green-600 font-bold">{product.profitMargin}</span></p>
                      </div>
                      <p className="text-sm text-gray-700 italic border-t pt-3 border-indigo-200">{product.reasoning}</p>
                      <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors font-semibold">
                        Research Product
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'suppliers' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">🏭 Supplier Database</h2>
                <div className="space-y-4">
                  {[
                    { name: 'AliExpress', region: 'Global', rating: '4.2/5', shippingTime: '15-30 days', minOrder: 'No minimum' },
                    { name: 'DHgate', region: 'China', rating: '4.0/5', shippingTime: '10-25 days', minOrder: 'Varies' },
                    { name: 'CJDropshipping', region: 'Global', rating: '4.5/5', shippingTime: '7-15 days', minOrder: 'No minimum' },
                    { name: 'Spocket', region: 'US/EU', rating: '4.3/5', shippingTime: '2-7 days', minOrder: 'No minimum' }
                  ].map((supplier, idx) => (
                    <div key={idx} className="bg-white border-2 border-gray-200 p-6 rounded-xl hover:border-indigo-400 transition-colors">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-bold text-gray-800 mb-2">{supplier.name}</h3>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="text-gray-500">Region</p>
                              <p className="font-semibold">{supplier.region}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Rating</p>
                              <p className="font-semibold text-yellow-600">{supplier.rating}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Shipping</p>
                              <p className="font-semibold">{supplier.shippingTime}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Min Order</p>
                              <p className="font-semibold">{supplier.minOrder}</p>
                            </div>
                          </div>
                        </div>
                        <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-semibold">
                          Connect
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">📊 Business Analytics</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {[
                    { label: 'Total Revenue', value: '$12,543', change: '+23%', color: 'green' },
                    { label: 'Orders', value: '156', change: '+18%', color: 'blue' },
                    { label: 'Avg. Profit Margin', value: '45%', change: '+5%', color: 'purple' },
                    { label: 'Conversion Rate', value: '3.2%', change: '+0.8%', color: 'orange' }
                  ].map((stat, idx) => (
                    <div key={idx} className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl shadow-lg border-2 border-gray-200">
                      <p className="text-gray-500 text-sm mb-2">{stat.label}</p>
                      <p className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</p>
                      <p className={`text-sm font-semibold text-${stat.color}-600`}>{stat.change} this month</p>
                    </div>
                  ))}
                </div>

                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl shadow-lg">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">💡 AI Insights</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Your electronics niche is performing 23% above average</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-500 mr-2">⚠</span>
                      <span>Consider increasing marketing budget for fitness products</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">ℹ</span>
                      <span>Peak order times: 7-9 PM EST - optimize ad scheduling</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Your average shipping time is 15% faster than competitors</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
