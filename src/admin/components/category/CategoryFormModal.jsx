import useCategoryStore from "../../../utils/stores/categoryStore";
import CategoryForm from "./CategoryForm";

const CategoryFormModal = () => {
  const {
    isModalOpen,
    modalMode,
    editData,
    closeModal,
    handleSubmit,
  } = useCategoryStore();

  return (
    <CategoryForm
      isOpen={isModalOpen}
      mode={modalMode}
      initialData={editData}
      onClose={closeModal}
      onSubmit={handleSubmit}
    />
  );
};


export default CategoryFormModal;