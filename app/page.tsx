export default function Page() {
  return (
    <section>
      <h1 className="font-medium text-2xl mb-8 tracking-tighter">Cookie Playground Home</h1>
      <p className="prose prose-neutral dark:prose-invert">
        This is a test website to practice cookie implementation and blocking. 
        <iframe width="560" height="315" src="https://www.youtube.com/embed/4_9UbOxoNMM?si=MBlpMaxWMzpFxCzk" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
      </p>
    </section>
  );
}
