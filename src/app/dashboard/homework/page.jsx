import EMDRCategories from "@/components/dashboard/EMDRCategories";
import WelcomeSection from "@/components/dashboard/WelcomeSection";

export default function HomeworkPage() {
  return (
    <div className="space-y-2 min-h-screen backdrop-blur-sm  p-8 rounded-2xl shadow-sm border border-white/20  ">
      {/* Page Header */}
      <div>
        <h1 className="text-[28px] font-semibold text-[#000000] font-bold">
          My Homework
        </h1>
      </div>
      <WelcomeSection></WelcomeSection>
      <EMDRCategories></EMDRCategories>
    </div>
  );
}
