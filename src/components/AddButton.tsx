export default function AddButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 border-2 border-ink bg-accent px-5 py-3 text-[13px] font-semibold tracking-wide text-text shadow-[4px_4px_0_rgba(0,0,0,0.6)] transition-transform hover:-translate-y-0.5"
    >
      + NEW ENTRY
    </button>
  )
}
