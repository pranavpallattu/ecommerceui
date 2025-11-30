import useCategoryStore from "../../utils/stores/categoryStore";
import CategoryForm from "./CategoryForm";

const CategoryFormModal = () => {
  const { isModalOpen, editData, closeModal, handleSubmit } = useCategoryStore();

  return (
    <CategoryForm
      isOpen={isModalOpen}
      onClose={closeModal}
      onSubmit={handleSubmit}
      initialData={editData}
    />
  );
};

export default CategoryFormModal;