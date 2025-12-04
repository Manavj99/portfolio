import { posts } from "@/data/posts";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default function CaseFilePage({
  params,
}: {
  params: { slug: string };
}) {
  const post = posts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-3xl">
        <Link href="/#case-files">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Case Files
          </Button>
        </Link>

        <article className="bg-dark-panel/50 border border-neon-red/20 rounded-lg p-8">
          {/* File Tab Header */}
          <div className="border-b border-neon-red/20 pb-4 mb-8">
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
              <span>CASE FILE</span>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{new Date(post.date).toLocaleDateString()}</span>
              </div>
            </div>
            <h1 className="text-4xl font-bold text-neon-red">{post.title}</h1>
          </div>

          {/* Content */}
          <div className="prose prose-invert max-w-none">
            <p className="text-xl text-gray-300 mb-8">{post.summary}</p>

            {post.content ? (
              <div
                className="text-gray-300 space-y-4"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            ) : (
              <div className="text-gray-300 space-y-4">
                <p>
                  This case file is currently being compiled. Check back soon
                  for the full investigation report.
                </p>
                <p>
                  In the meantime, you can explore other case files or view the
                  related experiments in the portfolio.
                </p>
              </div>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t border-neon-red/20">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm bg-dark-panel/50 border border-neon-red/20 rounded text-gray-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}

