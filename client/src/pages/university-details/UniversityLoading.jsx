export default function UniversityLoading() {
  return (
    <main className="grid min-h-screen place-content-center bg-[#f7f9fd] px-4 text-center">
      <div className="rounded-3xl bg-white px-10 py-14 shadow-xl">
        <div className="mx-auto size-11 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />

        <p className="mt-5 font-bold text-[#081c47]">
          Loading university details...
        </p>
      </div>
    </main>
  );
}