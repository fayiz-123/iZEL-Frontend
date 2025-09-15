import toast from "react-hot-toast";

export const confirmToast = (message, onConfirm, onCancel) => {
  toast((t) => (
    <div className="flex flex-col gap-3">
      <span>{message}</span>
      <div className="flex justify-end gap-2">
        <button
          onClick={() => {
            onConfirm();
            toast.dismiss(t.id);
          }}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Yes
        </button>
        <button
          onClick={() => {
            onCancel && onCancel();
            toast.dismiss(t.id);
          }}
          className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
        >
          No
        </button>
      </div>
    </div>
  ), {
    duration: 4000,
    position: "top-center",
  });
};
