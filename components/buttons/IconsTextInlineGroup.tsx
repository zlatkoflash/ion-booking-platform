export default function IconsTextInlineGroup(
  {
    children,
    type = "default",
    gridType = "standard"
  }: {
    children: React.ReactNode | React.ReactNode[];
    type?: "default" | "for-tour-stats" | "for-confirm-whats-next";
    gridType?: "standard" | "x3-in-a-row"
  }) {
  return (
    <>
      <div className={`component icons-texts-inline-group ${type ? ` ${type}` : ''} ${gridType}`}>
        {
          children
        }
      </div>
    </>
  );
}