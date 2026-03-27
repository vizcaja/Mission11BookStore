type CategoryFilterProps = {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
};

function CategoryFilter({
  selectedCategory,
  setSelectedCategory,
}: CategoryFilterProps) {
  const categories = ["All", "Biography", "Fiction", "Self-Help", "Children", "Historical"];

  return (
    <div>
      <h3 className="mb-3">Categories</h3>
      <div className="list-group">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`list-group-item list-group-item-action ${
              selectedCategory === cat ? "active" : ""
            }`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CategoryFilter;