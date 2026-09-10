export default function AddButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 rounded-[6px] bg-accent px-5 py-3 text-[13px] font-medium text-paper shadow-[0_6px_18px_rgba(181,98,42,0.35)] transition-transform duration-200 hover:-translate-y-0.5"
    >
      + New entry
    </button>
  )
}
