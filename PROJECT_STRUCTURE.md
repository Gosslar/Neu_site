# Project File Structure

## Blog System Components:
- src/components/BlogManagerMinimal.tsx (ACTIVE - Ultra-stable)
- src/components/BlogManagerStable.tsx (Backup version)
- src/components/BlogManagerComplete.tsx (Full-featured version)
- src/components/BlogManagerSimple.tsx (Basic version)
- src/components/BlogManager.tsx (Original version)

## Core Pages:
- src/pages/AdminPage.tsx (Uses BlogManagerMinimal)
- src/pages/BlogPage.tsx (Public blog listing)
- src/pages/BlogPostPage.tsx (Individual post view)

## Navigation:
- src/components/Navbar.tsx (Blog in main menu)

## Database:
- supabase/migrations/ (All database schemas)
- Blog tables: blog_posts_2025_11_18_14_00, blog_categories_2025_11_18_14_00

## Media:
- public/images/ (DJI drone footage)
- CMS media management integrated

## Deployment:
- dist/ (Production build with Alfahosting optimizations)
- dist/.htaccess (Apache SPA routing)
- dist/index.php (PHP fallback routing)
- dist/diagnose.html (Troubleshooting tool)

## Alfahosting Files:
- ALFAHOSTING_ANLEITUNG.md (Deployment guide)
- Enhanced error handling in all deployment files
- Comprehensive fallback mechanisms

Current Status: ALL SYSTEMS OPERATIONAL