import SidebarNotes from "../../../../components/SidebarNotes/SidebarNotes";

const tagArray: string[] = ["Work", "Personal", "Meeting", "Shopping", "Todo"];

export default function Sidebar() {
  return <SidebarNotes tags={tagArray} />;
}
