import About from "./about.mdx";

export function Page() {
  return (
    <>
      <img src="/honey-soldier/cover-art.jpg" />
      <div style={{ textAlign: "left" }}>
        <About />
      </div>
    </>
  );
}
