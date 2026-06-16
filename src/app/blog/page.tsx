"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BlogCardSkeleton } from "@/components/ui/Skeleton";
import ErrorState from "@/components/ui/ErrorState";
import { fetchBlogPosts, subscribeNewsletter } from "@/lib/api";
import { BlogPost, BlogCategory } from "@/lib/types";

const categories: BlogCategory[] = [
  "All Insights",
  "Network Tech",
  "Tech Tips",
  "Community",
  "Announcements",
];

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("All Insights");
  const [email, setEmail] = useState("");
  const [subLoading, setSubLoading] = useState(false);
  const [subSuccess, setSubSuccess] = useState(false);

  useEffect(() => {
    loadPosts();
  }, [activeCategory]);

  async function loadPosts() {
    try {
      setLoading(true);
      setError(false);
      const data = await fetchBlogPosts(activeCategory);
      setPosts(data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    try {
      setSubLoading(true);
      await subscribeNewsletter(email);
      setSubSuccess(true);
      setEmail("");
    } catch {
      alert("Failed to subscribe. Please try again.");
    } finally {
      setSubLoading(false);
    }
  }

  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <>
      {/* Breadcrumbs */}
      <div className="max-w-[1280px] mx-auto px-5 md:px-16 pt-4 pb-2 flex items-center gap-2 text-xs font-semibold text-[var(--text-muted)] select-none">
        <Link href="/" className="hover:text-[var(--primary)] transition-colors">Home</Link>
        <span className="material-symbols-outlined text-[14px] leading-none opacity-40">chevron_right</span>
        <span className="text-[var(--text-primary)]">Blog</span>
      </div>

      {/* Featured Post */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-16 pt-4 pb-8">
        {loading ? (
          <div className="h-[400px] animate-pulse bg-[var(--surface-variant)] rounded-xl" />
        ) : featured ? (
          <div className="flex flex-col lg:flex-row gap-8 p-6 technical-border rounded-xl bg-[var(--surface)] group">
            <div className="flex-1 aspect-video bg-[var(--surface-container)] rounded-xl overflow-hidden relative">
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <span className="inline-block w-fit px-3 py-1 bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-semibold rounded-full mb-4">
                {featured.category}
              </span>
              <h1 className="font-heading text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
                {featured.title}
              </h1>
              <p className="text-sm text-[var(--text-muted)] mb-6">
                {featured.excerpt}
              </p>
              <div className="flex items-center gap-4">
                <Link
                  href={`/blog/${featured.slug}`}
                  className="px-6 py-3 technical-border rounded-lg text-sm font-bold text-[var(--text-primary)] hover:border-[var(--primary)] transition-all flex items-center gap-2"
                >
                  Read Full Report
                  <span className="material-symbols-outlined text-[18px]">
                    arrow_forward
                  </span>
                </Link>
                <span className="text-sm text-[var(--text-muted)]">
                  Published: {featured.date}
                </span>
              </div>
            </div>
          </div>
        ) : null}
      </section>

      {/* Category Filters */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-16 py-4">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="material-symbols-outlined text-[var(--text-muted)] text-[20px]">
            filter_list
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-[var(--primary)] text-[var(--on-primary)]"
                  : "technical-border text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Blog Grid */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-16 py-12">
        {error ? (
          <ErrorState onRetry={loadPosts} />
        ) : loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <BlogCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group technical-border rounded-xl overflow-hidden bg-[var(--surface)] hover:border-[var(--primary)] transition-all"
              >
                <div className="aspect-video bg-[var(--surface-container)] overflow-hidden relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-[var(--primary)]">
                      {post.category}
                    </span>
                    <span className="text-xs text-[var(--text-muted)]">
                      {post.date}
                    </span>
                  </div>
                  <h3 className="font-heading text-lg font-bold text-[var(--text-primary)] mb-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-[var(--text-muted)] mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <span className="text-sm font-medium text-[var(--primary)] flex items-center gap-1">
                    Read More
                    <span className="material-symbols-outlined text-[18px]">
                      arrow_forward
                    </span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
        {!loading && !error && (
          <div className="flex justify-center gap-2 mt-12">
            <button className="w-10 h-10 flex items-center justify-center technical-border rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)]">
              ‹
            </button>
            {[1, 2, 3].map((p) => (
              <button
                key={p}
                className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium ${
                  p === 1
                    ? "bg-[var(--primary)] text-[var(--on-primary)]"
                    : "technical-border text-[var(--text-muted)]"
                }`}
              >
                {p}
              </button>
            ))}
            <button className="w-10 h-10 flex items-center justify-center technical-border rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)]">
              ›
            </button>
          </div>
        )}
      </section>

      {/* Newsletter */}
      <section className="bg-[var(--surface-container)] py-12">
        <div className="max-w-[1280px] mx-auto px-5 md:px-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="font-heading text-xl font-bold text-[var(--text-primary)] mb-2">
              Stay ahead of the curve.
            </h3>
            <p className="text-sm text-[var(--text-muted)]">
              Get hyper-local network updates, technical insights, and exclusive
              connectivity offers delivered straight to your inbox.
            </p>
          </div>
          {subSuccess ? (
            <p className="text-sm text-[var(--primary)] font-medium">
              ✓ Subscribed successfully!
            </p>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-3 w-full md:w-auto">
              <input
                type="email"
                required
                placeholder="Your work email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 md:w-80 px-4 py-3 rounded-lg bg-[var(--background)] technical-border text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)]/50 focus:border-[var(--primary)] focus:outline-none"
              />
              <button
                type="submit"
                disabled={subLoading}
                className="px-6 py-3 bg-[var(--secondary)] text-[var(--on-secondary)] rounded-lg text-sm font-bold hover:brightness-110 transition-all disabled:opacity-50"
              >
                {subLoading ? "..." : "Subscribe"}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
