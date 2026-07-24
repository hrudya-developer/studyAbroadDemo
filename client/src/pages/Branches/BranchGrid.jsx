import BranchCard from "./BranchCard";

const BranchGrid = ({ centers }) => {
  return (
    <div id="branch_grid"
      className="
        grid grid-cols-1 gap-5
        sm:grid-cols-2
        xl:grid-cols-3 xl:gap-6
      "
    >
      {centers.map((center, index) => (
        <BranchCard
          key={center.id}
          center={center}
          index={index}
        />
      ))}
    </div>
  );
};

export default BranchGrid;