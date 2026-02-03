
import React, { useState, useEffect } from 'react';
import { useApp } from '../App';
import { MOCK_PRODUCTS } from '../constants';
import { generateProductDescription, getMarketInsight } from '../services/gemini';

interface ProductDetailProps {
  id: string;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ id }) => {
  const { addToCart, setCurrentPage } = useApp();
  const product = MOCK_PRODUCTS.find(p => p.id === id);
  
  const [quantity, setQuantity] = useState(product?.moq || 1);
  const [loadingAi, setLoadingAi] = useState(false);
  const [aiContent, setAiContent] = useState<{desc: string, insight: string} | null>(null);

  // Sync quantity with MOQ when product changes
  useEffect(() => {
    if (product) setQuantity(product.moq);
  }, [product]);

  const handleFetchAiData = async () => {
    if (!product) return;
    setLoadingAi(true);
    try {
      const desc = await generateProductDescription(product.name, product.category);
      const insight = await getMarketInsight(product.category);
      setAiContent({ desc, insight });
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingAi(false);
    }
  };

  if (!product) return <div className="p-20 text-center">Product not found.</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb / Back button */}
      <button 
        onClick={() => setCurrentPage('shop')}
        className="text-sm font-semibold text-blue-600 mb-8 flex items-center hover:underline"
      >
        <i className="fa-solid fa-chevron-left mr-2"></i> Back to Catalog
      </button>

      <div className="flex flex-col lg:flex-row gap-12 bg-white p-8 rounded border border-gray-200 shadow-sm">
        {/* Left: Image & Thumbnails */}
        <div className="lg:w-1/2">
          <div className="bg-gray-50 rounded overflow-hidden mb-4 border border-gray-100">
            <img src={product.image} className="w-full h-[500px] object-cover" alt={product.name} />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[1,2,3,4].map(i => (
              <div key={i} className="h-20 bg-gray-100 rounded border border-gray-200 opacity-50 hover:opacity-100 cursor-pointer">
                <img src={`https://picsum.photos/seed/${i+100}/200/200`} className="w-full h-full object-cover rounded" alt="Thumb" />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="lg:w-1/2 flex flex-col">
          <div className="mb-6">
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded uppercase mb-4 inline-block">{product.category}</span>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{product.name}</h1>
            <div className="flex items-center space-x-2 text-yellow-400 text-sm">
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star-half-stroke text-gray-300"></i>
              <span className="text-gray-500 font-medium ml-2">{product.rating} Rating</span>
            </div>
          </div>

          <div className="border-y border-gray-100 py-6 mb-6">
            <div className="flex items-baseline mb-1">
              <span className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
              <span className="text-gray-500 ml-2 font-medium">per unit</span>
            </div>
            <p className="text-sm text-green-600 font-bold mb-4">Availability: {product.stock} units in stock</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Order Quantity (MOQ: {product.moq})</label>
                <div className="flex items-center space-x-3">
                  <div className="flex border border-gray-300 rounded overflow-hidden h-12">
                    <button 
                      onClick={() => setQuantity(Math.max(product.moq, quantity - 1))}
                      className="px-4 bg-gray-50 hover:bg-gray-100 text-gray-600"
                    >-</button>
                    <input 
                      type="number" 
                      value={quantity} 
                      onChange={(e) => setQuantity(Math.max(product.moq, Number(e.target.value)))}
                      className="w-16 text-center font-bold text-gray-900 focus:outline-none"
                    />
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 bg-gray-50 hover:bg-gray-100 text-gray-600"
                    >+</button>
                  </div>
                  <button 
                    onClick={() => { addToCart(product, quantity); setCurrentPage('cart'); }}
                    className="flex-grow bg-blue-600 text-white h-12 rounded font-bold hover:bg-blue-700 transition-colors shadow-sm"
                  >
                    Add to Cart - ${(product.price * quantity).toLocaleString()}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="font-bold text-gray-900 mb-3">Product Description</h3>
            <p className="text-gray-600 leading-relaxed text-sm">{product.description}</p>
          </div>

          {/* AI Helper - Clean Intermediate Integration */}
          <div className="bg-gray-50 border border-gray-200 rounded p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-bold text-gray-800 flex items-center">
                <i className="fa-solid fa-sparkles text-blue-600 mr-2"></i>
                Market Insights (AI Powered)
              </h4>
              <span className="text-[10px] font-bold text-gray-400 uppercase">Beta</span>
            </div>

            {!aiContent && !loadingAi && (
              <button 
                onClick={handleFetchAiData}
                className="w-full py-2.5 bg-white border border-gray-300 rounded text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Analyze Market Demand & Details
              </button>
            )}

            {loadingAi && (
              <div className="flex items-center justify-center space-x-2 py-4">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse [animation-delay:0.2s]"></div>
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse [animation-delay:0.4s]"></div>
                <span className="text-xs text-gray-500 font-medium">Analyzing marketplace data...</span>
              </div>
            )}

            {aiContent && (
              <div className="space-y-4 animate-fadeIn">
                <div className="p-3 bg-white rounded border border-gray-100">
                  <p className="text-xs font-bold text-blue-600 uppercase mb-1">Sales Optimization Tip</p>
                  <p className="text-xs text-gray-700 italic">"{aiContent.desc}"</p>
                </div>
                <div className="p-3 bg-white rounded border border-gray-100">
                  <p className="text-xs font-bold text-gray-900 mb-1">Trends in {product.category}</p>
                  <div className="text-xs text-gray-600 whitespace-pre-line leading-relaxed">
                    {aiContent.insight}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
