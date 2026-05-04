export function ChooserPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
      <img
        src="/atf-assets/atf-logo-vector.svg"
        alt="ATF"
        className="h-16 w-auto mb-8"
      />
      <p className="text-lg text-gray-600 mb-10 text-center max-w-md">
        Compare design directions for the ATF website.
      </p>
      <div className="flex gap-6">
        <a
          href="/legacy"
          className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors font-medium"
        >
          Legacy Prototypes
        </a>
        <a
          href="/claude-design"
          className="px-6 py-3 rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition-colors font-medium"
        >
          Claude Design
        </a>
      </div>
    </div>
  );
}
