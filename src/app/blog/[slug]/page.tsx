import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts } from "@/data/blog-posts";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const relatedPosts = blogPosts
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            datePublished: post.date,
            author: { "@type": "Organization", name: post.author },
            description: post.excerpt,
          }),
        }}
      />

      <article className="max-w-[1280px] mx-auto px-5 md:px-16 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/blog"
              className="text-sm text-[var(--primary)] flex items-center gap-1 mb-6 hover:underline"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              Back to Blog
            </Link>
            <span className="inline-block px-3 py-1 bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-semibold rounded-full mb-4">
              {post.category}
            </span>
            <h1 className="font-heading text-4xl font-bold text-[var(--text-primary)] mb-4">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-[var(--text-muted)]">
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime}</span>
              <span>•</span>
              <span>{post.author}</span>
            </div>
          </div>

          {/* Hero Image */}
          <div className="w-full aspect-video technical-border rounded-xl overflow-hidden relative mb-10">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="prose prose-invert max-w-none">
            {post.content.split("\n\n").map((para, i) => {
              if (para.startsWith("## ")) {
                return (
                  <h2
                    key={i}
                    className="font-heading text-2xl font-bold text-[var(--text-primary)] mt-10 mb-4"
                  >
                    {para.replace("## ", "")}
                  </h2>
                );
              }
              if (para.startsWith("- **")) {
                const items = para.split("\n");
                return (
                  <ul key={i} className="space-y-2 my-4">
                    {items.map((item, j) => (
                      <li
                        key={j}
                        className="text-base text-[var(--text-muted)] leading-relaxed"
                        dangerouslySetInnerHTML={{
                          __html: item
                            .replace("- ", "• ")
                            .replace(/\*\*(.*?)\*\*/g, "<strong class='text-[var(--text-primary)]'>$1</strong>"),
                        }}
                      />
                    ))}
                  </ul>
                );
              }
              return (
                <p
                  key={i}
                  className="text-base text-[var(--text-muted)] leading-relaxed mb-4"
                >
                  {para}
                </p>
              );
            })}
          </div>

          {/* Share */}
          <div className="flex items-center gap-4 mt-10 pt-8 border-t border-[var(--border-cyan)]">
            <span className="text-sm text-[var(--text-muted)]">Share:</span>
            {["share", "content_copy", "mail"].map((icon) => (
              <button
                key={icon}
                className="w-10 h-10 flex items-center justify-center technical-border rounded-lg text-[var(--text-muted)] hover:text-[var(--primary)] hover:border-[var(--primary)] transition-all"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {icon}
                </span>
              </button>
            ))}
          </div>
        </div>
      </article>

      {/* Related Posts */}
      <section className="bg-[var(--surface-container-low)] py-16">
        <div className="max-w-[1280px] mx-auto px-5 md:px-16">
          <h2 className="font-heading text-2xl font-bold text-[var(--text-primary)] mb-8">
            Related Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((rp) => (
              <Link
                key={rp.slug}
                href={`/blog/${rp.slug}`}
                className="p-6 technical-border rounded-xl bg-[var(--surface)] hover:border-[var(--primary)] transition-all"
              >
                <span className="text-xs font-semibold text-[var(--primary)] mb-2 block">
                  {rp.category}
                </span>
                <h3 className="font-heading text-lg font-bold text-[var(--text-primary)] mb-2">
                  {rp.title}
                </h3>
                <p className="text-sm text-[var(--text-muted)] line-clamp-2">
                  {rp.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
