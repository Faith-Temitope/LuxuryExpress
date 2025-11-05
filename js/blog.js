// Blog post data
const blogPosts = [
  {
    id: 1,
    title: "The Rise of Smart Fashion",
    excerpt: "Discover how technology is shaping the future of fashion, from wearable tech to AI-driven styling.",
    content: `
      <p>In the ever-evolving landscape of fashion, technology is playing an increasingly pivotal role in shaping how we dress, shop, and express ourselves. From smart fabrics that can regulate temperature to AI-powered styling assistants, the fusion of fashion and technology is creating exciting new possibilities.</p>
      
      <h4>Key Innovations:</h4>
      <ul>
        <li>Smart fabrics with temperature control</li>
        <li>AI-powered personal styling</li>
        <li>Virtual try-on technology</li>
        <li>Sustainable tech-driven manufacturing</li>
      </ul>
      
      <p>As we move forward, the integration of technology in fashion will only deepen, offering more personalized, sustainable, and innovative solutions for modern consumers.</p>
      
      <h4>Impact on the Industry</h4>
      <p>The fashion industry is experiencing a revolutionary transformation as technology becomes more integrated into every aspect of the business. From design and manufacturing to retail and customer experience, smart technology is reshaping how we think about and interact with fashion.</p>
    `,
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=1000",
    date: "2025-11-05",
    author: "Sarah Chen"
  },
  {
    id: 2,
    title: "Top 5 Gadgets to Simplify Your Day",
    excerpt: "Explore innovative gadgets designed to boost productivity and elevate your lifestyle in 2025.",
    content: `
      <p>In 2025, smart gadgets have become an integral part of our daily routines. Here are five revolutionary devices that are transforming how we live and work:</p>
      
      <h4>1. Smart Mirror with AI Health Tracking</h4>
      <p>Monitors vital signs and provides health insights during your morning routine.</p>
      
      <h4>2. AI-Powered Personal Assistant Earbuds</h4>
      <p>Real-time translation, schedule management, and contextual information delivery.</p>
      
      <h4>3. Holographic Workstation</h4>
      <p>Transform any surface into an interactive workspace with 3D projections.</p>
      
      <h4>4. Eco-Smart Home Hub</h4>
      <p>Optimizes energy usage while maintaining perfect comfort levels.</p>
      
      <h4>5. Wellness Wearable</h4>
      <p>Tracks physical and mental well-being with actionable insights.</p>
    `,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1000",
    date: "2025-11-04",
    author: "James Wilson"
  },
  {
    id: 3,
    title: "Styling Tips from the Pros",
    excerpt: "Practical style advice to help you curate a capsule wardrobe that works for every season.",
    content: `
      <p>Creating a versatile wardrobe that works year-round is an art. Professional stylists share their secrets to building a timeless collection that maximizes style while minimizing waste.</p>
      
      <h4>Essential Pieces</h4>
      <ul>
        <li>Classic blazer in neutral tones</li>
        <li>Well-fitted white shirts</li>
        <li>Quality denim in dark wash</li>
        <li>Versatile leather accessories</li>
      </ul>
      
      <h4>Seasonal Transitions</h4>
      <p>Learn how to layer effectively and choose pieces that work across multiple seasons. The key is selecting quality materials and timeless cuts that can be dressed up or down.</p>
      
      <h4>Investment Pieces</h4>
      <p>Understand which items deserve a higher budget and how to ensure they maintain their value over time. Quality over quantity is the foundation of a sustainable wardrobe.</p>
    `,
    image: "https://images.unsplash.com/photo-1521334884684-d80222895322?w=1000",
    date: "2025-11-03",
    author: "Elena Rodriguez"
  },
  {
    id: 4,
    title: "Gifts That Impress",
    excerpt: "A curated selection of premium gift ideas for every occasion and budget.",
    content: `
      <p>Finding the perfect gift requires understanding both the recipient and the occasion. Our guide helps you navigate gift-giving with style and thoughtfulness.</p>
      
      <h4>For the Tech Enthusiast</h4>
      <ul>
        <li>Smart home accessories</li>
        <li>Premium audio equipment</li>
        <li>Innovative wearables</li>
      </ul>
      
      <h4>For the Style Conscious</h4>
      <ul>
        <li>Artisanal leather goods</li>
        <li>Limited edition watches</li>
        <li>Bespoke accessories</li>
      </ul>
      
      <p>Remember, the best gifts combine practicality with personal touch, creating lasting impressions and cherished memories.</p>
    `,
    image: "https://images.unsplash.com/photo-1503342452485-86f7f51f4d7b?w=1000",
    date: "2025-11-02",
    author: "Marcus Chen"
  },
  {
    id: 5,
    title: "Sustainable Luxury",
    excerpt: "How brands are combining sustainability with premium design — what to look for as a shopper.",
    content: `
      <p>The future of luxury is sustainable. Leading brands are revolutionizing their approach to create eco-friendly products without compromising on quality or style.</p>
      
      <h4>Key Sustainability Factors</h4>
      <ul>
        <li>Ethical sourcing practices</li>
        <li>Renewable materials</li>
        <li>Zero-waste manufacturing</li>
        <li>Circular economy initiatives</li>
      </ul>
      
      <h4>Identifying Genuine Sustainability</h4>
      <p>Learn to distinguish between genuine sustainability efforts and greenwashing. We explore certification standards and what they mean for conscious consumers.</p>
      
      <h4>Future Trends</h4>
      <p>Discover upcoming innovations in sustainable luxury, from lab-grown materials to blockchain-verified sourcing.</p>
    `,
    image: "https://images.unsplash.com/photo-1503602642458-232111445657?w=1000",
    date: "2025-11-01",
    author: "Olivia Green"
  },
  {
    id: 6,
    title: "Travel Essentials for 2025",
    excerpt: "Pack smarter with these travel essentials that combine utility with style.",
    content: `
      <p>Modern travel demands both style and functionality. Our curated list of travel essentials helps you stay organized and look great on the go.</p>
      
      <h4>Tech Essentials</h4>
      <ul>
        <li>Universal smart adapters</li>
        <li>Noise-cancelling earbuds</li>
        <li>Compact power banks</li>
      </ul>
      
      <h4>Luggage Innovation</h4>
      <p>Explore the latest in smart luggage technology, from self-weighing bags to location tracking and built-in charging.</p>
      
      <h4>Style on the Go</h4>
      <ul>
        <li>Wrinkle-resistant fabrics</li>
        <li>Convertible clothing pieces</li>
        <li>Multi-functional accessories</li>
      </ul>
      
      <p>The key to efficient travel is choosing versatile items that serve multiple purposes while maintaining a sophisticated aesthetic.</p>
    `,
    image: "https://images.unsplash.com/photo-1495121605193-b116b5b09d54?w=1000",
    date: "2025-10-31",
    author: "David Park"
  }
];

// Function to show blog modal
function showBlogModal(postId) {
  const post = blogPosts.find(p => p.id === postId);
  if (!post) return;

  // Get related posts (excluding current post)
  const related = blogPosts
    .filter(p => p.id !== postId)
    .slice(0, 3);

  // Create modal HTML
  const modalHtml = `
    <div class="blog-modal">
      <img src="${post.image}" alt="${post.title}" class="blog-hero">
      <div class="blog-content">
        <div class="blog-meta">
          <span class="date">${new Date(post.date).toLocaleDateString()}</span>
          <span class="author">By ${post.author}</span>
        </div>
        <h2>${post.title}</h2>
        <div class="content">
          ${post.content}
        </div>
      </div>
      ${related.length > 0 ? `
        <div class="related-posts">
          <h3>Related Articles</h3>
          <div class="related-grid">
            ${related.map(p => `
              <a href="#" class="related-post" onclick="showBlogModal(${p.id}); return false;">
                <img src="${p.image}" alt="${p.title}">
                <h4>${p.title}</h4>
                <div class="date">${new Date(p.date).toLocaleDateString()}</div>
              </a>
            `).join('')}
          </div>
        </div>
      ` : ''}
    </div>
  `;

  // Show modal
  const modalBackdrop = document.createElement('div');
  modalBackdrop.className = 'modal-backdrop';
  modalBackdrop.innerHTML = `
    <div class="modal">
      <button class="modal-close" aria-label="Close">&times;</button>
      ${modalHtml}
    </div>
  `;

  document.body.appendChild(modalBackdrop);
  modalBackdrop.style.display = 'flex';

  const modalEl = modalBackdrop.querySelector('.modal');
  if(modalEl){
    modalEl.setAttribute('role','dialog');
    modalEl.setAttribute('aria-modal','true');
    modalEl.setAttribute('aria-label', post.title ? post.title.substring(0,80) : 'Article');
  }

  // Focus management & trap
  const previousActive = document.activeElement;
  const focusableSelector = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])';
  let focusable = Array.from(modalEl.querySelectorAll(focusableSelector));
  if(focusable.length === 0){
    modalEl.tabIndex = -1;
    modalEl.focus();
  } else {
    focusable[0].focus();
  }

  const handleTab = (e) => {
    if(e.key !== 'Tab') return;
    focusable = Array.from(modalEl.querySelectorAll(focusableSelector));
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if(e.shiftKey){
      if(document.activeElement === first){
        e.preventDefault();
        last.focus();
      }
    } else {
      if(document.activeElement === last){
        e.preventDefault();
        first.focus();
      }
    }
  };
  document.addEventListener('keydown', handleTab);

  function closeModal(){
    try{ modalBackdrop.remove(); }catch(e){}
    document.removeEventListener('keydown', handleEscape);
    document.removeEventListener('keydown', handleTab);
    if(previousActive && previousActive.focus) previousActive.focus();
  }

  // Handle closing
  modalBackdrop.addEventListener('click', e => {
    if (e.target === modalBackdrop || e.target.closest('.modal-close')) {
      closeModal();
    }
  });

  // Handle escape key
  const handleEscape = e => {
    if (e.key === 'Escape') {
      closeModal();
    }
  };
  document.addEventListener('keydown', handleEscape);
}