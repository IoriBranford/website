import About from "./about.mdx";

export function Page() {
  return (
    <>
      <img src="/demonizer/cover-art.png" />
      <div style={{ textAlign: "left" }}>
        <About />
      </div>
    </>
  );
}
