import { useRoadmapStore } from "../Hooks/useRoadmapStore";

export default function CenterInput() {
  const { addNode } = useRoadmapStore();

  const handleKeyDown = (e) => {
    if (e.key !== "Enter") return;

    const value = e.target.value.trim();
    if (!value) return;

    addNode(value);
    e.target.value = "";
  };

  return (
    <input
      type="text"
      onKeyDown={handleKeyDown}
    />
  );
}
