# LuxuryExpress — Static Frontend

This is a small static demo storefront (LuxuryExpress). It includes product listings (FakeStore API), blog posts, a persistent localStorage cart, theme toggle, tracking demo and responsive styles.

## Quick local development

Open a terminal in the project root (Windows PowerShell):

```powershell
cd 'c:\Users\hp\LuxuryExpress'
# Run a simple static server
python -m http.server 5500
# Then open http://localhost:5500 in your browser
```

Alternatively use VS Code Live Server.

## Deploy to Vercel

Option A — GitHub integration (recommended):
1. Push this repository to GitHub.
2. Go to https://vercel.com and import the GitHub repository.
3. Vercel will detect it's a static site and deploy automatically.

Option B — Vercel CLI:

```powershell
npm i -g vercel
vercel login
vercel --prod
```

This will guide you through deployment.

## Notes before deploy
- The site uses the FakeStore API (https://fakestoreapi.com) to populate products. For production, replace with your backend or static product data.
- Ensure any analytics or secrets are not committed.

## Smoke checklist
- [ ] Open homepage, add product to cart, verify cart badge increments.
- [ ] Visit `/cart.html`, change quantities, remove items, clear cart.
- [ ] Visit `/shop.html`, open product modal, verify related items and add-to-cart.
- [ ] Toggle theme, reload, confirm persistence.

## Contact
For follow-up changes, edit files under the workspace and re-deploy.