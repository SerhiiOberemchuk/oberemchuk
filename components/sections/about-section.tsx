type AboutSectionProps = {
  title: string;
  subtitle: string;
  processTitle: string;
  paragraphs: string[];
  process: Array<{title: string; description: string}>;
};

export default function AboutSection({title, subtitle, processTitle, paragraphs, process}: AboutSectionProps) {
  return (
    <section id="about" className="px-4 py-16 md:px-6 md:py-24" aria-labelledby="about-title">
      <div className="mx-auto max-w-7xl">
        <header className="grid gap-6 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
          <h2 id="about-title" className="text-4xl md:text-6xl">{title}</h2>
          <p className="max-w-3xl text-lg leading-8 text-muted-foreground">{subtitle}</p>
        </header>
        <ol className="mt-10 grid gap-8 md:grid-cols-3" aria-label={processTitle}>
          {process.map((step, index) => (
            <li key={step.title} className="border-t border-[rgba(24,31,43,0.16)] pt-6">
              <p className="text-sm font-semibold text-primary">0{index + 1}</p>
              <h3 className="mt-3 text-3xl leading-tight">{step.title}</h3>
              <p className="mt-4 text-base leading-8 text-muted-foreground">{paragraphs[index] ?? step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
