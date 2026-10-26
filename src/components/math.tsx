import katex from "katex";

export function MathTex({ tex, block = false }: { tex: string; block?: boolean }) {
  const html = katex.renderToString(tex, {
    throwOnError: false,
    displayMode: block,
    output: "html",
    strict: "ignore",
  });
  if (block) {
    return <div className="math-block overflow-x-auto py-1" dangerouslySetInnerHTML={{ __html: html }} />;
  }
  return <span className="math-inline align-middle" dangerouslySetInnerHTML={{ __html: html }} />;
}
