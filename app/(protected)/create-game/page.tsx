import PlayerCountInput from "@/features/game/components/player-count-input";

export default function CreateGame() {
  return (
    <section className="h-full">
      <div className="container mx-auto flex flex-col justify-center items-center">
        <PlayerCountInput min={2} max={5} defaultValue={2} />
      </div>
    </section>
  );
}
