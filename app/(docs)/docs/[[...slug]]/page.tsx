// import { notFound } from "next/navigation";
// import { allDocs } from "contentlayer/generated";

// import { getTableOfContents } from "@/lib/toc";
// import { Mdx } from "@/components/content/mdx-components";
// import { DocsPageHeader } from "@/components/docs/page-header";
// import { DocsPager } from "@/components/docs/pager";
// import { DashboardTableOfContents } from "@/components/shared/toc";

// import "@/styles/mdx.css";

// import { Metadata } from "next";

// import { constructMetadata, getBlurDataURL } from "@/lib/utils";

// interface DocPageProps {
//   params: { slug?: string[] };
// }

// async function getDocFromParams(params: { slug?: string[] }) {
//   const slug = params.slug?.join("/") || "";
//   const doc = allDocs.find((doc) => doc.slugAsParams === slug);

//   return doc ?? null;
// }

// export async function generateMetadata({
//   params,
// }: DocPageProps): Promise<Metadata> {
//   const doc = await getDocFromParams(params);

//   if (!doc) return {};

//   const { title, description } = doc;

//   return constructMetadata({
//     title: `${title} – SaaS Starter`,
//     description: description,
//   });
// }

// export async function generateStaticParams(): Promise<{ slug: string[] }[]> {
//   return allDocs.map((doc) => ({
//     slug: doc.slugAsParams.split("/"),
//   }));
// }

// export default async function DocPage({ params }: DocPageProps) {
//   const doc = await getDocFromParams(params);

//   if (!doc) {
//     notFound();
//   }

//   const toc = await getTableOfContents(doc.body.raw);

//   const images = await Promise.all(
//     doc.images.map(async (src: string) => ({
//       src,
//       blurDataURL: await getBlurDataURL(src),
//     })),
//   );

//   return (
//     <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
//       <div className="mx-auto w-full min-w-0">
//         <DocsPageHeader heading={doc.title} text={doc.description} />
//         <div className="pb-4 pt-11">
//           <Mdx code={doc.body.code} images={images} />
//         </div>
//         <hr className="my-4 md:my-6" />
//         <DocsPager doc={doc} />
//       </div>
//       <div className="hidden text-sm xl:block">
//         <div className="sticky top-16 -mt-10 max-h-[calc(var(--vh)-4rem)] overflow-y-auto pt-8">
//           <DashboardTableOfContents toc={toc} />
//         </div>
//       </div>
//     </main>
//   );
// }

import { notFound } from "next/navigation";
import { allDocs } from "contentlayer/generated";

import { getTableOfContents } from "@/lib/toc";
import { Mdx } from "@/components/content/mdx-components";
import { DocsPageHeader } from "@/components/docs/page-header";
import { DocsPager } from "@/components/docs/pager";
import { DashboardTableOfContents } from "@/components/shared/toc";

import "@/styles/mdx.css";

import { Metadata } from "next";

import { constructMetadata, getBlurDataURL } from "@/lib/utils";

// Indique qu'on ne veut pas autoriser des routes non listées dans generateStaticParams
export const dynamicParams = false;

type Params = { slug?: string[] };

// Pour éviter de répéter le typage
interface DocPageProps {
  params: Promise<Params>; // Next.js 15 : params est une promesse
}

async function getDocFromParams(params: Params) {
  const slug = params.slug?.join("/") || "";
  const doc = allDocs.find((doc) => doc.slugAsParams === slug);
  return doc ?? null;
}

export async function generateMetadata({
  params,
}: DocPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const doc = await getDocFromParams(resolvedParams);

  if (!doc) return {};

  const { title, description } = doc;

  return constructMetadata({
    title: `${title} – SaaS Starter`,
    description,
  });
}

export async function generateStaticParams(): Promise<{ slug?: string[] }[]> {
  return allDocs.map((doc) => {
    const segments = doc.slugAsParams.split("/");
    return segments.length > 0 ? { slug: segments } : { slug: [] };
  });
}

export default async function DocPage({ params }: DocPageProps) {
  const resolvedParams = await params;
  const doc = await getDocFromParams(resolvedParams);

  if (!doc) {
    notFound();
  }

  const toc = await getTableOfContents(doc.body.raw);

  const images = await Promise.all(
    doc.images.map(async (src: string) => ({
      src,
      blurDataURL: await getBlurDataURL(src),
    })),
  );

  return (
    <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
      <div className="mx-auto w-full min-w-0">
        <DocsPageHeader heading={doc.title} text={doc.description} />
        <div className="pb-4 pt-11">
          <Mdx code={doc.body.code} images={images} />
        </div>
        <hr className="my-4 md:my-6" />
        <DocsPager doc={doc} />
      </div>
      <div className="hidden text-sm xl:block">
        <div className="sticky top-16 -mt-10 max-h-[calc(var(--vh)-4rem)] overflow-y-auto pt-8">
          <DashboardTableOfContents toc={toc} />
        </div>
      </div>
    </main>
  );
}
