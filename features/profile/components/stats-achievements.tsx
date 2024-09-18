import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function StatsAchievements() {
  return (
    <Tabs defaultValue="stats">
      <TabsList className="w-full ">
        <TabsTrigger value="stats" className="w-full">
          Statistikk
        </TabsTrigger>
        <TabsTrigger value="achievements" className="w-full">
          Prestasjoner
        </TabsTrigger>
      </TabsList>
      <TabsContent value="stats">
        <ul className="space-y-2">
          <li>Spilte spill: 100</li>
          <li>Seiere: 75</li>
          <li>Tap: 25</li>
          <li>Vinn/tap-ratio: 3.0</li>
        </ul>
      </TabsContent>
      <TabsContent value="achievements">
        <ul className="space-y-2">
          <li>🏆 Mester spilleren</li>
          <li>🃏 Korthai</li>
          <li>🌟 Nybegynnerhelten</li>
        </ul>
      </TabsContent>
    </Tabs>
  );
}
